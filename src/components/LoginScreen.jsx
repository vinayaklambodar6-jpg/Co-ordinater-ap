import { useState } from 'react'
import { authErrorMessage, signInWithEmail, signInWithGoogle, signUpWithEmail } from '../auth.js'

export default function LoginScreen() {
  const [mode, setMode] = useState('signin')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const isSignUp = mode === 'signup'

  async function run(action) {
    setBusy(true)
    setError('')
    try {
      await action()
    } catch (authError) {
      setError(authErrorMessage(authError))
    } finally {
      setBusy(false)
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (isSignUp) {
      run(() => signUpWithEmail(name.trim(), email.trim(), password))
    } else {
      run(() => signInWithEmail(email.trim(), password))
    }
  }

  function switchMode(nextMode) {
    setMode(nextMode)
    setError('')
  }

  return (
    <section className="card login-card" id="login-card">
      <h2 className="card-title">🔐 Coordinator Login</h2>
      <p className="muted" style={{ marginBottom: 16 }}>
        Portal ka data sirf signed-in staff ko dikhta hai. Google se ya email/password se sign in
        karein.
      </p>

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

      <form onSubmit={handleSubmit}>
        {isSignUp && (
          <div className="form-group" style={{ marginBottom: 12 }}>
            <label>Full Name</label>
            <input
              required
              placeholder="e.g. Vinayak Lambodar"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
        )}

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
            autoComplete={isSignUp ? 'new-password' : 'current-password'}
            placeholder="Kam se kam 6 characters"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        {error && <p className="login-error">{error}</p>}

        <button type="submit" className="btn-primary" disabled={busy}>
          {busy ? 'Please wait…' : isSignUp ? 'Create Account' : 'Sign In'}
        </button>
      </form>

      <p className="login-switch">
        {isSignUp ? 'Pehle se account hai?' : 'Naya account banana hai?'}{' '}
        <button
          type="button"
          className="btn-link"
          onClick={() => switchMode(isSignUp ? 'signin' : 'signup')}
        >
          {isSignUp ? 'Sign in karein' : 'Account banayein'}
        </button>
      </p>
    </section>
  )
}
