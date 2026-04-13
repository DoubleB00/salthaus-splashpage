import React, { useState, useEffect, useRef } from 'react';

const STORAGE_KEY = 'salthaus_unlocked';
const CORRECT_PASSWORD = '666-salt';
const KIT_SRC = 'https://cult-of-salthaus.kit.com/0e73c8f29c/index.js';
const KIT_UID = '0e73c8f29c';
const KIT_SELECTORS = '.formkit-overlay, .seva-overlay, [class*="formkit-overlay"], .formkit-slide-in';

interface PasswordGateProps {
  children: React.ReactNode;
}

function injectKit(): Promise<void> {
  return new Promise((resolve) => {
    if (document.querySelector(`script[data-uid="${KIT_UID}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = KIT_SRC;
    script.async = true;
    script.setAttribute('data-uid', KIT_UID);
    script.onload = () => resolve();
    script.onerror = () => resolve();
    document.body.appendChild(script);
  });
}

function isKitVisible(): boolean {
  const el = document.querySelector(KIT_SELECTORS);
  if (!el) return false;
  const style = getComputedStyle(el);
  return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
}

function waitForKitSequence(onReady: () => void) {
  let kitSeen = false;
  let gateTimer: ReturnType<typeof setTimeout> | null = null;
  let hardFallback: ReturnType<typeof setTimeout> | null = null;

  function showGate() {
    if (gateTimer) return;
    gateTimer = setTimeout(() => {
      cleanup();
      onReady();
    }, 350);
  }

  function cancelGate() {
    if (gateTimer) {
      clearTimeout(gateTimer);
      gateTimer = null;
    }
  }

  const observer = new MutationObserver(() => {
    if (isKitVisible()) {
      if (!kitSeen) {
        kitSeen = true;
        if (hardFallback) {
          clearTimeout(hardFallback);
          hardFallback = null;
        }
      }
      cancelGate();
    } else if (kitSeen) {
      showGate();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class', 'style'],
  });

  hardFallback = setTimeout(() => {
    cleanup();
    onReady();
  }, 8000);

  function cleanup() {
    observer.disconnect();
    if (hardFallback) clearTimeout(hardFallback);
    if (gateTimer) clearTimeout(gateTimer);
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

    waitForKitSequence(() => {
      setVisible(true);
      setTimeout(() => inputRef.current?.focus(), 100);
    });

    injectKit();
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
