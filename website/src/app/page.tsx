const FORMSPREE_ENDPOINT = "https://formspree.io/f/REPLACE_ME";

export default function Home() {
  return (
    <div className="page">
      <div className="backdrop" aria-hidden="true">
        <div className="grid-overlay" />
        <svg
          className="flow-lines"
          viewBox="0 0 1200 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-20 110 C 240 40, 420 180, 680 120 C 910 70, 1080 10, 1220 40"
            stroke="var(--line-strong)"
            strokeWidth="1.2"
          />
          <path
            d="M-20 260 C 200 320, 420 170, 700 220 C 930 260, 1070 340, 1220 280"
            stroke="var(--line)"
            strokeWidth="1"
          />
          <path
            d="M-20 400 C 240 470, 420 350, 690 380 C 930 410, 1080 460, 1220 430"
            stroke="var(--line)"
            strokeWidth="0.9"
          />
        </svg>
        <div className="ambient-glow" />
      </div>

      <header className="site-header">
        <div className="container nav">
          <div className="logo">
            <span className="logo-mark" aria-hidden="true" />
            Regenova
          </div>
          <nav className="nav-links">
            <a href="#research">Research</a>
            <a href="#how">Method</a>
            <a href="#waitlist" className="button button-small">
              Join Waitlist
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="section hero" id="top">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">Regenova Research Initiative</p>
              <h1>
                AI-Driven Precision for Stem Cell Differentiation
              </h1>
              <p className="lead">
                Regenova uses deep learning to analyze stem cell differentiation
                with speed, accuracy, and transparency. We are building the
                research layer that makes regenerative medicine more reliable
                and scalable.
              </p>
              <div className="hero-actions">
                <a href="#waitlist" className="button button-primary">
                  Join the Research Waitlist
                </a>
                <a href="#how" className="button button-ghost">
                  View the Method
                </a>
              </div>
              <div className="hero-metrics">
                <div>
                  <span className="metric-value">60%</span>
                  <span className="metric-label">Faster analysis</span>
                </div>
                <div>
                  <span className="metric-value">90%+</span>
                  <span className="metric-label">Validated accuracy</span>
                </div>
                <div>
                  <span className="metric-value">Non-invasive</span>
                  <span className="metric-label">Ethical AI</span>
                </div>
              </div>
            </div>
            <div className="hero-panel">
              <div className="panel-header">
                <span>Brightfield input</span>
                <span className="panel-pill">Live feed</span>
              </div>
              <div className="panel-body">
                <div className="signal-grid">
                  <div className="signal-card">
                    <p className="signal-title">Stage Detection</p>
                    <p className="signal-value">Differentiation: 3.2</p>
                    <p className="signal-note">Confidence 0.92</p>
                  </div>
                  <div className="signal-card">
                    <p className="signal-title">Morphology Drift</p>
                    <p className="signal-value">Stable</p>
                    <p className="signal-note">12 hr trend</p>
                  </div>
                  <div className="signal-card">
                    <p className="signal-title">Interpretability</p>
                    <p className="signal-value">Heatmap overlay</p>
                    <p className="signal-note">Regions highlighted</p>
                  </div>
                </div>
              </div>
              <div className="panel-footer">
                <span>Model status: validated benchmarks</span>
                <span className="pulse" aria-hidden="true" />
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="problem">
          <div className="container split">
            <div className="card reveal">
              <h3>Problem</h3>
              <p>
                Manual stem cell analysis is slow, error-prone, and difficult to
                scale across datasets.
              </p>
              <ul className="list">
                <li>Subjective labeling by human reviewers</li>
                <li>Hours of work per assay batch</li>
                <li>Low consistency across labs</li>
              </ul>
            </div>
            <div className="card card-accent reveal">
              <h3>Solution</h3>
              <p>
                Automated AI interpretation for consistent, real-time
                differentiation assessment.
              </p>
              <ul className="list">
                <li>Deep image analysis of morphology</li>
                <li>Temporal modeling for progression tracking</li>
                <li>Interpretable heatmaps for trust</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="section" id="how">
          <div className="container">
            <div className="section-header">
              <h2>How it works</h2>
              <p>
                A streamlined pipeline designed for researchers who need
                precision without black-box ambiguity.
              </p>
            </div>
            <div className="steps-grid">
              <div className="step-card reveal">
                <span className="step-number">01</span>
                <h4>Image Input</h4>
                <p>Brightfield stem cell images are ingested securely.</p>
              </div>
              <div className="step-card reveal">
                <span className="step-number">02</span>
                <h4>AI Processing</h4>
                <p>CNNs extract morphology while temporal models track change.</p>
              </div>
              <div className="step-card reveal">
                <span className="step-number">03</span>
                <h4>Prediction</h4>
                <p>Stage classification and progression scoring in real time.</p>
              </div>
              <div className="step-card reveal">
                <span className="step-number">04</span>
                <h4>Interpretability</h4>
                <p>Heatmaps reveal why the model made each decision.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="impact">
          <div className="container">
            <div className="section-header">
              <h2>Why it matters</h2>
              <p>
                Regenova shortens discovery cycles while staying aligned with
                ethical and non-invasive research practices.
              </p>
            </div>
            <div className="impact-grid">
              <div className="impact-card reveal">
                <h4>60% faster analysis</h4>
                <p>Automated inference reduces manual review time.</p>
              </div>
              <div className="impact-card reveal">
                <h4>90%+ benchmark accuracy</h4>
                <p>Validated against expert-labeled datasets.</p>
              </div>
              <div className="impact-card reveal">
                <h4>Scalable and non-invasive</h4>
                <p>Designed for high-throughput lab workflows.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="audience">
          <div className="container">
            <div className="section-header">
              <h2>Who it’s for</h2>
              <p>Focused on teams who demand accuracy and traceability.</p>
            </div>
            <div className="audience-grid">
              <div className="audience-card reveal">
                <h4>Academic Research Labs</h4>
                <p>Accelerate differentiation experiments with reliable data.</p>
              </div>
              <div className="audience-card reveal">
                <h4>Biotech & Pharma R&D</h4>
                <p>Scale cell line studies without scaling headcount.</p>
              </div>
              <div className="audience-card reveal">
                <h4>Regenerative Medicine</h4>
                <p>Build more consistent pipelines for clinical translation.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="research">
          <div className="container">
            <div className="research-block">
              <h2>Research-first, not hype</h2>
              <p>
                Regenova is a research-driven initiative. We are validating
                models, publishing results, and collaborating with academic and
                industry partners before productization.
              </p>
            </div>
          </div>
        </section>

        <section className="section" id="waitlist">
          <div className="container">
            <div className="waitlist">
              <div className="waitlist-copy">
                <h2>Join the Regenova Research Waitlist</h2>
                <p>
                  Be among the first researchers to collaborate, test, or review
                  our AI models.
                </p>
              </div>
              <form
                className="waitlist-form"
                action={FORMSPREE_ENDPOINT}
                method="POST"
              >
                <label className="input-group">
                  <span>Email</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@lab.edu"
                    required
                  />
                </label>
                <label className="input-group">
                  <span>Role</span>
                  <select name="role" defaultValue="Researcher">
                    <option>Researcher</option>
                    <option>Industry</option>
                    <option>Student</option>
                    <option>Other</option>
                  </select>
                </label>
                <button type="submit" className="button button-primary">
                  Request Early Access
                </button>
                <input type="hidden" name="source" value="regenova-waitlist" />
              </form>
            </div>
          </div>
        </section>

        <section className="section" id="about">
          <div className="container about">
            <div>
              <h2>Built by an interdisciplinary team</h2>
              <p>
                Regenova combines expertise in computer vision, stem cell
                biology, and clinical translation. We collaborate closely with
                academic mentors and industry advisors.
              </p>
            </div>
            <div className="about-card">
              <p className="about-label">Collaboration</p>
              <p className="about-text">Open to research partnerships.</p>
              <a className="button button-ghost" href="#waitlist">
                Start a collaboration
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <p>Regenova © 2026</p>
          <div className="footer-links">
            <a href="mailto:research@regenova.ai">research@regenova.ai</a>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href="#waitlist">Research Collaboration Enquiries</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
