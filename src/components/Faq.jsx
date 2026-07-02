import { useState, useRef, useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';
import './Faq.css';

const FAQS = [
  { q:'What is the minimum and maximum loan amount?', a:'You can borrow between ₹50,000 and ₹15,00,000 based on your credit profile, income, and employment history.' },
  { q:'How fast is approval and disbursal?', a:'Eligibility check takes 60 seconds. Full KYC takes under 30 minutes. Funds land in your bank account within hours of approval.' },
  { q:'Are there any hidden charges or processing fees?', a:'None. Fintaraa shows all charges — interest rate, processing fee (if any), and foreclosure terms — before you e-sign. Zero hidden surprises.' },
  { q:'What documents do I need?', a:'Just your PAN number and Aadhaar OTP. We pull income data via AA (Account Aggregator) framework with your consent — no salary slips, no physical paperwork.' },
  { q:'Can I foreclose the loan early?', a:'Yes, after completing a minimum of 12 EMIs, you can foreclose your loan with absolutely zero foreclosure charges.' },
];

export default function Faq() {
  const [open, setOpen] = useState(0); // Open first one by default
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.2 });
    ref.current?.querySelectorAll('.faq-reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="faq" className="section pl-faq-section" ref={ref}>
      <div className="container">
        
        <div className="pl-faq-grid">
          
          {/* Left Visual Column */}
          <div className="pl-faq-visual-col faq-reveal">
            <div className="pl-faq-header">
              <h2 className="sec-title">Still have questions?</h2>
              <p className="sec-sub">We're here to help you understand every aspect of your personal loan.</p>
            </div>
            
            <div className="pl-faq-img-wrap">
              {/* High quality image of customer support or smiling person */}
              <img src="https://picsum.photos/id/1011/600/700" alt="Customer Support" className="pl-faq-img" />
              
              {/* Video Play button placeholder overlay */}
              <div className="pl-faq-play-btn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </div>
            </div>
          </div>

          {/* Right Accordion Column */}
          <div className="pl-faq-accordion-col faq-reveal delay-1">
            <div className="faq-list">
              {FAQS.map((f, i) => (
                <div key={i} className={`faq-item glass ${open === i ? 'open' : ''}`}>
                  <button className="faq-q" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
                    <span>{f.q}</span>
                    <span className="faq-icon">{open === i ? <Minus size={18}/> : <Plus size={18}/>}</span>
                  </button>
                  <div className="faq-a" style={{ maxHeight: open === i ? '200px' : '0' }}>
                    <div className="faq-a-inner">{f.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
        
      </div>
    </section>
  );
}
