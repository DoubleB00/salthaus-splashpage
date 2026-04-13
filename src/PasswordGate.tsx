import React, { useState, useEffect, useRef } from 'react';

const STORAGE_KEY = 'salthaus_unlocked';
const CORRECT_PASSWORD = '666-salt';

interface PasswordGateProps {
  children: React.ReactNode;
}

function waitForKitThenClose(onDone: () => void) {
  let kitFound = false;
  let kitGoneTimer: ReturnType<typeof setTimeout> | null = null;
  let fallbackTimer: ReturnType<typeof setTimeout> | null = null;

  const FALLBACK_MS = 6000;
  const AFTER_CLOSE_DELAY = 400;

  function scheduleGate() {
    if (kitGoneTimer) return;
    kitGoneTimer = setTimeout(() => {
      cleanup();
      onDone();
    }, AFTER_CLOSE_DELAY);
  }

  function checkKitGone() {
    const modal = document.querySelector(
      '.formkit-overlay, [data-uid] .formkit-slide-in, .seva-overlay, [class*="formkit-overlay"]'
    );
    if (!modal || getComputedStyle(modal).display === 'none' || getComputedStyle(modal).visibility === 'hidden') {
      scheduleGate();
    }
  }

  const observer = new MutationObserver(() => {
    const modal = document.querySelector(
      '.formkit-overlay, [data-uid] .formkit-slide-in, .seva-overlay, [class*="formkit-overlay"]'
    );

    if (!kitFound && modal) {
      kitFound = true;
      if (fallbackTimer) {
        clearTimeout(fallbackTimer);
        fallbackTimer = null;
      }
      return;
    }

    if (kitFound) {
      checkKitGone();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'style'] });

  fallbackTimer = setTimeout(() => {
    cleanup();
    onDone();
  }, FALLBACK_MS);

  function cleanup() {
    observer.disconnect();
    if (fallbackTimer) clearTimeout(fallbackTimer);
    if (kitGoneTimer) clearTimeout(kitGoneTimer);
  }
}

export function PasswordGate({ children }: PasswordGateProps) {
  const [unlocked, setUnlocked] = useState(false);
  const [visible, setVisible] = useState(false);
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === '1') {
      setUnlocked(true);
      return;
    }

    waitForKitThenClose(() => {
      setVisible(true);
      setTimeout(() => inputRef.current?.focus(), 100);
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === CORRECT_PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, '1');
      setError(false);
      setVisible(false);
      setTimeout(() => setUnlocked(true), 600);
    } else {
      setError(true);
      setShaking(true);
      setInput('');
      setTimeout(() => setShaking(false), 500);
    }
  };

  if (unlocked) return <>{children}</>;

  return (
    <>
      {children}
      <div className={`pw-gate-overlay${visible ? ' pw-gate-overlay--visible' : ''}`}>
        <div className="pw-gate-inner">
          <div className="pw-gate-mark">&#8224;</div>
          <form
            onSubmit={handleSubmit}
            className={`pw-gate-form${shaking ? ' pw-gate-form--shake' : ''}`}
            autoComplete="off"
          >
            <input
              ref={inputRef}
              type="password"
              value={input}
              onChange={(e) => { setInput(e.target.value); setError(false); }}
              placeholder="PASSWORD"
              className={`pw-gate-input${error ? ' pw-gate-input--error' : ''}`}
              autoComplete="new-password"
              spellCheck={false}
            />
            <button type="submit" className="pw-gate-submit">ENTER</button>
          </form>
          {error && <p className="pw-gate-error">DENIED</p>}
        </div>
      </div>
    </>
  );
}
