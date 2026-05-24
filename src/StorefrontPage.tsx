import { useState, useEffect, useRef } from 'react';

const STORE_URL = 'https://geminicrow.com/collections/the-salt-initiative';

interface Product {
  code: string;
  name: string;
  descriptor: string;
  category: 'hymns' | 'omens' | 'bases' | 'cult';
  price?: string;
  ingredients?: string;
  isApparel?: boolean;
}

const products: Product[] = [
  // HYMNS
  { code: 'HYMN000', name: 'PALE GREEN, SEPTEMBER', descriptor: 'Sea Salt, Green Apple, White Pepper', category: 'hymns', price: '—', ingredients: 'Sea Salt, Green Apple, White Pepper', },
  { code: 'HYMN001', name: 'STILL', descriptor: 'Icelandic White Flake Salt', category: 'hymns', price: '—', ingredients: 'Icelandic White Flake Salt' },
  { code: 'HYMN002', name: 'KVLT LEADR', descriptor: 'Smoked Hickory Sea Salt, Juniper Berry', category: 'hymns', price: '—', ingredients: 'Smoked Hickory Sea Salt, Juniper Berry' },
  { code: 'HYMN003', name: 'BRINE HOUSE', descriptor: 'Salt, Dried Garlic, Dill Weed, Brine, Vinegar Powder, Coriander', category: 'hymns', price: '—', ingredients: 'Salt, Dried Garlic, Dill Weed, Brine, Vinegar Powder, Coriander' },
  { code: 'HYMN004', name: 'SALTS IN THE THRONE ROOM', descriptor: 'Grey Sea Salt, Crushed Bay Leaf', category: 'hymns', price: '—', ingredients: 'Grey Sea Salt, Crushed Bay Leaf' },
  { code: 'HYMN005', name: 'ANGELS DESERVE TO DIE!', descriptor: 'Hawaiian Black Lava Salt, Scorpion Pepper', category: 'hymns', price: '—', ingredients: 'Hawaiian Black Lava Salt, Scorpion Pepper' },
  { code: 'HYMN006', name: 'SUKEBAN SWITCHBLADE', descriptor: 'Yaki-Shio Sea Salt, Yuzu, Black Sesame', category: 'hymns', price: '—', ingredients: 'Yaki-Shio Sea Salt, Yuzu, Black Sesame' },
  { code: 'HYMN007', name: 'MURDER BALLAD', descriptor: 'Sea Salt, Hibiscus, Black Garlic', category: 'hymns', price: '—', ingredients: 'Sea Salt, Hibiscus, Black Garlic' },
  { code: 'HYMN008', name: "STARS DON'T FALL", descriptor: 'Sea Salt, Chipotle Pepper, Raspberry', category: 'hymns', price: '—', ingredients: 'Sea Salt, Chipotle Pepper, Raspberry' },
  { code: 'HYMN009', name: 'SUN BLEACHED SALT', descriptor: 'Sea Salt, Crushed Lemon Peel, Crushed Lime Peel', category: 'hymns', price: '—', ingredients: 'Sea Salt, Crushed Lemon Peel, Crushed Lime Peel' },
  { code: 'HYMN010', name: 'ANHEDÖNIA', descriptor: 'Grey Sea Salt, Black Currant, Activated Charcoal', category: 'hymns', price: '—', ingredients: 'Grey Sea Salt, Black Currant, Activated Charcoal' },
  // OMENS
  { code: 'OMEN001', name: 'STATIC & WINE', descriptor: 'Red Wine Salt, Black & White Sesame, Coriander', category: 'omens', price: '—', ingredients: 'Red Wine Salt, Black & White Sesame, Coriander' },
  { code: 'OMEN002', name: "SALTANIC PANIC '26", descriptor: 'Sea Salt, Pumpkin Powder, Black Pepper, Cinnamon', category: 'omens', price: '—', ingredients: 'Sea Salt, Pumpkin Powder, Black Pepper, Cinnamon' },
  // BASES
  { code: 'BASE001', name: 'TOCINA', descriptor: 'Smoked Bacon Salt', category: 'bases', price: '—', ingredients: 'Smoked Bacon Salt' },
  { code: 'BASE002', name: 'ROMERA', descriptor: 'Spanish Rosemary Salt', category: 'bases', price: '—', ingredients: 'Spanish Rosemary Salt' },
  { code: 'BASE003', name: 'CURRY', descriptor: 'Hot Curry Salt', category: 'bases', price: '—', ingredients: 'Hot Curry Salt' },
  { code: 'BASE004', name: 'SRIRACHA', descriptor: 'Sriracha Salt', category: 'bases', price: '—', ingredients: 'Sriracha Salt' },
  // CULT
  { code: 'CVLT001', name: 'NO GODS. JUST SALT.', descriptor: 'Embroidered Cap', category: 'cult', price: '—', isApparel: true },
];

const NAV_CATEGORIES = [
  { id: 'hymns', label: 'HYMNS' },
  { id: 'omens', label: 'OMENS' },
  { id: 'bases', label: 'BASES' },
  { id: 'cult', label: 'CULT' },
] as const;

type Category = typeof NAV_CATEGORIES[number]['id'];

function ProductCard({ product, onClick }: { product: Product; onClick: () => void }) {
  return (
    <button className="sf-product-card" onClick={onClick}>
      <div className="sf-product-image-area">
        <div className="sf-product-image-placeholder">
          <img
            src="/bFryarGc.webp"
            alt={product.name}
            className="sf-product-img"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        </div>
      </div>
      <div className="sf-product-info">
        <span className="sf-product-code">{product.code}</span>
        <h3 className="sf-product-name">{product.name}</h3>
        <p className="sf-product-descriptor">{product.descriptor}</p>
      </div>
    </button>
  );
}

function ProductDetail({ product, onClose }: { product: Product; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div className="sf-detail-overlay" onClick={onClose}>
      <div className="sf-detail-panel" onClick={e => e.stopPropagation()}>
        <button className="sf-detail-close" onClick={onClose} aria-label="Close">✕</button>
        <div className="sf-detail-inner">
          <div className="sf-detail-left">
            <div className="sf-detail-image-main">
              <img
                src="/bFryarGc.webp"
                alt={product.name}
                className="sf-detail-img"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            </div>
            {!product.isApparel && (
              <div className="sf-detail-jar-row">
                <div className="sf-detail-jar">
                  <img src="/image1.jpeg" alt="Jar front" className="sf-detail-jar-img" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  <span className="sf-detail-jar-label">JAR FRONT</span>
                </div>
                <div className="sf-detail-jar">
                  <img src="/image2.jpeg" alt="Jar back" className="sf-detail-jar-img" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  <span className="sf-detail-jar-label">JAR BACK</span>
                </div>
              </div>
            )}
          </div>
          <div className="sf-detail-right">
            <span className="sf-detail-code">{product.code}</span>
            <h2 className="sf-detail-title">{product.name}</h2>
            {product.ingredients && (
              <p className="sf-detail-ingredients">{product.ingredients}</p>
            )}
            <p className="sf-detail-price">{product.price || '—'}</p>
            <a
              href={STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="sf-detail-cta"
            >
              VIEW IN STORE
            </a>
            <div className="sf-detail-disclaimer">
              <p>Some will return.</p>
              <p>Some will disappear.</p>
              <p>Nothing is promised.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function StorefrontPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('hymns');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartCount] = useState(0);
  const rightColRef = useRef<HTMLDivElement>(null);

  const hymnsRef = useRef<HTMLElement>(null);
  const omensRef = useRef<HTMLElement>(null);
  const basesRef = useRef<HTMLElement>(null);
  const cultRef = useRef<HTMLElement>(null);

  const sectionRefs: Record<Category, React.RefObject<HTMLElement | null>> = {
    hymns: hymnsRef,
    omens: omensRef,
    bases: basesRef,
    cult: cultRef,
  };

  const scrollToCategory = (cat: Category) => {
    const ref = sectionRefs[cat];
    if (ref.current && rightColRef.current) {
      const container = rightColRef.current;
      const targetTop = ref.current.offsetTop - 80;
      container.scrollTo({ top: targetTop, behavior: 'smooth' });
      setActiveCategory(cat);
    }
  };

  useEffect(() => {
    const container = rightColRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPos = container.scrollTop + 120;
      const order: Category[] = ['hymns', 'omens', 'bases', 'cult'];
      for (let i = order.length - 1; i >= 0; i--) {
        const ref = sectionRefs[order[i]];
        if (ref.current && ref.current.offsetTop <= scrollPos) {
          setActiveCategory(order[i]);
          break;
        }
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const hymnProducts = products.filter(p => p.category === 'hymns');
  const omenProducts = products.filter(p => p.category === 'omens');
  const baseProducts = products.filter(p => p.category === 'bases');
  const cultProducts = products.filter(p => p.category === 'cult');

  return (
    <div className="sf-container">
      {/* LEFT COLUMN — fixed */}
      <aside className="sf-left">
        <div className="sf-left-image-wrap">
          <img src="/IMG_6986_(1).jpg" alt="Salthaus atmosphere" className="sf-left-image" />
          <div className="sf-left-image-overlay" />
        </div>
        <div className="sf-left-bottom">
          <p className="sf-left-tagline">
            Some will return.<br />
            Some will disappear.<br />
            Nothing is promised.
          </p>
          <nav className="sf-left-nav">
            <a href="/launch" className="sf-left-link">SALTHAUS INFO</a>
            <a href="/" className="sf-left-link">RETURN TO MAIN PAGE</a>
            <a href={STORE_URL} target="_blank" rel="noopener noreferrer" className="sf-left-link">FAQ</a>
          </nav>
        </div>
      </aside>

      {/* RIGHT COLUMN — scrolling */}
      <div className="sf-right" ref={rightColRef}>
        {/* Header */}
        <header className="sf-header">
          <div className="sf-header-inner">
            <a href="/" className="sf-logo-link">
              <img src="/Salthaus_Trading_Logo_Caps.PNG" alt="The Salthaus" className="sf-header-logo" />
            </a>
            <button className="sf-cart-btn" aria-label="Cart">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {cartCount > 0 && <span className="sf-cart-count">{cartCount}</span>}
            </button>
          </div>
          {/* Category Nav */}
          <nav className="sf-cat-nav">
            {NAV_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                className={`sf-cat-btn${activeCategory === cat.id ? ' sf-cat-btn--active' : ''}`}
                onClick={() => scrollToCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </nav>
        </header>

        {/* Content */}
        <div className="sf-content">

          {/* HYMNS */}
          <section ref={hymnsRef as React.RefObject<HTMLElement>} className="sf-section" id="hymns">
            <div className="sf-section-head">
              <h2 className="sf-section-title">HYMNS</h2>
              <span className="sf-section-sub">Core Salts</span>
            </div>
            <div className="sf-grid">
              {hymnProducts.map(p => (
                <ProductCard key={p.code} product={p} onClick={() => setSelectedProduct(p)} />
              ))}
            </div>
          </section>

          {/* OMENS */}
          <section ref={omensRef as React.RefObject<HTMLElement>} className="sf-section" id="omens">
            <div className="sf-section-head">
              <h2 className="sf-section-title">OMENS</h2>
              <span className="sf-section-sub">Limited Edition Salts</span>
            </div>
            <div className="sf-grid">
              {omenProducts.map(p => (
                <ProductCard key={p.code} product={p} onClick={() => setSelectedProduct(p)} />
              ))}
            </div>
          </section>

          {/* BASES */}
          <section ref={basesRef as React.RefObject<HTMLElement>} className="sf-section" id="bases">
            <div className="sf-section-head">
              <h2 className="sf-section-title">BASES</h2>
              <span className="sf-section-sub">Foundational Salts</span>
            </div>
            <div className="sf-grid">
              {baseProducts.map(p => (
                <ProductCard key={p.code} product={p} onClick={() => setSelectedProduct(p)} />
              ))}
            </div>
          </section>

          {/* CULT */}
          <section ref={cultRef as React.RefObject<HTMLElement>} className="sf-section" id="cult">
            <div className="sf-section-head">
              <h2 className="sf-section-title">CULT</h2>
              <span className="sf-section-sub">Uniforms</span>
            </div>
            <div className="sf-grid">
              {cultProducts.map(p => (
                <ProductCard key={p.code} product={p} onClick={() => setSelectedProduct(p)} />
              ))}
            </div>
            <div className="sf-shop-all-row">
              <a href={STORE_URL} target="_blank" rel="noopener noreferrer" className="sf-shop-all-link">
                SHOP ALL OFFERINGS
              </a>
            </div>
          </section>

          {/* Footer */}
          <footer className="sf-footer">
            <p className="sf-footer-text">THE SALTHAUS — SUNRISE MOUNTAIN, NEW JERSEY</p>
            <p className="sf-footer-text sf-footer-sub">SMALL BATCH. CRAFTED BY HAND. NO GODS. JUST SALT.</p>
          </footer>
        </div>
      </div>

      {/* Product Detail Overlay */}
      {selectedProduct && (
        <ProductDetail product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  );
}
