import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Login | Regenova",
    description: "Sign in to Regenova Research Platform.",
};

export default function LoginPage() {
    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <Link href="/" className="auth-logo">
                        <img src="/logo_trans.jpg" alt="Regenova" />
                    </Link>
                    <h1>Welcome Back</h1>
                    <p>Sign in to continue to your research dashboard.</p>
                </div>

                <form className="auth-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="name@research-lab.edu"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <div className="label-row">
                            <label htmlFor="password">Password</label>
                            <a href="#" className="forgot-link">Forgot?</a>
                        </div>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button type="submit" className="main-button full-width">
                        Sign In
                    </button>
                </form>

                <div className="auth-divider">
                    <span>OR CONTINUE WITH</span>
                </div>

                <div className="auth-socials">
                    <button type="button" className="social-btn">
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width="20" height="20" />
                        <span>Google</span>
                    </button>
                    <button type="button" className="social-btn">
                        <img src="https://www.svgrepo.com/show/512317/github-142.svg" alt="GitHub" width="20" height="20" />
                        <span>GitHub</span>
                    </button>
                </div>

                <p className="auth-footer">
                    Don&apos;t have an account? <Link href="/signup">Request Access</Link>
                </p>
            </div>

            {/* Background Ambience similar to Landing Page Video */}
            <div className="auth-background">
                <div className="video-overlay vertical" />
                <div className="video-overlay horizontal" />
            </div>
        </div>
    );
}
