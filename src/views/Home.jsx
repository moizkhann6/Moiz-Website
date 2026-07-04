import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Send, Mail, Check } from 'lucide-react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 5000);
    }
  };

  const timelineEvents = [
    {
      year: '2026 - Present',
      role: 'Principal ITSM Consultant',
      company: 'GASCO (Saudi Arabia)',
      story: 'Consulting GASCO on upgrading, stabilizing, and re-architecting their BMC Helix ITSM systems. Implementing ITIL best practices and driving organizational adoption.'
    },
    {
      year: '2024 - 2025',
      role: 'Operations & Tech Director',
      company: 'Najoom Al Falah Trading Co. (Riyadh)',
      story: 'Expanded operations from simple electrical supplies to multi-discipline supply streams (MEP, Gym, Furniture). Scaled annual recurring revenue to 6 Million SAR, built online e-commerce channels, and onboarded enterprise clients including Saudi Aramco, Neom, and Red Sea Global.'
    },
    {
      year: '2022 - 2023',
      role: 'Founder & Director',
      company: 'Teckflux (IT Services Startup)',
      story: 'Built and scaled an IT services agency in Karachi to a 50-person team of designers, engineers, and PMs. Delivered custom CMS engines, mobile apps, and workforce management architectures to US/UK clients, peaking at $80k MRR.'
    },
    {
      year: '2021',
      role: 'Branding & Marketing Lead',
      company: 'TaskTak (US Product Company)',
      story: 'Directed product marketing and visual brand identity for TaskTak\'s Business Management Platform (BMP), translating engineering metrics into clear commercial copy.'
    },
    {
      year: '2019 - 2020',
      role: 'Graphic UI/UX Executive & Consultant',
      company: 'Logicose, Tafsol, Forsit Global (Korea), TypeB Studio (US)',
      story: 'Consulted on Amazon store interfaces, wireframed B2B landing pages, and directed executive UX strategies for local and remote companies.'
    }
  ];

  return (
    <div className="home-view animate-fade-in">
      
      {/* HERO SECTION */}
      <section className="hero-section-flat">
        <div className="container">
          <div className="hero-content-left">
            <h1>Building the Future of Digital Systems & Ventures.</h1>
            <p className="hero-sub">Entrepreneur, Designer, and Systems Architect based in Riyadh.</p>
            <div className="hero-actions-left">
              <Link to="/portfolio" className="btn btn-primary">
                View Portfolio <ArrowRight size={16} />
              </Link>
              <Link to="/about" className="btn btn-secondary">
                Read Journey
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CLIENT BRANDS */}
      <section className="brands-flat">
        <div className="container">
          <h2 className="section-title-flat">Select Client Engagements</h2>
          <div className="brands-list-flat">
            <span>Saudi Aramco</span>
            <span>Neom</span>
            <span>GASCO</span>
            <span>Red Sea Global</span>
            <span>Nike</span>
            <span>SWCC</span>
          </div>
        </div>
      </section>

      {/* ROADMAP / TIMELINE */}
      <section className="timeline-flat-section">
        <div className="container">
          <h2 className="section-title-flat">Career Focus & Timeline</h2>
          <div className="timeline-list-vertical">
            {timelineEvents.map((event, idx) => (
              <div key={idx} className="timeline-item-flat">
                <div className="timeline-meta">
                  <span className="timeline-year">{event.year}</span>
                </div>
                <div className="timeline-details">
                  <h3>{event.role}</h3>
                  <h4>{event.company}</h4>
                  <p>{event.story}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LABS SECTION */}
      <section className="labs-section">
        <div className="container">
          <h2 className="section-title-flat">Labs</h2>
          <p className="labs-desc">Automated tools, utilities, and applications currently under active research and build cycles.</p>
          
          <div className="labs-grid">
            <div className="labs-card-flat">
              <div className="labs-card-header">
                <h3>Procurement Automations</h3>
                <span className="badge-coming">Coming Soon</span>
              </div>
              <p>Building the next generation of automated procurement and efficiency tools to streamline material supply pipelines.</p>
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER SECTION */}
      <section className="newsletter-section" id="newsletter-section">
        <div className="container">
          <div className="newsletter-box-flat">
            <h2>Building in Public.</h2>
            <p>Join my newsletter for insights on systems, design, and venture building.</p>
            
            <form onSubmit={handleSubscribe} className="newsletter-form-flat">
              {subscribed ? (
                <div className="subscribe-success">
                  <Check size={18} /> <span>Subscription confirmed. Thank you.</span>
                </div>
              ) : (
                <div className="input-group-flat">
                  <input
                    type="email"
                    className="form-control newsletter-input"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="btn btn-primary btn-newsletter">
                    Subscribe <Send size={14} />
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
