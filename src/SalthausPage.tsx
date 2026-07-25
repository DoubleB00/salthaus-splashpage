import { useState } from 'react';

const STORE_URL = 'https://geminicrow.com/collections/the-salt-initiative';

const omens = [
  {
    omen: 'OMEN001 STATIC & WINE',
    description: 'Red Wine Salt, Black & White Sesame, Coriander'
  },
  {
    omen: 'OMEN002 SALTANIC PANIC \'26',
    description: 'Sea Salt, Pumpkin Powder, Black Pepper, Cinnamon'
  }
];

const offerings = [
  {
    hymn: 'HYMN000 SLEEPWALKER',
    description: 'Sea Salt, Green Tea, Fennel, Saffron, Star Anise'
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
    hymn: 'HYMN008 STARS DON\'T FALL',
    description: 'Sea Salt, Chipotle Pepper, Raspberries'
  },
  {
    hymn: 'HYMN009 SUN BLEACHED SALT',
    description: 'Sea Salt, Crushed Lemon Peel, Crushed Lime Peel'
  },
  {
    hymn: 'HYMN010 ANHEDÖNIA',
    description: 'Grey Sea Salt, Black Currant, Activated Charcoal'
  }
];

const baseItems = [
  { name: 'BASE001 TOCINA', sub: 'SMOKED BACON SALT' },
  { name: 'BASE002 ROMERA', sub: 'SPANISH ROSEMARY SALT' },
  { name: 'BASE003 CURRY', sub: 'HOT CURRY SALT' },
  { name: 'BASE004 SRIRACHA', sub: 'SRIRACHA SALT' },
];

const cvltItems = [
  { name: 'CULT001 NO GODS. JUST SALT.', sub: 'Embroidered Cap' },
];

const archiveImages = [
  {
    src: '/B66041F5-E134-4E37-BF83-909F78CAD096.PNG',
    alt: 'SALTHAUS ARCHIVE — CIRCA 1977'
  },
  {
    src: '/image0_(1).png',
    alt: 'SALTHAUS ARCHIVE — 1976'
  },
  {
    src: '/image1_(2).png',
    alt: 'SALTHAUS ARCHIVE — PURCHASE RECORD, 1976'
  }
];

type View = 'offerings' | 'archive';

export function SalthausPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [view, setView] = useState<View>('offerings');
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

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
              <button className="logo-home-btn" onClick={() => setView('offerings')} aria-label="Return to main page">
                <img src="/Salthaus_Trading_Logo_Caps.PNG" alt="The Salthaus" className="logo" />
              </button>
            </div>
            <div className="brand-info">
              <p className="brand-line">SMALL BATCH FINISHING SALTS</p>
              <p className="brand-line">CRAFTED BY HAND</p>
              <p className="brand-line">SUNRISE MOUNTAIN, NEW JERSEY</p>
            </div>
          </div>

          <div className="left-bottom-group">
            <a
              href={STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="store-link"
            >
              STORE
            </a>
            <a href="mailto:cultofsalthaus@gmail.com" className="contact-link">CONTACT</a>
            <button
              className={`contact-link archive-nav-btn${view === 'archive' ? ' archive-nav-btn--active' : ''}`}
              onClick={() => setView('archive')}
            >
              HISTORY
            </button>
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

          </div>
        </aside>

        <main className="right-column">
          {view === 'offerings' ? (
            <div className="offerings-wrapper">
              <h1 className="offerings-header">SALTOGRAPHY</h1>

              <div className="section-block">
                <div className="section-header-row">
                  <h3 className="section-label">HYMNS</h3>
                  <span className="section-pipe">|</span>
                  <span className="section-descriptor">Core Salts</span>
                </div>
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
              </div>

              <div className="omens-section">
                <div className="section-header-row">
                  <h2 className="omens-header">OMENS</h2>
                  <span className="section-pipe">|</span>
                  <span className="section-descriptor">Limited Edition Salts</span>
                </div>
                {omens.map((omen, index) => {
                  const [omenNumber, ...nameParts] = omen.omen.split(' ');
                  const omenName = nameParts.join(' ');
                  return (
                    <div key={index} className="offering-item omen-item">
                      <h2 className="offering-hymn omen-hymn">
                        <span className="hymn-number">{omenNumber}</span> {omenName}
                      </h2>
                      <p className="offering-description">{omen.description.toUpperCase()}</p>
                    </div>
                  );
                })}
              </div>

              <div className="base-section">
                <div className="section-header-row">
                  <h3 className="section-label">BASES</h3>
                  <span className="section-pipe">|</span>
                  <span className="section-descriptor">Foundational Salts</span>
                </div>
                {baseItems.map((item, index) => {
                  const [baseNumber, ...nameParts] = item.name.split(' ');
                  const baseName = nameParts.join(' ');
                  return (
                    <div key={index} className="base-item">
                      <h2 className="base-title">
                        <span className="base-number">{baseNumber}</span> {baseName}
                      </h2>
                      <p className="base-sub">{item.sub}</p>
                    </div>
                  );
                })}
              </div>

              <div className="cvlt-section">
                <div className="section-header-row">
                  <h3 className="section-label cvlt-section-label">CULT</h3>
                  <span className="section-pipe">|</span>
                  <span className="section-descriptor">Uniforms</span>
                </div>
                {cvltItems.map((item, index) => {
                  const [cvltNumber, ...nameParts] = item.name.split(' ');
                  const cvltName = nameParts.join(' ');
                  return (
                    <div key={index} className="base-item cvlt-item">
                      <h2 className="base-title cvlt-title">
                        <span className="base-number">{cvltNumber}</span> {cvltName}
                      </h2>
                      <p className="base-sub cvlt-sub">{item.sub}</p>
                    </div>
                  );
                })}
                <div className="cvlt-shop-row">
                  <a href="/store" className="cvlt-shop-link">
                    SHOP ALL OFFERINGS
                  </a>
                </div>
              </div>

              <div className="closing-statement">
                <p>PROVISIONS FOR LONELY AMERICA.</p>
              </div>
            </div>
          ) : (
            <div className="archive-wrapper">
              <h1 className="archive-header">HISTORY</h1>

              <div className="archive-body">
                <p className="archive-text">
                  The earliest known records of The Salthaus Trading Company date back to 1976, where it operated from a modest storefront near Sunrise Mountain, New Jersey. Surviving purchase ledgers confirm the company traded in salt and provisions, though little else is known. The historical record fell silent sometime during the 1980s. For decades, local whispers suggested Salthaus had been more than a provisions company, though no surviving record has ever confirmed the claim.
                </p>
                <p className="archive-text">
                  In 2020, a collection of business records bearing the Salthaus name surfaced among several boxes of forgotten business records acquired from the estate of a now-closed antique shop in Montague, New Jersey. Among the papers were handwritten formulas, ingredient notes, incomplete production journals, supplier correspondences, shipping invoices, and several faded photographs. Large portions of the archive had been lost to time. Water damage, missing pages, and contradictory records left much of the company's history impossible to verify. What remained, however, was unmistakably authentic; evidence of a company whose standards were documented as carefully as its recipes. Several records remain incomplete, their missing pages preserving only names, ingredient lists, or handwritten notes in the margins. Those records continue to shape future offerings.
                </p>
                <p className="archive-text">
                  Curiously, nothing recovered from the archive ever explained the rumors that had surrounded the company for decades. If anything, the surviving records only deepened them.
                </p>
                <p className="archive-text">
                  After years of research, the company was revived in early 2026—not as a replica, but as a continuation of what still could be preserved. Much of its history has been lost over time. What survived was enough to begin again. The rest remains unwritten.
                </p>

                <div className="archive-van-image">
                  <img src="/image0_(2).png" alt="SALTHAUS TRADING CO. — SUNRISE MOUNTAIN, N.J." className="archive-van-img" />
                </div>

                <div className="archive-images">
                  {archiveImages.map((img, i) => (
                    <button
                      key={i}
                      className="archive-image-btn"
                      onClick={() => setLightboxSrc(img.src)}
                      aria-label={`Enlarge: ${img.alt}`}
                    >
                      <img src={img.src} alt={img.alt} className="archive-image" />
                      <span className="archive-image-caption">{img.alt}</span>
                    </button>
                  ))}
                </div>

                <div className="archive-closing">
                  <p className="archive-closing-line">The Salthaus Trading Company</p>
                  <p className="archive-closing-tagline">Provisions For Lonely America.</p>
                </div>

                <div className="archive-return-row">
                  <button
                    className="archive-return-link"
                    onClick={() => setView('offerings')}
                  >
                    RETURN TO MAIN PAGE
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {lightboxSrc && (
        <div
          className="archive-lightbox"
          onClick={() => setLightboxSrc(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            className="archive-lightbox-close"
            onClick={() => setLightboxSrc(null)}
            aria-label="Close"
          >
            &#x2715;
          </button>
          <img
            src={lightboxSrc}
            alt="Archive"
            className="archive-lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
