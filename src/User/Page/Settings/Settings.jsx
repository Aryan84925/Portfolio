import React from 'react'
import './Settings.css'

export default function Settings() {
	return (
		<main className="settings-page">
			<div className="settings-orb settings-orb-1" aria-hidden="true" />
			<div className="settings-orb settings-orb-2" aria-hidden="true" />
			<div className="settings-orb settings-orb-3" aria-hidden="true" />

			<section className="settings-shell">
				<header className="settings-hero">
					<div>
						<p className="settings-eyebrow">Account settings</p>
						<h1 className="settings-title">Tailor your Storeline experience</h1>
						<p className="settings-subtitle">
							Control your privacy, notifications, and delivery preferences in one place.
						</p>
					</div>
					<div className="settings-hero-actions">
						<button type="button" className="settings-btn primary">Save changes</button>
						<button type="button" className="settings-btn">Reset</button>
					</div>
				</header>

				<div className="settings-grid">
					<section className="settings-card">
						<h2 className="settings-card-title">Profile</h2>
						<div className="settings-field">
							<span className="settings-label">Full name</span>
							<div className="settings-value">Sara Kiani</div>
						</div>
						<div className="settings-field">
							<span className="settings-label">Email</span>
							<div className="settings-value">sara.kiani@storeline.com</div>
						</div>
						<div className="settings-field">
							<span className="settings-label">Phone</span>
							<div className="settings-value">+98 912 000 0000</div>
						</div>
					</section>

					<section className="settings-card">
						<h2 className="settings-card-title">Security</h2>
						<div className="settings-toggle">
							<div>
								<p className="toggle-title">Two-factor authentication</p>
								<p className="toggle-meta">Extra protection for every sign-in.</p>
							</div>
							<label className="toggle-switch">
								<input type="checkbox" defaultChecked />
								<span className="toggle-slider" />
							</label>
						</div>
						<div className="settings-toggle">
							<div>
								<p className="toggle-title">Login alerts</p>
								<p className="toggle-meta">Get notified on every new device.</p>
							</div>
							<label className="toggle-switch">
								<input type="checkbox" defaultChecked />
								<span className="toggle-slider" />
							</label>
						</div>
					</section>

					<section className="settings-card">
						<h2 className="settings-card-title">Notifications</h2>
						<div className="settings-toggle">
							<div>
								<p className="toggle-title">Order updates</p>
								<p className="toggle-meta">Shipment and delivery reminders.</p>
							</div>
							<label className="toggle-switch">
								<input type="checkbox" defaultChecked />
								<span className="toggle-slider" />
							</label>
						</div>
						<div className="settings-toggle">
							<div>
								<p className="toggle-title">Style drops</p>
								<p className="toggle-meta">Weekly editor picks and early access.</p>
							</div>
							<label className="toggle-switch">
								<input type="checkbox" />
								<span className="toggle-slider" />
							</label>
						</div>
					</section>

					<section className="settings-card">
						<h2 className="settings-card-title">Delivery</h2>
						<div className="settings-field">
							<span className="settings-label">Primary address</span>
							<div className="settings-value">Azadi Ave, Tehran</div>
						</div>
						<div className="settings-field">
							<span className="settings-label">Preferred window</span>
							<div className="settings-value">18:00 to 20:00</div>
						</div>
						<button type="button" className="settings-link">Manage addresses</button>
					</section>
				</div>
			</section>
		</main>
	)
}
