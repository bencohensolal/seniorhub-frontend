import { useState, useEffect } from 'react';
import type { AuthenticatedUser } from '@/types/auth.types';
import { useGoogleAuth } from '@/hooks/useGoogleAuth';
import { AuthStorage } from '@/services/auth.storage';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<AuthenticatedUser | null>(null);

  const { user, accessToken, isAuthenticating, errorMessage, signInWithGoogle, signOut } = useGoogleAuth();

  // Load persisted authentication data on startup
  useEffect(() => {
    const loadPersistedData = async () => {
      try {
        const authData = await AuthStorage.loadAuthData();
        if (authData) {
          setCurrentUser(authData.user);
          setAuthenticated(true);
          console.log('[App] Restored authentication from storage');
        }
      } catch (error) {
        console.error('[App] Failed to load persisted auth data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPersistedData();
  }, []);

  // Save authentication data when user logs in
  useEffect(() => {
    if (user && accessToken) {
      AuthStorage.saveAuthData(user, accessToken)
        .then(() => {
          setCurrentUser(user);
          setAuthenticated(true);
          console.log('[App] User authenticated successfully');
        })
        .catch((error) => {
          console.error('[App] Failed to save auth data:', error);
        });
    }
  }, [user, accessToken]);

  const handleLogout = async () => {
    try {
      await AuthStorage.clearAuthData();
      signOut();
      setCurrentUser(null);
      setAuthenticated(false);
      console.log('[App] User logged out');
    } catch (error) {
      console.error('[App] Failed to logout:', error);
    }
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: '#F9FAFB',
        }}
      >
        <div
          style={{
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              border: '4px solid #E5E7EB',
              borderTopColor: '#4F46E5',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 16px',
            }}
          />
          <h1
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#111827',
              marginBottom: '8px',
            }}
          >
            SeniorHub
          </h1>
          <p style={{ color: '#6B7280' }}>Loading...</p>
        </div>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: '#F9FAFB',
          padding: '24px',
        }}
      >
        <div
          style={{
            maxWidth: '400px',
            width: '100%',
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            padding: '32px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
          }}
        >
          <h1
            style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#111827',
              marginBottom: '8px',
            }}
          >
            Welcome to SeniorHub
          </h1>
          <p style={{ color: '#6B7280', marginBottom: '32px' }}>
            Making daily life easier for seniors and their caregivers
          </p>

          <button
            onClick={signInWithGoogle}
            disabled={isAuthenticating}
            style={{
              width: '100%',
              padding: '12px 24px',
              backgroundColor: isAuthenticating ? '#9CA3AF' : '#4F46E5',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: isAuthenticating ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s',
            }}
            onMouseOver={(e) => !isAuthenticating && (e.currentTarget.style.backgroundColor = '#4338CA')}
            onMouseOut={(e) => !isAuthenticating && (e.currentTarget.style.backgroundColor = '#4F46E5')}
          >
            {isAuthenticating ? 'Signing in...' : 'Sign In with Google'}
          </button>

          {errorMessage && (
            <p style={{ marginTop: '16px', fontSize: '14px', color: '#DC2626' }}>
              {errorMessage}
            </p>
          )}

          <p style={{ marginTop: '24px', fontSize: '14px', color: '#9CA3AF' }}>
            Secure authentication with Google OAuth 2.0
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F9FAFB' }}>
      <header
        style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E5E7EB',
          padding: '16px 24px',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>
            SeniorHub
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ color: '#6B7280' }}>
              {currentUser?.firstName} {currentUser?.lastName}
            </span>
            <button
              onClick={handleLogout}
              style={{
                padding: '8px 16px',
                backgroundColor: '#FFFFFF',
                color: '#111827',
                border: '1px solid #E5E7EB',
                borderRadius: '6px',
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 24px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px' }}>
          Welcome back, {currentUser?.firstName}!
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '24px',
          }}
        >
          {[
            { title: 'Medications', description: 'Manage your medication schedule', icon: '💊' },
            { title: 'Appointments', description: 'Upcoming doctor visits', icon: '📅' },
            { title: 'Household', description: 'Manage your household', icon: '🏠' },
            { title: 'Settings', description: 'App preferences', icon: '⚙️' },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>{item.icon}</div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
                {item.title}
              </h3>
              <p style={{ color: '#6B7280', fontSize: '14px' }}>{item.description}</p>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: '48px',
            backgroundColor: '#EEF2FF',
            borderRadius: '12px',
            padding: '24px',
            textAlign: 'center',
          }}
        >
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: '#4338CA' }}>
            🚧 Application in Development
          </h3>
          <p style={{ color: '#6B7280', marginBottom: '16px' }}>
            This is a basic version of the SeniorHub frontend. Full features are being implemented.
          </p>
          <p style={{ fontSize: '14px', color: '#9CA3AF' }}>
            Next steps: Install dependencies with <code style={{ backgroundColor: '#FFFFFF', padding: '2px 6px', borderRadius: '4px' }}>npm install</code> and run <code style={{ backgroundColor: '#FFFFFF', padding: '2px 6px', borderRadius: '4px' }}>npm run dev</code>
          </p>
        </div>
      </main>
    </div>
  );
}
