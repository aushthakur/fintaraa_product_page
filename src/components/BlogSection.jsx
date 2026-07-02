import { useEffect, useRef } from 'react';
import './BlogSection.css';

const BLOGS = [
  {
    id: 1,
    image: 'https://picsum.photos/id/0/600/400',
    category: 'Financial Health',
    title: '5 Smart Ways to Improve Your Credit Score Before Applying for a Loan',
    date: 'Oct 12, 2023',
    readTime: '5 min read'
  },
  {
    id: 2,
    image: 'https://picsum.photos/id/119/600/400',
    category: 'Loan Guide',
    title: 'Personal Loan vs. Credit Card: Which Should You Choose?',
    date: 'Nov 04, 2023',
    readTime: '4 min read'
  },
  {
    id: 3,
    image: 'https://picsum.photos/id/175/600/400',
    category: 'Money Management',
    title: 'How to Consolidate Debt and Save Thousands in Interest',
    date: 'Dec 18, 2023',
    readTime: '7 min read'
  }
];

export default function BlogSection() {
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

    ref.current?.querySelectorAll('.blog-reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="blogs" className="section blog-section" ref={ref}>
      <div className="container">
        <div className="blog-header blog-reveal">
          <h2 className="sec-title">Financial Insights & Tips</h2>
          <p className="sec-sub">Read our latest articles to make smarter financial decisions.</p>
        </div>

        <div className="blog-grid">
          {BLOGS.map((blog, idx) => (
            <article key={blog.id} className={`blog-card blog-reveal reveal-delay-${idx + 1}`}>
              <div className="blog-img-wrap">
                <img src={blog.image} alt={blog.title} className="blog-img" />
                <div className="blog-category">{blog.category}</div>
              </div>
              <div className="blog-content">
                <div className="blog-meta">
                  <span>{blog.date}</span>
                  <span className="dot">•</span>
                  <span>{blog.readTime}</span>
                </div>
                <h3 className="blog-title">
                  <a href={`#blog-${blog.id}`}>{blog.title}</a>
                </h3>
                <a href={`#blog-${blog.id}`} className="blog-read-more">
                  Read Article 
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
        
        <div className="blog-cta-wrap blog-reveal reveal-delay-4">
          <button className="btn btn-ghost btn-lg">View All Articles</button>
        </div>
      </div>
    </section>
  );
}
