import { useState, useEffect, useRef } from 'react';
import { X, CheckCircle2, ChevronRight, Loader2, Shield, Sparkles } from 'lucide-react';
import './EligibilityModal.css';

const STEPS = ['Details', 'Income', 'Offer'];

const initialForm = {
  fullName: '', mobile: '', email: '', age: '',
  city: '', employment: '', income: '', consent: false,
};

function validate(step, form) {
  const errs = {};
  if (step === 0) {
    if (!form.fullName.trim() || form.fullName.trim().length < 3) errs.fullName = 'Enter your full name';
    if (!/^[6-9]\d{9}$/.test(form.mobile)) errs.mobile = 'Valid 10-digit mobile required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Valid email required';
    const a = parseInt(form.age);
    if (!form.age || a < 21 || a > 60) errs.age = 'Age must be 21–60 years';
    if (!form.city.trim()) errs.city = 'Enter your city';
  }
  if (step === 1) {
    if (!form.employment) errs.employment = 'Select employment type';
    const inc = parseInt(form.income);
    if (!form.income || inc < 20000) errs.income = 'Min. income ₹20,000/month';
    if (!form.consent) errs.consent = 'You must agree to proceed';
  }
  return errs;
}

export default function EligibilityModal({ mode, onClose }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [offer, setOffer] = useState(null);
  const overlayRef = useRef(null);

  // Reset on open
  useEffect(() => {
    setStep(0); setForm(initialForm); setErrors({}); setOffer(null);
  }, [mode]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Close on overlay click
  const onOverlayClick = (e) => { if (e.target === overlayRef.current) onClose(); };

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const next = () => {
    const errs = validate(step, form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    if (step === 1) {
      setLoading(true);
      setTimeout(() => {
        const inc = parseInt(form.income);
        let maxLoan = Math.min(inc * 5, 2500000);
        maxLoan = Math.max(maxLoan, 100000);
        setOffer({
          amount: maxLoan,
          rate: '10.49% p.a.',
          tenure: '60 Months',
          emi: Math.round((maxLoan * (10.49 / 12 / 100) * Math.pow(1 + 10.49 / 12 / 100, 60)) / (Math.pow(1 + 10.49 / 12 / 100, 60) - 1)),
        });
        setLoading(false);
        setStep(2);
      }, 2400);
    } else {
      setStep(s => s + 1);
    }
  };

  const fmtINR = (n) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

  const fieldClass = (key) => `modal-field${errors[key] ? ' error' : ''}`;

  return (
    <div className="modal-overlay" ref={overlayRef} onClick={onOverlayClick}>
      <div className="modal-box glass" role="dialog" aria-modal="true">
        {/* Close */}
        <button className="modal-close" onClick={onClose} aria-label="Close"><X size={20}/></button>

        {/* Header */}
        <div className="modal-header">
          <div className="modal-icon-wrap">
            <Sparkles size={22} className="modal-icon-svg" />
          </div>
          <h2 className="modal-title">
            {step < 2 ? (mode === 'apply' ? 'Apply for a Loan' : 'Check Eligibility') : 'You\'re Pre-Approved!'}
          </h2>
          {step < 2 && (
            <div className="modal-steps">
              {STEPS.map((s, i) => (
                <div key={s} className={`step-item${i <= step ? ' done' : ''}${i === step ? ' current' : ''}`}>
                  <div className="step-circle">{i < step ? <CheckCircle2 size={14}/> : i + 1}</div>
                  <span className="step-label">{s}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="modal-body">
          {/* ── Step 0: Personal Details ── */}
          {step === 0 && (
            <div className="form-grid-2">
              <div className={fieldClass('fullName')}>
                <label>Full Name</label>
                <input value={form.fullName} onChange={e => set('fullName', e.target.value)} placeholder="As on PAN card" />
                {errors.fullName && <span className="field-err">{errors.fullName}</span>}
              </div>
              <div className={fieldClass('mobile')}>
                <label>Mobile Number</label>
                <input value={form.mobile} onChange={e => set('mobile', e.target.value)} placeholder="10-digit number" maxLength={10} />
                {errors.mobile && <span className="field-err">{errors.mobile}</span>}
              </div>
              <div className={fieldClass('email')}>
                <label>Email Address</label>
                <input value={form.email} onChange={e => set('email', e.target.value)} placeholder="you@example.com" type="email" />
                {errors.email && <span className="field-err">{errors.email}</span>}
              </div>
              <div className={fieldClass('age')}>
                <label>Age (years)</label>
                <input value={form.age} onChange={e => set('age', e.target.value)} placeholder="21–60" type="number" min={21} max={60} />
                {errors.age && <span className="field-err">{errors.age}</span>}
              </div>
              <div className={fieldClass('city')} style={{gridColumn:'1/-1'}}>
                <label>City of Residence</label>
                <input value={form.city} onChange={e => set('city', e.target.value)} placeholder="e.g. Mumbai, Pune, Patna" />
                {errors.city && <span className="field-err">{errors.city}</span>}
              </div>
            </div>
          )}

          {/* ── Step 1: Income Details ── */}
          {step === 1 && (
            <div className="form-grid-1">
              <div className={fieldClass('employment')}>
                <label>Employment Type</label>
                <select value={form.employment} onChange={e => set('employment', e.target.value)}>
                  <option value="">Select type</option>
                  <option value="Salaried">Salaried Employee</option>
                  <option value="Self-employed">Self-Employed / Business Owner</option>
                  <option value="Farmer">Farmer / Agri Business</option>
                </select>
                {errors.employment && <span className="field-err">{errors.employment}</span>}
              </div>
              <div className={fieldClass('income')}>
                <label>Net Monthly Income (₹)</label>
                <input value={form.income} onChange={e => set('income', e.target.value)} placeholder="Min. ₹20,000" type="number" min={20000} />
                {errors.income && <span className="field-err">{errors.income}</span>}
              </div>
              <div className={`consent-row${errors.consent ? ' error' : ''}`}>
                <input type="checkbox" id="modal-consent" checked={form.consent} onChange={e => set('consent', e.target.checked)} />
                <label htmlFor="modal-consent">
                  I agree to the <a href="#privacy" onClick={onClose}>Terms of Service</a> & <a href="#privacy" onClick={onClose}>Privacy Policy</a> and authorise Fintaraa to check my credit details.
                </label>
                {errors.consent && <span className="field-err full">{errors.consent}</span>}
              </div>
            </div>
          )}

          {/* ── Step 2: Pre-Approval Offer ── */}
          {step === 2 && offer && (
            <div className="offer-screen">
              <div className="offer-check">
                <svg viewBox="0 0 52 52" className="check-anim">
                  <circle cx="26" cy="26" r="25" fill="none" stroke="var(--c-success)" strokeWidth="2.5" className="check-circle"/>
                  <path d="M14 26l8 9 16-18" fill="none" stroke="var(--c-success)" strokeWidth="3" strokeLinecap="round" className="check-path"/>
                </svg>
              </div>
              <p className="offer-greeting">Hi {form.fullName.split(' ')[0]}, you qualify!</p>
              <div className="offer-amount">{fmtINR(offer.amount)}</div>
              <p className="offer-label">Maximum pre-approved loan amount</p>
              <div className="offer-details">
                <div className="od-row"><span>Interest Rate</span><strong>{offer.rate} onwards</strong></div>
                <div className="od-row"><span>Max. Tenure</span><strong>{offer.tenure}</strong></div>
                <div className="od-row"><span>Est. Monthly EMI</span><strong>{fmtINR(offer.emi)}</strong></div>
                <div className="od-row"><span>Processing Fee</span><strong>Zero</strong></div>
              </div>
              <div className="offer-trust">
                <Shield size={14} />
                <span>Our advisor will call you at +91 {form.mobile.slice(0,5)} XXXXX within 5 mins</span>
              </div>
              <button className="btn btn-primary btn-block" id="offer-done-btn" onClick={onClose}>Done — I'll Wait for the Call</button>
            </div>
          )}
        </div>

        {/* Footer */}
        {step < 2 && (
          <div className="modal-footer">
            {step > 0 && (
              <button className="btn btn-outline btn-sm" onClick={() => setStep(s => s - 1)}>← Back</button>
            )}
            <button
              className={`btn btn-primary${loading ? ' btn-loading' : ''}`}
              style={{marginLeft:'auto'}}
              onClick={next}
              disabled={loading}
              id="modal-next-btn"
            >
              {loading ? (
                <><Loader2 size={18} className="spin-icon" /> Checking…</>
              ) : (
                <>{step === 1 ? 'Check My Offer' : 'Next'} <ChevronRight size={18}/></>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
