import { Mail, Phone, MapPin } from 'lucide-react';

const LinkedinIcon = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>;
const TwitterIcon = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" /></svg>;
const InstagramIcon = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>;
import './Footer.css';

export default function Footer({ onOpenModal }) {
  return (
    <footer id="contact" className="footer">
      <div className="container footer-grid">
        <div className="f-brand">
          <div className="footer-logo">
            <span className="logo-dot" />
            <span className="logo-text">Fintaraa</span>
          </div>
          <p className="f-tagline">Premium digital lending for every Indian family — metro or rural, salaried or self-employed.</p>
          <div className="f-social">
            <a href="#" aria-label="LinkedIn"><LinkedinIcon /></a>
            <a href="#" aria-label="Twitter"><TwitterIcon /></a>
            <a href="#" aria-label="Instagram"><InstagramIcon /></a>
          </div>
        </div>

        <div className="f-col">
          <h4>Products</h4>
          <ul>
            <li><a href="#hero">Home</a></li>
            <li><a href="#personal-loan">Personal Loan</a></li>
            <li><a href="#home-loan">Home Loan</a></li>
            <li><a href="#business-loan">Business Loan</a></li>
            <li><a href="#eligibility">Eligibility Check</a></li>
          </ul>
        </div>

        <div className="f-col">
          <h4>Legal</h4>
          <ul>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#terms">Terms & Conditions</a></li>
            <li><a href="#nbfc">NBFC Partners</a></li>
            <li><a href="#security">Data Security</a></li>
          </ul>
        </div>

        <div className="f-col f-contact">
          <h4>Contact</h4>
          <div className="f-contact-items">
            <a href="mailto:support@fintaraa.com" className="f-contact-row"><Mail size={15} /> support@fintaraa.com</a>
            <a href="tel:+918040004000" className="f-contact-row"><Phone size={15} /> +91 80 4000 4000</a>
            <p className="f-contact-row addr"><MapPin size={15} /> Prestige Tech Park, Outer Ring Road, Bengaluru — 560103</p>
          </div>
          <button className="btn btn-primary btn-sm f-cta" onClick={() => onOpenModal('apply')}>Apply Now</button>
        </div>
      </div>

      <div className="container f-bottom">
        <div className="f-divider" />
        <div className="f-bottom-row">
          <p className="f-copy">&copy; 2026 Fintaraa Finance Pvt. Ltd. All rights reserved.</p>
          <p className="f-disclaimer">Loans offered via RBI-regulated NBFC partners. Subject to credit assessment and verification.</p>
        </div>
      </div>
    </footer>
  );
}
