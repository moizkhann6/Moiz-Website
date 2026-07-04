import React from 'react';
import { ArrowRight, Box, Layers, Cpu, Award } from 'lucide-react';

export default function About() {
  return (
    <div className="about-view container animate-fade-in">
      <div className="page-header-left">
        <span className="about-badge">About Me</span>
        <h1>Architecting Systems & Scaling Ventures</h1>
        <p>A look into my journey from managing industrial supply chains to building software products and stabilizing enterprise environments.</p>
      </div>

      <div className="about-grid">
        {/* Storytelling Column */}
        <div className="story-column">
          <section className="story-section">
            <h2 className="story-heading">1. The Creative Foundation</h2>
            <p className="story-paragraph">
              My career began in design. As a Graphic and UI/UX Designer, I learned to translate complex business workflows into simple visual experiences. Working with companies like Logicose, Tafsol, and consulting with international firms like Forsit Global (Korea) and TypeB Studio (US) taught me how design influences product conversion rates and B2B buyer behavior.
            </p>
          </section>

          <section className="story-section">
            <h2 className="story-heading">2. Venture Building & Growth</h2>
            <p className="story-paragraph">
              Applying design-led product strategies, I joined US-based TaskTak to lead branding and marketing for their Business Management Platform (BMP). 
            </p>
            <p className="story-paragraph">
              Shortly after, I founded **Teckflux** in Karachi. Over two years, I scaled the agency to a 50-person team of engineers, designers, and project managers. We successfully delivered CMS architectures, mobile apps, and custom workforce systems to global clients, hitting $80k MRR. Having to close the business due to market shifts provided me with invaluable lessons in cash-flow resilience and team alignment.
            </p>
          </section>

          <section className="story-section">
            <h2 className="story-heading">3. Industrial Supply & E-Commerce Scaling</h2>
            <p className="story-paragraph">
              Moving to Riyadh, Saudi Arabia, I transitioned to a completely different domain: industrial B2B operations at **Najoom Al Falah Trading Co**. When I joined, they operated a small electrical supply office.
            </p>
            <p className="story-paragraph">
              I expanded their operational catalog into MEP, mechanical equipment, furniture, and gym supplies. I established their digital footprint, built their online e-commerce infrastructure, and onboarded enterprise clients like Saudi Aramco, Neom, Red Sea Global, and SWCC—scaling their annual recurring revenue to 6 Million SAR.
            </p>
          </section>

          <section className="story-section">
            <h2 className="story-heading">4. Enterprise Systems Engineering</h2>
            <p className="story-paragraph">
              Today, I operate as a Principal ITSM Consultant, advising organizations like **GASCO** (National Gas & Industrialization Co.) on upgrading, stabilizing, and rebuilding critical BMC Helix ITSM environments. My work combines database architecture, API integration, and shifting organizational culture toward modern ITIL service standards.
            </p>
          </section>
        </div>

        {/* Info/Stats Column */}
        <div className="stats-column">
          <div className="flat-card">
            <h3>Venture Metrics</h3>
            <ul className="stats-list">
              <li>
                <strong>6M SAR</strong>
                <span>Annual recurring revenue scaled for Najoom Al Falah</span>
              </li>
              <li>
                <strong>$80k MRR</strong>
                <span>Peak monthly recurring revenue achieved as Founder at Teckflux</span>
              </li>
              <li>
                <strong>50+ Staff</strong>
                <span>Engineers, designers, and PMs managed globally</span>
              </li>
            </ul>
          </div>

          <div className="flat-card">
            <h3>Core Principles</h3>
            <ul className="principles-list">
              <li>
                <strong>Left-Aligned Execution:</strong> Clear, readable, and structured systems build trust.
              </li>
              <li>
                <strong>People Over Processes:</strong> System architecture only succeeds if the cultural adoption matches it.
              </li>
              <li>
                <strong>Resilient Scaling:</strong> Revenue is vanity; solid cash flow and margin control are the foundations of venture survival.
              </li>
            </ul>
          </div>

          <div className="flat-card">
            <h3>Focus Areas</h3>
            <div className="tech-pills">
              <span>BMC Helix</span>
              <span>ITSM/ITIL</span>
              <span>Venture Strategy</span>
              <span>UX Architecture</span>
              <span>Supply Chain Operations</span>
              <span>E-Commerce Infrastructure</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about-view {
          padding-top: 8rem;
          min-height: 100vh;
        }

        .about-badge {
          display: inline-block;
          background: var(--bg-tertiary);
          color: var(--text-secondary);
          font-size: 0.8rem;
          font-weight: 700;
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-sm);
          text-transform: uppercase;
          margin-bottom: 0.75rem;
          border: 1px solid var(--border-light);
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 4rem;
        }

        @media (max-width: 992px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
        }

        .story-section {
          margin-bottom: 3rem;
          border-left: 2px solid var(--border-light);
          padding-left: 1.5rem;
        }

        .story-heading {
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .story-paragraph {
          color: var(--text-secondary);
          font-size: 1rem;
          line-height: 1.7;
          margin-bottom: 1rem;
        }

        .flat-card {
          border: 1px solid var(--border-light);
          padding: 2rem;
          margin-bottom: 2rem;
          border-radius: var(--radius-md);
          background: var(--bg-secondary);
        }

        .flat-card h3 {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-bottom: 1px solid var(--border-light);
          padding-bottom: 0.5rem;
        }

        .stats-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .stats-list li strong {
          font-size: 1.75rem;
          font-family: var(--font-heading);
          display: block;
          color: var(--text-primary);
          line-height: 1.1;
        }

        .stats-list li span {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .principles-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .principles-list li {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .principles-list li strong {
          display: block;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .tech-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .tech-pills span {
          font-size: 0.75rem;
          font-weight: 600;
          background: var(--bg-primary);
          color: var(--text-secondary);
          border: 1px solid var(--border-light);
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-sm);
        }
      `}</style>
    </div>
  );
}
