import { useState, useEffect, useRef } from 'react';
import { Menu, X, Search, Bell, ChevronDown } from 'lucide-react';
import appStoreBadge from '../assets/appstore.svg.webp';
import playStoreBadge from '../assets/playstore.svg.webp';
import logoImg from '../assets/logo.webp';
import './Navbar.css';

// Mega Menu Data - Based on user provided content and image reference
const MEGA_MENUS = {
  loans: {
    title: 'Loans',
    leftItems: [
      { label: 'Personal Loan', href: '#personal-loan' },
      { label: 'Home Loan', href: '#home-loan' },
      { label: 'Business Loan', href: '#business-loan' },
      { label: 'Vehicle Loan', href: '#vehicle-loan' },
      { label: 'Loan Against Property', href: '#lap' },
      { label: 'Gold Loan', href: '#gold-loan' },
      { label: 'Loan Against Security', href: '#las' },
      { label: 'Car Loan', href: '#car-loan' },
      { label: 'Two Wheeler Loan', href: '#two-wheeler-loan' },
      { label: 'Education Loan', href: '#education-loan' },
      { label: 'Instant Loan', href: '#instant-loan' },
      { label: 'Credit Score Loan', href: '#credit-score-loan' },
    ],
    middleActions: [
      { label: 'Compare options', action: 'compare' },
      { label: 'Check Eligibility', action: 'eligibility' },
      { label: 'Assisted Support', action: 'support' },
    ],
    promo: {
      title: 'Personal Loan',
      subtitle: 'Quick funds for planned or urgent needs.',
      description: 'Compare options, check eligibility, and continue with assisted Fintaraa support.',
      ctaText: 'Apply Now',
      image: 'https://picsum.photos/id/1011/300/280',
    },
    bottomLinks: [
      { label: 'POPULAR LOANS', href: '#popular-loans' },
      { label: 'SECURED LOANS', href: '#secured-loans' },
      { label: 'MORE LOANS', href: '#more-loans' },
    ],
  },
  insurance: {
    title: 'Insurance',
    leftItems: [
      { label: 'Health Insurance', href: '#health-insurance' },
      { label: 'Term Insurance', href: '#term-insurance' },
      { label: 'Life Insurance', href: '#life-insurance' },
      { label: 'Car Insurance', href: '#car-insurance' },
      { label: 'Bike Insurance', href: '#bike-insurance' },
      { label: 'Travel Insurance', href: '#travel-insurance' },
      { label: 'Home Insurance', href: '#home-insurance' },
      { label: 'Property Insurance', href: '#property-insurance' },
      { label: 'Shop Insurance', href: '#shop-insurance' },
      { label: 'Stock Insurance', href: '#stock-insurance' },
    ],
    middleActions: [
      { label: 'Life & Health', action: 'life-health' },
      { label: 'Vehicle & Travel', action: 'vehicle-travel' },
      { label: 'Property & Business', action: 'property-business' },
    ],
    promo: {
      title: 'Health Insurance',
      subtitle: 'Protect family, health, and income.',
      description: 'Compare options, check eligibility, and continue with assisted Fintaraa support.',
      ctaText: 'Get Quote',
      image: 'https://picsum.photos/id/106/300/280',
    },
    bottomLinks: [
      { label: 'LIFE & HEALTH', href: '#life-health' },
      { label: 'VEHICLE & TRAVEL', href: '#vehicle-travel' },
      { label: 'PROPERTY & BUSINESS', href: '#property-business' },
    ],
  },
  creditCards: {
    title: 'Credit Cards',
    leftItems: [
      { label: 'Compare Credit Cards', href: '#compare-cards' },
      { label: 'Offers & Rewards', href: '#offers' },
      { label: 'Check Card Eligibility', href: '#eligibility-check' },
      { label: 'HDFC Credit Cards', href: '#hdfc-cards' },
      { label: 'SBI Credit Cards', href: '#sbi-cards' },
      { label: 'ICICI Credit Cards', href: '#icici-cards' },
    ],
    middleActions: [
      { label: 'Explore Cards', action: 'explore' },
      { label: 'Offers & Rewards', action: 'offers' },
      { label: 'Check Eligibility', action: 'eligibility' },
    ],
    promo: {
      title: 'Compare Credit Cards',
      subtitle: 'Find cards by fee, rewards, and usage.',
      description: 'Compare options, check eligibility, and continue with assisted Fintaraa support.',
      ctaText: 'Compare Now',
      image: 'https://picsum.photos/id/201/300/280',
    },
    bottomLinks: [
      { label: 'EXPLORE CARDS', href: '#explore-cards' },
      { label: 'OFFERS & REWARDS', href: '#offers' },
      { label: 'BANK CARDS', href: '#bank-cards' },
    ],
  },
  partners: {
    title: 'Partner Zone',
    leftItems: [
      { label: 'Franchise', href: '#franchise' },
      { label: 'Become DSA', href: '#dsa' },
      { label: 'Refer & Earn', href: '#refer' },
      { label: 'Careers', href: '#careers' },
    ],
    middleActions: [
      { label: 'Franchise', action: 'franchise' },
      { label: 'Become DSA', action: 'dsa' },
      { label: 'Refer & Earn', action: 'refer' },
    ],
    promo: {
      title: 'Partner With Us',
      subtitle: 'Business and earning opportunities.',
      description: 'Compare options, check eligibility, and continue with assisted Fintaraa support.',
      ctaText: 'Become Partner',
      image: 'https://picsum.photos/id/180/300/280',
    },
    bottomLinks: [
      { label: 'PARTNER WITH US', href: '#partner' },
      { label: 'CAREERS', href: '#careers' },
      { label: 'CONTACT US', href: '#contact' },
    ],
  },
};

const NAV_ITEMS = [
  { label: 'Home', href: '#hero', hasDropdown: false },
  { label: 'Loans', key: 'loans', hasDropdown: true, isActive: true },
  { label: 'Insurance', key: 'insurance', hasDropdown: true },
  { label: 'Credit Cards', key: 'creditCards', hasDropdown: true },
  { label: 'Partner Zone', key: 'partners', hasDropdown: true },
  { label: 'Contact', href: '#contact', hasDropdown: false },
];

const SEARCH_TERMS = ['Personal loans...', 'Insurance plans...', 'Credit cards...', 'Partner opportunities...'];

const NOTIFICATIONS = [
  {
    id: 1,
    category: 'Offers',
    title: 'Pre-Approved Personal Loan of ₹5 Lakhs',
    message: 'Your profile qualifies for an instant disbursement. Special interest rate of 10.49% ends today.',
    time: '2 hours ago',
    ctaText: 'Claim Offer',
    ctaAction: 'apply',
    unread: true,
    image: 'https://picsum.photos/id/248/80/80',
  },
  {
    id: 2,
    category: 'Account',
    title: 'Credit Score Updated',
    message: 'Good news! Your Experian credit score increased by 15 points. Check your new loan eligibility limit.',
    time: '1 day ago',
    ctaText: 'Check Eligibility',
    ctaAction: 'eligibility',
    unread: true,
    image: 'https://picsum.photos/id/1062/80/80',
  },
  {
    id: 3,
    category: 'Updates',
    title: 'Fintaraa App Version 2.1 is Live',
    message: 'Update your app now to experience 2x faster loan approvals and a brand new dashboard design.',
    time: '3 days ago',
    ctaText: 'Download App',
    ctaAction: 'app',
    unread: false,
    image: 'https://picsum.photos/id/0/80/80',
  },
  {
    id: 4,
    category: 'Offers',
    title: 'Zero Processing Fee on Home Loans',
    message: 'Apply for home loans before this weekend and save up to ₹15,000 on processing fees.',
    time: '4 days ago',
    ctaText: 'Explore Home Loans',
    ctaAction: 'home-loan',
    unread: false,
    image: 'https://picsum.photos/id/1020/80/80',
  }
];

export default function Navbar({ onOpenModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [notificationsList, setNotificationsList] = useState(NOTIFICATIONS);

  const dropdownRef = useRef(null);
  const searchRef = useRef(null);
  const notificationsRef = useRef(null);
  const ticking = useRef(false);

  // Typewriter effect for search
  const [placeholderText, setPlaceholderText] = useState('');
  const [termIndex, setTermIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const currentTerm = SEARCH_TERMS[termIndex];

    if (isDeleting) {
      if (placeholderText === '') {
        setIsDeleting(false);
        setTermIndex((prev) => (prev + 1) % SEARCH_TERMS.length);
      } else {
        timer = setTimeout(() => {
          setPlaceholderText(currentTerm.substring(0, placeholderText.length - 1));
        }, 50);
      }
    } else {
      if (placeholderText === currentTerm) {
        timer = setTimeout(() => setIsDeleting(true), 2500);
      } else {
        timer = setTimeout(() => {
          setPlaceholderText(currentTerm.substring(0, placeholderText.length + 1));
        }, 80);
      }
    }
    return () => clearTimeout(timer);
  }, [placeholderText, isDeleting, termIndex]);

  // Close dropdown when clicking outside the entire navbar area
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchFocused(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(e.target) && !e.target.closest('.nav-icon-btn')) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 860) {
        setMobileOpen(false);
        setActiveDropdown(null);
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const scrollTo = (href) => {
    setMobileOpen(false);
    setActiveDropdown(null);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const toggleDropdown = (key) => {
    setActiveDropdown(activeDropdown === key ? null : key);
  };

  const handleAction = (action, menuKey) => {
    setActiveDropdown(null);
    if (action === 'eligibility' && onOpenModal) {
      onOpenModal('eligibility');
    } else if (action === 'emi') {
      const emiSection = document.querySelector('#emi-calculator');
      if (emiSection) emiSection.scrollIntoView({ behavior: 'smooth' });
    }
    // Add more action handlers as needed
  };

  const currentMenu = activeDropdown ? MEGA_MENUS[activeDropdown] : null;

  const filteredNotifications = activeCategory === 'All'
    ? notificationsList
    : notificationsList.filter(n => n.category === activeCategory);

  return (
    <>
      <header className={`navbar-wrapper${scrolled ? ' scrolled' : ''}`}>
        {/* Top Blue Bar */}
        <div className="top-blue-bar">
          <div className="top-bar-inner container">
            <span className="tb-item">Toll‑Free: 1800‑120‑3000</span>
            <span className="tb-item">Customer Support: care@fintaraa.com</span>
          </div>
        </div>

        <nav className="navbar" ref={dropdownRef}>
          {/* Logo */}
          <a href="#hero" className="nav-logo" onClick={(e) => { e.preventDefault(); scrollTo('#hero'); }}>
            <img src={logoImg} alt="Fintaraa Logo" className="logo-img" />
          </a>

          {/* Desktop Navigation with Dropdowns */}
          <ul className="nav-links">
            {NAV_ITEMS.map(item => (
              <li
                key={item.label}
                className={`nav-item ${item.hasDropdown ? 'has-dropdown' : ''} ${activeDropdown === item.key ? 'active' : ''} ${item.isActive ? 'active-tab' : ''}`}
                onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.key)}
              >
                {item.hasDropdown ? (
                  <button
                    className="nav-link dropdown-trigger"
                    onClick={() => toggleDropdown(item.key)}
                  >
                    {item.label} <ChevronDown size={14} className="chevron" />
                  </button>
                ) : (
                  <a
                    href={item.href}
                    className="nav-link"
                    onClick={(e) => { e.preventDefault(); scrollTo(item.href); }}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>

          {/* Right side actions */}
          <div className="nav-actions">
            <div className={`nav-search-wrap ${searchFocused ? 'active' : ''}`} ref={searchRef}>
              <div className="nav-search">
                <Search size={16} className="search-icon" />
                <input
                  type="text"
                  placeholder={searchFocused ? '' : placeholderText}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  className="search-input"
                  aria-label="Search"
                />
              </div>

              {searchFocused && (
                <div className="search-suggestions">
                  <div className="suggestions-inner">
                    {/* Left side content */}
                    <div className="suggestions-main">
                      {/* Most Searched */}
                      <div className="suggestion-section">
                        <h4 className="section-title">Most Searched</h4>
                        <div className="pill-group">
                          <button className="pill-btn" onClick={() => { setSearchQuery('Personal Loan'); }}>Personal Loan</button>
                          <button className="pill-btn" onClick={() => { setSearchQuery('Savings Account'); }}>Savings Account</button>
                          <button className="pill-btn" onClick={() => { setSearchQuery('Credit Card'); }}>Credit Card</button>
                          <button className="pill-btn" onClick={() => { setSearchQuery('NRI Account'); }}>NRI Account</button>
                          <button className="pill-btn" onClick={() => { setSearchQuery('Gift City'); }}>Gift City</button>
                          <button className="pill-btn" onClick={() => { setSearchQuery('Fast Tag'); }}>Fast Tag</button>
                        </div>
                      </div>

                      {/* Top Products */}
                      <div className="suggestion-section">
                        <h4 className="section-title">Top Products</h4>
                        <div className="products-grid">
                          <div className="product-card">
                            <div className="product-icon-wrap piggy">
                              <img src="https://picsum.photos/id/1069/40/40" alt="Savings Account" className="product-card-img" />
                            </div>
                            <div className="product-details">
                              <span className="product-name">Savings Account</span>
                              <a href="#savings" className="product-link" onClick={() => setSearchFocused(false)}>Apply Now</a>
                            </div>
                          </div>
                          <div className="product-card">
                            <div className="product-icon-wrap card-icon">
                              <img src="https://picsum.photos/id/999/40/40" alt="Credit Card" className="product-card-img" />
                            </div>
                            <div className="product-details">
                              <span className="product-name">Credit Card</span>
                              <a href="#compare-cards" className="product-link" onClick={() => setSearchFocused(false)}>Apply Now</a>
                            </div>
                          </div>
                          <div className="product-card">
                            <div className="product-icon-wrap loan-icon">
                              <img src="https://picsum.photos/id/1059/40/40" alt="Personal Loan" className="product-card-img" />
                            </div>
                            <div className="product-details">
                              <span className="product-name">Personal Loan</span>
                              <a href="#personal-loan" className="product-link" onClick={() => setSearchFocused(false)}>Apply Now</a>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Accounts */}
                      <div className="suggestion-section">
                        <h4 className="section-title">Accounts & Services</h4>
                        <div className="products-grid">
                          <div className="product-card">
                            <div className="product-icon-wrap deposit-icon">
                              <img src="https://picsum.photos/id/1063/40/40" alt="Fixed Deposit" className="product-card-img" />
                            </div>
                            <div className="product-details">
                              <span className="product-name">Fixed Deposit</span>
                              <a href="#fd" className="product-link" onClick={() => setSearchFocused(false)}>Book Now</a>
                            </div>
                          </div>
                          <div className="product-card">
                            <div className="product-icon-wrap current-icon">
                              <img src="https://picsum.photos/id/26/40/40" alt="Current Account" className="product-card-img" />
                            </div>
                            <div className="product-details">
                              <span className="product-name">Current Account</span>
                              <a href="#current" className="product-link" onClick={() => setSearchFocused(false)}>Apply Now</a>
                            </div>
                          </div>
                          <div className="product-card">
                            <div className="product-icon-wrap fastag-icon">
                              <img src="https://picsum.photos/id/133/40/40" alt="FASTag" className="product-card-img" />
                            </div>
                            <div className="product-details">
                              <span className="product-name">FASTag</span>
                              <a href="#fastag" className="product-link" onClick={() => setSearchFocused(false)}>Apply Now</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right side (Discover Promo) */}
                    <div className="suggestions-discover">
                      <h4 className="section-title">Discover</h4>
                      <div className="discover-promo-card">
                        <div className="discover-img-container">
                          <img
                            src="https://picsum.photos/id/1025/300/180"
                            alt="Discover Promo"
                            className="discover-promo-img"
                          />
                        </div>
                        <div className="discover-promo-content">
                          <p className="discover-promo-text">Earn up to 6.50% interest on your Savings Account</p>
                          <button
                            className="discover-promo-btn"
                            onClick={() => {
                              setSearchFocused(false);
                              if (onOpenModal) onOpenModal('apply');
                            }}
                          >
                            Open Account Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <a href="#login" className="nav-login-btn" id="nav-login-btn">
              Login
            </a>

            <button
              className="nav-icon-btn"
              onClick={() => setNotificationsOpen(v => !v)}
              aria-label="Notifications"
            >
              <Bell size={16} />
              {notificationsList.some(n => n.unread) && <span className="nav-notif-dot" />}
            </button>

            {/* Social icons (kept minimal) */}
            <button className="mobile-toggle" onClick={() => setMobileOpen(v => !v)} aria-label="Toggle menu">
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* Mega Dropdown Panel */}
        {activeDropdown && currentMenu && (
          <div className={`mega-dropdown ${activeDropdown ? 'open' : ''}`} style={{ display: 'block' }}>
            <div className="mega-content container">
              {/* Left Column - List of options */}
              <div className="mega-column left-column">
                <h3 className="mega-column-title">{currentMenu.title}</h3>
                <div className="mega-list">
                  {currentMenu.leftItems.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="mega-list-item"
                      onClick={(e) => { e.preventDefault(); scrollTo(item.href); setActiveDropdown(null); }}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Middle Column - Actions and CTAs */}
              <div className="mega-column middle-column">
                <div className="action-buttons">
                  {currentMenu.middleActions.map((action, index) => (
                    <button
                      key={index}
                      className="action-btn"
                      onClick={() => handleAction(action.action, activeDropdown)}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>

                <div className="cta-group">
                  <button
                    className="explore-btn"
                    onClick={() => { setActiveDropdown(null); /* navigate to explore */ }}
                  >
                    Explore More
                  </button>
                  <button
                    className="apply-btn"
                    onClick={() => { setActiveDropdown(null); if (onOpenModal) onOpenModal('eligibility'); }}
                  >
                    APPLY NOW
                  </button>
                </div>
              </div>

              {/* Right Column - Promo Card (matches image reference) */}
              <div className="mega-column right-column">
                <div className="promo-card">
                  <div className="promo-content">
                    <h4>{currentMenu.promo.title}</h4>
                    <p className="promo-subtitle">{currentMenu.promo.subtitle}</p>
                    <p className="promo-desc">{currentMenu.promo.description}</p>
                    <button
                      className="avail-btn"
                      onClick={() => { setActiveDropdown(null); if (onOpenModal) onOpenModal('eligibility'); }}
                    >
                      {currentMenu.promo.ctaText}
                    </button>
                  </div>
                  <img
                    src={currentMenu.promo.image}
                    alt={currentMenu.promo.title}
                    className="promo-image"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Links Bar */}
            <div className="mega-bottom-bar">
              <div className="bottom-links container">
                {currentMenu.bottomLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="bottom-link"
                    onClick={(e) => { e.preventDefault(); scrollTo(link.href); setActiveDropdown(null); }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Drawer with Accordion Style */}
      <div className={`mobile-drawer${mobileOpen ? ' open' : ''}`}>
        <div className="drawer-inner">
          <div className="drawer-top">
            <div className="drawer-logo">
              <img src={logoImg} alt="Fintaraa Logo" className="logo-img" />
            </div>
            <button className="drawer-close" onClick={() => setMobileOpen(false)}>
              <X size={18} />
            </button>
          </div>

          <div className="drawer-links">
            {NAV_ITEMS.map(item => (
              <div key={item.label} className="mobile-menu-item">
                {item.hasDropdown ? (
                  <>
                    <button
                      className="drawer-link accordion-header"
                      onClick={() => toggleDropdown(item.key)}
                    >
                      {item.label} <ChevronDown size={18} className={`chevron ${activeDropdown === item.key ? 'rotated' : ''}`} />
                    </button>
                    {activeDropdown === item.key && (
                      <div className="accordion-content">
                        {MEGA_MENUS[item.key].leftItems.map((subItem, i) => (
                          <a
                            key={i}
                            href={subItem.href}
                            className="drawer-sub-link"
                            onClick={(e) => { e.preventDefault(); scrollTo(subItem.href); setMobileOpen(false); setActiveDropdown(null); }}
                          >
                            {subItem.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <a
                    href={item.href}
                    className="drawer-link"
                    onClick={(e) => { e.preventDefault(); scrollTo(item.href); setMobileOpen(false); }}
                  >
                    {item.label}
                  </a>
                )}
              </div>
            ))}
          </div>

          <div className="drawer-app-downloads">
            <a href="#appstore" className="app-badge">
              <img src={appStoreBadge} alt="App Store" />
            </a>
            <a href="#playstore" className="app-badge">
              <img src={playStoreBadge} alt="Play Store" />
            </a>
          </div>
        </div>
      </div>
      {/* Notifications Drawer */}
      <div className={`notif-drawer-backdrop ${notificationsOpen ? 'open' : ''}`} onClick={() => setNotificationsOpen(false)}>
        <div className={`notif-drawer ${notificationsOpen ? 'open' : ''}`} onClick={e => e.stopPropagation()} ref={notificationsRef}>
          <div className="notif-header">
            <h3>Notifications</h3>
            <button className="notif-close-btn" onClick={() => setNotificationsOpen(false)}>
              <X size={18} />
            </button>
          </div>

          <div className="notif-tabs">
            {['All', 'Offers', 'Account', 'Updates'].map(cat => (
              <button
                key={cat}
                className={`notif-tab ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="notif-body">
            {filteredNotifications.length === 0 ? (
              <div className="notif-empty">
                <Bell size={32} className="empty-bell" />
                <p>No notifications in this category</p>
              </div>
            ) : (
              filteredNotifications.map(item => (
                <div key={item.id} className={`notif-item ${item.unread ? 'unread' : ''}`}>
                  <div className="notif-item-layout">
                    {item.image && (
                      <img src={item.image} alt="" className="notif-item-img" />
                    )}
                    <div className="notif-item-text">
                      <div className="notif-item-top">
                        <span className={`notif-category-badge ${item.category.toLowerCase()}`}>{item.category}</span>
                        <span className="notif-time">{item.time}</span>
                      </div>
                      <h4 className="notif-title">{item.title}</h4>
                      <p className="notif-message">{item.message}</p>
                    </div>
                  </div>
                  <div className="notif-actions-row">
                    <button
                      className="notif-cta-btn"
                      onClick={() => {
                        setNotificationsOpen(false);
                        // Mark as read
                        setNotificationsList(prev => prev.map(n => n.id === item.id ? { ...n, unread: false } : n));
                        if (item.ctaAction === 'apply' || item.ctaAction === 'eligibility') {
                          if (onOpenModal) onOpenModal(item.ctaAction);
                        } else {
                          scrollTo('#hero');
                        }
                      }}
                    >
                      {item.ctaText}
                    </button>
                    {item.unread && (
                      <button
                        className="notif-mark-read"
                        onClick={() => {
                          setNotificationsList(prev => prev.map(n => n.id === item.id ? { ...n, unread: false } : n));
                        }}
                      >
                        Mark as read
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {notificationsList.some(n => n.unread) && (
            <div className="notif-footer">
              <button
                className="mark-all-read-btn"
                onClick={() => setNotificationsList(prev => prev.map(n => ({ ...n, unread: false })))}
              >
                Mark all as read
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
