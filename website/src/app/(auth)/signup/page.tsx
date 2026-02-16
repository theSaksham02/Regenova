import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Request Access | Regenova",
    description: "Join the Regenova Research Platform.",
};

export default function SignupPage() {
    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <Link href="/" className="auth-logo">
                        <img src="/logo_trans.jpg" alt="Regenova" />
                    </Link>
                    <h1>Request Access</h1>
                    <p>Join leading research teams using Regenova AI.</p>
                </div>

                <form className="auth-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" id="firstName" name="firstName" placeholder="Jane" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" id="lastName" name="lastName" placeholder="Doe" required />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Work Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="name@research-lab.edu"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="org">Organization / Lab</label>
                        <input
                            type="text"
                            id="org"
                            name="org"
                            placeholder="University of ..."
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Create Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button type="submit" className="main-button full-width">
                        Request Account
                    </button>
                </form>

                <p className="auth-footer">
                    Already have an account? <Link href="/login">Sign In</Link>
                </p>
            </div>

            <div className="auth-background">
                <div className="video-overlay vertical" />
                <div className="video-overlay horizontal" />
            </div>
        </div>
    );
}
