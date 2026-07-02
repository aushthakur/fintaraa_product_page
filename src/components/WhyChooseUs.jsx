import { useEffect, useRef } from 'react';
import './WhyChooseUs.css';

export default function WhyChooseUs() {
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.15 });
    ref.current?.querySelectorAll('.pl-bento-reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="why-choose-us" className="section pl-why-section" ref={ref}>
      <div className="container">
        <div className="pl-bento-header pl-bento-reveal">
          <h2 className="pl-sec-title">Why choose our Personal Loan?</h2>
          <p className="pl-sec-sub">Experience a seamless borrowing journey built on speed, flexibility, and absolute transparency.</p>
        </div>
        
        <div className="pl-bento-grid">
          
          {/* Bento Item 1: Large Wide */}
          <div className="pl-bento-card pl-bento-large pl-bento-reveal reveal-delay-1">
            <div className="pl-bento-content">
              <div className="pl-bento-img-wrap">
                <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80" alt="Zero Foreclosure Charges" className="pl-bento-img" />
              </div>
              <h3>Zero Foreclosure Charges</h3>
              <p>Close your loan whenever you want. We charge absolutely nothing if you decide to pay off your loan early from your own funds.</p>
            </div>
            <div className="pl-bento-visual">
              <div className="pl-zero-badge">0%</div>
              <div className="pl-zero-text">Penalty</div>
            </div>
          </div>

          {/* Bento Item 2: Tall */}
          <div className="pl-bento-card pl-bento-tall pl-bento-reveal reveal-delay-2">
            <div className="pl-bento-content">
              <div className="pl-bento-img-wrap">
                <img src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80" alt="Instant Approval" className="pl-bento-img" />
              </div>
              <h3>Instant Approval & Disbursal</h3>
              <p>Our smart algorithms process your application instantly. Get funds in your bank account within hours.</p>
            </div>
          </div>

          {/* Bento Item 3: Square */}
          <div className="pl-bento-card pl-bento-reveal reveal-delay-3">
            <div className="pl-bento-content">
              <div className="pl-bento-img-wrap">
                <img src="https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=800&q=80" alt="Up to ₹15 Lakhs" className="pl-bento-img" />
              </div>
              <h3>Up to ₹15 Lakhs</h3>
              <p>No collateral or security required. Finance your big dreams effortlessly.</p>
            </div>
          </div>

          {/* Bento Item 4: Square */}
          <div className="pl-bento-card pl-bento-reveal reveal-delay-4">
            <div className="pl-bento-content">
              <div className="pl-bento-img-wrap">
                <img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80" alt="Flexible Repayment" className="pl-bento-img" />
              </div>
              <h3>Flexible Repayment</h3>
              <p>Choose EMI tenures from 12 to 60 months tailored to your cash flow.</p>
            </div>
          </div>

          {/* Bento Item 5: Wide Bottom */}
          <div className="pl-bento-card pl-bento-wide pl-bento-reveal reveal-delay-5">
            <div className="pl-bento-content">
              <div className="pl-bento-img-wrap">
                <img src="https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=800&q=80" alt="100% Paperless Process" className="pl-bento-img" />
              </div>
              <div className="pl-bento-text-bottom">
                <h3>100% Paperless Process</h3>
                <p>Verify via Aadhaar and Video KYC from the comfort of your home. No physical branch visits ever.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
