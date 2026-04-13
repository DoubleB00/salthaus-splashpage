import React from 'react';
import { SalthausPage } from './SalthausPage';
import { PasswordGate } from './PasswordGate';

function App() {
  React.useEffect(() => {
    const existing = document.querySelector('script[data-uid="0e73c8f29c"]');
    if (existing) return;

    const script = document.createElement('script');
    script.src = 'https://cult-of-salthaus.kit.com/0e73c8f29c/index.js';
    script.async = true;
    script.setAttribute('data-uid', '0e73c8f29c');
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <PasswordGate>
      <SalthausPage />
    </PasswordGate>
  );
}

export default App;
