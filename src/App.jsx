import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'

const INITIAL_TEACHERS = [
  { id: 'T1', name: 'Mr. Rajesh Sharma', subject: 'Maths', freePeriods: [2, 5, 7] },
  { id: 'T2', name: 'Mrs. Sunita Verma', subject: 'Science', freePeriods: [1, 3, 6] },
  { id: 'T3', name: 'Mr. Amit Kumar', subject: 'English', freePeriods: [2, 4, 8] },
  { id: 'T4', name: 'Ms. Priya Singh', subject: 'Social Science', freePeriods: [1, 5, 6] },
  { id: 'T5', name: 'Mr. Vikas Yadav', subject: 'Hindi', freePeriods: [3, 4, 7] },
]

const INITIAL_SUBSTITUTIONS = [
  { id: 1, period: 2, classSection: '9-B', absentTeacher: 'Mrs. Sunita Verma', substitute: 'Mr. Amit Kumar' },
]
const INITIAL_LOGS = [
  { id: 1, classSection: '10-A', subject: 'Maths', cw: 'Triangles Theorem 6.1', hw: 'Ex 6.1 Complete Q1-Q5', bringMessage: 'Bring Geometry Box & Ruler tomorrow' },
]
const INITIAL_DEFAULTERS = [
  { id: 1, classSection: '9-B', type: 'HW Not Done', students: 'Roll 04, 18' },
]

const emptyLog = { classSection: '', subject: '', cw: '', hw: '', bringMessage: '' }
const tabTitles = {
  dashboard: 'Dashboard',
  substitution: 'Substitution Manager',
  testGenerator: 'Auto Test Paper',
  dailyLog: 'Diary & Bring Message',
  defaulters: 'Defaulters Register',
}

function App() {
  const [currentTab, setCurrentTab] = useState('dashboard')
  const [substitutions, setSubstitutions] = useLocalStorageState('coordinator-app:substitutions', INITIAL_SUBSTITUTIONS)
  const [dailyLogs, setDailyLogs] = useLocalStorageState('coordinator-app:daily-logs', INITIAL_LOGS)
  const [defaulters, setDefaulters] = useLocalStorageState('coordinator-app:defaulters', INITIAL_DEFAULTERS)
  const [subForm, setSubForm] = useState({ period: '1', classSection: '', absentTeacher: '', substitute: '' })
  const [testForm, setTestForm] = useState({ classLevel: 'Class 10', subject: 'Mathematics', chapter: '' })
  const [generatedPaper, setGeneratedPaper] = useLocalStorageState('coordinator-app:generated-paper', null)
  const [logForm, setLogForm] = useState(emptyLog)
  const [defForm, setDefForm] = useState({ classSection: '', type: 'HW Not Done', students: '' })

  const freeTeachers = INITIAL_TEACHERS.filter((teacher) =>
    teacher.freePeriods.includes(Number(subForm.period)),
  )
  const updateSub = (key, value) => setSubForm((form) => ({ ...form, [key]: value }))
  const updateTest = (key, value) => setTestForm((form) => ({ ...form, [key]: value }))
  const updateLog = (key, value) => setLogForm((form) => ({ ...form, [key]: value }))
  const updateDefaulter = (key, value) => setDefForm((form) => ({ ...form, [key]: value }))

  function handleAssignSub(event) {
    event.preventDefault()
    if (!subForm.classSection.trim() || !subForm.absentTeacher.trim() || !subForm.substitute) {
      window.alert('Kripya sabhi details bharein!')
      return
    }
    setSubstitutions((items) => [{ ...subForm, id: Date.now() }, ...items])
    setSubForm((form) => ({ ...form, classSection: '', absentTeacher: '', substitute: '' }))
  }

  function handleGenerateTest(event) {
    event.preventDefault()
    setGeneratedPaper({
      ...testForm,
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
    setDailyLogs((items) => [{ ...logForm, id: Date.now() }, ...items])
    setLogForm(emptyLog)
  }

  function handleSaveDefaulter(event) {
    event.preventDefault()
    if (!defForm.classSection.trim() || !defForm.students.trim()) {
      window.alert('Class aur Students ke Roll No bharein!')
      return
    }
    setDefaulters((items) => [{ ...defForm, id: Date.now() }, ...items])
    setDefForm({ classSection: '', type: 'HW Not Done', students: '' })
  }

  return (
    <div className="app-wrapper">
      <Header currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <main className="container">
        {currentTab === 'dashboard' && (
          <>
            <div className="stats-grid">
              <Stat value={substitutions.length} label="Active Substitutes Today" />
              <Stat value={dailyLogs.length} label="Classes Logged Today" />
              <Stat value={defaulters.length} label="Defaulter Lists Marked" />
            </div>
            <section className="card">
              <h2 className="card-title">📌 Today&apos;s Quick Operations Overview</h2>
              <div className="table-wrapper">
                <table>
                  <thead><tr><th>Period</th><th>Class</th><th>Absent Teacher</th><th>Substitute Teacher Assigned</th></tr></thead>
                  <tbody>
                    {substitutions.map((item) => (
                      <tr key={item.id}><td><b>Period {item.period}</b></td><td>{item.classSection}</td><td>{item.absentTeacher}</td><td><b>{item.substitute}</b></td></tr>
                    ))}
                    {!substitutions.length && <EmptyRow columns={4} message="Aaj koi substitute assign nahi hai." />}
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
                <FormField label="Select Period"><select value={subForm.period} onChange={(e) => { updateSub('period', e.target.value); updateSub('substitute', '') }}>{[1, 2, 3, 4, 5, 6, 7, 8].map((p) => <option key={p} value={p}>Period {p}</option>)}</select></FormField>
                <FormField label="Class & Section"><input required placeholder="e.g. 10-A" value={subForm.classSection} onChange={(e) => updateSub('classSection', e.target.value)} /></FormField>
                <FormField label="Absent Teacher Name"><input required placeholder="Absent Teacher Name" value={subForm.absentTeacher} onChange={(e) => updateSub('absentTeacher', e.target.value)} /></FormField>
                <FormField label={`Free Teachers (Period ${subForm.period})`}><select required value={subForm.substitute} onChange={(e) => updateSub('substitute', e.target.value)}><option value="">-- Choose Free Teacher --</option>{freeTeachers.map((teacher) => <option key={teacher.id} value={teacher.name}>{teacher.name} ({teacher.subject})</option>)}</select></FormField>
              </div>
              <button type="submit" className="btn-primary">Assign Substitute Now</button>
            </form>
          </section>
        )}

        {currentTab === 'testGenerator' && (
          <section className="card">
            <h2 className="card-title">📝 Backup Test Paper Generator</h2>
            <form onSubmit={handleGenerateTest}>
              <div className="form-grid">
                <FormField label="Select Class"><select value={testForm.classLevel} onChange={(e) => updateTest('classLevel', e.target.value)}>{[6, 7, 8, 9, 10].map((level) => <option key={level}>Class {level}</option>)}</select></FormField>
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
                <button type="submit" className="btn-primary">Save Diary Entry</button>
              </form>
            </section>
            <section className="card">
              <h2 className="card-title">Today&apos;s Class Diary Entries</h2>
              <div className="table-wrapper"><table>
                <thead><tr><th>Class</th><th>Subject</th><th>Classwork</th><th>Homework</th><th>Bring Message</th></tr></thead>
                <tbody>{dailyLogs.map((item) => <tr key={item.id}><td><b>{item.classSection}</b></td><td>{item.subject}</td><td>{item.cw || '-'}</td><td>{item.hw || '-'}</td><td>{item.bringMessage ? <span className="bring-tag">📢 {item.bringMessage}</span> : '-'}</td></tr>)}</tbody>
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
                  <FormField label="Defect Category"><select value={defForm.type} onChange={(e) => updateDefaulter('type', e.target.value)}><option>HW Not Done</option><option>Student Absent</option><option>Notes Incomplete</option></select></FormField>
                  <FormField label="Roll Numbers / Student Names" fullWidth><input required placeholder="e.g. Roll 04, 09, 15" value={defForm.students} onChange={(e) => updateDefaulter('students', e.target.value)} /></FormField>
                </div>
                <button type="submit" className="btn-primary">Log Defaulter Record</button>
              </form>
            </section>
            <section className="card">
              <h2 className="card-title">Today&apos;s Defaulter Summary</h2>
              <div className="table-wrapper"><table>
                <thead><tr><th>Class</th><th>Issue / Status</th><th>Students / Roll Numbers</th></tr></thead>
                <tbody>{defaulters.map((item) => <tr key={item.id}><td><b>{item.classSection}</b></td><td><span className="bring-tag">{item.type}</span></td><td>{item.students}</td></tr>)}</tbody>
              </table></div>
            </section>
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}

function useLocalStorageState(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const savedValue = window.localStorage.getItem(key)
      return savedValue === null ? initialValue : JSON.parse(savedValue)
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // The app remains usable if browser storage is unavailable or full.
    }
  }, [key, value])

  return [value, setValue]
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
