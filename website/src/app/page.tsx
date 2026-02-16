"use client";

import { useEffect, useRef, useState } from "react";
import Head from "next/head";

const WAITLIST_ENDPOINT = "/api/waitlist";
type FormState = "idle" | "sending" | "success" | "error";

export default function Home() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [formState, setFormState] = useState<FormState>("idle");

  const submitForm = async (
    event: React.FormEvent<HTMLFormElement>,
    setState: (state: FormState) => void
  ) => {
    event.preventDefault();
    if (event.currentTarget.dataset.busy === "true") return;

    setState("sending");

    try {
      const formData = new FormData(event.currentTarget);
      const payload = Object.fromEntries(formData.entries());

      const response = await fetch(WAITLIST_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        event.currentTarget.reset();
        setState("success");
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  };

  const handleWaitlistSubmit = (event: React.FormEvent<HTMLFormElement>) =>
    submitForm(event, setFormState);

  return (
    <div className="page-wrapper">
      <Head>
        <title>Regenova - AI-Driven Stem Cell Differentiation</title>
        <meta
          name="description"
          content="Automated, interpretable, and scalable stem cell analysis for research teams."
        />
      </Head>

      <div className="video-background-wrapper">
        <video
          className={`hero-video ${videoLoaded ? "loaded" : ""}`}
          autoPlay
          loop
          muted
          playsInline
          onCanPlayThrough={() => setVideoLoaded(true)}
        >
          <source src="/hero-light.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay vertical" />
        <div className="video-overlay horizontal" />
        <div className="video-overlay circle" />
      </div>

      <nav className="navbar">
        <div className="container nav-container">
          <div className="logo-wrapper">
            <span className="logo-params">
              <img src="/logo_trans.jpg" alt="Regenova" className="nav-logo" />
              Regenova
            </span>
          </div>
          <div className="nav-links">
            <a href="#how-it-works" className="nav-link">How it Works</a>
            <a href="#impact" className="nav-link">Impact</a>
            <a href="mailto:research@regenova.ai" className="main-button small w-inline-block">
              <div>Get in Touch</div>
            </a>
          </div>
        </div>
      </nav>

      <main className="main-content">
        {/* SECTION 1: HERO */}
        <section className="section-hero">
          <div className="container hero-container">
            <div className="hero-content">
              <div className="hero-brand-mark">
                <img src="/logo_trans.jpg" alt="Regenova Mark" />
              </div>
              <h1 className="hero-heading text-gradient">
                AI-Driven Precision for<br />Stem Cell Differentiation
              </h1>
              <p className="hero-subtext">
                Regenova uses deep learning to analyze stem cell differentiation With speed, accuracy, and transparency.
              </p>
              <div className="hero-buttons">
                <a href="#waitlist" className="main-button w-inline-block">
                  <div>Join the Research Waitlist</div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: WHAT IS REGENOVA (Problem -> Solution) */}
        <section className="section-white" id="problem-solution">
          <div className="container">
            <h2 className="section-heading text-center mb-12">The Challenge vs. The Solution</h2>

            <div className="comparison-grid">
              {/* Problem Card - Muted, Technical */}
              <div className="spec-card problem">
                <div className="card-header">
                  <span className="spec-tag">LEGACY_METHOD</span>
                  <h3>The Problem</h3>
                </div>
                <ul className="spec-list">
                  <li>
                    <span className="icon-cross">✕</span>
                    <span>Manual stem cell analysis</span>
                  </li>
                  <li>
                    <span className="icon-cross">✕</span>
                    <span>Time-consuming & expensive</span>
                  </li>
                  <li>
                    <span className="icon-cross">✕</span>
                    <span>Error-prone human review</span>
                  </li>
                  <li>
                    <span className="icon-cross">✕</span>
                    <span>Not scalable for high-throughput</span>
                  </li>
                </ul>
              </div>

              {/* Solution Card - Clean, Elevated */}
              <div className="spec-card solution">
                <div className="card-header">
                  <span className="spec-tag active">REGENOVA_AI</span>
                  <h3>The Solution</h3>
                </div>
                <ul className="spec-list">
                  <li>
                    <span className="icon-check">✓</span>
                    <span>AI-powered image analysis</span>
                  </li>
                  <li>
                    <span className="icon-check">✓</span>
                    <span>CNN + temporal modeling</span>
                  </li>
                  <li>
                    <span className="icon-check">✓</span>
                    <span>Real-time stage predictions</span>
                  </li>
                  <li>
                    <span className="icon-check">✓</span>
                    <span>Interpretable outputs (Heatmaps)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: HOW IT WORKS */}
        <section className="section-light" id="how-it-works">
          <div className="container">
            <h2 className="section-heading">How It Works</h2>
            <div className="grid-4-col steps-grid">
              <div className="step-card">
                <div className="step-icon">1</div>
                <h4>Image Input</h4>
                <p>Upload brightfield stem cell images securely.</p>
              </div>
              <div className="step-card">
                <div className="step-icon">2</div>
                <h4>AI Processing</h4>
                <p>CNN extracts morphology, LSTM tracks differentiation.</p>
              </div>
              <div className="step-card">
                <div className="step-icon">3</div>
                <h4>Prediction</h4>
                <p>Instant differentiation stage classification.</p>
              </div>
              <div className="step-card">
                <div className="step-icon">4</div>
                <h4>Interpretability</h4>
                <p>Heatmaps highlight key decision regions.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: WHY IT MATTERS (IMPACT) */}
        <section className="section-white" id="impact">
          <div className="container">
            <h2 className="section-heading">Why It Matters</h2>
            <div className="grid-3-col impact-stats">
              <div className="stat-card">
                <h3>60% Faster</h3>
                <p>Drastically reduced analysis time.</p>
              </div>
              <div className="stat-card">
                <h3>&gt;90% Accuracy</h3>
                <p>Validated against expert benchmarks.</p>
              </div>
              <div className="stat-card">
                <h3>Scalable</h3>
                <p>Non-invasive, ethical AI workflows.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: WHO IT'S FOR */}
        <section className="section-light" id="audience">
          <div className="container">
            <h2 className="section-heading">Who It&apos;s For</h2>
            <div className="grid-3-col audience-grid">
              <div className="audience-card">
                <h4>Academic Research Labs</h4>
              </div>
              <div className="audience-card">
                <h4>Biotech & Pharma R&D</h4>
              </div>
              <div className="audience-card">
                <h4>Regenerative Medicine</h4>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: RESEARCH-FIRST POSITIONING */}
        <section className="section-white" id="research">
          <div className="container">
            <div className="research-box">
              <p className="research-text">
                <strong>Regenova is a research-driven initiative.</strong><br />
                We are currently validating our models, publishing results, and collaborating with academic and industry partners before productization.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 7: WAITLIST */}
        <section className="section-cta" id="waitlist">
          <div className="container">
            <div className="cta-box">
              <h2>Join the Regenova Research Waitlist</h2>
              <p>Be among the first researchers to collaborate, test, or review our AI models.</p>

              <form
                className="waitlist-form-simple"
                action={WAITLIST_ENDPOINT}
                method="POST"
                onSubmit={handleWaitlistSubmit}
              >
                <div className="form-row">
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                    disabled={formState === "sending" || formState === "success"}
                  />
                  <select name="role" defaultValue="Researcher">
                    <option value="Researcher">Researcher</option>
                    <option value="Industry">Industry</option>
                    <option value="Student">Student</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <button type="submit" className="main-button" disabled={formState === "sending" || formState === "success"}>
                  {formState === "sending" ? "Joining..." : formState === "success" ? "Joined!" : "Request Early Access"}
                </button>
                {formState === "success" && <p className="success-msg">Thanks! We&apos;ll be in touch.</p>}
                {formState === "error" && <p className="error-msg">Something went wrong. Try again.</p>}
              </form>
            </div>
          </div>
        </section>

        {/* SECTION 8: ABOUT/TEAM */}
        <section className="section-light" id="about">
          <div className="container center-text">
            <p className="team-text">
              Built by an interdisciplinary team working at the intersection of AI and regenerative medicine.<br />
              <span className="sub-team">In collaboration with academic mentors.</span>
            </p>
          </div>
        </section>

      </main>

      <footer className="footer-large" id="contact">
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand-section">
              <h4>Get latest updates<br />on Regenova Research.</h4>
              <form className="footer-newsletter">
                <input type="email" placeholder="Enter your email" />
                <button type="submit">SIGN UP</button>
              </form>
            </div>

            <div className="footer-links-grid">
              <div className="footer-column">
                <h5>PLATFORM</h5>
                <a href="#how-it-works">Technology</a>
                <a href="#impact">Impact</a>
              </div>
              <div className="footer-column">
                <h5>COMPANY</h5>
                <a href="#about">About</a>
                <a href="#mission">Our Mission</a>
                <a href="mailto:careers@regenova.ai">Careers</a>
              </div>
              <div className="footer-column">
                <h5>CONNECT</h5>
                <a href="mailto:research@regenova.ai">Contact</a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <h1 className="huge-brand-text">REGENOVA</h1>
            <div className="footer-legal">
              <span>© 2026 Regenova Inc.</span>
              <div className="legal-links">
                <a href="/privacy">Privacy Policy</a>
                <a href="/terms">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
