import { useState } from 'react'
import { TASK_STATUS, TASK_TYPES, taskTypeLabel } from '../utils/tasks.js'

const emptyForm = {
  title: '',
  type: 'timetable',
  classSection: '',
  dueDate: '',
  details: '',
  assignedToUid: '',
}

export default function TaskManager({ tasks, users, currentUser }) {
  const [form, setForm] = useState(emptyForm)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')

  const teacherAccounts = users.items.filter((item) => item.role === 'teacher')

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }))

  async function handleSubmit(event) {
    event.preventDefault()

    const teacher = teacherAccounts.find((item) => item.id === form.assignedToUid)
    if (!form.title.trim() || !teacher) {
      window.alert('Task ka title aur teacher select karna zaroori hai!')
      return
    }

    setBusy(true)
    setMessage('')
    try {
      await tasks.addItem({
        title: form.title.trim(),
        type: form.type,
        classSection: form.classSection.trim(),
        dueDate: form.dueDate,
        details: form.details.trim(),
        assignedToUid: teacher.id,
        assignedToName: teacher.name || teacher.email,
        assignedToEmail: teacher.email || '',
        status: 'pending',
        teacherNote: '',
        createdBy: currentUser?.name || '',
        createdByUid: currentUser?.id || '',
      })
      setForm(emptyForm)
      setMessage('✅ Task assign ho gaya.')
    } catch (error) {
      setMessage(`❌ Task save nahi hua: ${error.message}`)
    } finally {
      setBusy(false)
    }
  }

  async function handleDelete(task) {
    if (!window.confirm(`"${task.title}" delete karna hai?`)) return
    try {
      await tasks.removeItem(task.id)
    } catch (error) {
      window.alert(`Delete nahi hua: ${error.message}`)
    }
  }

  async function handleStatus(task, status) {
    try {
      await tasks.updateItem(task.id, { status })
    } catch (error) {
      window.alert(`Status update nahi hua: ${error.message}`)
    }
  }

  const openTasks = tasks.items.filter((task) => task.status !== 'completed').length

  return (
    <>
      <section className="card">
        <h2 className="card-title">🗂️ Assign Task / Duty</h2>
        <p className="muted" style={{ marginBottom: 14 }}>
          Kisi bhi registered teacher ko timetable, test paper, substitution ya koi duty assign
          karein. Teacher ko yeh task uska workspace mein dikhega.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Task Title</label>
              <input
                required
                placeholder="e.g. Class 10-A Maths test paper"
                value={form.title}
                onChange={(event) => update('title', event.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Task Type</label>
              <select value={form.type} onChange={(event) => update('type', event.target.value)}>
                {TASK_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Assign To Teacher</label>
              <select
                required
                value={form.assignedToUid}
                onChange={(event) => update('assignedToUid', event.target.value)}
              >
                <option value="">-- Select teacher --</option>
                {teacherAccounts.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.name || teacher.email} ({teacher.email})
                  </option>
                ))}
              </select>
              {!teacherAccounts.length && (
                <p className="muted" style={{ marginTop: 4 }}>
                  Pehle Admin Panel se teacher accounts banayein.
                </p>
              )}
            </div>

            <div className="form-group">
              <label>Class / Section (optional)</label>
              <input
                placeholder="e.g. 10-A"
                value={form.classSection}
                onChange={(event) => update('classSection', event.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Due Date (optional)</label>
              <input
                type="date"
                value={form.dueDate}
                onChange={(event) => update('dueDate', event.target.value)}
              />
            </div>

            <div className="form-group full-width">
              <label>Instructions / Details</label>
              <textarea
                rows={3}
                placeholder="Task ke baare mein details…"
                value={form.details}
                onChange={(event) => update('details', event.target.value)}
              />
            </div>
          </div>

          {message && <p className="admin-message">{message}</p>}

          <button type="submit" className="btn-primary" disabled={busy}>
            {busy ? 'Assigning…' : 'Assign Task'}
          </button>
        </form>
      </section>

      <section className="card">
        <h2 className="card-title">📋 Assigned Tasks ({tasks.items.length} · {openTasks} open)</h2>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Task</th>
                <th>Assigned To</th>
                <th>Class</th>
                <th>Due</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.items.map((task) => (
                <tr key={task.id}>
                  <td>
                    <b>{task.title}</b>
                    <div className="muted">{taskTypeLabel(task.type)}</div>
                  </td>
                  <td>{task.assignedToName || task.assignedToEmail || '-'}</td>
                  <td>{task.classSection || '-'}</td>
                  <td>{task.dueDate || '-'}</td>
                  <td>
                    <select
                      value={task.status || 'pending'}
                      onChange={(event) => handleStatus(task, event.target.value)}
                    >
                      {TASK_STATUS.map((status) => (
                        <option key={status.value} value={status.value}>{status.label}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button type="button" className="btn-link danger" onClick={() => handleDelete(task)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {!tasks.loading && !tasks.items.length && (
                <tr><td colSpan={6} style={{ textAlign: 'center' }}>Abhi koi task assign nahi hua.</td></tr>
              )}
              {tasks.loading && (
                <tr><td colSpan={6} style={{ textAlign: 'center' }}>Loading…</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}
