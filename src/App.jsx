import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { addDoc, collection, doc, getDoc, onSnapshot, serverTimestamp, setDoc } from 'firebase/firestore'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import TeacherManager from './components/TeacherManager.jsx'
import TestPaperGenerator from './components/TestPaperGenerator.jsx'
import SyllabusManager from './components/SyllabusManager.jsx'
import LoginScreen from './components/LoginScreen.jsx'
import AdminPanel from './components/AdminPanel.jsx'
import NotificationPanel from './components/NotificationPanel.jsx'
import WelcomeBanner from './components/WelcomeBanner.jsx'
import TaskManager from './components/TaskManager.jsx'
import TeacherTasks from './components/TeacherTasks.jsx'
import BadgeManager from './components/BadgeManager.jsx'
import MyBadges from './components/MyBadges.jsx'
import VoiceTextarea from './components/VoiceTextarea.jsx'
import { MySubstitutions, MyTimetable, TeacherDiary } from './components/TeacherViews.jsx'
import { auth, db } from './firebase.js'
import { logout } from './auth.js'
import { useFirestoreCollection } from './hooks/useFirestoreCollection.js'
import { isTeacherFree } from './utils/teachers.js'
import { findSubstitutionConflicts } from './utils/substitutions.js'
import { buildSubstitutionMessage, normalizePhone, smsLink, whatsappLink } from './utils/notify.js'

// First signed-in account(s) allowed to bootstrap the admin role.
const ADMIN_EMAILS = ['vinayaklambodar6@gmail.com']

const emptyLog = { classSection: '', subject: '', cw: '', hw: '', bringMessage: '' }
const emptySub = { period: '1', classSection: '', absentTeacher: '', substitute: '' }
const emptyDefaulter = { classSection: '', type: 'HW Not Done', students: '' }

function getInitialTheme() {
  const savedTheme = window.localStorage.getItem('coordinator-app:theme')
  if (savedTheme === 'dark' || savedTheme === 'light') return savedTheme
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function App() {
  const [currentTab, setCurrentTab] = useState('dashboard')
  const [theme, setTheme] = useState(getInitialTheme)
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [role, setRole] = useState(null)
  const [authReady, setAuthReady] = useState(false)
  const [accessError, setAccessError] = useState('')

  const isAdmin = role === 'admin'
  const isTeacher = role === 'teacher'
  const portalAccess = isAdmin || isTeacher
  const actor = profile ? { uid: profile.id, name: profile.name, role: profile.role } : null

  const substitutions = useFirestoreCollection('substitutions', { enabled: portalAccess, actor })
  const dailyLogs = useFirestoreCollection('dailyLogs', { enabled: portalAccess, actor })
  const defaulters = useFirestoreCollection('defaulters', { enabled: isAdmin, actor })
  const teachers = useFirestoreCollection('teachers', {
    orderField: 'name',
    direction: 'asc',
    enabled: portalAccess,
    actor,
  })
  const syllabus = useFirestoreCollection('syllabus', { enabled: isAdmin, actor })
  const users = useFirestoreCollection('users', { enabled: isAdmin, actor })
  const accessLogs = useFirestoreCollection('accessLogs', { enabled: isAdmin })
  const activityLogs = useFirestoreCollection('activityLogs', { enabled: isAdmin })
  const tasks = useFirestoreCollection('tasks', { enabled: isAdmin, actor })
  const myTasks = useFirestoreCollection('tasks', {
    enabled: isTeacher,
    filter: { field: 'assignedToUid', value: user?.uid || '' },
    actor,
  })
  const badges = useFirestoreCollection('badges', { enabled: portalAccess, actor })

  const [subForm, setSubForm] = useState(emptySub)
  const [logForm, setLogForm] = useState(emptyLog)
  const [defForm, setDefForm] = useState(emptyDefaulter)
  const [saving, setSaving] = useState(false)
  const [subAlert, setSubAlert] = useState(null)

  const freeTeachers = teachers.items.filter((teacher) =>
    isTeacherFree(teacher, Number(subForm.period)),
  )

  const subConflicts = findSubstitutionConflicts({
    ...subForm,
    teachers: teachers.items,
    substitutions: substitutions.items,
  })
  const updateSub = (key, value) => setSubForm((form) => ({ ...form, [key]: value }))
  const updateLog = (key, value) => setLogForm((form) => ({ ...form, [key]: value }))
  const updateDefaulter = (key, value) => setDefForm((form) => ({ ...form, [key]: value }))

  useEffect(() => {
    let cancelled = false
    let unsubProfile = null

    const unsubscribe = onAuthStateChanged(auth, async (nextUser) => {
      setUser(nextUser)
      setAccessError('')

      if (unsubProfile) {
        unsubProfile()
        unsubProfile = null
      }

      if (!nextUser) {
        setProfile(null)
        setRole(null)
        setAuthReady(true)
        return
      }

      const accountEmail = (nextUser.email || '').toLowerCase()
      const userRef = doc(db, 'users', nextUser.uid)

      try {
        const snapshot = await getDoc(userRef)
        if (cancelled) return

        // First-time login: bootstrap admins, and register everyone else as a
        // pending request so the admin can track and approve access.
        if (!snapshot.exists()) {
          const isBootstrapAdmin = ADMIN_EMAILS.includes(accountEmail)
          await setDoc(
            userRef,
            {
              name: nextUser.displayName || nextUser.email,
              email: nextUser.email,
              phone: nextUser.phoneNumber || '',
              role: isBootstrapAdmin ? 'admin' : 'pending',
              status: isBootstrapAdmin ? 'active' : 'pending',
              requestedRole: isBootstrapAdmin ? 'admin' : 'teacher',
              createdAt: serverTimestamp(),
            },
            { merge: true },
          )
        }

        if (cancelled) return

        unsubProfile = onSnapshot(
          userRef,
          (docSnapshot) => {
            if (!docSnapshot.exists()) {
              setProfile(null)
              setRole(null)
              setAuthReady(true)
              return
            }

            const data = docSnapshot.data()
            setProfile({ id: docSnapshot.id, ...data })
            setRole(
              data.role === 'admin' ? 'admin' : data.role === 'teacher' ? 'teacher' : null,
            )
            setAuthReady(true)
          },
          (snapshotError) => {
            setAccessError(snapshotError.message)
            setProfile(null)
            setRole(null)
            setAuthReady(true)
          },
        )
      } catch (error) {
        if (cancelled) return
        setAccessError(error.message)
        setProfile(null)
        setRole(null)
        setAuthReady(true)
      }
    })

    return () => {
      cancelled = true
      if (unsubProfile) unsubProfile()
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      window.localStorage.setItem('coordinator-app:theme', theme)
    } catch {
      // Theme persistence is optional; the app still works without it.
    }
  }, [theme])

  const toggleTheme = () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))

  // Record a login event once per browser session for the admin audit trail.
  useEffect(() => {
    if (!user || !portalAccess) return

    const key = `access-log:${user.uid}`
    try {
      if (window.sessionStorage.getItem(key)) return
      window.sessionStorage.setItem(key, '1')
    } catch {
      // Session storage can be unavailable; logging still continues.
    }

    addDoc(collection(db, 'accessLogs'), {
      uid: user.uid,
      name: profile?.name || user.displayName || '',
      email: user.email || '',
      phone: profile?.phone || '',
      role,
      action: 'login',
      userAgent: navigator.userAgent.slice(0, 180),
      createdAt: serverTimestamp(),
    }).catch(() => {})
  }, [user, portalAccess, profile, role])

  useEffect(() => {
    if (
      role === 'teacher' &&
      !['myTimetable', 'myTasks', 'myBadges', 'mySubstitutions', 'teacherDiary'].includes(currentTab)
    ) {
      setCurrentTab('myTimetable')
    }
    if (
      role === 'admin' &&
      ['myTimetable', 'myTasks', 'myBadges', 'mySubstitutions', 'teacherDiary'].includes(currentTab)
    ) {
      setCurrentTab('dashboard')
    }
  }, [role, currentTab])

  async function handleLogout() {
    try {
      await logout()
      setCurrentTab('dashboard')
    } catch (error) {
      window.alert(`Logout nahi hua: ${error.message}`)
    }
  }

  function focusLogin() {
    const card = window.document.getElementById('login-card')
    card?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    card?.querySelector('input')?.focus()
  }

  const storageError =
    substitutions.error || dailyLogs.error || defaulters.error || teachers.error || syllabus.error ||
    users.error || accessLogs.error || activityLogs.error || tasks.error || myTasks.error ||
    badges.error

  async function saveEntry(addItem, data, resetForm, successMessage) {
    setSaving(true)
    try {
      await addItem(data)
      resetForm()
      window.alert(successMessage)
    } catch (error) {
      window.alert(`Save nahi hua: ${error.message}`)
    } finally {
      setSaving(false)
    }
  }

  async function handleAssignSub(event) {
    event.preventDefault()
    if (!subForm.classSection.trim() || !subForm.absentTeacher.trim() || !subForm.substitute) {
      window.alert('Kripya sabhi details bharein!')
      return
    }

    const conflicts = findSubstitutionConflicts({
      ...subForm,
      teachers: teachers.items,
      substitutions: substitutions.items,
    })
    if (conflicts.length) {
      window.alert(`⚠️ Clash detected:\n\n${conflicts.map((item) => `• ${item.message}`).join('\n')}`)
      return
    }

    const entry = {
      period: Number(subForm.period),
      classSection: subForm.classSection.trim(),
      absentTeacher: subForm.absentTeacher.trim(),
      substitute: subForm.substitute,
    }

    setSaving(true)
    try {
      await substitutions.addItem(entry)
      setSubForm((form) => ({ ...form, classSection: '', absentTeacher: '', substitute: '' }))
      setSubAlert(entry)
      window.alert('Substitute assign ho gaya! Ab neeche WhatsApp/SMS alert bhej sakte hain.')
    } catch (error) {
      window.alert(`Save nahi hua: ${error.message}`)
    } finally {
      setSaving(false)
    }
  }

  function alertTargets(entry) {
    if (!entry) return []
    return [entry.substitute, entry.absentTeacher].map((name) => {
      const teacher = teachers.items.find((item) => item.name === name)
      return { name, phone: teacher?.phone || '', exists: Boolean(teacher) }
    })
  }

  function handleSaveLog(event) {
    event.preventDefault()
    if (!logForm.classSection.trim() || !logForm.subject.trim()) {
      window.alert('Class aur Subject bharna zaroori hai!')
      return
    }
    saveEntry(
      dailyLogs.addItem,
      {
        classSection: logForm.classSection.trim(),
        subject: logForm.subject.trim(),
        cw: logForm.cw.trim(),
        hw: logForm.hw.trim(),
        bringMessage: logForm.bringMessage.trim(),
      },
      () => setLogForm(emptyLog),
      'Daily Work & Bring Message save ho gaya!',
    )
  }

  function handleSaveDefaulter(event) {
    event.preventDefault()
    if (!defForm.classSection.trim() || !defForm.students.trim()) {
      window.alert('Class aur Students ke Roll No bharein!')
      return
    }
    saveEntry(
      defaulters.addItem,
      {
        classSection: defForm.classSection.trim(),
        type: defForm.type,
        students: defForm.students.trim(),
      },
      () => setDefForm(emptyDefaulter),
      'Defaulter entry darz ho gayi!',
    )
  }

  return (
    <div className="app-wrapper">
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        theme={theme}
        onToggleTheme={toggleTheme}
        user={user}
        role={role}
        profileName={profile?.name}
        onLogin={focusLogin}
        onLogout={handleLogout}
      />
      <main className="container">
        {!authReady && <p className="muted auth-loading">Checking login…</p>}
        {authReady && !user && <LoginScreen />}

        {authReady && user && !portalAccess && (
          <section className="card login-card">
            <h2 className="card-title">
              {profile?.role === 'pending' || profile?.status === 'pending'
                ? '⏳ Approval Pending'
                : '🚫 Access Not Assigned'}
            </h2>

            {profile?.role === 'pending' || profile?.status === 'pending' ? (
              <>
                <p className="muted" style={{ marginBottom: 14 }}>
                  Aapka registration receive ho gaya hai. Admin approval ke baad portal
                  automatically khul jayega.
                </p>
                <div className="approval-details">
                  <span><b>Name:</b> {profile?.name || '-'}</span>
                  <span><b>Email:</b> {profile?.email || user.email}</span>
                  <span><b>Contact:</b> {profile?.phone || '-'}</span>
                  <span>
                    <b>Requested role:</b>{' '}
                    {profile?.requestedRole === 'admin' ? 'Coordinator (Admin)' : 'Teacher'}
                  </span>
                  <span><b>Status:</b> pending</span>
                </div>
              </>
            ) : (
              <p className="muted" style={{ marginBottom: 14 }}>
                Aapka account portal ke liye authorized nahi hai. Admin se sampark karein.
              </p>
            )}

            {accessError && <p className="login-error">{accessError}</p>}
            <button type="button" className="btn-secondary" onClick={handleLogout}>
              Logout
            </button>
          </section>
        )}

        {user && portalAccess && (
          <>
        {storageError && (
          <div className="card error-banner">
            <b>Firestore connection problem:</b> {storageError}
            <br />
            Firebase Console mein Firestore Database aur security rules check karein.
          </div>
        )}

        {isAdmin && currentTab === 'dashboard' && (
          <>
            <WelcomeBanner name={profile?.name} />

            <div className="stats-grid">
              <Stat value={substitutions.items.length} label="Active Substitutes Today" />
              <Stat value={dailyLogs.items.length} label="Classes Logged Today" />
              <Stat value={defaulters.items.length} label="Defaulter Lists Marked" />
              <Stat value={teachers.items.length} label="Teachers On Record" />
              <Stat value={syllabus.items.length} label="Chapters In Syllabus" />
            </div>
            <section className="card">
              <h2 className="card-title">📌 Today&apos;s Quick Operations Overview</h2>
              <div className="table-wrapper">
                <table>
                  <thead><tr><th>Period</th><th>Class</th><th>Absent Teacher</th><th>Substitute Teacher Assigned</th></tr></thead>
                  <tbody>
                    {substitutions.items.map((item) => (
                      <tr key={item.id}><td><b>Period {item.period}</b></td><td>{item.classSection}</td><td>{item.absentTeacher}</td><td><b>{item.substitute}</b></td></tr>
                    ))}
                    {!substitutions.loading && !substitutions.items.length && <EmptyRow columns={4} message="Aaj koi substitute assign nahi hai." />}
                    {substitutions.loading && <EmptyRow columns={4} message="Loading from Firebase…" />}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}

        {isAdmin && currentTab === 'admin' && (
          <AdminPanel
            users={users}
            teachers={teachers}
            accessLogs={accessLogs}
            activityLogs={activityLogs}
          />
        )}

        {isAdmin && currentTab === 'tasks' && (
          <TaskManager tasks={tasks} users={users} currentUser={profile} />
        )}

        {isTeacher && currentTab === 'myTasks' && (
          <TeacherTasks tasks={myTasks} profile={profile || {}} />
        )}

        {isAdmin && currentTab === 'badges' && (
          <BadgeManager badges={badges} teachers={teachers} currentUser={profile} />
        )}

        {isTeacher && currentTab === 'myBadges' && (
          <MyBadges badges={badges} profile={profile || {}} />
        )}

        {isAdmin && currentTab === 'notifications' && (
          <NotificationPanel teachers={teachers} substitutions={substitutions} />
        )}

        {isAdmin && currentTab === 'teachers' && <TeacherManager teachers={teachers} />}

        {isAdmin && currentTab === 'syllabus' && <SyllabusManager syllabus={syllabus} />}

        {isAdmin && currentTab === 'substitution' && (
          <>
          {subAlert && (
            <section className="card alert-ready-card">
              <h2 className="card-title">🔔 Substitution Alert Ready</h2>
              <p className="muted" style={{ marginBottom: 10 }}>
                Abhi save hui substitution ke liye message tayyar hai — relevant staff ko WhatsApp
                ya SMS bhejein.
              </p>
              <div className="message-preview">
                {buildSubstitutionMessage(subAlert)}
              </div>
              <div className="alert-recipients">
                {alertTargets(subAlert).map((target) => (
                  <div className="alert-recipient" key={target.name}>
                    <b>{target.name}</b>
                    {normalizePhone(target.phone) ? (
                      <>
                        <a
                          className="btn-link"
                          href={whatsappLink(target.phone, buildSubstitutionMessage(subAlert))}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          WhatsApp
                        </a>
                        <a className="btn-link" href={smsLink(target.phone, buildSubstitutionMessage(subAlert))}>
                          SMS
                        </a>
                      </>
                    ) : (
                      <span className="muted">Number saved nahi hai</span>
                    )}
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setCurrentTab('notifications')}
              >
                Open Quick Message Panel
              </button>
            </section>
          )}
          <section className="card">
            <h2 className="card-title">🔄 Assign Substitute Period</h2>
            <form onSubmit={handleAssignSub}>
              <div className="form-grid">
                <FormField label="Select Period">
                  <select value={subForm.period} onChange={(e) => { updateSub('period', e.target.value); updateSub('substitute', '') }}>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((p) => (
                      <option key={p} value={p}>{p === 0 ? 'Zero Period' : `Period ${p}`}</option>
                    ))}
                  </select>
                </FormField>
                <FormField label="Class & Section"><input required placeholder="e.g. 10-A" value={subForm.classSection} onChange={(e) => updateSub('classSection', e.target.value)} /></FormField>
                <FormField label="Absent Teacher Name"><input required placeholder="Absent Teacher Name" value={subForm.absentTeacher} onChange={(e) => updateSub('absentTeacher', e.target.value)} /></FormField>
                <FormField label={`Free Teachers (${Number(subForm.period) === 0 ? 'Zero Period' : `Period ${subForm.period}`})`}>
                  <select required value={subForm.substitute} onChange={(e) => updateSub('substitute', e.target.value)}>
                    <option value="">-- Choose Free Teacher --</option>
                    {freeTeachers.map((teacher) => <option key={teacher.id} value={teacher.name}>{teacher.name} ({teacher.subject})</option>)}
                    {!freeTeachers.length && <option value="" disabled>Is period mein koi free teacher nahi</option>}
                  </select>
                </FormField>
              </div>
              {!!subConflicts.length && (
                <div className="clash-warning">
                  <b>⚠️ Smart Clash Detector</b>
                  <ul>
                    {subConflicts.map((conflict) => (
                      <li key={conflict.type}>{conflict.message}</li>
                    ))}
                  </ul>
                  <p>Doosra free teacher chunein ya period badlein.</p>
                </div>
              )}
              <button
                type="submit"
                className="btn-primary"
                disabled={saving || subConflicts.length > 0}
              >
                {saving ? 'Saving…' : 'Assign Substitute Now'}
              </button>
            </form>
          </section>
          </>
        )}

        {isAdmin && currentTab === 'testGenerator' && <TestPaperGenerator syllabus={syllabus.items} />}

        {isTeacher && currentTab === 'myTimetable' && (
          <>
            <WelcomeBanner
              compact
              name={profile?.name}
              subtitle="Aapka timetable, substitutions aur class diary — sab ek jagah."
            />
            <MyTimetable teachers={teachers} profile={profile || {}} />
          </>
        )}

        {isTeacher && currentTab === 'mySubstitutions' && (
          <MySubstitutions substitutions={substitutions} profile={profile || {}} />
        )}

        {isTeacher && currentTab === 'teacherDiary' && (
          <TeacherDiary dailyLogs={dailyLogs} profile={profile || {}} />
        )}

        {isAdmin && currentTab === 'dailyLog' && (
          <>
            <section className="card">
              <h2 className="card-title">📖 Daily Class Diary &amp; Bring Tomorrow Alert</h2>
              <form onSubmit={handleSaveLog}>
                <div className="form-grid">
                  <FormField label="Class & Section"><input required placeholder="e.g. 10-A" value={logForm.classSection} onChange={(e) => updateLog('classSection', e.target.value)} /></FormField>
                  <FormField label="Subject"><input required placeholder="e.g. Mathematics" value={logForm.subject} onChange={(e) => updateLog('subject', e.target.value)} /></FormField>
                  <FormField label="Classwork (CW Topic Covered Today)" fullWidth>
                    <VoiceTextarea
                      rows={3}
                      hint="Mic se bolkar likhein"
                      value={logForm.cw}
                      onChange={(value) => updateLog('cw', value)}
                    />
                  </FormField>
                  <FormField label="Homework (HW Given)" fullWidth>
                    <VoiceTextarea
                      rows={3}
                      hint="Mic se bolkar likhein"
                      value={logForm.hw}
                      onChange={(value) => updateLog('hw', value)}
                    />
                  </FormField>
                  <FormField label="🔔 Bring Tomorrow Message" fullWidth>
                    <VoiceTextarea
                      rows={2}
                      className="alert-input"
                      placeholder="e.g. Bring Geometry Box tomorrow"
                      value={logForm.bringMessage}
                      onChange={(value) => updateLog('bringMessage', value)}
                    />
                  </FormField>
                </div>
                <button type="submit" className="btn-primary" disabled={saving}>{saving ? 'Saving…' : 'Save Diary Entry'}</button>
              </form>
            </section>
            <section className="card">
              <h2 className="card-title">Today&apos;s Class Diary Entries</h2>
              <div className="table-wrapper"><table>
                <thead><tr><th>Class</th><th>Subject</th><th>Classwork</th><th>Homework</th><th>Bring Message</th></tr></thead>
                <tbody>
                  {dailyLogs.items.map((item) => <tr key={item.id}><td><b>{item.classSection}</b></td><td>{item.subject}</td><td>{item.cw || '-'}</td><td>{item.hw || '-'}</td><td>{item.bringMessage ? <span className="bring-tag">📢 {item.bringMessage}</span> : '-'}</td></tr>)}
                  {!dailyLogs.loading && !dailyLogs.items.length && <EmptyRow columns={5} message="Abhi koi diary entry nahi hai." />}
                  {dailyLogs.loading && <EmptyRow columns={5} message="Loading from Firebase…" />}
                </tbody>
              </table></div>
            </section>
          </>
        )}

        {isAdmin && currentTab === 'defaulters' && (
          <>
            <section className="card">
              <h2 className="card-title">⚠️ Student Defaulter &amp; Absentee Register</h2>
              <form onSubmit={handleSaveDefaulter}>
                <div className="form-grid">
                  <FormField label="Class & Section"><input required placeholder="e.g. 9-B" value={defForm.classSection} onChange={(e) => updateDefaulter('classSection', e.target.value)} /></FormField>
                  <FormField label="Defect Category">
                    <select value={defForm.type} onChange={(e) => updateDefaulter('type', e.target.value)}>
                      <option>HW Not Done</option><option>Student Absent</option><option>Notes Incomplete</option>
                    </select>
                  </FormField>
                  <FormField label="Roll Numbers / Student Names" fullWidth><input required placeholder="e.g. Roll 04, 09, 15" value={defForm.students} onChange={(e) => updateDefaulter('students', e.target.value)} /></FormField>
                </div>
                <button type="submit" className="btn-primary" disabled={saving}>{saving ? 'Saving…' : 'Log Defaulter Record'}</button>
              </form>
            </section>
            <section className="card">
              <h2 className="card-title">Today&apos;s Defaulter Summary</h2>
              <div className="table-wrapper"><table>
                <thead><tr><th>Class</th><th>Issue / Status</th><th>Students / Roll Numbers</th></tr></thead>
                <tbody>
                  {defaulters.items.map((item) => <tr key={item.id}><td><b>{item.classSection}</b></td><td><span className="bring-tag">{item.type}</span></td><td>{item.students}</td></tr>)}
                  {!defaulters.loading && !defaulters.items.length && <EmptyRow columns={3} message="Abhi koi defaulter entry nahi hai." />}
                  {defaulters.loading && <EmptyRow columns={3} message="Loading from Firebase…" />}
                </tbody>
              </table></div>
            </section>
          </>
        )}
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}

function Stat({ value, label }) {
  return <div className="stat-card"><div className="stat-value">{value}</div><div className="stat-label">{label}</div></div>
}

function FormField({ label, fullWidth = false, children }) {
  return <div className={`form-group${fullWidth ? ' full-width' : ''}`}><label>{label}</label>{children}</div>
}

function EmptyRow({ columns, message }) {
  return <tr><td colSpan={columns} style={{ textAlign: 'center' }}>{message}</td></tr>
}

export default App
