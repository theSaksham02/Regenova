"use client";
import styles from "./page.module.css";
import React, { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thanks for your interest! Added ${email} to the research waitlist.`);
    setEmail("");
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo}>Regenova</div>
        <nav className={styles.navLinks}>
          <a href="#problem" className={styles.navLink}>Problem</a>
          <a href="#process" className={styles.navLink}>Process</a>
          <a href="#impact" className={styles.navLink}>Impact</a>
          <a href="#waitlist" className={styles.ctaButton} style={{ padding: '8px 20px', fontSize: '14px', height: 'auto' }}>
            Join Waitlist
          </a>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroHeadline}>
              AI-Driven Precision for<br />Stem Cell Differentiation
            </h1>
            <p className={styles.heroSubheadline}>
              Regenova uses deep learning to analyze stem cell differentiation with speed, accuracy, and transparency.
            </p>
            <a href="#waitlist" className={styles.ctaButton}>
              Join the Research Waitlist
            </a>
          </div>
        </section>

        {/* Problem / Solution */}
        <section id="problem" className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>The Challenge</h2>
            <p className={styles.sectionSubtitle}>Why current methods fall short in regenerative medicine.</p>
          </div>
          <div className={styles.gridTwoCol}>
            <div className={`${styles.colBox} ${styles.problemBox}`}>
              <h3 className={styles.boxTitle}>
                <span style={{ fontSize: '28px' }}>❌</span> Manual Analysis
              </h3>
              <ul className={styles.list}>
                <li className={styles.listItem}>Time-consuming & subjective human review</li>
                <li className={styles.listItem}>High inter-observer variability and error rates</li>
                <li className={styles.listItem}>Not scalable for high-throughput screening</li>
              </ul>
            </div>
            <div className={`${styles.colBox} ${styles.solutionBox}`}>
              <h3 className={styles.boxTitle}>
                <span style={{ fontSize: '28px' }}>✅</span> Regenova AI
              </h3>
              <ul className={styles.list}>
                <li className={styles.listItem}>Real-time morphological feature extraction</li>
                <li className={styles.listItem}>Consistent, quantifiable differentiation metrics</li>
                <li className={styles.listItem}>Scalable analysis for millions of cells</li>
              </ul>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="process" className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>How It Works</h2>
            <p className={styles.sectionSubtitle}>From raw image to actionable insight in three steps.</p>
          </div>
          <div className={styles.processGrid}>
            <div className={styles.processCard}>
              <div className={styles.stepNumber}>01</div>
              <h3 style={{ marginBottom: '10px', fontSize: '20px' }}>Image Input</h3>
              <p style={{ color: 'var(--muted)', lineHeight: '1.6' }}>Upload brightfield stem cell images directly from your microscope or database.</p>
            </div>
            <div className={styles.processCard}>
              <div className={styles.stepNumber}>02</div>
              <h3 style={{ marginBottom: '10px', fontSize: '20px' }}>AI Processing</h3>
              <p style={{ color: 'var(--muted)', lineHeight: '1.6' }}>CNNs extract morphology while LSTMs track temporal differentiation changes.</p>
            </div>
            <div className={styles.processCard}>
              <div className={styles.stepNumber}>03</div>
              <h3 style={{ marginBottom: '10px', fontSize: '20px' }}>Prediction</h3>
              <p style={{ color: 'var(--muted)', lineHeight: '1.6' }}>Precise classification of differentiation stages with interpretability maps.</p>
            </div>
          </div>
        </section>

        {/* Why It Matters */}
        <section id="impact" className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Why It Matters</h2>
          </div>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <div className={styles.statValue}>60%</div>
              <div className={styles.statLabel}>Faster Analysis</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>&gt;90%</div>
              <div className={styles.statLabel}>Model Accuracy</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>Ethics</div>
              <div className={styles.statLabel}>Non-Invasive AI</div>
            </div>
          </div>
        </section>

        {/* Target Audience */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Who It&apos;s For</h2>
          </div>
          <div className={styles.audienceGrid}>
            <div className={styles.audienceCard}>
              <h3 style={{ marginBottom: '10px' }}>Academic Labs</h3>
              <p style={{ color: 'var(--muted)', fontSize: '14px' }}>Accelerate basic research in stem cell biology.</p>
            </div>
            <div className={styles.audienceCard}>
              <h3 style={{ marginBottom: '10px' }}>Biotech R&D</h3>
              <p style={{ color: 'var(--muted)', fontSize: '14px' }}>Streamline drug discovery pipelines.</p>
            </div>
            <div className={styles.audienceCard}>
              <h3 style={{ marginBottom: '10px' }}>Regen Medicine</h3>
              <p style={{ color: 'var(--muted)', fontSize: '14px' }}>Validate quality of therapeutic cells.</p>
            </div>
          </div>
        </section>

        {/* Research Positioning & Team */}
        <section className={styles.section} style={{ paddingTop: '0' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', background: '#F8F9FC', padding: '40px', borderRadius: '24px' }}>
            <h3 style={{ fontSize: '24px', marginBottom: '16px', fontFamily: 'var(--font-display)' }}>Research-First Approach</h3>
            <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '24px' }}>
              Regenova is a research-driven initiative. We are currently validating our models, publishing results, and collaborating with academic and industry partners before productization.
            </p>
            <div style={{ fontSize: '14px', color: 'var(--ink)', fontWeight: '600' }}>
              Built by an interdisciplinary team at the intersection of AI and Medicine.
            </div>
          </div>
        </section>

        {/* Waitlist */}
        <section id="waitlist" className={styles.waitlistSection}>
          <h2 className={styles.sectionTitle}>Join the Research Waitlist</h2>
          <p className={styles.sectionSubtitle}>Be among the first researchers to collaborate, test, or review our AI models.</p>

          <form className={styles.formContainer} onSubmit={handleJoin}>
            <input
              type="email"
              placeholder="Enter your email address"
              className={styles.inputInput}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <select className={styles.selectInput} style={{ color: 'var(--muted)' }}>
              <option value="" disabled selected>Select your role</option>
              <option value="Researcher">Researcher</option>
              <option value="Industry">Industry Professional</option>
              <option value="Student">Student</option>
              <option value="Other">Other</option>
            </select>
            <button type="submit" className={styles.ctaButton} style={{ width: '100%', cursor: 'pointer' }}>
              Request Early Access
            </button>
          </form>
        </section>

      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div>Regenova &copy; 2026</div>
        <div className={styles.footerLinks}>
          <a href="mailto:contact@regenova.science">Contact</a>
          <a href="#">LinkedIn</a>
          <a href="#">Collaborations</a>
        </div>
      </footer>
    </div>
  );
}
