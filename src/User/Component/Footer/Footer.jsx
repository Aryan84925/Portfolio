import React from 'react'
import './Footer.css'

export default function Footer() {
	return (
		<footer className="site-footer">
			<div className="footer-container">
				<div className="footer-top">
					<div className="footer-brand">
						<div className="footer-logo">S</div>
						<div className="footer-brand-text">
							<span className="footer-brand-name">Storeline</span>
							<span className="footer-brand-tagline">Premium picks for modern living.</span>
						</div>
						<p className="footer-description">
							Curated collections, fast shipping, and a shopping experience designed for style lovers.
						</p>
						<div className="footer-socials">
							<a href="#" aria-label="Instagram">IG</a>
							<a href="#" aria-label="TikTok">TT</a>
							<a href="#" aria-label="Pinterest">PT</a>
						</div>
					</div>

					<div className="footer-links">
						<div className="footer-column">
							<h4>Shop</h4>
							<a href="#">New Arrivals</a>
							<a href="#">Women</a>
							<a href="#">Men</a>
							<a href="#">Accessories</a>
							<a href="#">Sale</a>
						</div>
						<div className="footer-column">
							<h4>Company</h4>
							<a href="#">About</a>
							<a href="#">Careers</a>
							<a href="#">Press</a>
							<a href="#">Sustainability</a>
						</div>
						<div className="footer-column">
							<h4>Support</h4>
							<a href="#">Help Center</a>
							<a href="#">Shipping</a>
							<a href="#">Returns</a>
							<a href="#">Track Order</a>
						</div>
					</div>

					<div className="footer-newsletter">
						<h4>Join the list</h4>
						<p>Get early access to drops, promos, and styling tips.</p>
						<form className="newsletter-form">
							<input type="email" placeholder="Email address" aria-label="Email address" />
							<button type="submit">Subscribe</button>
						</form>
						<span className="newsletter-note">By subscribing, you agree to receive emails.</span>
					</div>
				</div>

				<div className="footer-bottom">
					<span>© 2026 Storeline. All rights reserved.</span>
					<div className="footer-bottom-links">
						<a href="#">Privacy</a>
						<a href="#">Terms</a>
						<a href="#">Cookies</a>
					</div>
				</div>
			</div>
		</footer>
	)
}
