import { useState, useEffect, useRef, useCallback } from 'react';
import bannerMetroWeb from '../assets/1stbanner.png';
import bannerMetroMobile from '../assets/1stbannermobileview.png';
import bannerRuralWeb from '../assets/2ndbanner.png';
import bannerRuralMobile from '../assets/2ndbannermobile.png';
import './HeroCarousel.css';

const SLIDES = [
  {
    id: 1,
    webImg: bannerMetroWeb,
    mobileImg: bannerMetroMobile,
    headline: 'Instant Personal Loans up to ₹15 Lakhs.',
    subline: 'Starting @ 9.99% p.a. with Zero Foreclosure Charges.',
    accent: '#2563EB',
  },
  {
    id: 2,
    webImg: bannerRuralWeb,
    mobileImg: bannerRuralMobile,
    headline: '100% Paperless & Instant Approval.',
    subline: 'Get funds directly in your bank account without visiting a branch.',
    accent: '#059669',
  },
];

export default function HeroCarousel({ onOpenModal }) {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);     // index of outgoing slide
  const [transitioning, setTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);
  const timerRef = useRef(null);
  const touchStartX = useRef(null);

  const goTo = useCallback((nextIndex) => {
    if (transitioning || nextIndex === current) return;
    setTransitioning(true);
    setPrev(current);
    setCurrent(nextIndex);
    // clear outgoing slide after transition completes
    setTimeout(() => {
      setPrev(null);
      setTransitioning(false);
    }, 700);
  }, [current, transitioning]);

  const goNext = useCallback(() => {
    goTo((current + 1) % SLIDES.length);
  }, [current, goTo]);

  const goPrev = useCallback(() => {
    goTo((current - 1 + SLIDES.length) % SLIDES.length);
  }, [current, goTo]);

  // Auto-rotate every 5s
  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(goNext, 5000);
  }, [goNext]);

  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, [resetTimer]);

  // Responsive banner switching
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 640);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Touch swipe
  const onTouchStart = (e) => { touchStartX.current = e.changedTouches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 48) { dx < 0 ? goNext() : goPrev(); resetTimer(); }
    touchStartX.current = null;
  };

  const currentSlide = SLIDES[current];
  const prevSlide = prev !== null ? SLIDES[prev] : null;

  return (
    <section id="hero" className="hero-section" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>

      {/* Outgoing image (fades out) */}
      {prevSlide && (
        <img
          key={`prev-${prevSlide.id}-${isMobile ? 'm' : 'w'}`}
          src={isMobile ? prevSlide.mobileImg : prevSlide.webImg}
          alt=""
          className="hero-bg-img hero-bg-img--exit"
          draggable={false}
          aria-hidden
        />
      )}

      {/* Incoming image (fades in) */}
      <img
        key={`curr-${currentSlide.id}-${isMobile ? 'm' : 'w'}`}
        src={isMobile ? currentSlide.mobileImg : currentSlide.webImg}
        alt={currentSlide.headline}
        className={`hero-bg-img hero-bg-img--enter${transitioning ? ' active' : ' active'}`}
        draggable={false}
      />

      {/* Gradient overlay */}
      <div className="hero-overlay" />

      {/* Text content */}
      <div className={`hero-content container${transitioning ? ' text-fade' : ''}`}>
        <div className="hero-text">
          <h1 className="hero-headline">{currentSlide.headline}</h1>
          <p className="hero-sub">{currentSlide.subline}</p>
          <div className="hero-ctas">
            <button className="btn btn-primary" id="hero-apply-btn" onClick={() => onOpenModal('apply')}>
              Apply Now
            </button>
            <button className="btn btn-ghost" id="hero-eligibility-btn" onClick={() => onOpenModal('eligibility')}>
              Check Eligibility
            </button>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="hero-dots">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            className={`hero-dot${i === current ? ' active' : ''}`}
            onClick={() => { goTo(i); resetTimer(); }}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Arrow nav – desktop only */}
      <button className="hero-arrow hero-arrow-left" onClick={() => { goPrev(); resetTimer(); }} aria-label="Previous">&#8592;</button>
      <button className="hero-arrow hero-arrow-right" onClick={() => { goNext(); resetTimer(); }} aria-label="Next">&#8594;</button>
    </section>
  );
}
