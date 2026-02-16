import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Regenova",
  description: "Terms and Conditions for using the Regenova website.",
};

export default function TermsPage() {
  return (
    <main className="legal-page">
      <div className="legal-route-container">
        <div className="legal-route-head">
          <Link className="legal-back-link" href="/">
            Back to Regenova
          </Link>
          <h1>Terms & Conditions</h1>
          <p>Company: Regenova</p>
        </div>

        <article className="legal-route-card">
          <p>
            By accessing or using this website, you agree to these Terms &
            Conditions. If you do not agree, please discontinue use of the site.
          </p>

          <h2>1. Informational Use</h2>
          <p>
            All content is provided for informational purposes only and does not
            constitute medical, clinical, legal, regulatory, or investment
            advice.
          </p>

          <h2>2. Intellectual Property</h2>
          <p>
            All text, graphics, research concepts, data presentation, and system
            designs on this website are the intellectual property of Regenova,
            unless otherwise noted. Unauthorized reproduction or redistribution
            is prohibited.
          </p>

          <h2>3. Forward-Looking Statements</h2>
          <p>
            References to funding, partnerships, timelines, publications, or
            product capabilities are forward-looking statements and may change
            without notice.
          </p>

          <h2>4. No Warranty</h2>
          <p>
            Regenova makes no warranties regarding the completeness, accuracy,
            or reliability of website content and may update material at any
            time without prior notice.
          </p>

          <h2>5. Limitation of Liability</h2>
          <p>
            To the extent permitted by applicable law, Regenova is not liable
            for indirect, incidental, consequential, or punitive damages arising
            from use of this website.
          </p>

          <h2>6. Third-Party Services</h2>
          <p>
            This website may use or link to third-party services (including form
            and analytics providers). Their terms and privacy policies apply to
            your use of those services.
          </p>

          <h2>7. Governing Use and Updates</h2>
          <p>
            Continued use of this website indicates acceptance of the latest
            posted terms and related policies. Regenova reserves the right to
            revise these terms at any time.
          </p>
        </article>
      </div>
    </main>
  );
}
