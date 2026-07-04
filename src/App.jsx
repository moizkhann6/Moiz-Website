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

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <CustomCursor />
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
