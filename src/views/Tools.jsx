import React, { useState } from 'react';
import { Settings, Cpu, TrendingUp, Info, HelpCircle, ArrowRight, RefreshCw, CheckCircle } from 'lucide-react';

export default function Tools() {
  const [activeTool, setActiveTool] = useState('helix'); // 'helix' or 'roi'

  // --- HELIX TOOL STATE ---
  const [impact, setImpact] = useState(3);
  const [urgency, setUrgency] = useState(3);

  // --- ROI TOOL STATE ---
  const [traffic, setTraffic] = useState(10000);
  const [conversion, setConversion] = useState(1.5); // %
  const [dealValue, setDealValue] = useState(1500); // $
  const [spend, setSpend] = useState(2500); // $
  const [uxLift, setUxLift] = useState(1.0); // % lift in conversion rate
  const [trafficLift, setTrafficLift] = useState(15); // % lift in traffic

  // Calculate Helix Priority (1-indexed matrix standard ITIL)
  const calculateHelixPriority = (imp, urg) => {
    // Standard ITIL Matrix:
    // Impact: 1-Extensive, 2-Significant, 3-Moderate, 4-Minor
    // Urgency: 1-Critical, 2-High, 3-Medium, 4-Low
    const matrix = {
      '1-1': { priority: 1, label: 'P1 - Critical', response: '15 Mins', resolution: '2 Hours', color: '#ef4444' },
      '1-2': { priority: 1, label: 'P1 - Critical', response: '15 Mins', resolution: '4 Hours', color: '#ef4444' },
      '1-3': { priority: 2, label: 'P2 - High', response: '30 Mins', resolution: '8 Hours', color: '#f97316' },
      '1-4': { priority: 3, label: 'P3 - Medium', response: '2 Hours', resolution: '24 Hours', color: '#eab308' },
      '2-1': { priority: 1, label: 'P1 - Critical', response: '15 Mins', resolution: '4 Hours', color: '#ef4444' },
      '2-2': { priority: 2, label: 'P2 - High', response: '30 Mins', resolution: '8 Hours', color: '#f97316' },
      '2-3': { priority: 3, label: 'P3 - Medium', response: '2 Hours', resolution: '24 Hours', color: '#eab308' },
      '2-4': { priority: 4, label: 'P4 - Low', response: '4 Hours', resolution: '48 Hours', color: '#10b981' },
      '3-1': { priority: 2, label: 'P2 - High', response: '30 Mins', resolution: '8 Hours', color: '#f97316' },
      '3-2': { priority: 3, label: 'P3 - Medium', response: '2 Hours', resolution: '24 Hours', color: '#eab308' },
      '3-3': { priority: 3, label: 'P3 - Medium', response: '2 Hours', resolution: '3 Days', color: '#eab308' },
      '3-4': { priority: 4, label: 'P4 - Low', response: '4 Hours', resolution: '5 Days', color: '#10b981' },
      '4-1': { priority: 3, label: 'P3 - Medium', response: '2 Hours', resolution: '24 Hours', color: '#eab308' },
      '4-2': { priority: 3, label: 'P3 - Medium', response: '2 Hours', resolution: '3 Days', color: '#eab308' },
      '4-3': { priority: 4, label: 'P4 - Low', response: '4 Hours', resolution: '5 Days', color: '#10b981' },
      '4-4': { priority: 4, label: 'P4 - Low', response: '8 Hours', resolution: '10 Days', color: '#10b981' }
    };
    return matrix[`${imp}-${urg}`] || { priority: 4, label: 'P4 - Low', response: '8 Hours', resolution: '10 Days', color: '#10b981' };
  };

  const helixResult = calculateHelixPriority(impact, urgency);

  // Calculate UX/Branding ROI
  const calculateROI = () => {
    const currentConversions = traffic * (conversion / 100);
    const currentRevenue = currentConversions * dealValue;

    const projectedTraffic = traffic * (1 + trafficLift / 100);
    const projectedConversion = conversion + uxLift;
    const projectedConversions = projectedTraffic * (projectedConversion / 100);
    const projectedRevenue = projectedConversions * dealValue;

    const revenueLift = projectedRevenue - currentRevenue;
    const netProfit = revenueLift - spend;
    const roi = spend > 0 ? (netProfit / spend) * 100 : 0;

    return {
      currentRevenue: Math.round(currentRevenue),
      projectedRevenue: Math.round(projectedRevenue),
      revenueLift: Math.round(revenueLift),
      netProfit: Math.round(netProfit),
      roi: Math.round(roi)
    };
  };

  const roiResult = calculateROI();

  return (
    <div className="tools-view container animate-fade-in">
      <div className="page-header">
        <h1 className="gradient-text">Interactive Utilities</h1>
        <p>A library of self-contained web applications and calculators built to simplify enterprise configuration and validate growth mechanics.</p>
      </div>

      {/* Tool Selector Tab */}
      <div className="tool-selector">
        <button
          className={`selector-btn ${activeTool === 'helix' ? 'active' : ''}`}
          onClick={() => setActiveTool('helix')}
        >
          <Settings size={18} /> BMC Helix Priority Matrix
        </button>
        <button
          className={`selector-btn ${activeTool === 'roi' ? 'active' : ''}`}
          onClick={() => setActiveTool('roi')}
        >
          <TrendingUp size={18} /> Branding & UX ROI Estimator
        </button>
      </div>

      {/* HELIX MATRIX TOOL */}
      {activeTool === 'helix' && (
        <div className="tool-container glass-panel">
          <div className="tool-intro">
            <h2>BMC Helix ITSM Priority Calculator</h2>
            <p>Determine ITIL incident classification instantly. Select the scope of organizational Impact and Urgency of restoration to get strict response/resolution targets based on standard GASCO consulting templates.</p>
          </div>

          <div className="tool-grid">
            <div className="tool-inputs">
              <div className="slider-group">
                <div className="slider-label">
                  <strong>1. Impact (Organizational Scope)</strong>
                  <span className="badge-value">Value: {impact}</span>
                </div>
                <div className="radio-buttons-vertical">
                  {[
                    { val: 1, label: '1 - Extensive/Widespread (Multiple core regions offline)' },
                    { val: 2, label: '2 - Significant/Large (Full department blocked)' },
                    { val: 3, label: '3 - Moderate/Limited (Single team or non-critical service)' },
                    { val: 4, label: '4 - Minor/Localized (Single user or local query)' }
                  ].map(opt => (
                    <label key={opt.val} className={`radio-label ${impact === opt.val ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="impact"
                        value={opt.val}
                        checked={impact === opt.val}
                        onChange={() => setImpact(opt.val)}
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="slider-group">
                <div className="slider-label">
                  <strong>2. Urgency (Restoration Speed)</strong>
                  <span className="badge-value">Value: {urgency}</span>
                </div>
                <div className="radio-buttons-vertical">
                  {[
                    { val: 1, label: '1 - Critical (Business flow completely halted, no workaround)' },
                    { val: 2, label: '2 - High (Severe productivity drop, legacy workarounds)' },
                    { val: 3, label: '3 - Medium (Moderate delay, non-blocking operational issues)' },
                    { val: 4, label: '4 - Low (Informational query, system enhancements)' }
                  ].map(opt => (
                    <label key={opt.val} className={`radio-label ${urgency === opt.val ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="urgency"
                        value={opt.val}
                        checked={urgency === opt.val}
                        onChange={() => setUrgency(opt.val)}
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="tool-outputs">
              <div className="result-card" style={{ borderColor: helixResult.color }}>
                <span className="result-label">CALCULATED ITIL PRIORITY</span>
                <h3 className="result-val" style={{ color: helixResult.color }}>{helixResult.label}</h3>
                
                <div className="sla-grid">
                  <div className="sla-item">
                    <span>Response SLA</span>
                    <strong>{helixResult.response}</strong>
                  </div>
                  <div className="sla-item">
                    <span>Resolution SLA</span>
                    <strong>{helixResult.resolution}</strong>
                  </div>
                </div>

                <div className="escalation-plan">
                  <h4>Recommended Escalation Path:</h4>
                  <ul>
                    {helixResult.priority === 1 && (
                      <>
                        <li>Notify Service Desk Manager immediately.</li>
                        <li>Automated SMS notifications to On-Call Database & Network architects.</li>
                        <li>Setup active Teams Incident Bridge room within 10 minutes.</li>
                      </>
                    )}
                    {helixResult.priority === 2 && (
                      <>
                        <li>Route to relevant Tier 2 support team queue.</li>
                        <li>Flag in BMC Helix console dashboard with high-visibility tag.</li>
                        <li>Escalate to Lead Engineer if unresolved in 4 hours.</li>
                      </>
                    )}
                    {helixResult.priority === 3 && (
                      <>
                        <li>Queue for standard tier-1 agent resolution during business hours.</li>
                        <li>Verify if client details are correctly attached to ticket.</li>
                      </>
                    )}
                    {helixResult.priority === 4 && (
                      <>
                        <li>Queue as lowest priority. Resolve within standard weekly sprints.</li>
                        <li>Evaluate for potential knowledge base documentation entry.</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BRANDING/UX ROI ESTIMATOR */}
      {activeTool === 'roi' && (
        <div className="tool-container glass-panel">
          <div className="tool-intro">
            <h2>Branding & User Experience ROI Estimator</h2>
            <p>Determine the financial impact of premium rebranding, conversion rate optimization, and search engine scaling. Drag the sliders to calculate net returns against budget spend.</p>
          </div>

          <div className="tool-grid">
            <div className="tool-inputs">
              <div className="input-group-row">
                <div className="slider-group">
                  <div className="slider-label">
                    <strong>Monthly Visitors</strong>
                    <span>{traffic.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="100000"
                    step="1000"
                    value={traffic}
                    onChange={(e) => setTraffic(Number(e.target.value))}
                    className="slider-bar"
                  />
                </div>

                <div className="slider-group">
                  <div className="slider-label">
                    <strong>Current Conversion Rate</strong>
                    <span>{conversion}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="10"
                    step="0.1"
                    value={conversion}
                    onChange={(e) => setConversion(Number(e.target.value))}
                    className="slider-bar"
                  />
                </div>
              </div>

              <div className="input-group-row">
                <div className="slider-group">
                  <div className="slider-label">
                    <strong>Avg. Deal Value / Order</strong>
                    <span>${dealValue.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="10000"
                    step="50"
                    value={dealValue}
                    onChange={(e) => setDealValue(Number(e.target.value))}
                    className="slider-bar"
                  />
                </div>

                <div className="slider-group">
                  <div className="slider-label">
                    <strong>Planned Marketing Spend</strong>
                    <span>${spend.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="50000"
                    step="500"
                    value={spend}
                    onChange={(e) => setSpend(Number(e.target.value))}
                    className="slider-bar"
                  />
                </div>
              </div>

              <div className="projection-inputs">
                <h3>Strategy Multipliers (Teckflux Scale Model)</h3>
                
                <div className="slider-group">
                  <div className="slider-label">
                    <strong>UX Design Lift (Absolute % increase)</strong>
                    <span>+{uxLift}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="5"
                    step="0.1"
                    value={uxLift}
                    onChange={(e) => setUxLift(Number(e.target.value))}
                    className="slider-bar"
                  />
                  <small className="help-text">Average premium e-commerce design adds 1.2% to baseline conversions.</small>
                </div>

                <div className="slider-group">
                  <div className="slider-label">
                    <strong>SEO / Traffic Lift</strong>
                    <span>+{trafficLift}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    step="5"
                    value={trafficLift}
                    onChange={(e) => setTrafficLift(Number(e.target.value))}
                    className="slider-bar"
                  />
                  <small className="help-text">Expanding distribution keywords increases traffic by 15-30% in 6 months.</small>
                </div>
              </div>
            </div>

            <div className="tool-outputs">
              <div className="result-card" style={{ borderColor: 'var(--primary)' }}>
                <span className="result-label">PROJECTED MONTHLY REVENUE LIFT</span>
                <h3 className="result-val gradient-text">${roiResult.revenueLift.toLocaleString()}</h3>

                <div className="roi-metrics-grid">
                  <div className="roi-metric-item">
                    <span>Current Revenue</span>
                    <strong>${roiResult.currentRevenue.toLocaleString()}</strong>
                  </div>
                  <div className="roi-metric-item">
                    <span>Projected Revenue</span>
                    <strong>${roiResult.projectedRevenue.toLocaleString()}</strong>
                  </div>
                  <div className="roi-metric-item">
                    <span>Net Monthly Profit Lift</span>
                    <strong style={{ color: 'var(--secondary)' }}>+${roiResult.netProfit.toLocaleString()}</strong>
                  </div>
                  <div className="roi-metric-item">
                    <span>Estimated ROI</span>
                    <strong style={{ color: 'var(--primary)' }}>{roiResult.roi}%</strong>
                  </div>
                </div>

                <div className="roi-analysis">
                  <h4>Moiz's Strategic Feedback:</h4>
                  {roiResult.roi > 100 ? (
                    <p className="roi-positive">
                      <CheckCircle size={16} /> <strong>Highly Viable:</strong> Investing ${spend.toLocaleString()} here generates exceptionally strong returns. Recommended to prioritize visual wireframing immediately.
                    </p>
                  ) : (
                    <p className="roi-neutral">
                      <Info size={16} /> <strong>Optimization Needed:</strong> The projected ROI is moderate. To maximize returns, increase Average Deal Value or focus on organic SEO to keep spend acquisition costs low.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .tools-view {
          padding-top: 8rem;
          min-height: 100vh;
        }

        .tool-selector {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          margin-bottom: 4rem;
        }

        @media (max-width: 600px) {
          .tool-selector {
            flex-direction: column;
            gap: 1rem;
          }
        }

        .selector-btn {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 2rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-light);
          background: var(--bg-secondary);
          color: var(--text-secondary);
          cursor: pointer;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1.05rem;
          transition: var(--transition-normal);
        }

        .selector-btn:hover {
          color: var(--text-primary);
          border-color: var(--text-muted);
        }

        .selector-btn.active {
          background: var(--grad-primary);
          color: white;
          border-color: transparent;
          box-shadow: var(--shadow-lg);
        }

        .tool-container {
          padding: 4rem;
        }

        @media (max-width: 992px) {
          .tool-container {
            padding: 2.5rem 1.5rem;
          }
        }

        .tool-intro {
          border-bottom: 1px solid var(--border-light);
          padding-bottom: 2rem;
          margin-bottom: 3rem;
        }

        .tool-intro h2 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        .tool-intro p {
          color: var(--text-secondary);
          max-width: 800px;
        }

        .tool-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 4rem;
        }

        @media (max-width: 992px) {
          .tool-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
        }

        .slider-group {
          margin-bottom: 2rem;
        }

        .slider-label {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.75rem;
          font-family: var(--font-heading);
        }

        .slider-label strong {
          font-size: 0.95rem;
          color: var(--text-primary);
        }

        .badge-value {
          background: rgba(0,0,0,0.05);
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
          font-weight: 600;
        }

        .radio-buttons-vertical {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .radio-label {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          background: var(--bg-secondary);
          cursor: pointer;
          transition: var(--transition-fast);
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .radio-label input {
          accent-color: var(--primary);
        }

        .radio-label:hover {
          border-color: var(--text-muted);
          color: var(--text-primary);
        }

        .radio-label.selected {
          border-color: var(--primary);
          background: rgba(99,102,241,0.03);
          color: var(--text-primary);
          font-weight: 500;
        }

        .slider-bar {
          width: 100%;
          accent-color: var(--primary);
          cursor: pointer;
        }

        .input-group-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        @media (max-width: 600px) {
          .input-group-row {
            grid-template-columns: 1fr;
            gap: 0;
          }
        }

        .projection-inputs {
          border-top: 1px solid var(--border-light);
          padding-top: 2rem;
          margin-top: 1.5rem;
        }

        .projection-inputs h3 {
          font-size: 1.15rem;
          margin-bottom: 1.5rem;
        }

        .help-text {
          display: block;
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-top: 0.35rem;
        }

        /* Result Card Output */
        .result-card {
          border: 2px solid var(--border-light);
          border-radius: var(--radius-lg);
          padding: 3rem 2rem;
          background: var(--bg-secondary);
          position: sticky;
          top: 100px;
          box-shadow: var(--shadow-sm);
        }

        .result-label {
          display: block;
          font-size: 0.8rem;
          letter-spacing: 1.5px;
          color: var(--text-muted);
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .result-val {
          font-size: 2.75rem;
          font-weight: 800;
          margin-bottom: 2rem;
        }

        .sla-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-bottom: 2rem;
          border-bottom: 1px solid var(--border-light);
          padding-bottom: 2rem;
        }

        .sla-item span {
          display: block;
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 0.25rem;
        }

        .sla-item strong {
          font-size: 1.5rem;
          font-family: var(--font-heading);
          color: var(--text-primary);
        }

        .escalation-plan h4 {
          font-size: 1rem;
          margin-bottom: 0.75rem;
        }

        .escalation-plan ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .escalation-plan li {
          font-size: 0.9rem;
          color: var(--text-secondary);
          position: relative;
          padding-left: 1.25rem;
        }

        .escalation-plan li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: var(--primary);
        }

        .roi-metrics-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-bottom: 2rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid var(--border-light);
        }

        .roi-metric-item span {
          display: block;
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 0.25rem;
        }

        .roi-metric-item strong {
          font-size: 1.35rem;
          font-family: var(--font-heading);
          color: var(--text-primary);
        }

        .roi-analysis h4 {
          font-size: 1rem;
          margin-bottom: 0.75rem;
        }

        .roi-positive, .roi-neutral {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          font-size: 0.9rem;
          line-height: 1.5;
          padding: 1rem;
          border-radius: var(--radius-md);
        }

        .roi-positive {
          background: rgba(5, 150, 105, 0.04);
          color: #047857;
          border: 1px solid rgba(5, 150, 105, 0.1);
        }

        .roi-positive svg {
          color: var(--secondary);
          flex-shrink: 0;
          margin-top: 0.15rem;
        }

        .roi-neutral {
          background: rgba(99, 102, 241, 0.04);
          color: var(--primary);
          border: 1px solid rgba(99, 102, 241, 0.1);
        }

        .roi-neutral svg {
          color: var(--primary);
          flex-shrink: 0;
          margin-top: 0.15rem;
        }
      `}</style>
    </div>
  );
}
