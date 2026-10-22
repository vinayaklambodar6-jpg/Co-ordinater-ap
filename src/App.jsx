import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import TeacherManager from './components/TeacherManager.jsx'
import TestPaperGenerator from './components/TestPaperGenerator.jsx'
import SyllabusManager from './components/SyllabusManager.jsx'
import { useFirestoreCollection } from './hooks/useFirestoreCollection.js'
import { isTeacherFree } from './utils/teachers.js'

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
  const substitutions = useFirestoreCollection('substitutions')
  const dailyLogs = useFirestoreCollection('dailyLogs')
  const defaulters = useFirestoreCollection('defaulters')
  const teachers = useFirestoreCollection('teachers', { orderField: 'name', direction: 'asc' })
  const syllabus = useFirestoreCollection('syllabus')

  const [subForm, setSubForm] = useState(emptySub)
  const [logForm, setLogForm] = useState(emptyLog)
  const [defForm, setDefForm] = useState(emptyDefaulter)
  const [saving, setSaving] = useState(false)

  const freeTeachers = teachers.items.filter((teacher) =>
    isTeacherFree(teacher, Number(subForm.period)),
  )
  const updateSub = (key, value) => setSubForm((form) => ({ ...form, [key]: value }))
  const updateLog = (key, value) => setLogForm((form) => ({ ...form, [key]: value }))
  const updateDefaulter = (key, value) => setDefForm((form) => ({ ...form, [key]: value }))

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      window.localStorage.setItem('coordinator-app:theme', theme)
    } catch {
      // Theme persistence is optional; the app still works without it.
    }
  }, [theme])

  const toggleTheme = () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))

  const storageError =
    substitutions.error || dailyLogs.error || defaulters.error || teachers.error || syllabus.error

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

  function handleAssignSub(event) {
    event.preventDefault()
    if (!subForm.classSection.trim() || !subForm.absentTeacher.trim() || !subForm.substitute) {
      window.alert('Kripya sabhi details bharein!')
      return
    }
    saveEntry(
      substitutions.addItem,
      {
        period: Number(subForm.period),
        classSection: subForm.classSection.trim(),
        absentTeacher: subForm.absentTeacher.trim(),
        substitute: subForm.substitute,
      },
      () => setSubForm((form) => ({ ...form, classSection: '', absentTeacher: '', substitute: '' })),
      'Substitute assign ho gaya!',
    )
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
      />
      <main className="container">
        {storageError && (
          <div className="card error-banner">
            <b>Firestore connection problem:</b> {storageError}
            <br />
            Firebase Console mein Firestore Database aur security rules check karein.
          </div>
        )}

        {currentTab === 'dashboard' && (
          <>
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

        {currentTab === 'teachers' && <TeacherManager teachers={teachers} />}

        {currentTab === 'syllabus' && <SyllabusManager syllabus={syllabus} />}

        {currentTab === 'substitution' && (
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
              <button type="submit" className="btn-primary" disabled={saving}>{saving ? 'Saving…' : 'Assign Substitute Now'}</button>
            </form>
          </section>
        )}

        {currentTab === 'testGenerator' && <TestPaperGenerator syllabus={syllabus.items} />}

        {currentTab === 'dailyLog' && (
          <>
            <section className="card">
              <h2 className="card-title">📖 Daily Class Diary &amp; Bring Tomorrow Alert</h2>
              <form onSubmit={handleSaveLog}>
                <div className="form-grid">
                  <FormField label="Class & Section"><input required placeholder="e.g. 10-A" value={logForm.classSection} onChange={(e) => updateLog('classSection', e.target.value)} /></FormField>
                  <FormField label="Subject"><input required placeholder="e.g. Mathematics" value={logForm.subject} onChange={(e) => updateLog('subject', e.target.value)} /></FormField>
                  <FormField label="Classwork (CW Topic Covered Today)" fullWidth><textarea value={logForm.cw} onChange={(e) => updateLog('cw', e.target.value)} /></FormField>
                  <FormField label="Homework (HW Given)" fullWidth><textarea value={logForm.hw} onChange={(e) => updateLog('hw', e.target.value)} /></FormField>
                  <FormField label="🔔 Bring Tomorrow Message" fullWidth><input className="alert-input" placeholder="e.g. Bring Geometry Box tomorrow" value={logForm.bringMessage} onChange={(e) => updateLog('bringMessage', e.target.value)} /></FormField>
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

        {currentTab === 'defaulters' && (
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
