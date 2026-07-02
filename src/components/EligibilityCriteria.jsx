import { useEffect, useRef } from 'react';
import { CheckCircle2 } from 'lucide-react';
import familyImg from '../assets/family.png';
import familyMobileImg from '../assets/familymobileview.png';
import './EligibilityCriteria.css';

export default function EligibilityCriteria() {
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.2 });
    ref.current?.querySelectorAll('.eligibility-reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="eligibility" className="section eligibility-section" ref={ref}>
      <div className="container">
        <div className="eligibility-split">
          
          {/* Left: Image Side */}
          <div className="eligibility-image-col">
            <div className="eligibility-img-wrap-transparent">
              <img src={familyImg} alt="Indian family" className="eligibility-img-desktop" />
              <img src={familyMobileImg} alt="Indian family pointing down" className="eligibility-img-mobile" />
              
              {/* Floating element to add depth */}
              <div className="eligibility-floating-card">
                <div className="ec-icon">✓</div>
                <div>
                  <div className="ec-title">Pre-approved</div>
                  <div className="ec-sub">In 60 seconds</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content Side */}
          <div className="eligibility-text-col eligibility-reveal delay-1">
            <h2 className="sec-title">Simple Eligibility Criteria</h2>
            <p className="sec-sub">We believe in making credit accessible. As long as you meet these basic requirements, you're ready to apply.</p>
            
            <ul className="eligibility-list">
              <li>
                <CheckCircle2 className="el-icon" />
                <div className="el-text">
                  <strong>Age Requirement</strong>
                  <span>You must be between 23 and 60 years of age.</span>
                </div>
              </li>
              <li>
                <CheckCircle2 className="el-icon" />
                <div className="el-text">
                  <strong>Employment Status</strong>
                  <span>Salaried employee with a reputed public, private, or multinational company.</span>
                </div>
              </li>
              <li>
                <CheckCircle2 className="el-icon" />
                <div className="el-text">
                  <strong>Minimum Income</strong>
                  <span>Net monthly take-home salary of at least ₹25,000.</span>
                </div>
              </li>
              <li>
                <CheckCircle2 className="el-icon" />
                <div className="el-text">
                  <strong>Credit Score</strong>
                  <span>A CIBIL/Experian score of 700 or higher is preferred for the best rates.</span>
                </div>
              </li>
            </ul>

            <button className="btn btn-primary btn-lg el-btn" onClick={() => document.getElementById('hero-eligibility-btn')?.click()}>
              Check Your Eligibility Now
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
