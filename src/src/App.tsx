import { AuthProvider, useAuth } from './AuthContext'
import AuthForm from './AuthForm'

function AppContent() {
  const { session, profile, loading, signOut } = useAuth()

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: 100 }}>Loading...</div>
  }

  if (!session) {
    return <AuthForm />
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1>Duke Marketplace</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span>Hi, {profile?.full_name || 'there'}{profile?.is_verified && ' ✅'}</span>
          <button onClick={signOut} style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid #e2e8f0', background: 'white' }}>
            Sign out
          </button>
        </div>
      </header>

      <p>Welcome! This is where listings will appear.</p>

      {profile?.is_admin && (
        <div style={{ marginTop: 24, padding: 16, background: '#fef3c7', borderRadius: 8 }}>
          <strong>Admin:</strong> You have admin access.
        </div>
      )}
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
