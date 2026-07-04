import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const links = [
    { path: '/', label: 'Home' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/blog', label: 'Blog' },
    { path: '/tools', label: 'Tools' },
    { path: '/admin', label: 'Admin Panel' }
  ];

  return (
    <header className="navbar">
      <div className="container nav-container">
        <Link to="/" className="logo" onClick={closeMenu}>
          MOIZ<span className="logo-dot"></span>
        </Link>

        {/* Desktop Nav */}
        <nav className="nav-links desktop-only">
          {links.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
          <a href="#consulting-section" className="btn btn-primary btn-nav">
            Consulting <ArrowUpRight size={16} />
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button className="mobile-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Nav Overlay */}
        {isOpen && (
          <div className="mobile-nav-overlay animate-fade-in">
            <nav className="mobile-nav-links">
              {links.map(link => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  {link.label}
                </NavLink>
              ))}
              <a href="#consulting-section" className="btn btn-primary" onClick={closeMenu}>
                Consulting <ArrowUpRight size={16} />
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

        .btn-nav {
          padding: 0.5rem 1.25rem;
          font-size: 0.85rem;
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
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            height: 100vh;
            background: var(--bg-primary);
            z-index: 99;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .mobile-nav-links {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2rem;
            width: 100%;
          }

          .mobile-nav-link {
            font-family: var(--font-heading);
            font-size: 1.5rem;
            font-weight: 600;
            color: var(--text-secondary);
          }

          .mobile-nav-link.active {
            color: var(--primary);
          }
        }
      `}</style>
    </header>
  );
}
