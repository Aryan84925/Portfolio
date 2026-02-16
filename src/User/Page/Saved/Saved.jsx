import React from 'react'
import './Saved.css'

export default function Saved() {
	return (
		<main className="saved-page">
			<div className="saved-orb saved-orb-1" aria-hidden="true" />
			<div className="saved-orb saved-orb-2" aria-hidden="true" />
			<div className="saved-orb saved-orb-3" aria-hidden="true" />

			<section className="saved-shell">
				<header className="saved-hero">
					<div>
						<p className="saved-eyebrow">Saved items</p>
						<h1 className="saved-title">Your wishlist runway</h1>
						<p className="saved-subtitle">
							Curate your next drops, track restocks, and move favorites to cart fast.
						</p>
					</div>
					<div className="saved-hero-actions">
						<button type="button" className="saved-btn primary">Add all to cart</button>
						<button type="button" className="saved-btn">Share wishlist</button>
					</div>
					<div className="saved-hero-stats">
						<div className="saved-stat">
							<p className="saved-stat-value">48</p>
							<p className="saved-stat-label">Total saved</p>
						</div>
						<div className="saved-stat">
							<p className="saved-stat-value">8</p>
							<p className="saved-stat-label">Low stock</p>
						</div>
						<div className="saved-stat">
							<p className="saved-stat-value">15%</p>
							<p className="saved-stat-label">Average discount</p>
						</div>
					</div>
				</header>

				<section className="saved-card saved-filters">
					<div>
						<h2 className="saved-card-title">Filters</h2>
						<p className="saved-card-subtitle">Focus on what is ready to ship.</p>
					</div>
					<div className="saved-filter-pills">
						<button type="button" className="saved-pill active">All</button>
						<button type="button" className="saved-pill">In stock</button>
						<button type="button" className="saved-pill">On sale</button>
						<button type="button" className="saved-pill">Restock soon</button>
					</div>
				</section>

				<section className="saved-grid">
					<article className="saved-item">
						<div className="saved-image" aria-hidden="true" />
						<div className="saved-item-body">
							<p className="saved-item-title">Aurora wrap blazer</p>
							<p className="saved-item-meta">2 colors - 15% off</p>
							<div className="saved-item-row">
								<span className="saved-price">$148</span>
								<button type="button" className="saved-mini">Add to cart</button>
							</div>
						</div>
					</article>
					<article className="saved-item">
						<div className="saved-image alt" aria-hidden="true" />
						<div className="saved-item-body">
							<p className="saved-item-title">Nova trainer set</p>
							<p className="saved-item-meta">Limited restock</p>
							<div className="saved-item-row">
								<span className="saved-price">$96</span>
								<button type="button" className="saved-mini">Notify me</button>
							</div>
						</div>
					</article>
					<article className="saved-item">
						<div className="saved-image warm" aria-hidden="true" />
						<div className="saved-item-body">
							<p className="saved-item-title">Luna tote bag</p>
							<p className="saved-item-meta">Member exclusive</p>
							<div className="saved-item-row">
								<span className="saved-price">$128</span>
								<button type="button" className="saved-mini">Add to cart</button>
							</div>
						</div>
					</article>
					<article className="saved-item">
						<div className="saved-image soft" aria-hidden="true" />
						<div className="saved-item-body">
							<p className="saved-item-title">Iris silk scarf</p>
							<p className="saved-item-meta">Back in stock today</p>
							<div className="saved-item-row">
								<span className="saved-price">$54</span>
								<button type="button" className="saved-mini">Add to cart</button>
							</div>
						</div>
					</article>
				</section>
			</section>
		</main>
	)
}
