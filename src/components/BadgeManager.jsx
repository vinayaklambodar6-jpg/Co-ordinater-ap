import { useState } from 'react'
import { BADGE_TYPES, badgeMeta } from '../utils/badges.js'

const emptyForm = {
  recipientType: 'teacher',
  teacherId: '',
  studentName: '',
  classSection: '',
  badgeType: 'star',
  note: '',
}

export default function BadgeManager({ badges, teachers, currentUser }) {
  const [form, setForm] = useState(emptyForm)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }))

  async function handleSubmit(event) {
    event.preventDefault()

    const isTeacher = form.recipientType === 'teacher'
    const teacher = teachers.items.find((item) => item.id === form.teacherId)
    const recipientName = isTeacher ? teacher?.name : form.studentName.trim()

    if (!recipientName) {
      window.alert(isTeacher ? 'Teacher select karein.' : 'Student ka naam likhein.')
      return
    }

    setBusy(true)
    setMessage('')
    try {
      await badges.addItem({
        recipientType: form.recipientType,
        recipientName,
        teacherId: isTeacher ? teacher.id : '',
        classSection: form.classSection.trim(),
        badgeType: form.badgeType,
        note: form.note.trim(),
        awardedBy: currentUser?.name || '',
      })
      setForm({ ...emptyForm, recipientType: form.recipientType })
      setMessage('✅ Badge award ho gaya.')
    } catch (error) {
      setMessage(`❌ Badge save nahi hua: ${error.message}`)
    } finally {
      setBusy(false)
    }
  }

  async function handleDelete(badge) {
    if (!window.confirm(`${badge.recipientName} ka badge hatana hai?`)) return
    try {
      await badges.removeItem(badge.id)
    } catch (error) {
      window.alert(`Delete nahi hua: ${error.message}`)
    }
  }

  return (
    <>
      <section className="card">
        <h2 className="card-title">🏅 Award Appreciation Badge</h2>
        <p className="muted" style={{ marginBottom: 14 }}>
          Teachers aur students ki performance par digital star badges assign karein. Teachers apne
          badges "My Badges" tab mein dekh sakte hain.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Recipient Type</label>
              <select
                value={form.recipientType}
                onChange={(event) => update('recipientType', event.target.value)}
              >
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>
              </select>
            </div>

            {form.recipientType === 'teacher' ? (
              <div className="form-group">
                <label>Teacher</label>
                <select
                  required
                  value={form.teacherId}
                  onChange={(event) => update('teacherId', event.target.value)}
                >
                  <option value="">-- Select teacher --</option>
                  {teachers.items.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.name} ({teacher.subject})
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <>
                <div className="form-group">
                  <label>Student Name</label>
                  <input
                    required
                    placeholder="e.g. Aarav Sharma"
                    value={form.studentName}
                    onChange={(event) => update('studentName', event.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Class & Section</label>
                  <input
                    placeholder="e.g. 9-B"
                    value={form.classSection}
                    onChange={(event) => update('classSection', event.target.value)}
                  />
                </div>
              </>
            )}

            <div className="form-group">
              <label>Badge</label>
              <select
                value={form.badgeType}
                onChange={(event) => update('badgeType', event.target.value)}
              >
                {BADGE_TYPES.map((badge) => (
                  <option key={badge.value} value={badge.value}>
                    {badge.icon} {badge.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group full-width">
              <label>Citation / Note (optional)</label>
              <input
                placeholder="e.g. Outstanding support in exam week"
                value={form.note}
                onChange={(event) => update('note', event.target.value)}
              />
            </div>
          </div>

          {message && <p className="admin-message">{message}</p>}

          <button type="submit" className="btn-primary" disabled={busy}>
            {busy ? 'Awarding…' : 'Award Badge'}
          </button>
        </form>
      </section>

      <section className="card">
        <h2 className="card-title">🏆 Awarded Badges ({badges.items.length})</h2>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Badge</th>
                <th>Recipient</th>
                <th>Class</th>
                <th>Note</th>
                <th>Awarded By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {badges.items.map((badge) => {
                const meta = badgeMeta(badge.badgeType)
                return (
                  <tr key={badge.id}>
                    <td><b>{meta.icon} {meta.label}</b></td>
                    <td>
                      {badge.recipientName}
                      <div className="muted">{badge.recipientType}</div>
                    </td>
                    <td>{badge.classSection || '-'}</td>
                    <td>{badge.note || '-'}</td>
                    <td>{badge.awardedBy || '-'}</td>
                    <td>
                      <button type="button" className="btn-link danger" onClick={() => handleDelete(badge)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              })}
              {!badges.loading && !badges.items.length && (
                <tr><td colSpan={6} style={{ textAlign: 'center' }}>Abhi koi badge award nahi hua.</td></tr>
              )}
              {badges.loading && (
                <tr><td colSpan={6} style={{ textAlign: 'center' }}>Loading…</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}
