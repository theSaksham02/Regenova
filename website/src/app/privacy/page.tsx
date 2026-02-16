import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Regenova",
  description: "Privacy Policy for Regenova website and waitlist.",
};

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <div className="legal-route-container">
        <div className="legal-route-head">
          <Link className="legal-back-link" href="/">
            Back to Regenova
          </Link>
          <h1>Privacy Policy</h1>
          <p>Effective Date: 12th May, 2025 | Company: Regenova</p>
        </div>

        <article className="legal-route-card">
          <p>
            At Regenova, we are committed to protecting your privacy and
            safeguarding your data. This policy explains what we collect, how
            we use it, and how we secure it when you interact with our website
            or join our waitlist.
          </p>

          <h2>1. Information We Collect</h2>
          <ul>
            <li>Name and email address via waitlist or contact forms.</li>
            <li>Professional affiliation or organization, if voluntarily provided.</li>
            <li>Website analytics data through cookies or similar tools.</li>
          </ul>
          <p>
            We do not collect sensitive biomedical, patient, or clinical data
            through this website.
          </p>

          <h2>2. How We Use Information</h2>
          <ul>
            <li>Send updates about Regenova research and product direction.</li>
            <li>Respond to collaboration and partnership inquiries.</li>
            <li>Improve website functionality and user experience.</li>
            <li>Share seed and early-stage funding updates where relevant.</li>
          </ul>

          <h2>3. Legal Basis and Consent</h2>
          <p>
            Where applicable, we process personal data based on user consent,
            legitimate interests, or legal obligations. You may withdraw consent
            for non-essential communications at any time.
          </p>

          <h2>4. Data Protection</h2>
          <p>
            We apply reasonable technical and organizational safeguards to
            protect data. Regenova does not sell personal data and does not
            disclose personal data to third parties without consent, unless
            required by law.
          </p>

          <h2>5. Data Retention and Rights</h2>
          <p>
            We retain submitted data only as long as necessary for the purposes
            stated above. You may request access, correction, deletion, or
            export of your data by contacting us.
          </p>

          <h2>6. International Transfers</h2>
          <p>
            If data is processed outside your jurisdiction, we take reasonable
            steps to ensure an adequate level of protection consistent with
            applicable law.
          </p>

          <h2>7. Contact</h2>
          <p>
            For privacy questions or data requests, contact{" "}
            <a href="mailto:research@regenova.ai">research@regenova.ai</a>.
          </p>
        </article>
      </div>
    </main>
  );
}
