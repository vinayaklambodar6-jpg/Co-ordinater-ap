import { useState } from 'react'
import { deleteApp, initializeApp } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  getAuth,
  signOut as signOutSecondary,
  updateProfile,
} from 'firebase/auth'
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db, firebaseConfig } from '../firebase.js'
import { authErrorMessage, sendResetEmail } from '../auth.js'

const emptyForm = { name: '', subject: '', phone: '', email: '', password: '' }

export default function AdminPanel({ users, teachers }) {
  const [form, setForm] = useState(emptyForm)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }))

  async function handleCreate(event) {
    event.preventDefault()

    const name = form.name.trim()
    const subject = form.subject.trim()
    const phone = form.phone.trim()
    const email = form.email.trim().toLowerCase()
    const password = form.password

    if (!name || !email || password.length < 6) {
      window.alert('Naam, email aur kam se kam 6 characters ka password bharein!')
      return
    }

    setBusy(true)
    setMessage('')
    const secondaryApp = initializeApp(firebaseConfig, `teacher-creator-${Date.now()}`)
    const secondaryAuth = getAuth(secondaryApp)

    try {
      const credential = await createUserWithEmailAndPassword(secondaryAuth, email, password)
      const uid = credential.user.uid
      await updateProfile(credential.user, { displayName: name })
      await signOutSecondary(secondaryAuth)

      const teacherRef = await addDoc(collection(db, 'teachers'), {
        name,
        subject,
        phone,
        freePeriods: [],
        timetable: {},
        createdAt: serverTimestamp(),
      })

      await setDoc(doc(db, 'users', uid), {
        name,
        email,
        role: 'teacher',
        subject,
        phone,
        teacherId: teacherRef.id,
        createdAt: serverTimestamp(),
      })

      setForm(emptyForm)
      setMessage(`✅ ${name} ke liye login ban gaya. Email: ${email}`)
    } catch (error) {
      setMessage(`❌ ${authErrorMessage(error)}`)
    } finally {
      deleteApp(secondaryApp).catch(() => {})
      setBusy(false)
    }
  }

  async function handleReset(item) {
    if (!window.confirm(`${item.email} par password reset email bhejein?`)) return
    try {
      await sendResetEmail(item.email)
      window.alert('Password reset email bhej diya gaya.')
    } catch (error) {
      window.alert(authErrorMessage(error))
    }
  }

  async function handleRemoveAccess(item) {
    if (!window.confirm(`${item.name || item.email} ka portal access hatana hai?`)) return
    try {
      await users.removeItem(item.id)
      window.alert('Access hata diya gaya. (Firebase Auth account console se delete kar sakte hain.)')
    } catch (error) {
      window.alert(`Access nahi hata: ${error.message}`)
    }
  }

  return (
    <>
      <section className="card">
        <h2 className="card-title">🔐 New Teacher Login (Admin only)</h2>
        <p className="muted" style={{ marginBottom: 14 }}>
          Har teacher ke liye unique email/password banayein. Login karte hi teacher ko sirf apna
          timetable, apni substitutions aur class diary dikhegi.
        </p>

        <form onSubmit={handleCreate}>
          <div className="form-grid">
            <div className="form-group">
              <label>Teacher Name</label>
              <input
                required
                placeholder="e.g. Mrs. Sunita Verma"
                value={form.name}
                onChange={(event) => update('name', event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Subject</label>
              <input
                placeholder="e.g. Science"
                value={form.subject}
                onChange={(event) => update('subject', event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Mobile / WhatsApp</label>
              <input
                type="tel"
                placeholder="e.g. 9876543210"
                value={form.phone}
                onChange={(event) => update('phone', event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Login Email</label>
              <input
                required
                type="email"
                autoComplete="off"
                placeholder="teacher@school.com"
                value={form.email}
                onChange={(event) => update('email', event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Temporary Password</label>
              <input
                required
                type="text"
                minLength={6}
                autoComplete="off"
                placeholder="Kam se kam 6 characters"
                value={form.password}
                onChange={(event) => update('password', event.target.value)}
              />
            </div>
          </div>

          {message && <p className="admin-message">{message}</p>}

          <button type="submit" className="btn-primary" disabled={busy}>
            {busy ? 'Creating…' : 'Create Teacher Login'}
          </button>
        </form>
      </section>

      <section className="card">
        <h2 className="card-title">👥 Portal Users ({users.items.length})</h2>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Linked Teacher</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.items.map((item) => {
                const linked = teachers.items.find((teacher) => teacher.id === item.teacherId)
                return (
                  <tr key={item.id}>
                    <td><b>{item.name || '-'}</b></td>
                    <td>{item.email}</td>
                    <td>
                      <span className={`role-tag role-${item.role}`}>{item.role}</span>
                    </td>
                    <td>{linked?.name || item.subject || '-'}</td>
                    <td>
                      <div className="row-actions">
                        <button type="button" className="btn-link" onClick={() => handleReset(item)}>
                          Reset password
                        </button>
                        {item.role !== 'admin' && (
                          <button
                            type="button"
                            className="btn-link danger"
                            onClick={() => handleRemoveAccess(item)}
                          >
                            Remove access
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
              {!users.loading && !users.items.length && (
                <tr><td colSpan={5} style={{ textAlign: 'center' }}>Koi user account nahi hai.</td></tr>
              )}
              {users.loading && (
                <tr><td colSpan={5} style={{ textAlign: 'center' }}>Loading from Firebase…</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}
