import { useEffect, useRef } from 'react';
import './FeesAndCharges.css';

const FEES = [
  { label: 'Interest Rate', value: 'From 9.99% p.a.', desc: 'Calculated on a monthly reducing balance basis.' },
  { label: 'Processing Fee', value: 'Up to 2%', desc: 'Charged on the total disbursed loan amount (plus applicable taxes).' },
  { label: 'Foreclosure Charges', value: '0%', desc: 'Absolutely no charges if you foreclose after 12 successful EMIs from your own funds.' },
  { label: 'Part-payment Charges', value: '0%', desc: 'Make part-payments up to 40% of the principal outstanding per year at no extra cost.' },
  { label: 'EMI Bounce Charge', value: '₹500', desc: 'Charged per instance of a bounced or returned EMI payment.' },
  { label: 'Stamp Duty & Legal Fees', value: 'As per Actuals', desc: 'Levied according to the respective state laws where the loan agreement is executed.' },
];

export default function FeesAndCharges() {
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });

    ref.current?.querySelectorAll('.fees-reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="fees-charges" className="section fees-simple-section" ref={ref}>
      <div className="container">
        
        <div className="fees-simple-header fees-reveal">
          <h2 className="sec-title">Schedule of Charges</h2>
          <p className="sec-sub">We believe in absolute transparency. No hidden fees, no surprises.</p>
        </div>

        <div className="fees-simple-list">
          {FEES.map((fee, idx) => (
            <div key={idx} className="fees-simple-row fees-reveal">
              <div className="fees-simple-left">
                <h3 className="fees-simple-label">{fee.label}</h3>
                <p className="fees-simple-desc">{fee.desc}</p>
              </div>
              <div className="fees-simple-right">
                <span className="fees-simple-value">{fee.value}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="fees-simple-footer fees-reveal">
          <p>*All applicable charges are exclusive of GST. <a href="#terms">Read full terms and conditions</a>.</p>
        </div>
        
      </div>
    </section>
  );
}
