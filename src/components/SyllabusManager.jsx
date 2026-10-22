import { useState } from 'react'
import { QUESTION_BANK } from '../data/questionBank.js'

const bankClasses = Object.keys(QUESTION_BANK)

const emptyForm = { className: 'Class 10', subject: '', chapters: '' }

export default function SyllabusManager({ syllabus }) {
  const [form, setForm] = useState(emptyForm)
  const [busy, setBusy] = useState(false)
  const [filter, setFilter] = useState('')

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }))

  const knownClasses = [
    ...new Set([...bankClasses, ...syllabus.items.map((item) => item.className)]),
  ].filter(Boolean)

  async function handleSubmit(event) {
    event.preventDefault()

    const className = form.className.trim()
    const subject = form.subject.trim()
    const chapters = form.chapters
      .split(/[\n,]+|\\n/)
      .map((chapter) => chapter.trim())
      .filter(Boolean)

    if (!className || !subject || !chapters.length) {
      window.alert('Class, subject aur kam se kam ek chapter bharna zaroori hai!')
      return
    }

    setBusy(true)
    try {
      for (const chapter of chapters) {
        await syllabus.addItem({ className, subject, chapter })
      }
      setForm({ className, subject: '', chapters: '' })
      window.alert(`${chapters.length} chapter${chapters.length > 1 ? 's' : ''} syllabus mein add ho gaye!`)
    } catch (error) {
      window.alert(`Save nahi hua: ${error.message}`)
    } finally {
      setBusy(false)
    }
  }

  async function handleDelete(item) {
    if (!window.confirm(`"${item.chapter}" ko syllabus se hatana hai?`)) return
    setBusy(true)
    try {
      await syllabus.removeItem(item.id)
    } catch (error) {
      window.alert(`Delete nahi hua: ${error.message}`)
    } finally {
      setBusy(false)
    }
  }

  const search = filter.trim().toLowerCase()
  const visibleItems = syllabus.items.filter((item) => {
    if (!search) return true
    return `${item.className} ${item.subject} ${item.chapter}`.toLowerCase().includes(search)
  })

  return (
    <>
      <section className="card">
        <h2 className="card-title">📚 Subject &amp; Chapter Database</h2>
        <p className="muted" style={{ marginBottom: 14 }}>
          Yahan jo subjects aur chapters add karenge, woh Auto Test Paper ke dropdowns mein turant
          dikhenge. Koi limit nahi hai.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Class</label>
              <input
                required
                list="syllabus-classes"
                placeholder="e.g. Class 11"
                value={form.className}
                onChange={(event) => update('className', event.target.value)}
              />
              <datalist id="syllabus-classes">
                {knownClasses.map((item) => (
                  <option key={item} value={item} />
                ))}
              </datalist>
            </div>

            <div className="form-group">
              <label>Subject</label>
              <input
                required
                placeholder="e.g. Physics"
                value={form.subject}
                onChange={(event) => update('subject', event.target.value)}
              />
            </div>

            <div className="form-group full-width">
              <label>Chapters (ek line/comma mein ek chapter)</label>
              <textarea
                required
                rows={4}
                placeholder={'Chapter 1 Motion\nChapter 2 Force and Laws of Motion\nChapter 3 Gravitation'}
                value={form.chapters}
                onChange={(event) => update('chapters', event.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="btn-primary" disabled={busy}>
            {busy ? 'Saving…' : 'Add Chapters'}
          </button>
        </form>
      </section>

      <section className="card">
        <h2 className="card-title">🗂️ Saved Syllabus ({syllabus.items.length})</h2>

        <div className="form-group" style={{ marginBottom: 12 }}>
          <label>Search</label>
          <input
            placeholder="Class, subject ya chapter search karein…"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
          />
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Class</th>
                <th>Subject</th>
                <th>Chapter</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {visibleItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.className}</td>
                  <td>{item.subject}</td>
                  <td><b>{item.chapter}</b></td>
                  <td>
                    <button
                      type="button"
                      className="btn-link danger"
                      onClick={() => handleDelete(item)}
                      disabled={busy}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {!syllabus.loading && !visibleItems.length && (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center' }}>
                    {search ? 'Is search se koi chapter nahi mila.' : 'Abhi koi chapter add nahi hua.'}
                  </td>
                </tr>
              )}
              {syllabus.loading && (
                <tr><td colSpan={4} style={{ textAlign: 'center' }}>Loading from Firebase…</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}
