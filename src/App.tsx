import React from 'react';

const offerings = [
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
    description: 'Refined White Salt, Brine, Dill'
  },
  {
    hymn: 'HYMN004 SALTS IN THE THRONE ROOM',
    description: 'Grey Sea Salt, Bay Leaf'
  },
  {
    hymn: 'HYMN005 ANGELS DESERVE TO DIE!',
    description: 'Hawaiian Black Lava Salt, Scorpion Pepper'
  },
  {
    hymn: 'HYMN006 SUKEBAN SWITCHBLADE',
    description: 'Refined White Salt, Yuzu, Black Sesame'
  },
  {
    hymn: 'HYMN007 MURDER BALLAD',
    description: 'White Sea Salt, Hibiscus, Black Garlic'
  },
  {
    hymn: 'HYMN008 ANHEDÖNIA',
    description: 'Grey Sea Salt, Black Currant, Activated Charcoal'
  }
];

function App() {
  const [email, setEmail] = React.useState('');

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log('Email submitted:', email);
      setEmail('');
    }
  };

  return (
    <div className="salthaus-container">
      <div className="background-image" />

      <div className="content-wrapper">
        <aside className="left-column">
          <div className="left-content">
            <div className="logo-section">
              <img src="/bFryarGc.webp" alt="The Salthaus" className="logo" />
            </div>

            <div className="brand-info">
              <p className="brand-line">SMALL BATCH FINISHING SALTS</p>
              <p className="brand-line">CRAFTED BY HAND</p>
              <p className="brand-line">SUNRISE MOUNTAIN, NEW JERSEY</p>
            </div>

            <div className="contact-info">
              <a
                href="https://geminicrow.com/collections/the-salt-initiative"
                target="_blank"
                rel="noopener noreferrer"
                className="store-link"
              >
                STORE
              </a>
              <a href="mailto:salt@cultofsalthaus.com" className="contact-link">CONTACT</a>
              <a href="https://substack.com/@cultofsalthaus?utm_source=global-search" target="_blank" rel="noopener noreferrer" className="contact-link">INTERACT</a>
              <a href="https://open.spotify.com/user/31ewwgyfz3jelk6xusokhnorooha?si=f529a33aa7534465" target="_blank" rel="noopener noreferrer" className="contact-link">SALTGAZE</a>

              <form onSubmit={handleEmailSubmit} className="email-signup">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENTER EMAIL"
                  className="email-input"
                  required
                />
              </form>

              <p className="brand-credit">THE SALTHAUS by GEMINI CROW</p>
            </div>
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

export default App;
