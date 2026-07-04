import React, { useState, useEffect } from 'react';
import { db } from '../lib/db';
import { ExternalLink, X, Grid, Award, Layers } from 'lucide-react';

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPortfolio() {
      try {
        const data = await db.getPortfolio();
        setProjects(data);
      } catch (err) {
        console.error("Failed to load portfolio items", err);
      } finally {
        setLoading(false);
      }
    }
    loadPortfolio();
  }, []);

  const categories = ['All', 'UI/UX Design', 'Branding & Marketing', 'Web Apps', 'ITSM & Enterprise'];

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <div className="portfolio-view container animate-fade-in">
      <div className="page-header">
        <h1 className="gradient-text">Project Showcase</h1>
        <p>A compilation of UX design, branding campaigns, e-commerce channels, and large-scale enterprise system stabilization over the last 8 years.</p>
      </div>

      {/* Filter Tabs */}
      <div className="filter-tabs">
        {categories.map(cat => (
          <button
            key={cat}
            className={`filter-tab ${filter === cat ? 'active' : ''}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="portfolio-grid">
          {filteredProjects.length === 0 ? (
            <div className="empty-state glass-panel">
              <Layers size={48} className="icon-muted" />
              <h3>No projects found</h3>
              <p>Try changing your filter category or check the Admin Panel.</p>
            </div>
          ) : (
            filteredProjects.map(project => (
              <div
                key={project.id}
                className="portfolio-card glass-panel"
                onClick={() => setSelectedProject(project)}
              >
                <div className="card-image-wrap">
                  {project.image_url ? (
                    <img src={project.image_url} alt={project.title} className="card-img" />
                  ) : (
                    <div className="img-placeholder">{project.category}</div>
                  )}
                  <span className="card-badge">{project.category}</span>
                </div>
                <div className="card-body">
                  <h3>{project.title}</h3>
                  <p className="card-desc">{project.description}</p>
                  <div className="card-tech">
                    {project.tech_stack.slice(0, 3).map((tech, idx) => (
                      <span key={idx} className="tech-tag">{tech}</span>
                    ))}
                    {project.tech_stack.length > 3 && (
                      <span className="tech-tag-more">+{project.tech_stack.length - 3}</span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Detail Modal */}
      {selectedProject && (
        <div className="modal-overlay animate-fade-in" onClick={() => setSelectedProject(null)}>
          <div className="modal-content glass-panel animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProject(null)} aria-label="Close modal">
              <X size={20} />
            </button>
            <div className="modal-body-grid">
              <div className="modal-img-container">
                {selectedProject.image_url ? (
                  <img src={selectedProject.image_url} alt={selectedProject.title} className="modal-img" />
                ) : (
                  <div className="modal-img-placeholder">{selectedProject.category}</div>
                )}
              </div>
              <div className="modal-details-container">
                <span className="modal-badge">{selectedProject.category}</span>
                <h2>{selectedProject.title}</h2>
                
                <div className="modal-meta-grid">
                  {selectedProject.client && (
                    <div className="meta-item">
                      <strong>Client:</strong> <span>{selectedProject.client}</span>
                    </div>
                  )}
                  <div className="meta-item">
                    <strong>My Role:</strong> <span>{selectedProject.role}</span>
                  </div>
                </div>

                <div className="modal-section">
                  <h3>Overview</h3>
                  <p>{selectedProject.description}</p>
                </div>

                <div className="modal-section">
                  <h3>Key Outcome & Metrics</h3>
                  <div className="outcome-block">
                    <Award size={18} className="icon-emerald" />
                    <p>{selectedProject.results}</p>
                  </div>
                </div>

                <div className="modal-section">
                  <h3>Technologies & Frameworks</h3>
                  <div className="tech-tags-list">
                    {selectedProject.tech_stack.map((tech, idx) => (
                      <span key={idx} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>

                {selectedProject.link && (
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary modal-link-btn"
                  >
                    Launch Project <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .portfolio-view {
          padding-top: 8rem;
          min-height: 100vh;
        }

        .page-header {
          text-align: center;
          max-width: 700px;
          margin: 0 auto 3rem;
        }

        .page-header h1 {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 1rem;
        }

        .page-header p {
          color: var(--text-secondary);
          font-size: 1.1rem;
        }

        .filter-tabs {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .filter-tab {
          padding: 0.6rem 1.5rem;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-light);
          background: var(--bg-secondary);
          color: var(--text-secondary);
          cursor: pointer;
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 0.9rem;
          transition: var(--transition-normal);
        }

        .filter-tab:hover {
          color: var(--text-primary);
          border-color: var(--text-muted);
        }

        .filter-tab.active {
          background: var(--grad-primary);
          color: white;
          border-color: transparent;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
        }

        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2.5rem;
        }

        @media (max-width: 768px) {
          .portfolio-grid {
            grid-template-columns: 1fr;
          }
        }

        .portfolio-card {
          cursor: pointer;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .card-image-wrap {
          position: relative;
          height: 240px;
          background: var(--bg-tertiary);
          overflow: hidden;
        }

        .card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition-slow);
        }

        .portfolio-card:hover .card-img {
          transform: scale(1.05);
        }

        .img-placeholder {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-heading);
          font-weight: 700;
          color: var(--text-muted);
          background: linear-gradient(135deg, rgba(99,102,241,0.05) 0%, rgba(5,150,105,0.05) 100%);
        }

        .card-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: var(--bg-secondary);
          color: var(--text-primary);
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          font-weight: 700;
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--border-light);
        }

        .card-body {
          padding: 2rem;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .card-desc {
          color: var(--text-secondary);
          font-size: 0.95rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .card-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: auto;
          padding-top: 1rem;
        }

        .tech-tag {
          font-size: 0.75rem;
          background: rgba(0, 0, 0, 0.04);
          color: var(--text-secondary);
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-sm);
          font-weight: 500;
        }

        .tech-tag-more {
          font-size: 0.75rem;
          color: var(--primary);
          font-weight: 600;
          padding: 0.2rem 0.2rem;
        }

        .empty-state {
          grid-column: span 2;
          text-align: center;
          padding: 5rem 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        /* Modal styling */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 200;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .modal-content {
          max-width: 900px;
          width: 100%;
          max-height: 85vh;
          overflow-y: auto;
          position: relative;
          padding: 2.5rem;
          box-shadow: var(--shadow-xl);
        }

        .modal-close {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          background: rgba(0,0,0,0.03);
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--text-secondary);
          transition: var(--transition-fast);
        }

        .modal-close:hover {
          background: rgba(0,0,0,0.08);
          color: var(--text-primary);
        }

        .modal-body-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 3rem;
        }

        @media (max-width: 768px) {
          .modal-body-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        .modal-img-container {
          height: 100%;
          min-height: 300px;
          background: var(--bg-tertiary);
          border-radius: var(--radius-md);
          overflow: hidden;
        }

        .modal-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .modal-img-placeholder {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(99,102,241,0.05) 0%, rgba(5,150,105,0.05) 100%);
          font-family: var(--font-heading);
          font-weight: 700;
          color: var(--text-muted);
        }

        .modal-details-container {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .modal-badge {
          align-self: flex-start;
          background: rgba(99, 102, 241, 0.08);
          color: var(--primary);
          font-size: 0.8rem;
          font-weight: 700;
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-full);
          text-transform: uppercase;
        }

        .modal-details-container h2 {
          font-size: 2.25rem;
          font-weight: 800;
        }

        .modal-meta-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          border-top: 1px solid var(--border-light);
          border-bottom: 1px solid var(--border-light);
          padding: 1rem 0;
        }

        .meta-item {
          font-size: 0.95rem;
        }

        .meta-item strong {
          color: var(--text-primary);
        }

        .meta-item span {
          color: var(--text-secondary);
          margin-left: 0.25rem;
        }

        .modal-section h3 {
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }

        .modal-section p {
          color: var(--text-secondary);
          font-size: 0.95rem;
        }

        .outcome-block {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          background: rgba(5, 150, 105, 0.04);
          border: 1px solid rgba(5, 150, 105, 0.1);
          padding: 1rem;
          border-radius: var(--radius-md);
        }

        .outcome-block p {
          color: #047857;
          font-weight: 500;
        }

        .tech-tags-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .modal-link-btn {
          align-self: flex-start;
          margin-top: 1.5rem;
        }
      `}</style>
    </div>
  );
}
