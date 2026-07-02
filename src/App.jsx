import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroCarousel from './components/HeroCarousel';
import WhyChooseUs from './components/WhyChooseUs';
import Timeline from './components/Timeline';
import Testimonials from './components/Testimonials';
import Faq from './components/Faq';
import Footer from './components/Footer';
import EligibilityModal from './components/EligibilityModal';
import PromoModal, { shouldShowPromo } from './components/PromoModal';
import CookieConsent from './components/CookieConsent';
import QuickLinks from './components/QuickLinks';
import EligibilityCriteria from './components/EligibilityCriteria';
import FeesAndCharges from './components/FeesAndCharges';
import BlogSection from './components/BlogSection';

export default function App() {
  // 'eligibility' | 'apply' | null
  const [modalMode, setModalMode] = useState(null);
  const [showPromo, setShowPromo] = useState(false);

  // Show promo 800ms after load if not seen
  useEffect(() => {
    const t = setTimeout(() => {
      if (shouldShowPromo()) setShowPromo(true);
    }, 800);
    return () => clearTimeout(t);
  }, []);

  const openModal = (mode) => setModalMode(mode);
  const closeModal = () => setModalMode(null);
  const claimNow = () => { setShowPromo(false); openModal('eligibility'); };

  return (
    <>
      {/* Ambient background glows */}
      <div className="glow glow-1" aria-hidden="true" />
      <div className="glow glow-2" aria-hidden="true" />
      <div className="glow glow-3" aria-hidden="true" />

      {/* Sticky Navbar */}
      <Navbar onOpenModal={openModal} />

      {/* Hero */}
      <HeroCarousel onOpenModal={openModal} />

      {/* Secondary Sticky Nav */}
      <QuickLinks />

      {/* Sections */}
      <WhyChooseUs />
      <EligibilityCriteria />
      <Timeline />
      <FeesAndCharges />
      <Testimonials />
      <Faq />
      <BlogSection />

      {/* Footer */}
      <Footer onOpenModal={openModal} />

      {/* Modals */}
      {modalMode && (
        <EligibilityModal mode={modalMode} onClose={closeModal} />
      )}

      {showPromo && (
        <PromoModal 
          onClose={() => setShowPromo(false)} 
          onCheckEligibility={claimNow} 
        />
      )}

      {/* Cookie Consent */}
      <CookieConsent />
    </>
  );
}
