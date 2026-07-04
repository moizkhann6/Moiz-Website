import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Send, Mail, Check, ChevronRight } from 'lucide-react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [activeExpTab, setActiveExpTab] = useState(0);

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

  const experienceDeck = [
    {
      year: '2026 - Present',
      role: 'Principal ITSM Consultant',
      company: 'GASCO (Riyadh)',
      metrics: 'ITSM Transformation',
      story: 'Advising National Gas & Industrialization Co. (GASCO) on critical BMC Helix ITSM architecture. Re-architecting database schemas, resolving performance bottlenecks, and guiding legacy technical engineers to adopt modern, agile ITIL-aligned operations.',
      challenge: 'Overcoming deep-rooted cultural resistance to digital systems and standardizing ticket routing across distributed utilities.'
    },
    {
      year: '2024 - 2025',
      role: 'Operations & Tech Director',
      company: 'Najoom Al Falah Trading Co. (Riyadh)',
      metrics: '6M SAR ARR Scaled',
      story: 'Expanded operations from small-scale electrical supply to full-scope industrial procurement (MEP, Gym Equipment, Mechanical, Furniture). Managed supply-chain logistics, launched their e-commerce store, and successfully onboarded tier-1 clients including Saudi Aramco, Neom, Red Sea Global, and SWCC.',
      challenge: 'Navigating complex B2B compliance and bidding audits for mega-projects in Saudi Arabia.'
    },
    {
      year: '2022 - 2023',
      role: 'Founder & Director',
      company: 'Teckflux ( Karachi)',
      metrics: 'Grew to 50-Person Agency',
      story: 'Founded and scaled an IT services startup in Karachi. Hired and aligned developers, designers, and sales representatives. Delivered custom CMS software, mobile applications, and workforce engines to US and UK clients, reaching $80k USD monthly recurring revenue.',
      challenge: 'Handling macroeconomic cash flow bottlenecks and agency scaling challenges, which eventually led to closing the startup.'
    },
    {
      year: '2021',
      role: 'Branding & Marketing Lead',
      company: 'TaskTak (US Product Company)',
      metrics: 'Product Launch & BMP Scale',
      story: 'Managed corporate branding, visual design language, and marketing assets for TaskTak\'s SaaS Business Management Platform (BMP). Aligned UX wireframes and advertising campaigns to position the software in international markets.',
      challenge: 'Simplifying complex technical database capabilities into high-converting marketing value propositions.'
    },
    {
      year: '2019 - 2020',
      role: 'Graphic UI/UX Executive & Consultant',
      company: 'Logicose, Tafsol, Forsit Global (Korea)',
      metrics: 'Global UI/UX Advisory',
      story: 'Designed executive interfaces, conducted B2B wireframing tests, and consulted Korean firm Forsit Global on remote Amazon e-commerce store visuals. Directed cross-functional team designs for US agencies.',
      challenge: 'Managing remote stakeholder requirements and balancing strict visual quality with development sprint timings.'
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

      {/* CLIENT BRANDS (Infinite Unlimited Scrolling Marquee) */}
      <section className="brands-flat">
        <div className="container">
          <h2 className="section-title-flat">Select Client Engagements</h2>
        </div>
        <div className="marquee-container">
          <div className="marquee-content">
            {/* First Set */}
            <span>Saudi Aramco</span>
            <span>Neom</span>
            <span>GASCO</span>
            <span>Red Sea Global</span>
            <span>Nike</span>
            <span>SWCC</span>
            <span>Al Khorayef Group</span>
            <span>Crowdwrks</span>
            
            {/* Duplicated Set for Infinite Loop */}
            <span>Saudi Aramco</span>
            <span>Neom</span>
            <span>GASCO</span>
            <span>Red Sea Global</span>
            <span>Nike</span>
            <span>SWCC</span>
            <span>Al Khorayef Group</span>
            <span>Crowdwrks</span>
          </div>
        </div>
      </section>

      {/* INTERACTIVE EXPERIENCE DECK (Replaces CV timeline) */}
      <section className="timeline-flat-section">
        <div className="container">
          <h2 className="section-title-flat">Career Focus & Milestones</h2>
          
          <div className="exp-deck-grid">
            {/* Tab Selector Sidebar */}
            <div className="exp-sidebar">
              {experienceDeck.map((exp, idx) => (
                <button
                  key={idx}
                  className={`exp-tab-btn ${activeExpTab === idx ? 'active' : ''}`}
                  onClick={() => setActiveExpTab(idx)}
                >
                  <span>{exp.company.split(' ')[0]}</span>
                  <span className="exp-tab-year">{exp.year.split(' ')[0]}</span>
                </button>
              ))}
            </div>

            {/* Selected Card display */}
            <div className="exp-card-flat animate-fade-in" key={activeExpTab}>
              <div>
                <div className="exp-meta-row">
                  <span>{experienceDeck[activeExpTab].year}</span>
                  <span>{experienceDeck[activeExpTab].company}</span>
                </div>
                <div className="exp-card-header">
                  <h3>{experienceDeck[activeExpTab].role}</h3>
                  <h4>{experienceDeck[activeExpTab].metrics}</h4>
                </div>
                <div className="exp-body-flat">
                  <p>{experienceDeck[activeExpTab].story}</p>
                  <p><strong>Core Challenge:</strong> {experienceDeck[activeExpTab].challenge}</p>
                </div>
              </div>
              
              <div className="exp-metrics-badge">
                <Check size={16} /> <span>Verified Achievement</span>
              </div>
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
