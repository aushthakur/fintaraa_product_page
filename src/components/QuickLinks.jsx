import { useState, useEffect } from 'react';
import './QuickLinks.css';

const LINKS = [
  { label: 'Overview', href: '#hero' },
  { label: 'Benefits', href: '#why-choose-us' },
  { label: 'Eligibility', href: '#eligibility' },
  { label: 'How to apply', href: '#timeline' },
  { label: 'Fees & Charges', href: '#emi-calculator' }, // or separate section
  { label: 'FAQs', href: '#faq' },
  { label: 'Blogs', href: '#blogs' }
];

export default function QuickLinks() {
  const [active, setActive] = useState('Overview');
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // The hero section is where the nav usually starts sticking
      // But we can just use position: sticky in CSS. We'll use JS
      // to add a shadow when scrolled.
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e, label, href) => {
    e.preventDefault();
    setActive(label);
    const target = document.querySelector(href);
    if (target) {
      // Offset by 130px to account for both sticky navbars
      const top = target.getBoundingClientRect().top + window.pageYOffset - 130;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div className={`quick-links-wrapper ${isSticky ? 'is-sticky' : ''}`}>
      <div className="container">
        <nav className="quick-links-nav">
          <ul className="quick-links-list">
            {LINKS.map(link => (
              <li key={link.label}>
                <a 
                  href={link.href}
                  className={`quick-link-item ${active === link.label ? 'active' : ''}`}
                  onClick={(e) => handleClick(e, link.label, link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
