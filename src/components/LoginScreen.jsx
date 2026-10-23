import { useState } from 'react'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '../firebase.js'
import {
  authErrorMessage,
  registerUser,
  sendResetEmail,
  signInWithEmail,
  signInWithGoogle,
} from '../auth.js'

const emptyRegister = {
  name: '',
  email: '',
  phone: '',
  requestedRole: 'teacher',
  password: '',
}

export default function LoginScreen() {
  const [mode, setMode] = useState('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [register, setRegister] = useState(emptyRegister)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  const isRegister = mode === 'register'

  function switchMode(nextMode) {
    setMode(nextMode)
    setError('')
    setNotice('')
  }

  async function run(action) {
    setBusy(true)
    setError('')
    setNotice('')
    try {
      await action()
    } catch (authError) {
      setError(authErrorMessage(authError))
    } finally {
      setBusy(false)
    }
  }

  function handleSignIn(event) {
    event.preventDefault()
    run(() => signInWithEmail(email.trim(), password))
  }

  function handleRegister(event) {
    event.preventDefault()

    const name = register.name.trim()
    const userEmail = register.email.trim().toLowerCase()
    const phone = register.phone.trim()

    if (!name || !userEmail || !phone || register.password.length < 6) {
      setError('Naam, email, contact number aur kam se kam 6 characters ka password bharein.')
      return
    }

    run(async () => {
      const credential = await registerUser({ name, email: userEmail, password: register.password })
      const uid = credential.user.uid

      await setDoc(
        doc(db, 'users', uid),
        {
          name,
          email: userEmail,
          phone,
          role: 'pending',
          status: 'pending',
          requestedRole: register.requestedRole,
          createdAt: serverTimestamp(),
        },
        { merge: true },
      )

      await setDoc(doc(db, 'accessLogs', `${uid}-signup-${Date.now()}`), {
        uid,
        name,
        email: userEmail,
        phone,
        role: 'pending',
        requestedRole: register.requestedRole,
        action: 'signup',
        userAgent: navigator.userAgent.slice(0, 180),
        createdAt: serverTimestamp(),
      })

      setRegister(emptyRegister)
      setNotice('Registration complete. Admin approval ke baad portal khulega.')
    })
  }

  async function handleForgotPassword() {
    setError('')
    setNotice('')
    const target = email.trim()
    if (!target) {
      setError('Pehle apna email likhein, phir reset link bhejein.')
      return
    }
    setBusy(true)
    try {
      await sendResetEmail(target)
      setNotice(`Password reset link ${target} par bhej diya gaya.`)
    } catch (authError) {
      setError(authErrorMessage(authError))
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="card login-card" id="login-card">
      <h2 className="card-title">🔐 Secure Portal Access</h2>
      <p className="muted" style={{ marginBottom: 16 }}>
        Portal ka data sirf approved staff ko dikhta hai. Naye users register karein — admin
        approval ke baad hi access milega.
      </p>

      <div className="auth-tabs" role="tablist" aria-label="Authentication mode">
        <button
          type="button"
          role="tab"
          aria-selected={!isRegister}
          className={`auth-tab${!isRegister ? ' active' : ''}`}
          onClick={() => switchMode('signin')}
        >
          Sign In
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={isRegister}
          className={`auth-tab${isRegister ? ' active' : ''}`}
          onClick={() => switchMode('register')}
        >
          Register
        </button>
      </div>

      {!isRegister && (
        <>
          <button
            type="button"
            className="btn-google"
            onClick={() => run(signInWithGoogle)}
            disabled={busy}
          >
            <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
              <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.5l6.7-6.7C35.6 2.4 30.2 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.8 6.1C12.3 13.3 17.6 9.5 24 9.5z" />
              <path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-2.8-.4-4.1H24v8.2h12.5c-.3 2.1-1.6 5.2-4.7 7.3l7.6 5.9c4.5-4.2 6.7-10.3 6.7-17.3z" />
              <path fill="#FBBC05" d="M10.4 28.6A14.5 14.5 0 0 1 9.6 24c0-1.6.3-3.2.8-4.6l-7.8-6.1A24 24 0 0 0 0 24c0 3.9.9 7.5 2.6 10.7l7.8-6.1z" />
              <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.6-5.9c-2 1.4-4.8 2.4-8.3 2.4-6.4 0-11.7-3.8-13.6-9.1l-7.8 6.1C6.5 42.6 14.6 48 24 48z" />
            </svg>
            {busy ? 'Please wait…' : 'Sign in with Google'}
          </button>

          <div className="login-divider"><span>or use email</span></div>

          <form onSubmit={handleSignIn}>
            <div className="form-group" style={{ marginBottom: 12 }}>
              <label>Email</label>
              <input
                required
                type="email"
                autoComplete="email"
                placeholder="coordinator@school.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className="form-group" style={{ marginBottom: 16 }}>
              <label>Password</label>
              <input
                required
                type="password"
                minLength={6}
                autoComplete="current-password"
                placeholder="Kam se kam 6 characters"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            {error && <p className="login-error">{error}</p>}
            {notice && <p className="login-notice">{notice}</p>}

            <div className="login-submit-row">
              <button type="submit" className="btn-primary" disabled={busy}>
                {busy ? 'Please wait…' : 'Sign In'}
              </button>
              <button type="button" className="btn-link" onClick={handleForgotPassword} disabled={busy}>
                Password bhool gaye?
              </button>
            </div>
          </form>
        </>
      )}

      {isRegister && (
        <form onSubmit={handleRegister}>
          <div className="form-group" style={{ marginBottom: 12 }}>
            <label>Full Name</label>
            <input
              required
              placeholder="e.g. Vinayak Lambodar"
              value={register.name}
              onChange={(event) => setRegister((current) => ({ ...current, name: event.target.value }))}
            />
          </div>

          <div className="form-group" style={{ marginBottom: 12 }}>
            <label>Email</label>
            <input
              required
              type="email"
              autoComplete="email"
              placeholder="teacher@school.com"
              value={register.email}
              onChange={(event) => setRegister((current) => ({ ...current, email: event.target.value }))}
            />
          </div>

          <div className="form-group" style={{ marginBottom: 12 }}>
            <label>Contact Number</label>
            <input
              required
              type="tel"
              placeholder="e.g. 9876543210"
              value={register.phone}
              onChange={(event) => setRegister((current) => ({ ...current, phone: event.target.value }))}
            />
          </div>

          <div className="form-group" style={{ marginBottom: 12 }}>
            <label>Role</label>
            <select
              value={register.requestedRole}
              onChange={(event) => setRegister((current) => ({ ...current, requestedRole: event.target.value }))}
            >
              <option value="teacher">Teacher</option>
              <option value="admin">Coordinator (Admin)</option>
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: 16 }}>
            <label>Password</label>
            <input
              required
              type="password"
              minLength={6}
              autoComplete="new-password"
              placeholder="Kam se kam 6 characters"
              value={register.password}
              onChange={(event) => setRegister((current) => ({ ...current, password: event.target.value }))}
            />
          </div>

          {error && <p className="login-error">{error}</p>}
          {notice && <p className="login-notice">{notice}</p>}

          <p className="muted" style={{ marginBottom: 12, fontSize: '0.78rem' }}>
            Coordinator access admin approval ke baad hi activate hoga.
          </p>

          <button type="submit" className="btn-primary" disabled={busy}>
            {busy ? 'Please wait…' : 'Register'}
          </button>
        </form>
      )}
    </section>
  )
}
