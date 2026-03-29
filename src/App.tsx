import React from 'react';

const offerings = [
  {
    hymn: 'HYMN001 STILL',
    description: 'Icelandic White Flake'
  },
  {
    hymn: 'HYMN002 KVLT LEADR',
    description: 'Juniper Berry, Smoked Hickory'
  },
  {
    hymn: 'HYMN003 BRINE HOUSE',
    description: 'Dill Pickle'
  },
  {
    hymn: 'HYMN004 SALTS IN THE THRONE ROOM',
    description: 'Bay Leaf Infused'
  },
  {
    hymn: 'HYMN005 ANGELS DESERVE TO DIE!',
    description: 'Scorpion Pepper, Black Lava'
  },
  {
    hymn: 'HYMN006 SUKEBAN SWITCHBLADE',
    description: 'Yuzu, Black Sesame'
  },
  {
    hymn: 'HYMN007 MURDER BALLAD',
    description: 'Hibiscus, Black Garlic'
  },
  {
    hymn: 'HYMN008 ANHEDONIA',
    description: 'Black Currant, Activated Charcoal'
  }
];

function App() {
  return (
    <div className="salthaus-container">
      <div className="background-image" />

      <div className="content-wrapper">
        <aside className="left-column">
          <div className="left-content">
            <div className="logo-section">
              <img src="/Salthaus_Logo.png" alt="The Salthaus" className="logo" />
            </div>

            <div className="brand-info">
              <p className="brand-line">SMALL BATCH FINISHING SALTS</p>
              <p className="brand-line">CRAFTED BY HAND</p>
              <p className="brand-line">SUNRISE MOUNTAIN, NJ</p>
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
              <a href="#" className="contact-link">INTERACT</a>
              <a href="#" className="contact-link">SALTGAZE</a>
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
