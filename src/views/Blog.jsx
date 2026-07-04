import React, { useState, useEffect } from 'react';
import { db } from '../lib/db';
import { BookOpen, Calendar, Tag, X, ChevronRight, MessageSquare } from 'lucide-react';

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBlogs() {
      try {
        const data = await db.getBlogs();
        setBlogs(data);
      } catch (err) {
        console.error("Failed to load blog posts", err);
      } finally {
        setLoading(false);
      }
    }
    loadBlogs();
  }, []);

  const categories = ['All', 'Struggles', 'Successes', 'Failures', 'Insights'];

  const filteredBlogs = filter === 'All'
    ? blogs
    : blogs.filter(b => b.category === filter);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="blog-view container animate-fade-in">
      <div className="page-header">
        <h1 className="gradient-text">Stories & Insights</h1>
        <p>A transparent look into founding agency growth, navigating international supply operations, fixing software bottlenecks, and lessons earned from both wins and losses.</p>
      </div>

      {/* Categories */}
      <div className="blog-categories">
        {categories.map(cat => (
          <button
            key={cat}
            className={`category-btn ${filter === cat ? 'active' : ''}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="blog-layout">
          <div className="blog-main-grid">
            {filteredBlogs.length === 0 ? (
              <div className="empty-state glass-panel">
                <BookOpen size={48} className="icon-muted" />
                <h3>No articles published</h3>
                <p>Check back later or add new stories through the Admin Panel.</p>
              </div>
            ) : (
              filteredBlogs.map(post => (
                <article
                  key={post.id}
                  className="blog-card glass-panel"
                  onClick={() => setSelectedBlog(post)}
                >
                  {post.image_url && (
                    <div className="blog-card-image">
                      <img src={post.image_url} alt={post.title} />
                    </div>
                  )}
                  <div className="blog-card-body">
                    <div className="blog-card-meta">
                      <span className="blog-tag-badge">{post.category}</span>
                      <span className="blog-date"><Calendar size={14} /> {formatDate(post.created_at)}</span>
                    </div>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <span className="read-more-link">
                      Read Story <ChevronRight size={16} />
                    </span>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      )}

      {/* Full Article Reader Modal */}
      {selectedBlog && (
        <div className="modal-overlay animate-fade-in" onClick={() => setSelectedBlog(null)}>
          <div className="blog-reader-modal glass-panel animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedBlog(null)} aria-label="Close reader">
              <X size={20} />
            </button>
            
            <div className="reader-header">
              <div className="reader-meta">
                <span className="blog-tag-badge">{selectedBlog.category}</span>
                <span className="blog-date"><Calendar size={14} /> {formatDate(selectedBlog.created_at)}</span>
              </div>
              <h2>{selectedBlog.title}</h2>
            </div>

            {selectedBlog.image_url && (
              <div className="reader-image">
                <img src={selectedBlog.image_url} alt={selectedBlog.title} />
              </div>
            )}

            <div className="reader-content">
              {selectedBlog.content.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="reader-footer">
              <div className="author-box">
                <div className="author-avatar">M</div>
                <div>
                  <strong>Written by Moiz</strong>
                  <p>Tech Professional & Strategy Advisor</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .blog-view {
          padding-top: 8rem;
          min-height: 100vh;
        }

        .blog-categories {
          display: flex;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 3.5rem;
          flex-wrap: wrap;
        }

        .category-btn {
          padding: 0.5rem 1.25rem;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-light);
          background: var(--bg-secondary);
          color: var(--text-secondary);
          cursor: pointer;
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 0.85rem;
          transition: var(--transition-normal);
        }

        .category-btn:hover {
          color: var(--text-primary);
          border-color: var(--text-muted);
        }

        .category-btn.active {
          background: var(--grad-primary);
          color: white;
          border-color: transparent;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.15);
        }

        .blog-layout {
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }

        .blog-main-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        @media (max-width: 992px) {
          .blog-main-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .blog-main-grid {
            grid-template-columns: 1fr;
          }
        }

        .blog-card {
          cursor: pointer;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .blog-card-image {
          height: 200px;
          overflow: hidden;
          background: var(--bg-tertiary);
        }

        .blog-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition-slow);
        }

        .blog-card:hover .blog-card-image img {
          transform: scale(1.05);
        }

        .blog-card-body {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          flex-grow: 1;
        }

        .blog-card-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .blog-tag-badge {
          background: rgba(99, 102, 241, 0.08);
          color: var(--primary);
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-sm);
          text-transform: uppercase;
        }

        .blog-date {
          font-size: 0.8rem;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-weight: 500;
        }

        .blog-card-body h3 {
          font-size: 1.35rem;
          font-weight: 700;
          line-height: 1.3;
        }

        .blog-card-body p {
          color: var(--text-secondary);
          font-size: 0.95rem;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .read-more-link {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.9rem;
          font-family: var(--font-heading);
          font-weight: 600;
          color: var(--primary);
          margin-top: auto;
          padding-top: 1rem;
        }

        /* Reader Modal */
        .blog-reader-modal {
          max-width: 720px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          padding: 3.5rem;
          box-shadow: var(--shadow-xl);
          background: var(--bg-secondary);
        }

        @media (max-width: 600px) {
          .blog-reader-modal {
            padding: 2rem 1.5rem;
          }
        }

        .reader-header {
          margin-bottom: 2rem;
        }

        .reader-meta {
          display: flex;
          gap: 1rem;
          align-items: center;
          margin-bottom: 1rem;
        }

        .reader-header h2 {
          font-size: 2.5rem;
          font-weight: 800;
          line-height: 1.2;
        }

        @media (max-width: 600px) {
          .reader-header h2 {
            font-size: 1.8rem;
          }
        }

        .reader-image {
          height: 350px;
          border-radius: var(--radius-md);
          overflow: hidden;
          margin-bottom: 2.5rem;
          background: var(--bg-tertiary);
        }

        .reader-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .reader-content {
          font-size: 1.1rem;
          color: #2d3748;
          line-height: 1.8;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          border-bottom: 1px solid var(--border-light);
          padding-bottom: 2.5rem;
          margin-bottom: 2.5rem;
        }

        .reader-content p {
          font-weight: 400;
        }

        .reader-content strong {
          color: var(--text-primary);
        }

        .reader-content ul, .reader-content ol {
          padding-left: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .reader-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .author-box {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .author-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: var(--grad-primary);
          color: white;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 10px rgba(99, 102, 241, 0.2);
        }

        .author-box strong {
          font-size: 1.05rem;
          display: block;
        }

        .author-box p {
          font-size: 0.85rem;
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
}
