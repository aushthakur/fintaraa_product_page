import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import bannerImg from '../assets/banner.png';
import bannerMobileImg from '../assets/bannermobile.png';
import './PromoModal.css';

export default function PromoModal({ onClose, onCheckEligibility }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const dismiss = () => {
    onClose();
  };

  return (
    <div
      className="promo-overlay"
      ref={overlayRef}
      onClick={e => { if (e.target === overlayRef.current) dismiss(); }}
    >
      <div className="promo-banner-box" role="dialog" aria-modal="true" aria-label="Special Offer">
        <button className="promo-banner-close" onClick={dismiss} aria-label="Close offer">
          <X size={24} />
        </button>

        <img src={bannerImg} alt="Special Offer Banner" className="promo-banner-img promo-banner-desktop" />
        <img src={bannerMobileImg} alt="Special Offer Banner" className="promo-banner-img promo-banner-mobile" />

        <button className="promo-banner-cta" onClick={() => { dismiss(); onCheckEligibility(); }}>
          Apply Now
        </button>
      </div>
    </div>
  );
}

export function shouldShowPromo() {
  return true;
}
