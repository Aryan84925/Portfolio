import { Link } from 'react-router-dom'
import './Login.css'

export default function Signup() {
    return (
        <main className="auth-page">
            <div className="auth-orb auth-orb-1" aria-hidden="true" />
            <div className="auth-orb auth-orb-2" aria-hidden="true" />
            <div className="auth-orb auth-orb-3" aria-hidden="true" />

            <div className="auth-shell">
                <section className="auth-panel">
                    <div className="auth-panel-content">
                        <span className="auth-badge">New Member</span>
                        <h1 className="auth-title auth-body-title">Create your profile</h1>
                        <p className="auth-subtitle">
                            Join Storeline to save your favorites, unlock member pricing, and track every order.
                        </p>
                        <div className="auth-features">
                            <div className="auth-feature">
                                <span className="feature-label">Members-only</span>
                                <span className="feature-value">Private drops</span>
                            </div>
                            <div className="auth-feature">
                                <span className="feature-label">Personalized</span>
                                <span className="feature-value">Smart picks</span>
                            </div>
                            <div className="auth-feature">
                                <span className="feature-label">Secure</span>
                                <span className="feature-value">Protected checkout</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="auth-card" aria-label="Sign up form">
                    <div className="auth-card-header">
                        <p className="auth-eyebrow">Sign up</p>
                        <h2 className="auth-card-title auth-body-title">Start your Storeline journey</h2>
                        <p className="auth-card-subtitle">Create your account in seconds.</p>
                    </div>

                    <form className="auth-form">
                        <label className="auth-field">
                            <span>Full name</span>
                            <input type="text" placeholder="Sara Kiani" required />
                        </label>
                        <label className="auth-field">
                            <span>Email address</span>
                            <input type="email" placeholder="you@storeline.com" required />
                        </label>
                        <label className="auth-field">
                            <span>Password</span>
                            <input type="password" placeholder="Create a password" required />
                        </label>
                        <label className="auth-field">
                            <span>Confirm password</span>
                            <input type="password" placeholder="Repeat your password" required />
                        </label>

                        <label className="auth-check">
                            <input type="checkbox" />
                            <span>I agree to the Terms and Privacy Policy</span>
                        </label>

                        <button type="submit" className="auth-submit">Create account</button>
                    </form>

                    <div className="auth-divider">
                        <span>or sign up with</span>
                    </div>

                    <div className="auth-socials">
                        <button type="button" className="auth-social">Google</button>
                        <button type="button" className="auth-social">Apple</button>
                        <button type="button" className="auth-social">X</button>
                    </div>

                    <p className="auth-footer">
                        Already have an account? <Link to="/login">Sign in</Link>
                    </p>
                </section>
            </div>
        </main>
    )
}
