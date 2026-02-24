import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LandingPage from '../components/LandingPage';
import Toast from '../components/Toast';
import { useKeycloak } from '@react-keycloak/web';

export default function HomePage() {
  const navigate = useNavigate();
  const [toast, setToast] = useState<{ visible: boolean; message: string; type: 'success' | 'error' | 'info' }>({
    visible: false,
    message: '',
    type: 'success'
  });

  const { keycloak, initialized } = useKeycloak();

  useEffect(() => {
    if (initialized) {
      if (keycloak.authenticated) {
        setToast({
          visible: true,
          message: 'Login successful!',
          type: 'success'
        });
        
        // Redirect to dashboard after showing toast
        const timer = setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
        
        return () => clearTimeout(timer);
      }
    }
  }, [initialized, keycloak.authenticated, navigate]);

  const handleLogin = () => {
    keycloak.login({
      redirectUri: window.location.origin + '/dashboard',
    });
  };

  const handleSignup = () => {
    keycloak.register({
      redirectUri: window.location.origin + '/',
    });
  };

  const handleToastClose = () => {
    setToast({ ...toast, visible: false });
  };

  if (!initialized) {
    return <div className="app">Initializing authentication...</div>;
  }

  // If authenticated, show a loading state while redirecting
  if (keycloak.authenticated) {
    return (
      <div className="app">
        <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '2rem' }}>
          <div style={{ textAlign: 'center' }}>
            <h1>Redirecting to dashboard...</h1>
          </div>
        </div>
        <Toast
          visible={toast.visible}
          message={toast.message}
          type={toast.type}
          onClose={handleToastClose}
        />
      </div>
    );
  }

  return (
    <div className="app">
      <LandingPage onLogin={handleLogin} onSignup={handleSignup} />
      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onClose={handleToastClose}
      />
    </div>
  );
}