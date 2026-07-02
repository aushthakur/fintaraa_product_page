import { useState, useRef, useEffect } from 'react';
import { Star } from 'lucide-react';
import './Testimonials.css';

const REVIEWS = [
  { name:'Aditya Nair', role:'Software Engineer, Bengaluru', initials:'AN', color:'#2563EB', review:'"Approved during my lunch break. Funds hit my account before I finished eating. Transparent rates — exactly as advertised."' },
  { name:'Riya Sharma', role:'Brand Designer, Mumbai', initials:'RS', color:'#4F46E5', review:'"The paperless KYC was seamless. No endless phone calls, no physical documents. Truly modern fintech done right."' },
  { name:'Vikram Kalra', role:'Business Owner, Delhi', initials:'VK', color:'#10B981', review:'"As a self-employed person, banks always turn me down. Fintaraa approved ₹8 Lakhs based on my account activity. Game-changer."' },
];

export default function Testimonials() {
  const [cur, setCur] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.1 });
    ref.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="section t-section" ref={ref}>
      <div className="container">
        <div className="sec-header reveal">
          <h2 className="sec-title">Trusted by Thousands</h2>
          <p className="sec-sub">Real people. Real approvals. Real change.</p>
        </div>

        <div className="t-slider reveal">
          <div className="t-track" style={{ transform: `translateX(-${cur * 100}%)` }}>
            {REVIEWS.map(r => (
              <div className="t-card glass" key={r.name}>
                <div className="t-stars">{Array(5).fill(0).map((_,i) => <Star key={i} size={16} fill="#F59E0B" color="#F59E0B"/>)}</div>
                <p className="t-text">{r.review}</p>
                <div className="t-profile">
                  <div className="t-avatar" style={{ background: r.color + '18', color: r.color }}>{r.initials}</div>
                  <div>
                    <p className="t-name">{r.name}</p>
                    <p className="t-role">{r.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="t-dots">
            {REVIEWS.map((_, i) => (
              <button key={i} className={`t-dot${i === cur ? ' active' : ''}`} onClick={() => setCur(i)} aria-label={`Review ${i+1}`}/>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
