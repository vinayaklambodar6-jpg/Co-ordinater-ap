import { useMemo, useState } from 'react'
import {
  buildNoticeMessage,
  buildSubstitutionMessage,
  copyText,
  normalizePhone,
  periodText,
  smsLink,
  whatsappLink,
} from '../utils/notify.js'

const TEMPLATES = [
  { id: 'substitution', label: '🔔 Substitution Alert' },
  { id: 'notice', label: '📢 School Notice / Update' },
  { id: 'custom', label: '✍️ Free Message' },
]

const emptyNotice = {
  title: '',
  body: '',
}

export default function NotificationPanel({ teachers, substitutions }) {
  const [template, setTemplate] = useState('substitution')
  const [substitutionId, setSubstitutionId] = useState('')
  const [notice, setNotice] = useState(emptyNotice)
  const [customMessage, setCustomMessage] = useState('')
  const [selectedIds, setSelectedIds] = useState([])
  const [customNumbers, setCustomNumbers] = useState('')
  const [copied, setCopied] = useState(false)

  const withPhone = teachers.items.filter((teacher) => normalizePhone(teacher.phone))

  const selectedSubstitution =
    substitutions.items.find((item) => item.id === substitutionId) ||
    substitutions.items[0] ||
    null

  const message = useMemo(() => {
    if (template === 'substitution') {
      if (!selectedSubstitution) return 'Abhi koi substitution record nahi hai.'
      return buildSubstitutionMessage(selectedSubstitution)
    }
    if (template === 'notice') {
      return buildNoticeMessage(notice.title || 'School Update', notice.body)
    }
    return customMessage
  }, [template, selectedSubstitution, notice, customMessage])

  const recipients = useMemo(() => {
    const chosen = withPhone.filter(
      (teacher) => !selectedIds.length || selectedIds.includes(teacher.id),
    )
    const custom = customNumbers
      .split(/[\s,;]+/)
      .map((number) => normalizePhone(number))
      .filter((number) => number.length >= 10)
      .map((number, index) => ({
        id: `custom-${number}-${index}`,
        name: `Custom number ${index + 1}`,
        phone: number,
        custom: true,
      }))
    return [...chosen, ...custom]
  }, [withPhone, selectedIds, customNumbers])

  function toggleTeacher(id) {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
  }

  function selectAll() {
    setSelectedIds(withPhone.map((teacher) => teacher.id))
  }

  function selectSubstitutionStaff() {
    if (!selectedSubstitution) return
    const names = [selectedSubstitution.substitute, selectedSubstitution.absentTeacher]
    const ids = withPhone
      .filter((teacher) => names.includes(teacher.name))
      .map((teacher) => teacher.id)
    setSelectedIds(ids)
  }

  async function handleCopy() {
    await copyText(message)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <>
      <section className="card">
        <h2 className="card-title">🔔 Quick Message Panel (WhatsApp / SMS)</h2>
        <p className="muted" style={{ marginBottom: 14 }}>
          Message tayyar karein, recipients chunein aur WhatsApp/SMS par bhejein. Automatic
          background sending ke liye gateway credentials chahiye — abhi click-to-chat integration
          hai, isliye bhejne ke liye ek tap karna hoga.
        </p>

        <div className="form-grid">
          <div className="form-group">
            <label>Message Type</label>
            <select value={template} onChange={(event) => setTemplate(event.target.value)}>
              {TEMPLATES.map((item) => (
                <option key={item.id} value={item.id}>{item.label}</option>
              ))}
            </select>
          </div>

          {template === 'substitution' && (
            <div className="form-group">
              <label>Substitution Record</label>
              <select
                value={selectedSubstitution?.id ?? ''}
                onChange={(event) => setSubstitutionId(event.target.value)}
              >
                {substitutions.items.map((item) => (
                  <option key={item.id} value={item.id}>
                    {periodText(item.period)} · {item.classSection} · {item.substitute}
                  </option>
                ))}
                {!substitutions.items.length && <option value="">No substitution yet</option>}
              </select>
            </div>
          )}

          {template === 'notice' && (
            <>
              <div className="form-group">
                <label>Notice Title</label>
                <input
                  placeholder="e.g. PTM / Holiday / Exam schedule"
                  value={notice.title}
                  onChange={(event) => setNotice((current) => ({ ...current, title: event.target.value }))}
                />
              </div>
              <div className="form-group full-width">
                <label>Notice Details</label>
                <textarea
                  rows={3}
                  placeholder="Notice ka poora text…"
                  value={notice.body}
                  onChange={(event) => setNotice((current) => ({ ...current, body: event.target.value }))}
                />
              </div>
            </>
          )}

          {template === 'custom' && (
            <div className="form-group full-width">
              <label>Message</label>
              <textarea
                rows={3}
                placeholder="Apna message likhein…"
                value={customMessage}
                onChange={(event) => setCustomMessage(event.target.value)}
              />
            </div>
          )}
        </div>

        <div className="form-group" style={{ marginBottom: 12 }}>
          <label>Message Preview (editable)</label>
          <div className="message-preview">{message}</div>
        </div>

        <div className="button-row" style={{ marginBottom: 18 }}>
          <button type="button" className="btn-secondary" onClick={handleCopy}>
            {copied ? '✅ Copied' : '📋 Copy Message'}
          </button>
          {template === 'substitution' && (
            <button type="button" className="btn-secondary" onClick={selectSubstitutionStaff}>
              👥 Select Substitution Staff
            </button>
          )}
        </div>
      </section>

      <section className="card">
        <h2 className="card-title">👥 Recipients</h2>

        <div className="form-grid">
          <div className="form-group full-width">
            <label>Custom Numbers (optional, comma separated)</label>
            <input
              placeholder="e.g. 9876543210, 9123456780"
              value={customNumbers}
              onChange={(event) => setCustomNumbers(event.target.value)}
            />
          </div>
        </div>

        <div className="button-row" style={{ marginBottom: 12 }}>
          <button type="button" className="btn-secondary" onClick={selectAll} disabled={!withPhone.length}>
            Select all teachers ({withPhone.length})
          </button>
          <button type="button" className="btn-secondary" onClick={() => setSelectedIds([])}>
            Clear selection
          </button>
        </div>

        {!withPhone.length && (
          <div className="info-banner">
            Kisi teacher ka mobile number saved nahi hai. Teachers & Timetable tab se number add
            karein, ya upar custom numbers likhein.
          </div>
        )}

        {!!withPhone.length && (
          <div className="recipient-list">
            {withPhone.map((teacher) => (
              <label className={`recipient-chip${selectedIds.includes(teacher.id) ? ' selected' : ''}`} key={teacher.id}>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(teacher.id)}
                  onChange={() => toggleTeacher(teacher.id)}
                />
                <span>{teacher.name}</span>
                <span className="muted">{teacher.phone}</span>
              </label>
            ))}
          </div>
        )}

        <div className="table-wrapper" style={{ marginTop: 16 }}>
          <table>
            <thead>
              <tr>
                <th>Recipient</th>
                <th>Number</th>
                <th>Send</th>
              </tr>
            </thead>
            <tbody>
              {recipients.map((recipient) => (
                <tr key={recipient.id}>
                  <td><b>{recipient.name}</b></td>
                  <td>{recipient.phone}</td>
                  <td>
                    <div className="row-actions">
                      <a
                        className="btn-link"
                        href={whatsappLink(recipient.phone, message)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        WhatsApp
                      </a>
                      <a className="btn-link" href={smsLink(recipient.phone, message)}>
                        SMS
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
              {!recipients.length && (
                <tr>
                  <td colSpan={3} style={{ textAlign: 'center' }}>
                    Recipients select karein ya custom numbers add karein.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}
