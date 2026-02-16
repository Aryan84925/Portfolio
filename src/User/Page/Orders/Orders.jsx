import React from 'react'
import './Orders.css'

export default function Orders() {
	return (
		<main className="orders-page">
			<div className="orders-orb orders-orb-1" aria-hidden="true" />
			<div className="orders-orb orders-orb-2" aria-hidden="true" />
			<div className="orders-orb orders-orb-3" aria-hidden="true" />

			<section className="orders-shell">
				<header className="orders-hero">
					<div>
						<p className="orders-eyebrow">Your orders</p>
						<h1 className="orders-title">Every delivery, in one view</h1>
						<p className="orders-subtitle">
							Track shipments, manage returns, and keep your favorite receipts handy.
						</p>
					</div>
					<div className="orders-hero-actions">
						<button type="button" className="orders-btn primary">Track a package</button>
						<button type="button" className="orders-btn">Start a return</button>
					</div>
					<div className="orders-hero-stats">
						<div className="orders-stat">
							<p className="orders-stat-value">12</p>
							<p className="orders-stat-label">Total orders</p>
						</div>
						<div className="orders-stat">
							<p className="orders-stat-value">3</p>
							<p className="orders-stat-label">Active shipments</p>
						</div>
						<div className="orders-stat">
							<p className="orders-stat-value">98%</p>
							<p className="orders-stat-label">On-time delivery</p>
						</div>
					</div>
				</header>

				<div className="orders-grid">
					<section className="orders-card orders-list">
						<div className="orders-card-header">
							<h2 className="orders-card-title">Recent orders</h2>
							<button type="button" className="orders-link">View all</button>
						</div>
						<ul className="orders-items">
							<li>
								<div>
									<p className="orders-item-title">Order #5432</p>
									<p className="orders-item-meta">2 items - Placed Feb 11</p>
								</div>
								<span className="orders-chip">In transit</span>
							</li>
							<li>
								<div>
									<p className="orders-item-title">Order #5419</p>
									<p className="orders-item-meta">1 item - Arrived Feb 9</p>
								</div>
								<span className="orders-chip success">Delivered</span>
							</li>
							<li>
								<div>
									<p className="orders-item-title">Order #5388</p>
									<p className="orders-item-meta">4 items - Return opened</p>
								</div>
								<span className="orders-chip warning">Return</span>
							</li>
						</ul>
						<div className="orders-note">
							<p className="orders-note-title">Smart delivery window</p>
							<p className="orders-note-text">Next drop arrives today between 18:00-20:00.</p>
						</div>
					</section>

					<aside className="orders-card orders-side">
						<h2 className="orders-card-title">Delivery timeline</h2>
						<div className="orders-timeline">
							<div className="timeline-row active">
								<span className="timeline-dot" />
								<div>
										<p className="timeline-title">Order processed</p>
									<p className="timeline-meta">Feb 12 - 09:20</p>
								</div>
							</div>
							<div className="timeline-row">
								<span className="timeline-dot" />
								<div>
										<p className="timeline-title">Out for delivery</p>
									<p className="timeline-meta">Feb 14 - 15:00</p>
								</div>
							</div>
							<div className="timeline-row">
								<span className="timeline-dot" />
								<div>
										<p className="timeline-title">Delivered</p>
									<p className="timeline-meta">Today - 18:30</p>
								</div>
							</div>
						</div>
						<div className="orders-support">
							<p className="orders-support-title">Need help?</p>
							<p className="orders-support-text">Our concierge is on standby for any delivery updates.</p>
							<button type="button" className="orders-btn ghost">Contact support</button>
						</div>
					</aside>
				</div>
			</section>
		</main>
	)
}
