import { useState } from 'react'
import { PERIODS, isTeacherFree, periodLabel } from '../utils/teachers.js'

const SAMPLE_TEACHERS = [
  {
    name: 'Mr. Rajesh Sharma',
    subject: 'Maths',
    freePeriods: [0, 5, 7],
    timetable: { 1: '10-A', 2: '9-B', 3: '8-A', 4: '10-B', 6: '7-A', 8: '9-A' },
  },
  {
    name: 'Mrs. Sunita Verma',
    subject: 'Science',
    freePeriods: [3, 6],
    timetable: { 1: '9-A', 2: '10-A', 4: '8-B', 5: '7-A', 7: '10-B', 8: '6-A' },
  },
  {
    name: 'Mr. Amit Kumar',
    subject: 'English',
    freePeriods: [4, 8],
    timetable: { 1: '8-A', 2: '6-A', 3: '10-A', 5: '9-B', 6: '7-A', 7: '10-B' },
  },
  {
    name: 'Ms. Priya Singh',
    subject: 'Social Science',
    freePeriods: [5, 6],
    timetable: { 1: '10-B', 2: '9-A', 3: '8-B', 4: '7-A', 7: '6-A', 8: '10-A' },
  },
  {
    name: 'Mr. Vikas Yadav',
    subject: 'Hindi',
    freePeriods: [3, 4, 7],
    timetable: { 1: '6-A', 2: '7-A', 5: '10-A', 6: '9-B', 8: '8-A' },
  },
]

const emptyForm = { name: '', subject: '', freePeriods: [], timetable: {} }

function buildTimetable(teacher) {
  const timetable = {}
  PERIODS.forEach((period) => {
    const className = teacher.timetable?.[period]
    if (className) timetable[period] = className
  })
  return timetable
}

export default function TeacherManager({ teachers }) {
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [busy, setBusy] = useState(false)

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }))

  function togglePeriod(period) {
    setForm((current) => {
      const isFree = current.freePeriods.includes(period)
      const timetable = { ...current.timetable }

      if (isFree) {
        return { ...current, freePeriods: current.freePeriods.filter((item) => item !== period) }
      }

      // Marking a period free removes any class scheduled in it.
      delete timetable[period]
      return {
        ...current,
        timetable,
        freePeriods: [...current.freePeriods, period].sort((a, b) => a - b),
      }
    })
  }

  function updateClass(period, value) {
    setForm((current) => {
      const timetable = { ...current.timetable }

      if (value.trim()) {
        timetable[period] = value
      } else {
        delete timetable[period]
      }

      return {
        ...current,
        timetable,
        // A period with a class cannot also be a free period.
        freePeriods: value.trim()
          ? current.freePeriods.filter((item) => item !== period)
          : current.freePeriods,
      }
    })
  }

  function startEdit(teacher) {
    setEditingId(teacher.id)
    setForm({
      name: teacher.name ?? '',
      subject: teacher.subject ?? '',
      freePeriods: [...(teacher.freePeriods ?? [])].sort((a, b) => a - b),
      timetable: buildTimetable(teacher),
    })
  }

  function resetForm() {
    setEditingId(null)
    setForm(emptyForm)
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const name = form.name.trim()
    const subject = form.subject.trim()
    if (!name || !subject) {
      window.alert('Teacher ka naam aur subject bharna zaroori hai!')
      return
    }

    setBusy(true)
    try {
      const payload = {
        name,
        subject,
        freePeriods: form.freePeriods,
        timetable: form.timetable,
      }

      if (editingId) {
        await teachers.updateItem(editingId, payload)
        window.alert('Teacher details update ho gaye!')
      } else {
        await teachers.addItem(payload)
        window.alert('Teacher save ho gaya!')
      }
      resetForm()
    } catch (error) {
      window.alert(`Save nahi hua: ${error.message}`)
    } finally {
      setBusy(false)
    }
  }

  async function handleDelete(teacher) {
    if (!window.confirm(`${teacher.name} ko delete karna hai?`)) return

    setBusy(true)
    try {
      await teachers.removeItem(teacher.id)
      if (editingId === teacher.id) resetForm()
    } catch (error) {
      window.alert(`Delete nahi hua: ${error.message}`)
    } finally {
      setBusy(false)
    }
  }

  async function seedSampleTeachers() {
    setBusy(true)
    try {
      for (const teacher of SAMPLE_TEACHERS) {
        await teachers.addItem(teacher)
      }
    } catch (error) {
      window.alert(`Sample data save nahi hua: ${error.message}`)
    } finally {
      setBusy(false)
    }
  }

  const teacherList = teachers.items

  return (
    <>
      <section className="card">
        <h2 className="card-title">
          {editingId ? '✏️ Edit Teacher & Timetable' : '👩‍🏫 Add Teacher, Timetable & Free Periods'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Teacher Name</label>
              <input
                required
                placeholder="e.g. Mr. Rajesh Sharma"
                value={form.name}
                onChange={(event) => update('name', event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Subject</label>
              <input
                required
                placeholder="e.g. Mathematics"
                value={form.subject}
                onChange={(event) => update('subject', event.target.value)}
              />
            </div>

            <div className="form-group full-width">
              <label>Daily Timetable (class per period — blank ka matlab free period)</label>
              <div className="timetable-grid">
                {PERIODS.map((period) => {
                  const isFree = !form.timetable[period]
                  return (
                    <div
                      className={`timetable-slot${isFree ? ' is-free' : ''}`}
                      key={period}
                    >
                      <div className="slot-label">
                        <span>{periodLabel(period)}</span>
                        <span className="slot-status">{isFree ? 'Free' : 'Class'}</span>
                      </div>
                      <input
                        placeholder="e.g. 10-A"
                        aria-label={`Class for ${periodLabel(period)}`}
                        value={form.timetable[period] ?? ''}
                        onChange={(event) => updateClass(period, event.target.value)}
                      />
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="form-group full-width">
              <label>Free / Substitute Periods (extra free periods)</label>
              <div className="period-picker">
                {PERIODS.map((period) => (
                  <label
                    key={period}
                    className={`period-chip${form.freePeriods.includes(period) ? ' selected' : ''}`}
                  >
                    <input
                      type="checkbox"
                      checked={form.freePeriods.includes(period)}
                      onChange={() => togglePeriod(period)}
                    />
                    {periodLabel(period)}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="button-row">
            <button type="submit" className="btn-primary" disabled={busy}>
              {busy ? 'Saving…' : editingId ? 'Update Teacher' : 'Save Teacher'}
            </button>
            {editingId && (
              <button type="button" className="btn-secondary" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="card">
        <h2 className="card-title">📋 All Teachers ({teacherList.length})</h2>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Teacher</th>
                <th>Subject</th>
                <th>Daily Timetable</th>
                <th>Free Periods</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {teacherList.map((teacher) => (
                <tr key={teacher.id}>
                  <td><b>{teacher.name}</b></td>
                  <td>{teacher.subject}</td>
                  <td>
                    <div className="timetable-view">
                      {PERIODS.filter((period) => teacher.timetable?.[period]).map((period) => (
                        <span key={period}>{period === 0 ? 'P0' : `P${period}`}: {teacher.timetable[period]}</span>
                      ))}
                      {!PERIODS.some((period) => teacher.timetable?.[period]) && (
                        <span className="muted">Timetable set nahi hai</span>
                      )}
                    </div>
                  </td>
                  <td>
                    {teacher.freePeriods?.length
                      ? teacher.freePeriods.map((period) => (
                          <span className="period-tag" key={period}>{period === 0 ? 'P0' : `P${period}`}</span>
                        ))
                      : <span className="muted">No free period</span>}
                  </td>
                  <td>
                    <div className="row-actions">
                      <button type="button" className="btn-link" onClick={() => startEdit(teacher)}>Edit</button>
                      <button type="button" className="btn-link danger" onClick={() => handleDelete(teacher)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {!teachers.loading && !teacherList.length && (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center' }}>
                    Abhi koi teacher add nahi hua.{' '}
                    <button type="button" className="btn-link" onClick={seedSampleTeachers} disabled={busy}>
                      Sample teachers add karein
                    </button>
                  </td>
                </tr>
              )}
              {teachers.loading && (
                <tr><td colSpan={5} style={{ textAlign: 'center' }}>Loading from Firebase…</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="card">
        <h2 className="card-title">🗓️ Period-wise Free Teacher Availability</h2>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Period</th>
                <th>Free Teachers Available for Substitution</th>
              </tr>
            </thead>
            <tbody>
              {PERIODS.map((period) => {
                const available = teacherList.filter((teacher) =>
                  isTeacherFree(teacher, period),
                )
                return (
                  <tr key={period}>
                    <td><b>{periodLabel(period)}</b></td>
                    <td>
                      {available.length
                        ? available.map((teacher) => (
                            <span className="teacher-tag" key={teacher.id}>
                              {teacher.name} ({teacher.subject})
                            </span>
                          ))
                        : <span className="muted">Koi free teacher nahi</span>}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}
