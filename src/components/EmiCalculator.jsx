import { useState, useEffect, useRef } from 'react';
import './EmiCalculator.css';

const fmtINR = n => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

function calcEMI(p, r, n) {
  const mr = r / 12 / 100;
  return (p * mr * Math.pow(1 + mr, n)) / (Math.pow(1 + mr, n) - 1);
}

function useAnimatedValue(target) {
  const [display, setDisplay] = useState(target);
  const prev = useRef(target);
  useEffect(() => {
    const start = prev.current; const end = target; const dur = 380;
    const t0 = performance.now();
    const frame = now => {
      const p = Math.min((now - t0) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(start + (end - start) * ease));
      if (p < 1) requestAnimationFrame(frame);
      else { prev.current = end; setDisplay(end); }
    };
    requestAnimationFrame(frame);
  }, [target]);
  return display;
}

export default function EmiCalculator({ onOpenModal }) {
  const [amount, setAmount] = useState(500000);
  const [rate, setRate] = useState(10.49);
  const [tenure, setTenure] = useState(36);
  const ref = useRef(null);

  const emi = Math.round(calcEMI(amount, rate, tenure));
  const total = Math.round(emi * tenure);
  const interest = total - amount;
  const principalPct = Math.round((amount / total) * 100);
  const interestPct = 100 - principalPct;

  const animEmi = useAnimatedValue(emi);
  const animInterest = useAnimatedValue(interest);
  const animTotal = useAnimatedValue(total);

  const pct = (val, min, max) => ((val - min) / (max - min)) * 100;

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.1 });
    ref.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const circumference = 2 * Math.PI * 15.915;

  return (
    <section id="emi-calculator" className="section emi-section" ref={ref}>
      <div className="container">
        <div className="sec-header reveal">
          <h2 className="sec-title">EMI Calculator</h2>
          <p className="sec-sub">Adjust the sliders to find the perfect loan plan for your budget.</p>
        </div>

        <div className="emi-grid">
          {/* Sliders Card */}
          <div className="emi-sliders glass reveal">
            {[
              { label:'Loan Amount', id:'amt', val:amount, min:100000, max:2500000, step:50000, set:setAmount, fmt: v => fmtINR(v), pctArgs:[amount,100000,2500000] },
              { label:'Interest Rate (p.a.)', id:'rate', val:rate, min:10.49, max:24, step:0.1, set:setRate, fmt: v => `${v}%`, pctArgs:[rate,10.49,24] },
              { label:'Repayment Tenure', id:'ten', val:tenure, min:12, max:60, step:6, set:setTenure, fmt: v => `${v} Mo`, pctArgs:[tenure,12,60] },
            ].map(s => (
              <div className="calc-group" key={s.id}>
                <div className="calc-row">
                  <span className="calc-label">{s.label}</span>
                  <span className="calc-val">{s.fmt(s.val)}</span>
                </div>
                <div className="range-wrap">
                  <div className="range-fill" style={{ width: `${pct(...s.pctArgs)}%` }} />
                  <input
                    type="range" className="range-input" id={s.id}
                    min={s.min} max={s.max} step={s.step} value={s.val}
                    onChange={e => s.set(parseFloat(e.target.value))}
                  />
                </div>
                <div className="range-bounds">
                  <span>{s.fmt(s.min)}</span><span>{s.fmt(s.max)}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Results Card */}
          <div className="emi-results glass reveal reveal-delay-2">
            <div className="res-header">
              <span className="res-tag">Monthly EMI</span>
              <div className="res-emi">{fmtINR(animEmi)}</div>
            </div>
            <div className="res-rows">
              <div className="res-row"><span>Principal</span><span id="emi-principal">{fmtINR(amount)}</span></div>
              <div className="res-row accent"><span>Total Interest</span><span id="emi-interest">{fmtINR(animInterest)}</span></div>
              <div className="res-row total"><span>Total Repayable</span><strong id="emi-total">{fmtINR(animTotal)}</strong></div>
            </div>

            {/* Donut chart */}
            <div className="donut-wrap">
              <svg viewBox="0 0 36 36" className="donut-svg">
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="var(--c-bg2)" strokeWidth="3.5"/>
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="var(--c-primary)" strokeWidth="3.8"
                  strokeDasharray={`${(principalPct / 100) * circumference} ${(interestPct / 100) * circumference}`}
                  strokeDashoffset={circumference * 0.25} strokeLinecap="round" style={{transition:'stroke-dasharray 0.5s ease'}}/>
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="var(--c-secondary)" strokeWidth="3.8"
                  strokeDasharray={`${(interestPct / 100) * circumference} ${(principalPct / 100) * circumference}`}
                  strokeDashoffset={circumference * 0.25 - (principalPct / 100) * circumference} strokeLinecap="round" style={{transition:'stroke-dasharray 0.5s ease'}}/>
              </svg>
              <div className="donut-legend">
                <div className="leg-item"><span className="leg-dot" style={{background:'var(--c-primary)'}}/> Principal ({principalPct}%)</div>
                <div className="leg-item"><span className="leg-dot" style={{background:'var(--c-secondary)'}}/> Interest ({interestPct}%)</div>
              </div>
            </div>

            <button className="btn btn-primary btn-block" id="emi-apply-btn" onClick={() => onOpenModal('apply')}>
              Apply for This Loan
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
