import React, { useState } from 'react';

const offerings = [
  {
    hymn: 'HYMN000 PALE GREEN, SEPTEMBER',
    description: 'Refined Salt, Green Apple, White Pepper (Early Subscriber Exclusive)'
  },
  {
    hymn: 'HYMN001 STILL',
    description: 'Icelandic White Flake Salt'
  },
  {
    hymn: 'HYMN002 KVLT LEADR',
    description: 'Smoked Hickory Sea Salt, Juniper Berry'
  },
  {
    hymn: 'HYMN003 BRINE HOUSE',
    description: 'Salt, Dried Garlic, Dill Weed, Brine, Vinegar Powder, Coriander'
  },
  {
    hymn: 'HYMN004 SALTS IN THE THRONE ROOM',
    description: 'Grey Sea Salt, Crushed Bay Leaf'
  },
  {
    hymn: 'HYMN005 ANGELS DESERVE TO DIE!',
    description: 'Hawaiian Black Lava Salt, Scorpion Pepper'
  },
  {
    hymn: 'HYMN006 SUKEBAN SWITCHBLADE',
    description: 'Yaki-Shio Sea Salt, Yuzu, Black Sesame'
  },
  {
    hymn: 'HYMN007 MURDER BALLAD',
    description: 'Sea Salt, Hibiscus, Black Garlic'
  },
  {
    hymn: 'HYMN008 ANHEDÖNIA',
    description: 'Grey Sea Salt, Black Currant, Activated Charcoal'
  }
];

const baseItems = [
  { name: 'BASE001 TOCINA', sub: 'SMOKED BACON SALT' },
  { name: 'BASE002 ROMERA', sub: 'SPANISH ROSEMARY SALT' },
  { name: 'BASE003 CURRY', sub: 'HOT CURRY SALT' },
];

export function SalthausPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  React.useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cult-of-salthaus.kit.com/0e73c8f29c/index.js';
    script.async = true;
    script.setAttribute('data-uid', '0e73c8f29c');

    const formContainer = document.getElementById('kit-form-container');
    if (formContainer) {
      formContainer.appendChild(script);
    }

    return () => {
      if (formContainer && formContainer.contains(script)) {
        formContainer.removeChild(script);
      }
    };
  }, []);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      setMessage('DEVOTED');
      setEmail('');
    } catch (err) {
      setMessage('TRY AGAIN');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="salthaus-container">
      <div className="background-image" />

      <div className="content-wrapper">
        <aside className="left-column">
          <div className="left-top-group">
            <div className="logo-section">
              <img src="/bFryarGc.webp" alt="The Salthaus" className="logo" />
            </div>
            <div className="brand-info">
              <p className="brand-line">SMALL BATCH FINISHING SALTS</p>
              <p className="brand-line">CRAFTED BY HAND</p>
              <p className="brand-line">SUNRISE MOUNTAIN, NEW JERSEY</p>
            </div>
          </div>

          <div className="left-bottom-group">
            <a
              href="https://geminicrow.com/collections/the-salt-initiative"
              target="_blank"
              rel="noopener noreferrer"
              className="store-link"
            >
              STORE
            </a>
            <a href="mailto:salt@cultofsalthaus.com" className="contact-link">CONTACT</a>
            <a href="https://substack.com/@cultofsalthaus?utm_source=global-search" target="_blank" rel="noopener noreferrer" className="contact-link">ARCHIVE</a>
            <a href="https://open.spotify.com/user/31ewwgyfz3jelk6xusokhnorooha?si=f529a33aa7534465" target="_blank" rel="noopener noreferrer" className="contact-link">SALTGAZE</a>

            <form onSubmit={handleEmailSubmit} className="inline-email-capture">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="EMAIL"
                required
                disabled={isSubmitting}
                className="inline-email-input"
              />
              <button type="submit" disabled={isSubmitting} className="inline-email-submit">
                DEVOTE
              </button>
              {message && <span className="inline-email-message">{message}</span>}
            </form>

            <p className="brand-credit">THE SALTHAUS by GEMINI CROW</p>

            <div id="kit-form-container" className="kit-form-wrapper"></div>
          </div>
        </aside>

        <main className="right-column">
          <div className="offerings-wrapper">
            <h1 className="offerings-header">OFFERINGS</h1>

            <div className="offerings-list">
              {offerings.map((offering, index) => {
                const [hymnNumber, ...nameParts] = offering.hymn.split(' ');
                const hymnName = nameParts.join(' ');
                return (
                  <div key={index} className="offering-item">
                    <h2 className="offering-hymn">
                      <span className="hymn-number">{hymnNumber}</span> {hymnName}
                    </h2>
                    <p className="offering-description">{offering.description.toUpperCase()}</p>
                  </div>
                );
              })}
              <div className="base-section">
                {baseItems.map((item, index) => {
                  const [baseNumber, ...nameParts] = item.name.split(' ');
                  const baseName = nameParts.join(' ');
                  return (
                    <div key={index} className="base-item">
                      <h2 className="base-title">
                        <span className="base-number">{baseNumber}</span> {baseName} <span className="base-sub">{item.sub}</span>
                      </h2>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="disclaimer">
              <p>Some will return.</p>
              <p>Some will disappear.</p>
              <p>Nothing is promised.</p>
            </div>

            <div className="closing-statement">
              <p>NO GODS. JUST SALT.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
