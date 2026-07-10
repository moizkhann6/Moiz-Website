import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { db } from '../lib/db';
import { useMagnetic } from '../hooks/useMagnetic';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [settings, setSettings] = useState({
    nav_links: [
      { label: 'Home', path: '/' },
      { label: 'About', path: '/about' },
      { label: 'Portfolio', path: '/portfolio' },
      { label: 'Labs', path: '/#labs-section' },
      { label: 'Newsletter', path: '/#newsletter-section' }
    ],
    consultation_label: 'Book a Consultation',
    consultation_path: '#newsletter-section',
    animations_enabled: true
  });

  // Track window scroll offset to trigger shrinking effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    db.getSettings().then(data => {
      if (data) setSettings(data);
    }).catch(err => console.error("Error loading header settings:", err));
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Apply cursor magnetic pull factor
  const magneticRef = useMagnetic(settings.animations_enabled);

  // Helper to handle external vs internal paths
  const renderLink = (link, isMobile = false) => {
    const isExternal = link.path.startsWith('http') || link.path.startsWith('#') || link.path.includes('#');
    
    const className = isMobile 
      ? "mobile-nav-link" 
      : "nav-link";

    if (isExternal) {
      return (
        <a 
          key={link.label} 
          href={link.path} 
          className={className} 
          onClick={closeMenu}
        >
          {link.label}
        </a>
      );
    }

    return (
      <NavLink 
        key={link.label} 
        to={link.path} 
        className={({ isActive }) => `${className} ${isActive ? 'active' : ''}`}
        onClick={closeMenu}
        end
      >
        {link.label}
      </NavLink>
    );
  };

  return (
    <header className={`navbar ${scrolled ? 'shrunk' : ''}`}>
      <div className="container nav-container">
        {/* Brand Logo */}
        <Link to="/" className="logo" onClick={closeMenu}>
          MOIZ<span className="logo-dot"></span>
        </Link>

        {/* Center Pill Nav Links (Desktop) */}
        <div className="nav-links-wrapper desktop-only">
          <nav className="nav-links">
            {settings.nav_links.map(link => renderLink(link))}
          </nav>
        </div>

        {/* Right CTA Button (Desktop) */}
        <div className="desktop-only">
          <a 
            ref={magneticRef}
            href={settings.consultation_path} 
            className="btn-consultation"
          >
            {settings.consultation_label}
          </a>
        </div>

        {/* Mobile Toggle Button */}
        <button className="mobile-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Mobile Nav Overlay Menu */}
        {isOpen && (
          <div className="mobile-nav-overlay animate-fade-in">
            <nav className="mobile-nav-links">
              {settings.nav_links.map(link => renderLink(link, true))}
              <a 
                href={settings.consultation_path} 
                className="btn-consultation" 
                style={{ textAlign: 'center', marginTop: '1rem', width: '100%' }}
                onClick={closeMenu}
              >
                {settings.consultation_label}
              </a>
            </nav>
          </div>
        )}
      </div>

      <style>{`
        .desktop-only {
          display: flex;
          align-items: center;
        }
        
        .mobile-toggle {
          display: none;
          background: none;
          border: none;
          color: var(--text-primary);
          cursor: pointer;
          padding: 0.5rem;
          z-index: 1001;
        }

        @media (max-width: 768px) {
          .desktop-only {
            display: none;
          }
          
          .mobile-toggle {
            display: block;
          }

          .mobile-nav-overlay {
            position: fixed;
            top: 85px;
            left: 5%;
            right: 5%;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(15, 23, 42, 0.08);
            border-radius: 20px;
            box-shadow: 0 20px 45px rgba(15, 23, 42, 0.08);
            z-index: 999;
            display: flex;
            align-items: flex-start;
            padding: 2.5rem 2rem;
          }

          .mobile-nav-links {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 1.5rem;
            width: 100%;
          }

          .mobile-nav-link {
            font-family: var(--font-heading);
            font-size: 1.15rem;
            font-weight: 700;
            color: var(--text-secondary);
            width: 100%;
            border-bottom: 1px solid var(--border-light);
            padding-bottom: 0.5rem;
            text-align: left;
          }
        }
      `}</style>
    </header>
  );
}
