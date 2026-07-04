import React, { useState, useEffect } from 'react';
import { db, isSupabaseConfigured } from '../lib/db';
import { ShieldAlert, Plus, Trash2, Edit2, LogOut, Database, Save, CheckCircle, RotateCcw, AlertTriangle, Layers, BookOpen } from 'lucide-react';

export default function Admin() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState('portfolio'); // 'portfolio', 'blogs', 'status'

  // Data states
  const [portfolio, setPortfolio] = useState([]);
  const [blogs, setBlogs] = useState([]);

  // Form states - Editing/Adding
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  const [portfolioForm, setPortfolioForm] = useState({
    title: '',
    description: '',
    category: 'UI/UX Design',
    tech_stack_str: '',
    client: '',
    role: '',
    results: '',
    link: '',
    image_url: ''
  });

  const [blogForm, setBlogForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'Insights',
    status: 'published',
    image_url: ''
  });

  useEffect(() => {
    async function checkUser() {
      try {
        const currentUser = await db.getCurrentUser();
        setUser(currentUser);
        if (currentUser) {
          await loadData();
        }
      } catch (err) {
        console.error("Auth check failed", err);
      } finally {
        setLoading(false);
      }
    }
    checkUser();
  }, []);

  const loadData = async () => {
    try {
      const portfolioData = await db.getPortfolio();
      const blogData = await db.getBlogs();
      setPortfolio(portfolioData);
      setBlogs(blogData);
    } catch (err) {
      console.error("Error loading admin data", err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    try {
      const loggedUser = await db.login(email, password);
      setUser(loggedUser);
      await loadData();
    } catch (err) {
      setAuthError(err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await db.logout();
      setUser(null);
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  // --- PORTFOLIO CRUD ACTIONS ---
  const handleEditPortfolio = (proj) => {
    setIsEditing(true);
    setEditingId(proj.id);
    setPortfolioForm({
      title: proj.title || '',
      description: proj.description || '',
      category: proj.category || 'UI/UX Design',
      tech_stack_str: proj.tech_stack ? proj.tech_stack.join(', ') : '',
      client: proj.client || '',
      role: proj.role || '',
      results: proj.results || '',
      link: proj.link || '',
      image_url: proj.image_url || ''
    });
    setActiveTab('portfolio_form');
  };

  const handleNewPortfolio = () => {
    setIsEditing(false);
    setEditingId(null);
    setPortfolioForm({
      title: '',
      description: '',
      category: 'UI/UX Design',
      tech_stack_str: '',
      client: '',
      role: '',
      results: '',
      link: '',
      image_url: ''
    });
    setActiveTab('portfolio_form');
  };

  const savePortfolio = async (e) => {
    e.preventDefault();
    setStatusMessage('');
    const tech_stack = portfolioForm.tech_stack_str
      ? portfolioForm.tech_stack_str.split(',').map(s => s.trim()).filter(Boolean)
      : [];

    const payload = {
      title: portfolioForm.title,
      description: portfolioForm.description,
      category: portfolioForm.category,
      tech_stack,
      client: portfolioForm.client,
      role: portfolioForm.role,
      results: portfolioForm.results,
      link: portfolioForm.link,
      image_url: portfolioForm.image_url
    };

    if (editingId) payload.id = editingId;

    try {
      await db.savePortfolioItem(payload);
      setStatusMessage('Portfolio project saved successfully!');
      await loadData();
      setTimeout(() => {
        setStatusMessage('');
        setActiveTab('portfolio');
      }, 1500);
    } catch (err) {
      setStatusMessage(`Error: ${err.message}`);
    }
  };

  const deletePortfolio = async (id) => {
    if (window.confirm("Are you sure you want to delete this portfolio item?")) {
      try {
        await db.deletePortfolioItem(id);
        await loadData();
      } catch (err) {
        alert(err.message);
      }
    }
  };

  // --- BLOG CRUD ACTIONS ---
  const handleEditBlog = (post) => {
    setIsEditing(true);
    setEditingId(post.id);
    setBlogForm({
      title: post.title || '',
      excerpt: post.excerpt || '',
      content: post.content || '',
      category: post.category || 'Insights',
      status: post.status || 'published',
      image_url: post.image_url || ''
    });
    setActiveTab('blog_form');
  };

  const handleNewBlog = () => {
    setIsEditing(false);
    setEditingId(null);
    setBlogForm({
      title: '',
      excerpt: '',
      content: '',
      category: 'Insights',
      status: 'published',
      image_url: ''
    });
    setActiveTab('blog_form');
  };

  const saveBlog = async (e) => {
    e.preventDefault();
    setStatusMessage('');

    const payload = {
      title: blogForm.title,
      excerpt: blogForm.excerpt,
      content: blogForm.content,
      category: blogForm.category,
      status: blogForm.status,
      image_url: blogForm.image_url
    };

    if (editingId) payload.id = editingId;

    try {
      await db.saveBlog(payload);
      setStatusMessage('Blog article saved successfully!');
      await loadData();
      setTimeout(() => {
        setStatusMessage('');
        setActiveTab('blogs');
      }, 1500);
    } catch (err) {
      setStatusMessage(`Error: ${err.message}`);
    }
  };

  const deleteBlog = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      try {
        await db.deleteBlog(id);
        await loadData();
      } catch (err) {
        alert(err.message);
      }
    }
  };

  const resetLocalData = () => {
    if (window.confirm("This will overwrite your browser's mock database back to Moiz's default portfolio and blog posts. Proceed?")) {
      localStorage.removeItem('moiz_blogs');
      localStorage.removeItem('moiz_portfolio');
      localStorage.removeItem('moiz_consulting');
      window.location.reload();
    }
  };

  if (loading) {
    return (
      <div className="admin-view container animate-fade-in" style={{ paddingTop: '10rem', textAlign: 'center' }}>
        <div className="spinner"></div>
        <p>Verifying admin session...</p>
      </div>
    );
  }

  // --- RENDER LOGIN GATES ---
  if (!user) {
    return (
      <div className="admin-view container animate-fade-in auth-page-wrap">
        <div className="login-card glass-panel">
          <div className="login-header">
            <ShieldAlert size={36} className="icon-purple" />
            <h2>Moiz Admin Gate</h2>
            <p>Access control to publish projects, write blog posts, and adjust pricing matrices.</p>
          </div>

          {!isSupabaseConfigured && (
            <div className="warning-banner">
              <Database size={16} />
              <span>
                <strong>Mock Mode Active:</strong> Log in with <code>admin@moiz.com</code> & password <code>admin</code>. All edits are saved immediately to your browser's local cache.
              </span>
            </div>
          )}

          {isSupabaseConfigured && (
            <div className="success-banner-inline">
              <CheckCircle size={16} />
              <span><strong>Connected to Supabase:</strong> Sign in with your registered admin credentials.</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Admin Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@moiz.com"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Security Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
            </div>
            {authError && <div className="error-text">{authError}</div>}
            <button type="submit" className="btn btn-primary btn-submit">Sign In to Dashboard</button>
          </form>
        </div>
        <style>{`
          .auth-page-wrap {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 80vh;
            padding-top: 8rem;
          }
          .login-card {
            max-width: 480px;
            width: 100%;
            padding: 3rem;
          }
          .login-header {
            text-align: center;
            margin-bottom: 2rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
          }
          .login-header h2 {
            font-size: 1.75rem;
          }
          .login-header p {
            color: var(--text-secondary);
            font-size: 0.9rem;
          }
          .warning-banner, .success-banner-inline {
            display: flex;
            align-items: flex-start;
            gap: 0.75rem;
            padding: 1rem;
            border-radius: var(--radius-md);
            font-size: 0.8rem;
            margin-bottom: 1.5rem;
            line-height: 1.4;
          }
          .warning-banner {
            background: rgba(217, 119, 6, 0.05);
            border: 1px solid rgba(217, 119, 6, 0.15);
            color: #b45309;
          }
          .warning-banner svg {
            flex-shrink: 0;
            margin-top: 0.15rem;
          }
          .success-banner-inline {
            background: rgba(5, 150, 105, 0.05);
            border: 1px solid rgba(5, 150, 105, 0.15);
            color: #047857;
          }
          .error-text {
            color: #dc2626;
            font-size: 0.85rem;
            font-weight: 500;
            margin-bottom: 1rem;
          }
        `}</style>
      </div>
    );
  }

  // --- RENDER ADMIN CONSOLE ---
  return (
    <div className="admin-view container animate-fade-in">
      <div className="admin-header-row">
        <div>
          <span className="admin-pill">Admin Dashboard</span>
          <h2>Moiz Brand Studio</h2>
        </div>
        <div className="session-actions">
          <span className="user-email">Session: {user.email}</span>
          <button onClick={handleLogout} className="btn btn-secondary btn-logout">
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="admin-tabs">
        <button
          className={`admin-tab ${['portfolio', 'portfolio_form'].includes(activeTab) ? 'active' : ''}`}
          onClick={() => setActiveTab('portfolio')}
        >
          <Layers size={16} /> Portfolio Manager ({portfolio.length})
        </button>
        <button
          className={`admin-tab ${['blogs', 'blog_form'].includes(activeTab) ? 'active' : ''}`}
          onClick={() => setActiveTab('blogs')}
        >
          <BookOpen size={16} /> Blog Writer ({blogs.length})
        </button>
        <button
          className={`admin-tab ${activeTab === 'status' ? 'active' : ''}`}
          onClick={() => setActiveTab('status')}
        >
          <Database size={16} /> Database Status
        </button>
      </div>

      <div className="admin-content-box glass-panel">
        
        {/* --- PORTFOLIO LISTING TAB --- */}
        {activeTab === 'portfolio' && (
          <div className="tab-pane">
            <div className="tab-pane-header">
              <h3>Portfolio Projects</h3>
              <button onClick={handleNewPortfolio} className="btn btn-primary">
                <Plus size={16} /> Add Project
              </button>
            </div>
            
            <div className="admin-list-grid">
              {portfolio.map(proj => (
                <div key={proj.id} className="admin-list-item">
                  <div className="item-info">
                    <strong>{proj.title}</strong>
                    <span>Category: {proj.category} • Client: {proj.client || 'None'}</span>
                  </div>
                  <div className="item-actions">
                    <button onClick={() => handleEditPortfolio(proj)} className="btn btn-secondary btn-icon-only" aria-label="Edit">
                      <Edit2 size={14} />
                    </button>
                    <button onClick={() => deletePortfolio(proj.id)} className="btn btn-secondary btn-icon-only btn-danger" aria-label="Delete">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- PORTFOLIO FORM TAB (ADD/EDIT) --- */}
        {activeTab === 'portfolio_form' && (
          <div className="tab-pane">
            <div className="tab-pane-header">
              <h3>{isEditing ? 'Edit Project Details' : 'Add New Portfolio Project'}</h3>
              <button onClick={() => setActiveTab('portfolio')} className="btn btn-secondary">Cancel</button>
            </div>

            <form onSubmit={savePortfolio} className="admin-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="p_title">Project Title</label>
                  <input
                    type="text"
                    id="p_title"
                    className="form-control"
                    value={portfolioForm.title}
                    onChange={(e) => setPortfolioForm({ ...portfolioForm, title: e.target.value })}
                    required
                    placeholder="e.g. Teckflux CMS Engine"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="p_category">Category</label>
                  <select
                    id="p_category"
                    className="form-control"
                    value={portfolioForm.category}
                    onChange={(e) => setPortfolioForm({ ...portfolioForm, category: e.target.value })}
                  >
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Branding & Marketing">Branding & Marketing</option>
                    <option value="Web Apps">Web Apps</option>
                    <option value="ITSM & Enterprise">ITSM & Enterprise</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="p_client">Client</label>
                  <input
                    type="text"
                    id="p_client"
                    className="form-control"
                    value={portfolioForm.client}
                    onChange={(e) => setPortfolioForm({ ...portfolioForm, client: e.target.value })}
                    placeholder="e.g. NIKE"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="p_role">Your Role / Job Title</label>
                  <input
                    type="text"
                    id="p_role"
                    className="form-control"
                    value={portfolioForm.role}
                    onChange={(e) => setPortfolioForm({ ...portfolioForm, role: e.target.value })}
                    required
                    placeholder="e.g. Founder & Operations Lead"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="p_desc">Detailed Project Description</label>
                <textarea
                  id="p_desc"
                  rows="4"
                  className="form-control"
                  value={portfolioForm.description}
                  onChange={(e) => setPortfolioForm({ ...portfolioForm, description: e.target.value })}
                  required
                  placeholder="Outline the scope, background, design phases, and systems implemented..."
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="p_results">Outcome / Metrics Achieved (Crucial for Business Brand)</label>
                <input
                  type="text"
                  id="p_results"
                  className="form-control"
                  value={portfolioForm.results}
                  onChange={(e) => setPortfolioForm({ ...portfolioForm, results: e.target.value })}
                  required
                  placeholder="e.g. Scaled operations to $80k MRR; onboarded Aramco & SWCC."
                />
              </div>

              <div className="form-group">
                <label htmlFor="p_tech">Tech Stack / Tools (Comma-separated)</label>
                <input
                  type="text"
                  id="p_tech"
                  className="form-control"
                  value={portfolioForm.tech_stack_str}
                  onChange={(e) => setPortfolioForm({ ...portfolioForm, tech_stack_str: e.target.value })}
                  placeholder="React, BMC Helix, Figma, E-Commerce, PHP"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="p_link">Website Link (Optional)</label>
                  <input
                    type="url"
                    id="p_link"
                    className="form-control"
                    value={portfolioForm.link}
                    onChange={(e) => setPortfolioForm({ ...portfolioForm, link: e.target.value })}
                    placeholder="https://example.com"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="p_img">Cover Image URL (Optional)</label>
                  <input
                    type="url"
                    id="p_img"
                    className="form-control"
                    value={portfolioForm.image_url}
                    onChange={(e) => setPortfolioForm({ ...portfolioForm, image_url: e.target.value })}
                    placeholder="https://images.unsplash.com/photo-..."
                  />
                </div>
              </div>

              {statusMessage && <div className="status-banner-form">{statusMessage}</div>}

              <button type="submit" className="btn btn-primary">
                <Save size={16} /> Save Project
              </button>
            </form>
          </div>
        )}

        {/* --- BLOGS LISTING TAB --- */}
        {activeTab === 'blogs' && (
          <div className="tab-pane">
            <div className="tab-pane-header">
              <h3>Blog Articles</h3>
              <button onClick={handleNewBlog} className="btn btn-primary">
                <Plus size={16} /> Write Article
              </button>
            </div>
            
            <div className="admin-list-grid">
              {blogs.map(post => (
                <div key={post.id} className="admin-list-item">
                  <div className="item-info">
                    <strong>{post.title}</strong>
                    <span>Category: {post.category} • Status: <span className={`status-badge ${post.status}`}>{post.status}</span></span>
                  </div>
                  <div className="item-actions">
                    <button onClick={() => handleEditBlog(post)} className="btn btn-secondary btn-icon-only" aria-label="Edit">
                      <Edit2 size={14} />
                    </button>
                    <button onClick={() => deleteBlog(post.id)} className="btn btn-secondary btn-icon-only btn-danger" aria-label="Delete">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- BLOG FORM TAB (ADD/EDIT) --- */}
        {activeTab === 'blog_form' && (
          <div className="tab-pane">
            <div className="tab-pane-header">
              <h3>{isEditing ? 'Edit Blog Article' : 'Write New Blog Article'}</h3>
              <button onClick={() => setActiveTab('blogs')} className="btn btn-secondary">Cancel</button>
            </div>

            <form onSubmit={saveBlog} className="admin-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="b_title">Article Title</label>
                  <input
                    type="text"
                    id="b_title"
                    className="form-control"
                    value={blogForm.title}
                    onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                    required
                    placeholder="e.g. Rebuilding ITSM Culture"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="b_category">Category</label>
                  <select
                    id="b_category"
                    className="form-control"
                    value={blogForm.category}
                    onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                  >
                    <option value="Struggles">Struggles</option>
                    <option value="Successes">Successes</option>
                    <option value="Failures">Failures</option>
                    <option value="Insights">Insights</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="b_excerpt">Excerpt / Preview (Short teaser)</label>
                <input
                  type="text"
                  id="b_excerpt"
                  className="form-control"
                  value={blogForm.excerpt}
                  onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                  required
                  placeholder="A brief 1-2 sentence preview to draw readers in..."
                />
              </div>

              <div className="form-group">
                <label htmlFor="b_content">Article Content</label>
                <textarea
                  id="b_content"
                  rows="12"
                  className="form-control"
                  value={blogForm.content}
                  onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                  required
                  placeholder="Write your story, struggles, successes, and failures in full detail here. Use double line breaks for paragraph breaks."
                ></textarea>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="b_img">Cover Image URL (Optional)</label>
                  <input
                    type="url"
                    id="b_img"
                    className="form-control"
                    value={blogForm.image_url}
                    onChange={(e) => setBlogForm({ ...blogForm, image_url: e.target.value })}
                    placeholder="https://images.unsplash.com/photo-..."
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="b_status">Publishing Status</label>
                  <select
                    id="b_status"
                    className="form-control"
                    value={blogForm.status}
                    onChange={(e) => setBlogForm({ ...blogForm, status: e.target.value })}
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              {statusMessage && <div className="status-banner-form">{statusMessage}</div>}

              <button type="submit" className="btn btn-primary">
                <Save size={16} /> Save Article
              </button>
            </form>
          </div>
        )}

        {/* --- SYSTEM STATUS TAB --- */}
        {activeTab === 'status' && (
          <div className="tab-pane">
            <div className="status-deck">
              <h3>Database Settings</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                Verify structural backend environment keys. When setting up a live database, these keys hook directly to client-side modules.
              </p>

              <div className="status-card-admin">
                <div className="status-row">
                  <span>Backend Provider:</span>
                  <strong>{isSupabaseConfigured ? 'Supabase Database' : 'Mock LocalStorage Database'}</strong>
                </div>
                <div className="status-row">
                  <span>Vite Supabase URL:</span>
                  <code>{import.meta.env.VITE_SUPABASE_URL || 'NOT SET'}</code>
                </div>
                <div className="status-row">
                  <span>Vite Supabase Anon Key:</span>
                  <code>{import.meta.env.VITE_SUPABASE_ANON_KEY ? '••••••••••••••••••••' : 'NOT SET'}</code>
                </div>
              </div>

              <div className="settings-options-block">
                <h4>Data Recovery & Sync</h4>
                <p>If you are playing around with custom portfolios in Mock Mode and want to restore the pre-populated values representing your original career story, click below to wipe local memory.</p>
                <button onClick={resetLocalData} className="btn btn-secondary btn-danger-outline">
                  <RotateCcw size={16} /> Wipe Local Changes & Reload
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .admin-view {
          padding-top: 8rem;
          min-height: 100vh;
        }

        .admin-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 3rem;
          border-bottom: 1px solid var(--border-light);
          padding-bottom: 1.5rem;
        }

        @media (max-width: 600px) {
          .admin-header-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
        }

        .admin-pill {
          display: inline-block;
          background: rgba(139, 92, 246, 0.08);
          color: var(--accent);
          font-weight: 700;
          font-size: 0.8rem;
          padding: 0.2rem 0.75rem;
          border-radius: var(--radius-full);
          text-transform: uppercase;
          margin-bottom: 0.5rem;
        }

        .session-actions {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .user-email {
          font-size: 0.9rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .btn-logout {
          padding: 0.5rem 1.25rem;
          font-size: 0.85rem;
        }

        .admin-tabs {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }

        .admin-tab {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-light);
          background: var(--bg-secondary);
          color: var(--text-secondary);
          cursor: pointer;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.9rem;
          transition: var(--transition-normal);
        }

        .admin-tab:hover {
          color: var(--text-primary);
        }

        .admin-tab.active {
          background: var(--text-primary);
          color: white;
          border-color: transparent;
        }

        .admin-content-box {
          padding: 3rem;
        }

        @media (max-width: 600px) {
          .admin-content-box {
            padding: 1.5rem;
          }
        }

        .tab-pane-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          border-bottom: 1px solid var(--border-light);
          padding-bottom: 1rem;
        }

        .admin-list-grid {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .admin-list-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.25rem 1.5rem;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          background: rgba(255, 255, 255, 0.5);
          transition: var(--transition-fast);
        }

        .admin-list-item:hover {
          border-color: var(--text-muted);
          background: white;
        }

        .item-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .item-info strong {
          font-size: 1.05rem;
          color: var(--text-primary);
        }

        .item-info span {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .status-badge {
          font-size: 0.75rem;
          padding: 0.1rem 0.4rem;
          border-radius: var(--radius-sm);
          font-weight: 700;
          text-transform: uppercase;
        }

        .status-badge.published {
          background: rgba(5,150,105,0.08);
          color: var(--secondary);
        }

        .status-badge.draft {
          background: rgba(0,0,0,0.06);
          color: var(--text-muted);
        }

        .item-actions {
          display: flex;
          gap: 0.75rem;
        }

        .btn-icon-only {
          width: 36px;
          height: 36px;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }

        .btn-danger:hover {
          background: #fee2e2;
          color: #dc2626;
          border-color: #fca5a5;
        }

        /* Form setups */
        .admin-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        @media (max-width: 600px) {
          .form-row {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }

        .status-banner-form {
          padding: 1rem;
          border-radius: var(--radius-md);
          background: rgba(99,102,241,0.06);
          border: 1px solid rgba(99,102,241,0.15);
          color: var(--primary);
          font-weight: 600;
          font-size: 0.9rem;
        }

        /* Status Pane */
        .status-card-admin {
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          background: rgba(255,255,255,0.4);
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 3rem;
        }

        .status-row {
          display: grid;
          grid-template-columns: 1fr 2fr;
          font-size: 0.95rem;
        }

        @media (max-width: 600px) {
          .status-row {
            grid-template-columns: 1fr;
            gap: 0.25rem;
          }
        }

        .status-row span {
          color: var(--text-secondary);
          font-weight: 500;
        }

        .status-row code {
          background: rgba(0,0,0,0.04);
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          align-self: flex-start;
          word-break: break-all;
        }

        .settings-options-block {
          border-top: 1px solid var(--border-light);
          padding-top: 2rem;
        }

        .settings-options-block h4 {
          font-size: 1.15rem;
          margin-bottom: 0.5rem;
        }

        .settings-options-block p {
          color: var(--text-secondary);
          font-size: 0.9rem;
          margin-bottom: 1.5rem;
          max-width: 600px;
        }

        .btn-danger-outline {
          border-color: rgba(220, 38, 38, 0.2);
          color: #dc2626;
        }

        .btn-danger-outline:hover {
          background: #fee2e2;
          border-color: #dc2626;
        }
      `}</style>
    </div>
  );
}
