import { useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import { useFirestoreCollection } from './hooks/useFirestoreCollection.js'

const TEACHERS = [
  { id: 'T1', name: 'Mr. Rajesh Sharma', subject: 'Maths', freePeriods: [2, 5, 7] },
  { id: 'T2', name: 'Mrs. Sunita Verma', subject: 'Science', freePeriods: [1, 3, 6] },
  { id: 'T3', name: 'Mr. Amit Kumar', subject: 'English', freePeriods: [2, 4, 8] },
  { id: 'T4', name: 'Ms. Priya Singh', subject: 'Social Science', freePeriods: [1, 5, 6] },
  { id: 'T5', name: 'Mr. Vikas Yadav', subject: 'Hindi', freePeriods: [3, 4, 7] },
]

const emptyLog = { classSection: '', subject: '', cw: '', hw: '', bringMessage: '' }
const emptySub = { period: '1', classSection: '', absentTeacher: '', substitute: '' }
const emptyDefaulter = { classSection: '', type: 'HW Not Done', students: '' }

function App() {
  const [currentTab, setCurrentTab] = useState('dashboard')
  const substitutions = useFirestoreCollection('substitutions')
  const dailyLogs = useFirestoreCollection('dailyLogs')
  const defaulters = useFirestoreCollection('defaulters')

  const [subForm, setSubForm] = useState(emptySub)
  const [testForm, setTestForm] = useState({ classLevel: 'Class 10', subject: 'Mathematics', chapter: '' })
  const [generatedPaper, setGeneratedPaper] = useState(null)
  const [logForm, setLogForm] = useState(emptyLog)
  const [defForm, setDefForm] = useState(emptyDefaulter)
  const [saving, setSaving] = useState(false)

  const freeTeachers = TEACHERS.filter((teacher) =>
    teacher.freePeriods.includes(Number(subForm.period)),
  )
  const updateSub = (key, value) => setSubForm((form) => ({ ...form, [key]: value }))
  const updateTest = (key, value) => setTestForm((form) => ({ ...form, [key]: value }))
  const updateLog = (key, value) => setLogForm((form) => ({ ...form, [key]: value }))
  const updateDefaulter = (key, value) => setDefForm((form) => ({ ...form, [key]: value }))

  const storageError = substitutions.error || dailyLogs.error || defaulters.error

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

  function handleGenerateTest(event) {
    event.preventDefault()
    setGeneratedPaper({
      ...testForm,
      subject: testForm.subject.trim() || 'General',
      chapter: testForm.chapter.trim() || 'General Revision Chapter',
      date: new Date().toLocaleDateString('en-GB'),
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
      <Header currentTab={currentTab} setCurrentTab={setCurrentTab} />
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

        {currentTab === 'substitution' && (
          <section className="card">
            <h2 className="card-title">🔄 Assign Substitute Period</h2>
            <form onSubmit={handleAssignSub}>
              <div className="form-grid">
                <FormField label="Select Period">
                  <select value={subForm.period} onChange={(e) => { updateSub('period', e.target.value); updateSub('substitute', '') }}>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((p) => <option key={p} value={p}>Period {p}</option>)}
                  </select>
                </FormField>
                <FormField label="Class & Section"><input required placeholder="e.g. 10-A" value={subForm.classSection} onChange={(e) => updateSub('classSection', e.target.value)} /></FormField>
                <FormField label="Absent Teacher Name"><input required placeholder="Absent Teacher Name" value={subForm.absentTeacher} onChange={(e) => updateSub('absentTeacher', e.target.value)} /></FormField>
                <FormField label={`Free Teachers (Period ${subForm.period})`}>
                  <select required value={subForm.substitute} onChange={(e) => updateSub('substitute', e.target.value)}>
                    <option value="">-- Choose Free Teacher --</option>
                    {freeTeachers.map((teacher) => <option key={teacher.id} value={teacher.name}>{teacher.name} ({teacher.subject})</option>)}
                  </select>
                </FormField>
              </div>
              <button type="submit" className="btn-primary" disabled={saving}>{saving ? 'Saving…' : 'Assign Substitute Now'}</button>
            </form>
          </section>
        )}

        {currentTab === 'testGenerator' && (
          <section className="card">
            <h2 className="card-title">📝 Backup Test Paper Generator</h2>
            <form onSubmit={handleGenerateTest}>
              <div className="form-grid">
                <FormField label="Select Class">
                  <select value={testForm.classLevel} onChange={(e) => updateTest('classLevel', e.target.value)}>
                    {[6, 7, 8, 9, 10].map((level) => <option key={level}>Class {level}</option>)}
                  </select>
                </FormField>
                <FormField label="Subject"><input required value={testForm.subject} onChange={(e) => updateTest('subject', e.target.value)} /></FormField>
                <FormField label="Completed Chapter Name"><input placeholder="e.g. Chapter 6 Triangles" value={testForm.chapter} onChange={(e) => updateTest('chapter', e.target.value)} /></FormField>
              </div>
              <button type="submit" className="btn-primary">Create Instant Paper</button>
            </form>
            {generatedPaper && (
              <div className="test-paper-sheet">
                <div style={{ textAlign: 'center', borderBottom: '2px solid #333', paddingBottom: 8 }}>
                  <h3>CLASS ASSESSMENT / REVISION TEST</h3>
                  <p>Time: 35 Minutes | Maximum Marks: 20</p>
                </div>
                <p style={{ margin: '12px 0' }}><b>Class:</b> {generatedPaper.classLevel} &nbsp; <b>Subject:</b> {generatedPaper.subject} &nbsp; <b>Chapter:</b> {generatedPaper.chapter} &nbsp; <b>Date:</b> {generatedPaper.date}</p>
                <hr />
                <p><b>Section A: Objective &amp; Basic Concept (2 Marks each)</b></p>
                <ol className="paper-questions"><li>State an important definition and formula from {generatedPaper.chapter}.</li><li>Solve a problem based on {generatedPaper.chapter}.</li></ol>
                <p><b>Section B: Descriptive / Analytical Problems (4 Marks each)</b></p>
                <ol start="3" className="paper-questions"><li>Show the proof or steps clearly for {generatedPaper.chapter}.</li><li>Calculate the final value and verify your result.</li></ol>
                <button type="button" onClick={() => window.print()} className="btn-secondary">🖨️ Print Test Paper</button>
              </div>
            )}
          </section>
        )}

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
