import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, ExternalLink } from 'lucide-react';

const LinkedinIcon = ({ size = 20, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = ({ size = 20, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <Link to="/" className="logo" style={{ marginBottom: '1rem' }}>
            MOIZ<span className="logo-dot"></span>
          </Link>
          <p>
            8+ years of tech industry excellence, driving growth from graphic UI/UX design to startup building, operations scaling (6M SAR ARR), and enterprise ITSM consulting.
          </p>
          <div className="social-links">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedinIcon size={20} /></a>
            <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub"><GithubIcon size={20} /></a>
            <a href="mailto:moiz@example.com" aria-label="Email"><Mail size={20} /></a>
          </div>
        </div>

        <div className="footer-links">
          <h4>Navigation</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/portfolio">Portfolio</Link></li>
            <li><Link to="/blog">Blog & Stories</Link></li>
            <li><Link to="/tools">Tools Library</Link></li>
            <li><Link to="/admin">Admin Panel</Link></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Expertise</h4>
          <ul>
            <li>BMC Helix ITSM Upgrades</li>
            <li>Enterprise Operations Scaling</li>
            <li>Brand Strategy & Marketing</li>
            <li>UI/UX & Product Design</li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>&copy; {new Date().getFullYear()} Moiz. All rights reserved.</p>
        <p>Built with React & Supabase</p>
      </div>

      <style>{`
        .social-links {
          display: flex;
          gap: 1.25rem;
          margin-top: 1.5rem;
        }

        .social-links a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.03);
          color: var(--text-secondary);
          transition: var(--transition-normal);
        }

        .social-links a:hover {
          background: var(--primary);
          color: white;
          transform: translateY(-3px);
        }
      `}</style>
    </footer>
  );
}
