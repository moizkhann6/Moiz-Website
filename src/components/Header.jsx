import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="navbar">
      <div className="container nav-container">
        <Link to="/" className="logo" onClick={closeMenu}>
          MOIZ<span className="logo-dot"></span>
        </Link>

        {/* Desktop Nav */}
        <nav className="nav-links desktop-only">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Home
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            About
          </NavLink>
          <NavLink to="/portfolio" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Portfolio
          </NavLink>
          <a href="/#newsletter-section" className="nav-link">
            Newsletter
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button className="mobile-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Mobile Nav Overlay */}
        {isOpen && (
          <div className="mobile-nav-overlay">
            <nav className="mobile-nav-links">
              <Link to="/" className="mobile-nav-link" onClick={closeMenu}>
                Home
              </Link>
              <Link to="/about" className="mobile-nav-link" onClick={closeMenu}>
                About
              </Link>
              <Link to="/portfolio" className="mobile-nav-link" onClick={closeMenu}>
                Portfolio
              </Link>
              <a href="/#newsletter-section" className="mobile-nav-link" onClick={closeMenu}>
                Newsletter
              </a>
            </nav>
          </div>
        )}
      </div>

      <style>{`
        .desktop-only {
          display: flex;
        }
        
        .mobile-toggle {
          display: none;
          background: none;
          border: none;
          color: var(--text-primary);
          cursor: pointer;
          padding: 0.5rem;
          z-index: 101;
        }

        /* Mobile Nav styling */
        @media (max-width: 768px) {
          .desktop-only {
            display: none;
          }
          
          .mobile-toggle {
            display: block;
          }

          .mobile-nav-overlay {
            position: fixed;
            top: 70px; /* Right below the header */
            left: 0;
            right: 0;
            bottom: 0;
            background: var(--bg-primary);
            z-index: 99;
            display: flex;
            align-items: flex-start;
            padding: 3rem 2rem;
            border-top: 1px solid var(--border-light);
          }

          .mobile-nav-links {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 1.75rem;
            width: 100%;
          }

          .mobile-nav-link {
            font-family: var(--font-heading);
            font-size: 1.25rem;
            font-weight: 700;
            color: var(--text-secondary);
            width: 100%;
            border-bottom: 1px solid var(--border-light);
            padding-bottom: 0.5rem;
          }

          .mobile-nav-link-disabled {
            font-family: var(--font-heading);
            font-size: 1.25rem;
            font-weight: 600;
            color: var(--text-muted);
            width: 100%;
            border-bottom: 1px solid var(--border-light);
            padding-bottom: 0.5rem;
          }
        }
      `}</style>
    </header>
  );
}
