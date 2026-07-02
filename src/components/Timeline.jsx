import { useEffect, useRef } from 'react';
import { MousePointerClick, ShieldCheck, ThumbsUp, Banknote } from 'lucide-react';
import './Timeline.css';

const STEPS = [
  { 
    id: 1,
    icon: <MousePointerClick size={24} />,
    title: 'Apply Online', 
    desc: 'Fill out our secure 60-second digital form. No physical branch visits needed.' 
  },
  { 
    id: 2,
    icon: <ShieldCheck size={24} />,
    title: 'Verify Details', 
    desc: 'Complete Aadhaar e-KYC and link your bank account for instant verification.' 
  },
  { 
    id: 3,
    icon: <ThumbsUp size={24} />,
    title: 'Get Approved', 
    desc: 'Review your personalised offer and e-sign the agreement instantly.' 
  },
  { 
    id: 4,
    icon: <Banknote size={24} />,
    title: 'Receive Funds', 
    desc: 'The loan amount is transferred directly to your bank account within hours.' 
  },
];

export default function Timeline() {
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

    ref.current?.querySelectorAll('.timeline-reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="timeline" className="section timeline-ref-section" ref={ref}>
      <div className="container">
        <div className="timeline-ref-split">
          
          {/* Left Content Col */}
          <div className="timeline-ref-content-col timeline-reveal">
            
            <div className="timeline-ref-header">
              <h2 className="sec-title">How to Apply for a Personal Loan</h2>
            </div>
            
            <hr className="timeline-ref-divider" />
            
            <div className="timeline-ref-grid">
              {STEPS.map((s) => (
                <div key={s.id} className="timeline-ref-item">
                  <div className="timeline-ref-icon">
                    {s.icon}
                  </div>
                  <h3 className="timeline-ref-item-title">{s.title}</h3>
                  <p className="timeline-ref-item-desc">{s.desc}</p>
                </div>
              ))}
            </div>

          </div>
          
          {/* Right Video Thumbnail Col */}
          <div className="timeline-ref-img-col timeline-reveal delay-1">
            <div className="timeline-video-wrap">
              <img 
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80" 
                alt="How to apply video thumbnail" 
                className="timeline-ref-img"
              />
              <div className="timeline-video-overlay">
                <div className="timeline-play-btn">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </div>
                <div className="timeline-video-text">Watch: How to Apply in 60s</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
