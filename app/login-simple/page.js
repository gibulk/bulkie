export default function SimpleLoginPage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f3f4f6',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '400px',
        width: '100%',
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '32px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#1a1a2e',
          marginBottom: '24px'
        }}>
          Bulkie Admin Login
        </h1>
        
        <form method="POST" action="/api/auth-login">
          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '4px'
            }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '16px'
              }}
              placeholder="admin@bulkie.com"
            />
          </div>
          
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '4px'
            }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '16px'
              }}
              placeholder="••••••••"
            />
          </div>
          
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#1a1a2e',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Login
          </button>
        </form>
        
        <p style={{
          fontSize: '12px',
          textAlign: 'center',
          color: '#6b7280',
          marginTop: '24px'
        }}>
          Akses terbatas untuk administrator
        </p>
      </div>
    </div>
  )
                }
