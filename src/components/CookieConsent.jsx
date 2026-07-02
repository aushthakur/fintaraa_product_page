import { useState, useEffect } from 'react';
import './CookieConsent.css';

const COOKIE_KEY = 'fintaraa_cookie_consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Appear 3.5s after load, only if not previously accepted
    const t = setTimeout(() => {
      if (!localStorage.getItem(COOKIE_KEY)) setVisible(true);
    }, 3500);
    return () => clearTimeout(t);
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, JSON.stringify({ accepted: true, ts: Date.now() }));
    const exp = new Date(Date.now() + 365 * 86400000).toUTCString();
    document.cookie = `${COOKIE_KEY}=1; expires=${exp}; path=/; SameSite=Lax`;
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(COOKIE_KEY, JSON.stringify({ accepted: false, ts: Date.now() }));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className={`cookie-bar${visible ? ' visible' : ''}`} role="region" aria-label="Cookie consent">
      <div className="cookie-inner container">
        <p className="cookie-text">
          We use cookies to personalise your experience and show relevant loan offers.
          <a href="#privacy" className="cookie-link"> Privacy Policy</a>
        </p>
        <div className="cookie-actions">
          <button className="cookie-btn cookie-btn-decline" id="cookie-decline-btn" onClick={decline}>
            Decline
          </button>
          <button className="cookie-btn cookie-btn-accept" id="cookie-accept-btn" onClick={accept}>
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
