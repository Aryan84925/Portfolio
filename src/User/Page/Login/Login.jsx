import { Link } from 'react-router-dom'
import './Login.css'

export default function Login() {
	return (
		<main className="auth-page">
			<div className="auth-orb auth-orb-1" aria-hidden="true" />
			<div className="auth-orb auth-orb-2" aria-hidden="true" />
			<div className="auth-orb auth-orb-3" aria-hidden="true" />

			<div className="auth-shell">
				<section className="auth-panel">
					<div className="auth-panel-content">
						<span className="auth-badge">Storeline Access</span>
						<h1 className="auth-title auth-display">Welcome back</h1>
						<p className="auth-subtitle">
							Sign in to unlock your saved items, order tracking, and member-only drops.
						</p>
						<div className="auth-features">
							<div className="auth-feature">
								<span className="feature-label">Fast checkout</span>
								<span className="feature-value">1-click wallet</span>
							</div>
							<div className="auth-feature">
								<span className="feature-label">Rewards</span>
								<span className="feature-value">Earn style points</span>
							</div>
							<div className="auth-feature">
								<span className="feature-label">Support</span>
								<span className="feature-value">Priority concierge</span>
							</div>
						</div>
					</div>
				</section>

				<section className="auth-card" aria-label="Sign in form">
					<div className="auth-card-header">
						<p className="auth-eyebrow">Sign in</p>
						<h2 className="auth-card-title auth-display">Your account awaits</h2>
						<p className="auth-card-subtitle">Use your Storeline ID to continue.</p>
					</div>

					<form className="auth-form">
						<label className="auth-field">
							<span>Email address</span>
							<input type="email" placeholder="you@storeline.com" required />
						</label>
						<label className="auth-field">
							<span>Password</span>
							<input type="password" placeholder="Enter your password" required />
						</label>

						<div className="auth-row">
							<label className="auth-check">
								<input type="checkbox" />
								<span>Keep me signed in</span>
							</label>
							<button type="button" className="auth-link">Forgot password?</button>
						</div>

						<button type="submit" className="auth-submit">Sign in</button>
					</form>

					<div className="auth-divider">
						<span>or continue with</span>
					</div>

					<div className="auth-socials">
						<button type="button" className="auth-social">Google</button>
						<button type="button" className="auth-social">Apple</button>
						<button type="button" className="auth-social">X</button>
					</div>

					<p className="auth-footer">
						New here? <Link to="/signup">Create an account</Link>
					</p>
				</section>
			</div>
		</main>
	)
}
