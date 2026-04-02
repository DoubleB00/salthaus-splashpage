import React, { useState } from 'react';

interface PasswordGateProps {
  onAuthenticated: () => void;
}

const PASSWORD = 'salthaus2026';

export function PasswordGate({ onAuthenticated }: PasswordGateProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password === PASSWORD) {
      sessionStorage.setItem('salthaus_authenticated', 'true');
      onAuthenticated();
    } else {
      setError(true);
      setPassword('');
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="password-gate">
      <div className="password-gate-content">
        <h1 className="password-gate-title">THE SALTHAUS</h1>
        <form onSubmit={handleSubmit} className="password-form">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="ENTER PASSWORD"
            className="password-input"
            autoFocus
          />
          <button type="submit" className="password-submit">
            ENTER
          </button>
          {error && <p className="password-error">INCORRECT</p>}
        </form>
      </div>
    </div>
  );
}
