import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Award, Briefcase, Users, FileText, Send, Calendar, ShieldCheck, Heart, Sparkles, TrendingUp, Settings, Palette } from 'lucide-react';
import { db } from '../lib/db';

export default function Home() {
  const [selectedTimeline, setSelectedTimeline] = useState(4); // Default to Teckflux/Najoom scale
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', service: 'ITSM Consulting (BMC Helix)', message: '' });

  useEffect(() => {
    async function loadData() {
      try {
        const data = await db.getConsultingServices();
        setServices(data);
      } catch (err) {
        console.error("Error loading services", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (contactForm.name && contactForm.email && contactForm.message) {
      setContactSubmitted(true);
      setTimeout(() => {
        setContactSubmitted(false);
        setContactForm({ name: '', email: '', service: 'ITSM Consulting (BMC Helix)', message: '' });
      }, 5000);
    }
  };

  const timelineEvents = [
    {
      year: '2018',
      role: 'Graphic Designer',
      company: 'Technexia',
      location: 'Karachi, Pakistan',
      tag: 'Creative Roots',
      story: 'Started my career designing interfaces and commercial graphics, building the baseline knowledge of user visuals, alignments, and branding.',
      struggle: 'Learning to transition from static graphic design elements to user-centered interactive design rules while managing tight delivery schedules.',
      takeaway: 'Great design is not how it looks, but how it works and communicates.'
    },
    {
      year: '2019 - 2020',
      role: 'Graphic UI/UX Executive & Consultant',
      company: 'Logicose, Tafsol, Forsit Global (Korea), TypeB Studio (US)',
      location: 'Karachi & Remote',
      tag: 'Global Collaborations',
      story: 'Stepped into leadership design roles. Consulted Korean company Forsit Global on Amazon store designs and collaborated remotely with US-based TypeB Studio. Managed UX architecture for local agencies.',
      struggle: 'Navigating different timezones and diverse team expectations. Designing for a global client base meant understanding specific regional B2B and B2C purchasing behaviors.',
      takeaway: 'Empathy in design requires stepping out of your own cultural environment completely.'
    },
    {
      year: '2021',
      role: 'Branding & Marketing Lead',
      company: 'TaskTak (US Product Company)',
      location: 'Karachi Branch',
      tag: 'Product Launch',
      story: 'Took over the branding and marketing operations for TaskTak\'s Business Management Platform (BMP). Spearheaded visual campaigns to present complex database systems as clean, modern solutions.',
      struggle: 'Bridging the gap between software engineers\' technical definitions and marketing communication that business managers could easily digest.',
      takeaway: 'Marketing is not about selling features; it is about selling the relief of a solved problem.'
    },
    {
      year: '2022 - 2023',
      role: 'Founder & Director',
      company: 'Teckflux (IT Services Startup)',
      location: 'Karachi, Pakistan',
      tag: 'Entrepreneurship & Scaling',
      story: 'Built my own IT services startup from scratch. Scaled it to a 50-person team including developers, PMs, and sales. Hit $80,000 monthly recurring revenue. Worked with top-tier global brands like NIKE and Crowdwrks, delivering custom CMS, mobile apps, and workforce management suites.',
      struggle: 'Faced sudden cash flow issues and operational bottlenecks due to rapid hiring and external macroeconomic shifts, which ultimately led us to close down operations. It was a crushing failure but my greatest business classroom.',
      takeaway: 'Revenue is vanity, profit is sanity, but cash flow is king. Never scale team size faster than recurring client payments.'
    },
    {
      year: '2024 - 2025',
      role: 'Operations & Tech Director',
      company: 'Najoom Al Falah Trading Co.',
      location: 'Riyadh, Saudi Arabia',
      tag: 'Hyper-Growth & Operations',
      story: 'Relocated to Saudi Arabia. Joined a modest building material supplier with electrical-only products. Re-engineered the supply chain into MEP, Mechanical, Gym Equipment, and Furniture. Built an e-commerce store, launched a corporate identity, and onboarded Aramco, Neom, Red Sea Global, and SWCC. Scaled ARR to 6 Million SAR.',
      struggle: 'Adapting to the strict regulatory, compliance, and billing systems of massive entities like Saudi Aramco and government bodies in a short time frame.',
      takeaway: 'The size of your client list is directly determined by the scale of trust and reliability your operations project.'
    },
    {
      year: '2026 - Present',
      role: 'Principal ITSM Consultant',
      company: 'GASCO (National Gas & Industrialization Co.)',
      location: 'Riyadh, Saudi Arabia',
      tag: 'Enterprise Architecture',
      story: 'Currently advising GASCO on their critical BMC Helix ITSM software suite. Fixing high-priority performance bugs, overseeing server migrations, upgrading systems to latest secure versions, and establishing a robust ITIL service culture.',
      struggle: 'Changing corporate mindsets. Tech upgrade is easy; shifting 100+ legacy support engineers to embrace an agile, modern ITSM service flow is the real challenge.',
      takeaway: 'True digital transformation is about transforming people first, processes second, and systems third.'
    }
  ];

  return (
    <div className="home-view animate-fade-in">
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-content">
            <div className="hero-badge">
              <Sparkles size={16} className="sparkle-icon" /> 8 Years of Enterprise Execution
            </div>
            <h1>
              I build products, scale companies, and stabilize <span className="gradient-text">Enterprise ITSM systems.</span>
            </h1>
            <p className="hero-lead">
              From creative UI/UX designer to agency founder (Teckflux - 50 staff, $80k MRR) and Operations Director (Najoom Al Falah - 6M SAR ARR). Currently transforming ITSM architecture at GASCO.
            </p>
            <div className="hero-actions">
              <Link to="/portfolio" className="btn btn-primary">
                View My Portfolio <ArrowRight size={18} />
              </Link>
              <a href="#consulting-section" className="btn btn-secondary">
                Consulting Services
              </a>
            </div>
          </div>
          <div className="hero-stats">
            <div className="stat-card glass-panel">
              <TrendingUp className="stat-icon icon-purple" />
              <h3>6 Million SAR</h3>
              <p>ARR scaled for Najoom Al Falah</p>
            </div>
            <div className="stat-card glass-panel">
              <Users className="stat-icon icon-emerald" />
              <h3>50+ Team</h3>
              <p>Managed as Founder at Teckflux</p>
            </div>
            <div className="stat-card glass-panel">
              <Settings className="stat-icon icon-amber" />
              <h3>BMC Helix</h3>
              <p>ITSM Consulting for GASCO KSA</p>
            </div>
          </div>
        </div>
      </section>

      {/* BRANDS WE TRUST */}
      <section className="brands-section">
        <div className="container">
          <h2 className="section-subtitle">COMPANIES & CLIENTS I HAVE BUILT FOR</h2>
          <div className="brands-slider">
            <div className="brand-logo">NIKE</div>
            <div className="brand-logo">SAUDI ARAMCO</div>
            <div className="brand-logo">NEOM</div>
            <div className="brand-logo">GASCO</div>
            <div className="brand-logo">RED SEA GLOBAL</div>
            <div className="brand-logo">CROWDWRKS</div>
            <div className="brand-logo">SWCC</div>
          </div>
        </div>
      </section>

      {/* STORY & INTERACTIVE TIMELINE */}
      <section className="timeline-section">
        <div className="container">
          <div className="section-header">
            <h2>The Career Journey</h2>
            <p>From visual designs to multi-million SAR operations. Click on each chapter to reveal my stories, struggles, and core takeaways.</p>
          </div>

          <div className="timeline-interactive-container">
            {/* Timeline Horizontal Line / Controls */}
            <div className="timeline-nav-row">
              {timelineEvents.map((event, idx) => (
                <button
                  key={idx}
                  className={`timeline-dot-btn ${selectedTimeline === idx ? 'active' : ''}`}
                  onClick={() => setSelectedTimeline(idx)}
                >
                  <span className="dot-year">{event.year}</span>
                  <span className="dot-circle"></span>
                  <span className="dot-company">{event.company.split(' ')[0]}</span>
                </button>
              ))}
            </div>

            {/* Selected Chapter Story Detail (The ME part) */}
            <div className="timeline-story-box glass-panel animate-fade-in" key={selectedTimeline}>
              <div className="story-header">
                <div>
                  <span className="story-tag">{timelineEvents[selectedTimeline].tag}</span>
                  <h3>{timelineEvents[selectedTimeline].role}</h3>
                  <h4 className="gradient-text">{timelineEvents[selectedTimeline].company}</h4>
                </div>
                <div className="story-meta">
                  <span className="story-loc">{timelineEvents[selectedTimeline].location}</span>
                </div>
              </div>

              <div className="story-body-grid">
                <div className="story-block">
                  <h5 className="block-title"><Briefcase size={16} /> The Growth & Success</h5>
                  <p>{timelineEvents[selectedTimeline].story}</p>
                </div>
                <div className="story-block">
                  <h5 className="block-title warning-title"><Heart size={16} /> The Struggle & Failures</h5>
                  <p>{timelineEvents[selectedTimeline].struggle}</p>
                </div>
                <div className="story-block full-width">
                  <h5 className="block-title success-title"><Award size={16} /> The Key Takeaway</h5>
                  <p className="highlight-takeaway">"{timelineEvents[selectedTimeline].takeaway}"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONSULTING DECK */}
      <section className="consulting-section" id="consulting-section">
        <div className="container">
          <div className="section-header">
            <h2>Strategy & Consulting Services</h2>
            <p>I help organizations scale operations, implement user-centric software, and stabilize core enterprise ITSM workflows.</p>
          </div>

          {loading ? (
            <div className="spinner"></div>
          ) : (
            <div className="consulting-grid">
              {services.map((service, idx) => (
                <div key={service.id || idx} className="consulting-card glass-panel">
                  <div className="consulting-icon-wrap">
                    {service.icon === 'TrendingUp' && <TrendingUp size={28} className="icon-purple" />}
                    {service.icon === 'Settings' && <Settings size={28} className="icon-emerald" />}
                    {service.icon === 'Palette' && <Palette size={28} className="icon-amber" />}
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ul className="benefits-list">
                    {service.benefits.map((benefit, bIdx) => (
                      <li key={bIdx}><ChevronRight size={14} className="bullet-chevron" /> {benefit}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* DYNAMIC CONSULTING ESTIMATOR & FORM */}
          <div className="consulting-booking glass-panel">
            <div className="booking-info">
              <h3>Let's Align Your Strategy</h3>
              <p>Whether you need to upgrade and stabilize BMC Helix, structure a 50+ person agency, scale supply chain operations, or layout high-converting product designs, let's schedule an audit.</p>
              <div className="booking-points">
                <div className="point-item">
                  <ShieldCheck size={20} className="icon-emerald" />
                  <span>Immediate workflow audit</span>
                </div>
                <div className="point-item">
                  <Calendar size={20} className="icon-purple" />
                  <span>Interactive consulting scope roadmap</span>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleContactSubmit} className="booking-form">
              {contactSubmitted ? (
                <div className="success-banner">
                  <Award size={32} />
                  <h4>Request Submitted!</h4>
                  <p>Thanks Moiz here, I will review your business context and get back to you within 24 hours.</p>
                </div>
              ) : (
                <>
                  <div className="form-group">
                    <label htmlFor="name">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      className="form-control"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      required
                      placeholder="e.g. John Doe"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Work Email</label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      required
                      placeholder="john@company.com"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="service">Focus Area</label>
                    <select
                      id="service"
                      className="form-control"
                      value={contactForm.service}
                      onChange={(e) => setContactForm({ ...contactForm, service: e.target.value })}
                    >
                      <option value="ITSM Consulting (BMC Helix)">ITSM Consulting (BMC Helix)</option>
                      <option value="Business Strategy & Scaling">Business Strategy & Scaling</option>
                      <option value="Product UX & Brand Strategy">Product UX & Brand Design</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Briefly outline your challenges</label>
                    <textarea
                      id="message"
                      rows="4"
                      className="form-control"
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      required
                      placeholder="Describe current system bottleneck, organizational size, or design requirements..."
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary btn-submit">
                    Send Consult Request <Send size={16} />
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
