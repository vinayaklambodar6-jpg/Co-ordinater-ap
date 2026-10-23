import { useState } from 'react'
import { TASK_STATUS, taskStatusLabel, taskTypeLabel } from '../utils/tasks.js'
import VoiceTextarea from './VoiceTextarea.jsx'

function TaskCard({ task, onSave }) {
  const [status, setStatus] = useState(task.status || 'pending')
  const [note, setNote] = useState(task.teacherNote || '')
  const [busy, setBusy] = useState(false)
  const [saved, setSaved] = useState(false)

  async function handleSave() {
    setBusy(true)
    setSaved(false)
    try {
      await onSave(task.id, { status, teacherNote: note.trim() })
      setSaved(true)
      window.setTimeout(() => setSaved(false), 2000)
    } finally {
      setBusy(false)
    }
  }

  return (
    <article className={`task-card status-${status}`}>
      <div className="task-card-head">
        <div>
          <h3>{task.title}</h3>
          <p className="muted">{taskTypeLabel(task.type)}</p>
        </div>
        <span className={`task-status status-${status}`}>{taskStatusLabel(status)}</span>
      </div>

      <div className="task-meta">
        {task.classSection && <span>🏫 {task.classSection}</span>}
        {task.dueDate && <span>📅 Due {task.dueDate}</span>}
        {task.createdBy && <span>👤 Assigned by {task.createdBy}</span>}
      </div>

      {task.details && <p className="task-details">{task.details}</p>}

      <div className="task-actions">
        <div className="form-group">
          <label>Status</label>
          <select value={status} onChange={(event) => setStatus(event.target.value)}>
            {TASK_STATUS.map((item) => (
              <option key={item.value} value={item.value}>{item.label}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Work Note / Update</label>
          <VoiceTextarea
            rows={2}
            hint="Bolkar note likhein"
            placeholder="Kya kaam kiya, likh kar save karein…"
            value={note}
            onChange={setNote}
          />
        </div>
      </div>

      <div className="button-row">
        <button type="button" className="btn-primary" onClick={handleSave} disabled={busy}>
          {busy ? 'Saving…' : 'Save Update'}
        </button>
        {saved && <span className="task-saved">✅ Saved</span>}
      </div>
    </article>
  )
}

export default function TeacherTasks({ tasks, profile }) {
  async function handleSave(id, data) {
    try {
      await tasks.updateItem(id, data)
    } catch (error) {
      window.alert(`Update nahi hua: ${error.message}`)
    }
  }

  const open = tasks.items.filter((task) => task.status !== 'completed').length

  return (
    <section className="card">
      <h2 className="card-title">🗂️ My Tasks &amp; Duties ({open} open)</h2>
      <p className="muted" style={{ marginBottom: 14 }}>
        {profile?.name ? `${profile.name}, ` : ''}aapko assign kiye gaye tasks yahan hain. Status aur
        work note update karke save karein — admin ko activity log mein record dikhega.
      </p>

      {!tasks.loading && !tasks.items.length && (
        <p className="muted">Abhi aapko koi task assign nahi hua.</p>
      )}
      {tasks.loading && <p className="muted">Loading tasks…</p>}

      <div className="task-grid">
        {tasks.items.map((task) => (
          <TaskCard key={task.id} task={task} onSave={handleSave} />
        ))}
      </div>
    </section>
  )
}
