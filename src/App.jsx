import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './views/Home';
import About from './views/About';
import Portfolio from './views/Portfolio';
import Blog from './views/Blog';
import Tools from './views/Tools';
import Admin from './views/Admin';
import { db } from './lib/db';

// Scroll to Top Helper on navigation
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

// Custom Cursor component (Active on desktop pointers)
function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [ringPosition, setRingPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target;
      if (!target) return;

      const isClickable = target.closest('a') || 
                         target.closest('button') || 
                         target.closest('.btn') || 
                         target.closest('.nav-link') ||
                         target.closest('.exp-tab-btn') ||
                         target.closest('.blog-card') ||
                         target.closest('.portfolio-card') ||
                         window.getComputedStyle(target).cursor === 'pointer';
      
      setIsHovering(!!isClickable);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Soft elastic lag transition for the outer cursor ring
  useEffect(() => {
    let animFrame;
    const updateRing = () => {
      setRingPosition((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15
        };
      });
      animFrame = requestAnimationFrame(updateRing);
    };
    animFrame = requestAnimationFrame(updateRing);
    return () => cancelAnimationFrame(animFrame);
  }, [position]);

  if (!isVisible) return null;

  return (
    <>
      <div 
        className={`custom-cursor-dot ${isHovering ? 'hovering' : ''}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      <div 
        className={`custom-cursor-ring ${isHovering ? 'hovering' : ''}`}
        style={{ left: `${ringPosition.x}px`, top: `${ringPosition.y}px` }}
      />
    </>
  );
}

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const [settings, setSettings] = useState({ maintenance_mode: true });
  const [loading, setLoading] = useState(true);

  // Sync settings database variables
  useEffect(() => {
    db.getSettings()
      .then((data) => {
        if (data) setSettings(data);
      })
      .catch((err) => console.error("Failed to load App settings:", err))
      .finally(() => setLoading(false));
  }, [location.pathname]); // Re-check if navigation paths shift

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ffffff', fontFamily: 'sans-serif', color: '#475569' }}>
        Loading experience...
      </div>
    );
  }

  // If maintenance mode is active and we are not in admin, render the full-screen landing banner
  if (settings.maintenance_mode && !isAdminRoute) {
    return (
      <div className="coming-soon-container">
        <div className="coming-soon-content">
          <span className="coming-soon-badge">« Systems Architect & Venture Builder »</span>
          <h1>Moiz Riaz</h1>
          <p className="coming-soon-sub">Building the Next Generation of Digital Systems & Ventures.</p>
          <div className="coming-soon-divider"></div>
          <p className="coming-soon-status">
            We are currently building and refining new digital experiences. Our platforms are under construction and will launch soon.
          </p>
          <div className="coming-soon-footer">
            <span className="logo-dot"></span> moizriaz.net
          </div>
        </div>
        <style>{`
          .coming-soon-container {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            background: #ffffff;
            padding: 2rem;
            font-family: var(--font-heading), sans-serif;
            text-align: center;
            color: #0f172a;
          }
          .coming-soon-content {
            max-width: 600px;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .coming-soon-badge {
            background: rgba(45, 212, 191, 0.12);
            color: #0d9488;
            font-family: monospace;
            font-size: 0.75rem;
            font-weight: 700;
            padding: 0.35rem 0.75rem;
            border-radius: 999px;
            margin-bottom: 1.5rem;
            letter-spacing: -0.2px;
          }
          .coming-soon-content h1 {
            font-size: 3.5rem;
            font-weight: 800;
            letter-spacing: -1.5px;
            margin-bottom: 0.75rem;
            line-height: 1.1;
          }
          .coming-soon-sub {
            font-size: 1.25rem;
            color: #475569;
            margin-bottom: 2rem;
            line-height: 1.5;
            font-weight: 500;
          }
          .coming-soon-divider {
            width: 60px;
            height: 1px;
            background: #cbd5e1;
            margin-bottom: 2rem;
          }
          .coming-soon-status {
            font-size: 0.95rem;
            color: #64748b;
            line-height: 1.75;
            margin-bottom: 3rem;
          }
          .coming-soon-footer {
            font-size: 0.8rem;
            font-weight: 700;
            color: #94a3b8;
            display: flex;
            align-items: center;
            gap: 0.35rem;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .coming-soon-footer .logo-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #2dd4bf;
          }
          @media (max-width: 480px) {
            .coming-soon-content h1 {
              font-size: 2.5rem;
            }
            .coming-soon-sub {
              font-size: 1.1rem;
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="app-layout">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <CustomCursor />
      <AppContent />
      <style>{`
        .app-layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        .main-content {
          flex-grow: 1;
        }
      `}</style>
    </Router>
  );
}
