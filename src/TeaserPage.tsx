import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function TeaserPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    try {
      setMessage('DEVOTED');
      setEmail('');
    } catch {
      setMessage('TRY AGAIN');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="teaser-container">
      <div className="teaser-bg" />

      <div className="teaser-content">
        <div className="teaser-logo-wrap">
          <img src="/Salthaus_Trading_Logo_Caps.PNG" alt="The Salthaus" className="teaser-logo" />
        </div>

        <div className="teaser-body">
          <div className="teaser-meta">
            <p className="teaser-meta-line">SMALL BATCH FINISHING SALTS</p>
            <p className="teaser-meta-line">CRAFTED BY HAND</p>
            <p className="teaser-meta-line">SUNRISE MOUNTAIN, NEW JERSEY</p>
          </div>

          <p className="teaser-headline">ARRIVING AUGUST 18</p>
          <p className="teaser-sub">Enter your email to receive word of the arrival.</p>

          <form onSubmit={handleEmailSubmit} className="teaser-email-form">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="EMAIL"
              required
              disabled={isSubmitting}
              className="teaser-email-input"
            />
            <button type="submit" disabled={isSubmitting} className="teaser-email-submit">
              DEVOTE
            </button>
            {message && <span className="teaser-email-message">{message}</span>}
          </form>

          <div className="teaser-divider" />

          <button
            className="teaser-enter-btn"
            onClick={() => navigate('/launch')}
          >
            ENTER SITE
          </button>

          <p className="teaser-credit">THE SALTHAUS by GEMINI CROW</p>
        </div>
      </div>
    </div>
  );
}
