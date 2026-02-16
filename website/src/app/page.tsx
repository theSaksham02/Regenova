"use client";

import styles from "./page.module.css";

function handleLaunchClick(event: React.MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
  window.alert("Initialize Web3 Provider to Continue.");
}

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.logo}>Project 0</div>
        <nav className={styles.navLinks}>
          <a href="#">Blog</a>
          <a href="#">Learn more</a>
          <a href="#" className={styles.btnLaunch} onClick={handleLaunchClick}>
            LAUNCH APP
          </a>
        </nav>
      </header>

      <section className={styles.hero}>
        <h1>
          One Portfolio.
          <br />
          Infinite Strategies.
        </h1>
        <p>
          Access Multi-venue DeFi with Unified Margin. Borrow against your
          entire DeFi portfolio, regardless of the venues you use.
        </p>
        <a
          href="#"
          className={`${styles.btnLaunch} ${styles.btnHero}`}
          onClick={handleLaunchClick}
        >
          LAUNCH APP
        </a>

        <div className={styles.venues}>
          <span>Kamino</span>
          <span>&bull;</span>
          <span>Drift</span>
          <span>&bull;</span>
          <span>Jupiter</span>
        </div>
      </section>

      <section className={styles.features}>
        <article className={styles.featureBox}>
          <h3>Simplify Multi-Venue Portfolio Management</h3>
          <p>
            Traders can run cash and carry trades, perp funding rate arb, or
            set up yielding, hedged positions across multiple venues with
            unified margin.
          </p>
        </article>
        <article className={styles.featureBox}>
          <h3>Add zero new smart contract risk</h3>
          <p>
            Project 0 inserts a self custodial account in between you and the
            underlying venue you&apos;re using to enable deleveraging, protecting
            solvency.
          </p>
        </article>
        <article className={styles.featureBox}>
          <h3>Do what you&apos;re already doing, better</h3>
          <p>
            Keep using the venues you love while accessing credit against your
            entire on-chain portfolio. Get better capital efficiency in one
            click.
          </p>
        </article>
      </section>
    </div>
  );
}
