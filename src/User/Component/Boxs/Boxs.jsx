import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Boxs.css'
import products from './data'
import { useShop } from '../../Context/ShopContext'

const renderIcon = (name) => {
	switch (name) {
		case 'jacket':
			return (
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
					<rect x="2" y="7" width="20" height="14" rx="2" />
					<path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
				</svg>
			)
		case 'watch':
			return (
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
					<circle cx="12" cy="12" r="10" />
					<polyline points="12 6 12 12 16 14" />
				</svg>
			)
		case 'bag':
			return (
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
					<path d="M12 2L2 7l10 5 10-5-10-5z" />
					<path d="M2 12l10 5 10-5M2 17l10 5 10-5" />
				</svg>
			)
		case 'lamp':
			return (
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
					<path d="M3 7l9-4 9 4-9 4-9-4z" />
					<path d="M3 17l9 4 9-4" />
					<path d="M3 12l9 4 9-4" />
				</svg>
			)
		case 'star':
			return (
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
					<path d="M12 2l3 6 6 .9-4.5 4.3 1 6.8-5.5-3-5.5 3 1-6.8L3 8.9 9 8z" />
				</svg>
			)
		case 'tag':
		default:
			return (
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
					<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
					<line x1="7" y1="7" x2="7.01" y2="7" />
				</svg>
			)
	}
}

export default function Boxs({ items = products }) {
	const navigate = useNavigate()
	const { addToCart, addToWishlist } = useShop()

	const handleProductClick = (id) => {
		navigate(`/product/${id}`)
	}

	const handleAddToCart = (event, product) => {
		event.stopPropagation()
		addToCart(product, { quantity: 1, size: 'M', color: 'black' })
	}

	const handleAddToWishlist = (event, product) => {
		event.stopPropagation()
		addToWishlist(product)
	}

	const safeItems = Array.isArray(items) ? items : products

	return (
		<div className="products-grid">
			{safeItems.length === 0 ? (
				<div className="products-empty">
					<h3>No products found</h3>
					<p>Try adjusting your filters to see more results.</p>
				</div>
			) : null}
			{safeItems.map((product) => (
				<div
					key={product.id}
					className={`product-card${product.featured ? ' featured-highlight' : ''}`}
					onClick={() => handleProductClick(product.id)}
					style={{ cursor: 'pointer' }}
				>
					<div className="product-image">
						{product.imageUrl ? (
							<img src={product.imageUrl} alt={product.name} loading="lazy" />
						) : (
							<div className="image-placeholder">{renderIcon(product.icon)}</div>
						)}
						{product.badge ? (
							<div className="product-badges">
								<span className={product.badge.className}>{product.badge.text}</span>
							</div>
						) : null}
						<button className="quick-view" aria-label="Quick view">
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
								<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
								<circle cx="12" cy="12" r="3" />
							</svg>
						</button>
					</div>
					<div className="product-info">
						<div className="product-category">{product.category}</div>
						<h3 className="product-name">{product.name}</h3>
						<div className="product-rating">
							<span className="stars">{product.stars}</span>
							<span className="rating-count">({product.ratingCount})</span>
						</div>
						<div className="product-footer">
							<div className="product-price">
								<span className="price-current">{product.priceCurrent}</span>
								{product.priceOld ? (
									<span className="price-old">{product.priceOld}</span>
								) : null}
							</div>
							<div className="product-actions">
								<button
									className="add-to-wishlist"
									aria-label="Add to wishlist"
									onClick={(event) => handleAddToWishlist(event, product)}
								>
									<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
										<path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
									</svg>
								</button>
								<button
									className="add-to-cart"
									aria-label="Add to cart"
									onClick={(event) => handleAddToCart(event, product)}
								>
									<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
										<path d="M9 2a1 1 0 011-1h4a1 1 0 011 1v3h4l1 7H4l1-7h4V2z" />
										<path d="M7 12v10h10V12" />
									</svg>
								</button>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	)
}
