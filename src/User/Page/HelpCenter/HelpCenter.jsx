import React from 'react'
import './HelpCenter.css'

export default function HelpCenter() {
	return (
		<main className="help-center-page">
			<div className="help-center-orb help-center-orb-1" aria-hidden="true" />
			<div className="help-center-orb help-center-orb-2" aria-hidden="true" />
			<div className="help-center-orb help-center-orb-3" aria-hidden="true" />

			<section className="help-center-shell">
				<header className="help-center-hero">
					<div>
						<p className="help-center-eyebrow">Help center</p>
						<h1 className="help-center-title">How can we help today?</h1>
						<p className="help-center-subtitle">
							Search answers, explore guided flows, or reach a specialist in minutes.
						</p>
						<div className="help-center-search">
							<input type="search" placeholder="Search topics, orders, returns" />
							<button type="button">Search</button>
						</div>
					</div>
					<div className="help-center-hero-actions">
						<button type="button" className="help-center-btn primary">Start live chat</button>
						<button type="button" className="help-center-btn">Email support</button>
					</div>
				</header>

				<section className="help-center-grid">
					<article className="help-center-card">
						<h2 className="help-center-card-title">Track your order</h2>
						<p className="help-center-card-text">Real-time updates, delivery windows, and courier info.</p>
						<button type="button" className="help-center-card-action">Open tracking</button>
					</article>
					<article className="help-center-card">
						<h2 className="help-center-card-title">Returns and exchanges</h2>
						<p className="help-center-card-text">Start a return, print a label, or swap sizes in minutes.</p>
						<button type="button" className="help-center-card-action">Start a return</button>
					</article>
					<article className="help-center-card">
						<h2 className="help-center-card-title">Account support</h2>
						<p className="help-center-card-text">Reset your password, update details, or recover access.</p>
						<button type="button" className="help-center-card-action">Manage account</button>
					</article>
				</section>

				<section className="help-center-faq">
					<div className="help-center-faq-header">
						<h2 className="help-center-card-title">Popular questions</h2>
						<span className="help-center-chip">Updated weekly</span>
					</div>
					<div className="help-center-faq-list">
						<div className="help-center-faq-item">
							<p className="help-center-faq-title">Where is my order?</p>
							<p className="help-center-faq-text">Find tracking links in Orders and enable shipment alerts.</p>
						</div>
						<div className="help-center-faq-item">
							<p className="help-center-faq-title">How do I change my delivery window?</p>
							<p className="help-center-faq-text">Update delivery preferences in Settings and choose a new slot.</p>
						</div>
						<div className="help-center-faq-item">
							<p className="help-center-faq-title">When do points expire?</p>
							<p className="help-center-faq-text">Points stay active for 12 months after your last purchase.</p>
						</div>
					</div>
				</section>

				<section className="help-center-contact">
					<div>
						<h2 className="help-center-card-title">Need a human?</h2>
						<p className="help-center-contact-text">Our concierge team answers in under 3 minutes.</p>
					</div>
					<div className="help-center-contact-actions">
						<button type="button" className="help-center-btn primary">Chat now</button>
						<button type="button" className="help-center-btn ghost">Schedule a call</button>
					</div>
				</section>
			</section>
		</main>
	)
}
