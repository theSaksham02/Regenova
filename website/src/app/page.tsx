"use client";

import { useEffect, useRef, useState } from "react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/REPLACE_ME";
const HERO_HEADLINE = "AI-Driven Precision for Stem Cell Differentiation";
const PIPELINE_STEPS = [
  {
    number: "01",
    title: "Image Input",
    body: "Brightfield stem cell images are ingested securely.",
  },
  {
    number: "02",
    title: "AI Processing",
    body: "CNNs extract morphology while temporal models track change.",
  },
  {
    number: "03",
    title: "Prediction",
    body: "Stage classification and progression scoring in real time.",
  },
  {
    number: "04",
    title: "Interpretability",
    body: "Heatmaps reveal why the model made each decision.",
  },
];

type FormState = "idle" | "sending" | "success" | "error";

export default function Home() {
  const pageRef = useRef<HTMLDivElement | null>(null);
  const metricsRef = useRef<HTMLDivElement | null>(null);
  const howRef = useRef<HTMLElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const heroCopyRef = useRef<HTMLDivElement | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const pipelineFillRef = useRef<HTMLDivElement | null>(null);
  const pipelineNodeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const stepCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [formState, setFormState] = useState<FormState>("idle");
  const [footerState, setFooterState] = useState<FormState>("idle");
  const [typedHeadline, setTypedHeadline] = useState("");
  const [metricsStarted, setMetricsStarted] = useState(false);
  const [speedStat, setSpeedStat] = useState(0);
  const [accuracyStat, setAccuracyStat] = useState(0);

  useEffect(() => {
    const page = pageRef.current;
    if (!page || typeof window === "undefined") return;

    const media = window.matchMedia("(pointer: fine)");
    if (!media.matches) return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const update = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      page.style.setProperty("--cursor-x", `${currentX.toFixed(2)}px`);
      page.style.setProperty("--cursor-y", `${currentY.toFixed(2)}px`);
      page.style.setProperty(
        "--cursor-x-soft",
        `${(currentX * 0.4).toFixed(2)}px`
      );
      page.style.setProperty(
        "--cursor-y-soft",
        `${(currentY * 0.4).toFixed(2)}px`
      );

      if (Math.abs(currentX - targetX) > 0.1 || Math.abs(currentY - targetY) > 0.1) {
        raf = requestAnimationFrame(update);
      } else {
        raf = 0;
      }
    };

    const handleMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (event.clientX / innerWidth - 0.5) * 40;
      const y = (event.clientY / innerHeight - 0.5) * 40;
      targetX = x;
      targetY = y;
      if (!raf) {
        raf = requestAnimationFrame(update);
      }
    };

    const handleLeave = () => {
      targetX = 0;
      targetY = 0;
      if (!raf) {
        raf = requestAnimationFrame(update);
      }
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
      if (raf) {
        cancelAnimationFrame(raf);
      }
    };
  }, []);

  useEffect(() => {
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setTypedHeadline(HERO_HEADLINE.slice(0, index));
      if (index >= HERO_HEADLINE.length) {
        window.clearInterval(timer);
      }
    }, 32);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const metricsNode = metricsRef.current;
    if (!metricsNode) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setMetricsStarted(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(metricsNode);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!metricsStarted) return;

    const duration = 1400;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setSpeedStat(Math.round(60 * eased));
      setAccuracyStat(Math.round(90 * eased));

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }, [metricsStarted]);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;

    const run = async () => {
      const gsapModule = await import("gsap");
      const scrollTriggerModule = await import("gsap/ScrollTrigger");
      const gsap = gsapModule.gsap;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger;

      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        if (backdropRef.current) {
          gsap.fromTo(
            backdropRef.current,
            { yPercent: 0 },
            {
              yPercent: -8,
              ease: "none",
              scrollTrigger: {
                trigger: document.documentElement,
                start: "top top",
                end: "bottom bottom",
                scrub: true,
              },
            }
          );
        }

        if (heroRef.current && heroCopyRef.current) {
          const heroTl = gsap.timeline({
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });

          heroTl
            .to(heroCopyRef.current, { y: -36, ease: "none" }, 0)
            .to(".hero-logo", { scale: 1.08, y: -14, ease: "none" }, 0)
            .to(".hero-panel", { y: -22, ease: "none" }, 0);
        }

        if (howRef.current && pipelineFillRef.current) {
          const nodes = pipelineNodeRefs.current.filter(
            (node): node is HTMLSpanElement => node !== null
          );
          const steps = stepCardRefs.current.filter(
            (node): node is HTMLDivElement => node !== null
          );

          gsap.set(pipelineFillRef.current, { width: "25%" });
          nodes.forEach((node, index) => {
            gsap.set(node, {
              backgroundColor: index === 0 ? "#4f6cff" : "#fff",
              borderColor: index === 0 ? "#4f6cff" : "rgba(13, 15, 18, 0.25)",
              boxShadow:
                index === 0
                  ? "0 0 0 5px rgba(79, 108, 255, 0.2)"
                  : "0 0 0 0 rgba(79, 108, 255, 0)",
            });
          });

          steps.forEach((step, index) => {
            const progress = step.querySelector(".step-progress span");
            gsap.set(step, {
              y: index === 0 ? -4 : 0,
              borderColor:
                index === 0
                  ? "rgba(79, 108, 255, 0.42)"
                  : "rgba(13, 15, 18, 0.08)",
              boxShadow:
                index === 0
                  ? "0 18px 38px rgba(43, 74, 173, 0.16)"
                  : "0 18px 40px rgba(13, 15, 18, 0.06)",
            });
            if (progress) {
              gsap.set(progress, { width: index === 0 ? "100%" : "0%" });
            }
          });

          const howTl = gsap.timeline({
            scrollTrigger: {
              trigger: howRef.current,
              start: "top 68%",
              end: "bottom 34%",
              scrub: 0.6,
            },
          });

          PIPELINE_STEPS.forEach((_, index) => {
            const nextWidth = `${((index + 1) / PIPELINE_STEPS.length) * 100}%`;
            const step = steps[index];
            const node = nodes[index];
            const progress = step?.querySelector(".step-progress span");

            howTl.to(
              pipelineFillRef.current,
              { width: nextWidth, duration: 0.45, ease: "none" },
              index
            );

            if (node) {
              howTl.to(
                node,
                {
                  backgroundColor: "#4f6cff",
                  borderColor: "#4f6cff",
                  boxShadow: "0 0 0 5px rgba(79, 108, 255, 0.2)",
                  duration: 0.2,
                },
                index
              );
            }

            if (step) {
              howTl.to(
                step,
                {
                  y: -4,
                  borderColor: "rgba(79, 108, 255, 0.42)",
                  boxShadow: "0 18px 38px rgba(43, 74, 173, 0.16)",
                  duration: 0.2,
                },
                index
              );
            }

            if (progress) {
              howTl.to(progress, { width: "100%", duration: 0.2 }, index);
            }
          });
        }
      }, pageRef);
    };

    void run();

    return () => {
      if (ctx) {
        ctx.revert();
      }
    };
  }, []);

  useEffect(() => {
    const cards = Array.from(
      document.querySelectorAll<HTMLElement>(".tilt-card")
    );
    const canTilt = window.matchMedia("(pointer: fine)").matches;
    if (!canTilt || cards.length === 0) return;

    const cleanups: Array<() => void> = [];

    cards.forEach((card) => {
      let frame = 0;
      const handleMove = (event: MouseEvent) => {
        const bounds = card.getBoundingClientRect();
        const px = (event.clientX - bounds.left) / bounds.width;
        const py = (event.clientY - bounds.top) / bounds.height;
        const rotateY = (px - 0.5) * 7;
        const rotateX = (0.5 - py) * 7;

        if (!frame) {
          frame = requestAnimationFrame(() => {
            card.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(
              2
            )}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-2px)`;
            frame = 0;
          });
        }
      };

      const handleLeave = () => {
        card.style.transform =
          "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
      };

      card.addEventListener("mousemove", handleMove);
      card.addEventListener("mouseleave", handleLeave);

      cleanups.push(() => {
        card.removeEventListener("mousemove", handleMove);
        card.removeEventListener("mouseleave", handleLeave);
      });
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;

    const groups = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal-group]"));
    groups.forEach((group) => {
      const items = Array.from(group.querySelectorAll<HTMLElement>("[data-reveal]"));
      items.forEach((item, index) => {
        item.style.setProperty("--reveal-delay", `${index * 90}ms`);
      });
    });

    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const submitForm = async (
    event: React.FormEvent<HTMLFormElement>,
    setState: (state: FormState) => void
  ) => {
    event.preventDefault();
    if (event.currentTarget.dataset.busy === "true") return;

    setState("sending");

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
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

  const handleFooterSubmit = (event: React.FormEvent<HTMLFormElement>) =>
    submitForm(event, setFooterState);

  return (
    <div className="page" ref={pageRef}>
      <div className="backdrop" aria-hidden="true" ref={backdropRef}>
        <div className="grid-overlay" />
        <div className="grid-label label-1">Drift</div>
        <div className="grid-label label-2">Variance</div>
        <div className="grid-label label-3">Axis B</div>
        <div className="grid-label label-4">Slope</div>
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
        <div className="cursor-glow" />
      </div>

      <header className="site-header">
        <div className="container nav">
          <div className="logo">
            <img
              src="/image.png"
              alt="Regenova logo"
              className="logo-image"
            />
            <span>Regenova</span>
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
        <section className="hero-intro" id="top">
          <div className="container hero-intro-content" data-reveal-group>
            <img
              src="/image.png"
              alt="Regenova mark"
              className="hero-intro-logo reveal"
              data-reveal
            />
            <h1 className="hero-intro-title reveal" data-reveal>
              Regenova
            </h1>
            <p className="hero-intro-subtitle reveal" data-reveal>
              AI-first stem cell differentiation intelligence.
            </p>
            <a href="#problem" className="scroll-indicator reveal" data-reveal>
              <span>Scroll</span>
              <span className="scroll-dot" aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className="press-bar" aria-label="Updates">
          <div className="press-track">
            <span>Preprint in preparation</span>
            <span>Benchmark validation underway</span>
            <span>Open to academic collaborations</span>
            <span>Regenerative medicine focus</span>
          </div>
        </section>

        <section className="section hero" id="hero" ref={heroRef}>
          <div className="container hero-grid" data-reveal-group>
            <div className="hero-copy reveal" data-reveal ref={heroCopyRef}>
              <p className="eyebrow">Regenova Research Initiative</p>
              <div className="launch-badge">
                <span>Launch</span>
                Research waitlist now open
              </div>
              <img
                src="/image.png"
                alt="Regenova mark"
                className="hero-logo"
              />
              <h1 className="type-reveal" aria-label={HERO_HEADLINE}>
                {typedHeadline}
                <span className="type-caret" aria-hidden="true" />
              </h1>
              <p className="lead">
                Regenova uses deep learning to analyze stem cell differentiation
                with speed, accuracy, and transparency. We are building the
                research layer that makes regenerative medicine more reliable
                and scalable.
              </p>
              <div className="hero-actions">
                <a
                  href="#waitlist"
                  className="button button-primary pulse-active"
                >
                  Join the Research Waitlist
                </a>
                <a href="#how" className="button button-ghost">
                  View the Method
                </a>
              </div>
              <div className="hero-metrics" ref={metricsRef}>
                <div className="metric-card">
                  <span className="metric-value">{speedStat}%</span>
                  <span className="metric-label">Faster analysis</span>
                </div>
                <div className="metric-card">
                  <span className="metric-value">{accuracyStat}%+</span>
                  <span className="metric-label">Validated accuracy</span>
                </div>
                <div className="metric-card">
                  <span className="metric-value">Non-invasive</span>
                  <span className="metric-label">Ethical AI</span>
                </div>
              </div>
            </div>
            <div className="hero-panel reveal tilt-card" data-reveal>
              <div className="panel-header">
                <span>Brightfield input</span>
                <span className="panel-pill">Live feed</span>
              </div>
              <div className="panel-body">
                <div className="signal-grid" data-reveal-group>
                  <div className="signal-card reveal" data-reveal>
                    <p className="signal-title">Stage Detection</p>
                    <p className="signal-value">Differentiation: 3.2</p>
                    <p className="signal-note">Confidence 0.92</p>
                  </div>
                  <div className="signal-card reveal" data-reveal>
                    <p className="signal-title">Morphology Drift</p>
                    <p className="signal-value">Stable</p>
                    <p className="signal-note">12 hr trend</p>
                  </div>
                  <div className="signal-card reveal" data-reveal>
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
          <div className="container split" data-reveal-group>
            <div className="card reveal tilt-card" data-reveal>
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
            <div className="card card-accent reveal tilt-card" data-reveal>
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

        <section className="section" id="how" ref={howRef}>
          <div className="container">
            <div className="section-header">
              <h2>How it works</h2>
              <p>
                A streamlined pipeline designed for researchers who need
                precision without black-box ambiguity.
              </p>
            </div>
            <div className="pipeline-track" aria-hidden="true">
              <div className="pipeline-fill" ref={pipelineFillRef} />
              {PIPELINE_STEPS.map((_, index) => (
                <span
                  key={index}
                  className="pipeline-node"
                  ref={(node) => {
                    pipelineNodeRefs.current[index] = node;
                  }}
                />
              ))}
            </div>
            <div className="steps-grid" data-reveal-group>
              {PIPELINE_STEPS.map((step, index) => (
                <div
                  key={step.number}
                  className="step-card reveal"
                  data-reveal
                  ref={(node) => {
                    stepCardRefs.current[index] = node;
                  }}
                >
                  <span className="step-number">{step.number}</span>
                  <h4>{step.title}</h4>
                  <p>{step.body}</p>
                  <div className="step-progress">
                    <span />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="story">
          <div className="container">
            <div className="section-header">
              <h2>From imaging to insight</h2>
              <p>Three movements that translate cells into actionable signal.</p>
            </div>
            <div className="story-grid" data-reveal-group>
              <div className="story-card reveal tilt-card" data-reveal>
                <div className="story-icon">01</div>
                <h4>Imaging</h4>
                <p>Capture consistent brightfield frames across time.</p>
              </div>
              <div className="story-card reveal tilt-card" data-reveal>
                <div className="story-icon">02</div>
                <h4>Model</h4>
                <p>Deep networks interpret morphology and progression.</p>
              </div>
              <div className="story-card reveal tilt-card" data-reveal>
                <div className="story-icon">03</div>
                <h4>Insight</h4>
                <p>Surface interpretable differentiation signals instantly.</p>
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
            <div className="impact-grid" data-reveal-group>
              <div className="impact-card reveal tilt-card" data-reveal>
                <h4>60% faster analysis</h4>
                <p>Automated inference reduces manual review time.</p>
              </div>
              <div className="impact-card reveal tilt-card" data-reveal>
                <h4>90%+ benchmark accuracy</h4>
                <p>Validated against expert-labeled datasets.</p>
              </div>
              <div className="impact-card reveal tilt-card" data-reveal>
                <h4>Scalable and non-invasive</h4>
                <p>Designed for high-throughput lab workflows.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="audience">
          <div className="container">
            <div className="section-header">
              <h2>Who it&apos;s for</h2>
              <p>Focused on teams who demand accuracy and traceability.</p>
            </div>
            <div className="audience-grid" data-reveal-group>
              <div className="audience-card reveal tilt-card" data-reveal>
                <h4>Academic Research Labs</h4>
                <p>Accelerate differentiation experiments with reliable data.</p>
              </div>
              <div className="audience-card reveal tilt-card" data-reveal>
                <h4>Biotech & Pharma R&D</h4>
                <p>Scale cell line studies without scaling headcount.</p>
              </div>
              <div className="audience-card reveal tilt-card" data-reveal>
                <h4>Regenerative Medicine</h4>
                <p>Build more consistent pipelines for clinical translation.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="research">
          <div className="container">
            <div className="research-block reveal" data-reveal>
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
            <div className="waitlist reveal" data-reveal>
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
                onSubmit={handleWaitlistSubmit}
                aria-busy={formState === "sending"}
                data-busy={formState === "sending"}
              >
                <label className="input-group">
                  <span>Email</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@lab.edu"
                    required
                    disabled={formState === "sending" || formState === "success"}
                  />
                </label>
                <label className="input-group">
                  <span>Role</span>
                  <select
                    name="role"
                    defaultValue="Researcher"
                    disabled={formState === "sending" || formState === "success"}
                  >
                    <option>Researcher</option>
                    <option>Industry</option>
                    <option>Student</option>
                    <option>Other</option>
                  </select>
                </label>
                <button
                  type="submit"
                  className="button button-primary"
                  disabled={formState === "sending" || formState === "success"}
                >
                  {formState === "sending"
                    ? "Sending..."
                    : formState === "success"
                      ? "You&apos;re in"
                      : "Request Early Access"}
                </button>
                <input type="hidden" name="source" value="regenova-waitlist" />
                {formState === "success" && (
                  <p className="form-status success" role="status">
                    You&apos;re in. We&apos;ll share next steps shortly.
                  </p>
                )}
                {formState === "error" && (
                  <p className="form-status error" role="status">
                    Something went wrong. Please try again.
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>

        <section className="section" id="about">
          <div className="container about" data-reveal-group>
            <div className="reveal" data-reveal>
              <h2>Built by an interdisciplinary team</h2>
              <p>
                Regenova combines expertise in computer vision, stem cell
                biology, and clinical translation. We collaborate closely with
                academic mentors and industry advisors.
              </p>
            </div>
            <div className="about-card reveal" data-reveal>
              <p className="about-label">Collaboration</p>
              <p className="about-text">Open to research partnerships.</p>
              <a className="button button-ghost" href="#waitlist">
                Start a collaboration
              </a>
            </div>
          </div>
        </section>

        <section className="section legal-section" id="privacy-policy">
          <div className="container legal-grid" data-reveal-group>
            <article className="legal-card reveal tilt-card" data-reveal>
              <p className="legal-kicker">Privacy Policy</p>
              <h3>Regenova Privacy Policy</h3>
              <p className="legal-meta">
                Effective Date: 12th May, 2025 | Company: Regenova
              </p>
              <p>
                Regenova is committed to protecting your privacy and safeguarding
                your data. This policy explains what we collect, how we use it,
                and how we secure it when you use our website.
              </p>
              <h4>1. Information We Collect</h4>
              <ul className="legal-list">
                <li>Name and email address submitted via waitlist or contact forms.</li>
                <li>Professional affiliation or organization, if voluntarily shared.</li>
                <li>Website analytics data through cookies or similar tools.</li>
              </ul>
              <p>
                We do not collect sensitive biomedical, patient, or clinical data
                through this website.
              </p>
              <h4>2. How We Use Information</h4>
              <ul className="legal-list">
                <li>Provide updates regarding Regenova research and product direction.</li>
                <li>Respond to collaboration, research, or partnership inquiries.</li>
                <li>Improve website performance and user experience.</li>
                <li>Share seed and early-stage funding updates where relevant.</li>
              </ul>
              <h4>3. Data Protection</h4>
              <p>
                Data is stored using reasonable technical and organizational
                safeguards. Regenova does not sell personal data and does not
                disclose personal data to third parties without consent, except
                where legally required.
              </p>
              <h4>4. Data Retention and Rights</h4>
              <p>
                We retain submitted data only as long as necessary for the
                purposes above. You may request access, correction, or deletion
                of your data by contacting us.
              </p>
              <h4>5. Contact</h4>
              <p>
                For privacy questions or data requests, contact:
                {" "}
                <a href="mailto:research@regenova.ai">research@regenova.ai</a>
              </p>
            </article>

            <article className="legal-card reveal tilt-card" data-reveal id="terms-of-service">
              <p className="legal-kicker">Terms & Conditions</p>
              <h3>Regenova Website Terms of Use</h3>
              <p className="legal-meta">Company: Regenova</p>
              <p>
                By using this website, you agree to the following terms and
                conditions.
              </p>
              <h4>1. Informational Use</h4>
              <p>
                Website content is provided for informational purposes only and
                does not constitute medical, clinical, legal, or regulatory
                advice.
              </p>
              <h4>2. Intellectual Property</h4>
              <p>
                All website text, graphics, research concepts, and system designs
                are the intellectual property of Regenova. Unauthorized
                reproduction, distribution, or commercial use is prohibited.
              </p>
              <h4>3. Forward-Looking Statements</h4>
              <p>
                Any mention of funding, partnerships, timelines, or future
                capabilities is forward-looking and may change without notice.
              </p>
              <h4>4. No Warranty</h4>
              <p>
                Regenova makes no warranties regarding completeness, reliability,
                or accuracy of website content and may update content at any time.
              </p>
              <h4>5. Limitation of Liability</h4>
              <p>
                Regenova is not liable for indirect, incidental, or consequential
                damages arising from website use, to the extent permitted by law.
              </p>
              <h4>6. Governing Use</h4>
              <p>
                Continued use of this website indicates acceptance of the latest
                posted terms and policies.
              </p>
            </article>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-top">
          <div className="footer-left">
            <p className="footer-title">Get latest updates on Regenova.</p>
            <form
              className="footer-form"
              action={FORMSPREE_ENDPOINT}
              method="POST"
              onSubmit={handleFooterSubmit}
              aria-busy={footerState === "sending"}
              data-busy={footerState === "sending"}
            >
              <label className="footer-label" htmlFor="footer-email">
                Enter your email
              </label>
              <div className="footer-input-row">
                <input
                  id="footer-email"
                  type="email"
                  name="email"
                  placeholder="you@lab.edu"
                  required
                  disabled={footerState === "sending" || footerState === "success"}
                />
                <button
                  type="submit"
                  className="footer-submit"
                  disabled={footerState === "sending" || footerState === "success"}
                >
                  {footerState === "sending"
                    ? "Sending..."
                    : footerState === "success"
                      ? "You&apos;re in"
                      : "Sign up"}
                </button>
              </div>
              <input type="hidden" name="source" value="regenova-footer" />
              {footerState === "success" && (
                <p className="form-status success" role="status">
                  Thanks. We&apos;ll send updates here.
                </p>
              )}
              {footerState === "error" && (
                <p className="form-status error" role="status">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </div>
          <div className="footer-links-group">
            <div>
              <p className="footer-link-title">Research</p>
              <a href="#research">Program</a>
              <a href="#how">Method</a>
              <a href="#story">Insights</a>
            </div>
            <div>
              <p className="footer-link-title">Connect</p>
              <a href="mailto:research@regenova.ai">Email</a>
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href="#waitlist">Collaboration</a>
            </div>
          </div>
        </div>
        <div className="container footer-bottom">
          <div className="footer-meta">
            <a href="#privacy-policy">Privacy Policy</a>
            <a href="#terms-of-service">Terms of Service</a>
            <span>Regenova (c) 2026</span>
          </div>
        </div>
        <div className="footer-brand">
          <img src="/image.png" alt="Regenova logo" />
          <span>Regenova</span>
        </div>
      </footer>
    </div>
  );
}
