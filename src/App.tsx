import React, { useState, useEffect } from 'react';
import { PasswordGate } from './PasswordGate';
import { SalthausPage } from './SalthausPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const checkAuth = sessionStorage.getItem('salthaus_authenticated');
    if (checkAuth === 'true') {
      setIsAuthenticated(true);
    }

    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  if (currentPath !== '/launch' && currentPath !== '/') {
    return (
      <div className="password-gate">
        <div className="password-gate-content">
          <h1 className="password-gate-title">404</h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontFamily: "'Helvetica Neue', sans-serif", letterSpacing: '0.1em', fontSize: '0.875rem' }}>PAGE NOT FOUND</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <PasswordGate onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  return <SalthausPage />;
}

export default App;
