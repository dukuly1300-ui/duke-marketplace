import { useState } from 'react'
import { useAuth } from './AuthContext'

export default function AuthForm() {
  const { signUp, signIn } = useAuth()
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setMessage(null)
    setLoading(true)

    try {
      if (mode === 'signup') {
        const result = await signUp(email, password, fullName)
        if (result.error) {
          setError(result.error)
        } else if (result.needsVerification) {
          setMessage('Please check your email to confirm your account before signing in.')
        } else {
          setMessage('Account created successfully!')
        }
      } else {
        const result = await signIn(email, password)
        if (result.error) {
          setError(result.error)
        }
      }
    } catch (err) {
      console.error('Auth error:', err)
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '60px auto', padding: 24, background: 'white', borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
      <h1 style={{ textAlign: 'center', marginBottom: 8 }}>Duke Marketplace</h1>
      <p style={{ textAlign: 'center', color: '#64748b', marginBottom: 24 }}>Buy & sell in your community</p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {mode === 'signup' && (
          <div>
            <label style={{ fontSize: 13, fontWeight: 600 }}>Full name</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #e2e8f0', marginTop: 4 }}
            />
          </div>
        )}

        <div>
          <label style={{ fontSize: 13, fontWeight: 600 }}>Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #e2e8f0', marginTop: 4 }}
          />
        </div>

        <div>
          <label style={{ fontSize: 13, fontWeight: 600 }}>Password</label>
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #e2e8f0', marginTop: 4 }}
          />
        </div>

        {error && <p style={{ color: '#dc2626', fontSize: 14 }}>{error}</p>}
        {message && <p style={{ color: '#16a34a', fontSize: 14 }}>{message}</p>}

        <button
          type="submit"
          disabled={loading}
          style={{ background: '#1e3a8a', color: 'white', padding: 12, borderRadius: 8, border: 'none', fontWeight: 600, marginTop: 8 }}
        >
          {loading ? 'Please wait...' : mode === 'signup' ? 'Create account' : 'Sign in'}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: 16, fontSize: 14 }}>
        {mode === 'signin' ? (
          <>Don't have an account? <button onClick={() => { setMode('signup'); setError(null); setMessage(null) }} style={{ background: 'none', border: 'none', color: '#1e3a8a', fontWeight: 600, cursor: 'pointer' }}>Sign up</button></>
        ) : (
          <>Already have an account? <button onClick={() => { setMode('signin'); setError(null); setMessage(null) }} style={{ background: 'none', border: 'none', color: '#1e3a8a', fontWeight: 600, cursor: 'pointer' }}>Sign in</button></>
        )}
      </p>
    </div>
  )
}
