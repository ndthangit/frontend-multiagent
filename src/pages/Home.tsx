import { useEffect, useState } from 'react';
import LandingPage from '../components/LandingPage';
import Toast from '../components/Toast';
import { useKeycloak } from '@react-keycloak/web';

export default function HomePage() {
  const [toast, setToast] = useState<{ visible: boolean; message: string; type: 'success' | 'error' | 'info' }>({
    visible: false,
    message: '',
    type: 'success'
  });

  const { keycloak, initialized } = useKeycloak();

  useEffect(() => {
    if (initialized && keycloak.authenticated) {
      setToast({
        visible: true,
        message: 'Login successful!',
        type: 'success'
      });
    }
  }, [initialized, keycloak.authenticated]);

  const handleLogin = () => {
    keycloak.login({
      redirectUri: window.location.origin + window.location.pathname,
    });
  };

  const handleSignup = () => {
    keycloak.register({
      redirectUri: window.location.origin + window.location.pathname,
    });
  };

  const handleLogout = () => {
    keycloak.logout({
      redirectUri: window.location.origin,
    });
  };

  const handleToastClose = () => {
    setToast({ ...toast, visible: false });
  };

  if (!initialized) {
    return <div className="app">Initializing authentication...</div>;
  }

  return (
    <div className="app">
      {keycloak.authenticated ? (
        <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '2rem' }}>
          <div style={{ textAlign: 'center' }}>
            <h1>Hello, {keycloak.tokenParsed?.preferred_username ?? 'user'}!</h1>
            <p>You have successfully logged in with Keycloak.</p>
            <button className="btn-nav-login" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      ) : (
        <LandingPage onLogin={handleLogin} onSignup={handleSignup} />
      )}
      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onClose={handleToastClose}
      />
    </div>
  );
}