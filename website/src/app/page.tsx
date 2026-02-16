"use client";

import { useEffect, useRef, useState } from "react";
import Head from "next/head";

export default function Home() {
  const [videoLoaded, setVideoLoaded] = useState(false);

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
        <section className="section-hero">
          <div className="container hero-container">
            <div className="hero-content">
              <h1 className="hero-heading text-gradient">
                AI-Driven Precision<br />for Stem Cell Differentiation
              </h1>
              <p className="hero-subtext">
                Borrow against your entire DeFi portfolio... wait, no.<br />
                Analyze stem cell morphology with research-grade transparency.
              </p>
              <div className="hero-buttons">
                <a href="#waitlist" className="main-button w-inline-block">
                  <div>Join Research Waitlist</div>
                </a>
                <a href="#demo" className="secondary-button w-inline-block">
                  <div>View Demo</div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Placeholder for other sections to be styled later to match light theme */}
        <section className="section-white" id="how-it-works">
          <div className="container">
            <h2 className="section-heading">From Imaging to Insight</h2>
            <div className="grid-3-col">
              <div className="feature-card">
                <div className="feature-number">01</div>
                <h3>Upload</h3>
                <p>Securely upload brightfield images to our cloud pipeline.</p>
              </div>
              <div className="feature-card">
                <div className="feature-number">02</div>
                <h3>Analyze</h3>
                <p>Our CNN+LSTM models track temporal morphology changes.</p>
              </div>
              <div className="feature-card">
                <div className="feature-number">03</div>
                <h3>Report</h3>
                <p>Receive detailed differentiation reports with heatmaps.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <span>Regenova &copy; 2026</span>
            <div className="footer-links">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
