import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '../../Component/Header/Header'
import Footer from '../../Component/Footer/Footer'
import products from '../../Component/Boxs/data'
import './ProductDetail.css'
import { useShop } from '../../Context/ShopContext'

export default function ProductDetail() {
	const { id } = useParams()
	const navigate = useNavigate()
	const product = products.find((p) => p.id === parseInt(id))
	const { addToCart, addToWishlist } = useShop()

	const [currentImageIndex, setCurrentImageIndex] = useState(0)
	const [quantity, setQuantity] = useState(1)
	const [selectedSize, setSelectedSize] = useState('M')
	const [selectedColor, setSelectedColor] = useState('black')
	const [isShareOpen, setIsShareOpen] = useState(false)

	const images = Array.isArray(product?.images) && product.images.length > 0
		? product.images
		: product?.imageUrl
			? [product.imageUrl]
			: []
	const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
	const shareLinks = [
		{
			id: 'whatsapp',
			label: 'WhatsApp',
			url: `https://wa.me/?text=${encodeURIComponent(shareUrl)}`,
		},
		{
			id: 'telegram',
			label: 'Telegram',
			url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}`,
		},
		{
			id: 'twitter',
			label: 'Twitter',
			url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`,
		},
		{
			id: 'linkedin',
			label: 'LinkedIn',
			url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
		},
	]

	if (!product) {
		return (
			<div className="product-detail-error">
				<Header />
				<div className="error-content">
					<h1>Product not found</h1>
					<button onClick={() => navigate('/')}>Back to Home</button>
				</div>
				<Footer />
			</div>
		)
	}

	const nextImage = () => {
		setCurrentImageIndex((prev) => (prev + 1) % images.length)
	}

	const prevImage = () => {
		setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
	}

	const handleQuantityChange = (delta) => {
		setQuantity((prev) => Math.max(1, prev + delta))
	}

	const handleAddToCart = () => {
		addToCart(product, { quantity, size: selectedSize, color: selectedColor })
	}

	const handleAddToWishlist = () => {
		addToWishlist(product)
	}

	const openShareModal = () => {
		setIsShareOpen(true)
	}

	const closeShareModal = () => {
		setIsShareOpen(false)
	}

	return (
		<div className="product-detail-page">
			<Header />
			<div className="product-detail-container">
				<div className="breadcrumb">
					<span onClick={() => navigate('/')}>Home</span>
					<span className="separator">/</span>
					<span onClick={() => navigate('/products')}>Products</span>
					<span className="separator">/</span>
					<span className="current">{product.name}</span>
				</div>

				<div className="product-detail-content">
					<div className="product-gallery">
						<div className="main-image">
							<img src={images[currentImageIndex]} alt={product.name} />
							<button className="gallery-nav prev" onClick={prevImage}>
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
									<polyline points="15 18 9 12 15 6" />
								</svg>
							</button>
							<button className="gallery-nav next" onClick={nextImage}>
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
									<polyline points="9 18 15 12 9 6" />
								</svg>
							</button>
							<div className="image-indicators">
								{images.map((_, idx) => (
									<button
										key={idx}
										className={idx === currentImageIndex ? 'active' : ''}
										onClick={() => setCurrentImageIndex(idx)}
									/>
								))}
							</div>
						</div>
						<div className="thumbnail-list">
							{images.map((img, idx) => (
								<button
									key={idx}
									className={`thumbnail ${idx === currentImageIndex ? 'active' : ''}`}
									onClick={() => setCurrentImageIndex(idx)}
								>
									<img src={img} alt={`Thumbnail ${idx + 1}`} />
								</button>
							))}
						</div>
					</div>

					<div className="product-details">
						<div className="product-header">
							{product.badge && (
								<span className={`detail-badge ${product.badge.className}`}>
									{product.badge.text}
								</span>
							)}
							<h1 className="product-title">{product.name}</h1>
							<div className="product-category-tag">{product.category}</div>
						</div>

						<div className="product-rating-section">
							<span className="stars-large">{product.stars}</span>
							<span className="rating-text">
								{product.ratingCount} reviews
							</span>
						</div>

						<div className="product-price-section">
							<div className="price-group">
								<span className="current-price">{product.priceCurrent}</span>
								{product.priceOld && (
									<>
										<span className="old-price">{product.priceOld}</span>
										<span className="discount-percent">
											{Math.round(
												((parseFloat(product.priceOld.replace('$', '')) -
													parseFloat(product.priceCurrent.replace('$', ''))) /
													parseFloat(product.priceOld.replace('$', ''))) *
													100
											)}
											% OFF
										</span>
									</>
								)}
							</div>
						</div>

						<div className="product-description">
							<h3>Description</h3>
							<p>
								Experience premium quality with this exceptional product. Crafted with attention to
								detail and designed for those who appreciate the finer things in life. Perfect for
								everyday use or special occasions.
							</p>
						</div>

						<div className="product-options">
							<div className="option-group">
								<label>Size:</label>
								<div className="size-selector">
									{['S', 'M', 'L', 'XL'].map((size) => (
										<button
											key={size}
											className={selectedSize === size ? 'active' : ''}
											onClick={() => setSelectedSize(size)}
										>
											{size}
										</button>
									))}
								</div>
							</div>

							<div className="option-group">
								<label>Color:</label>
								<div className="color-selector">
									{['black', 'white', 'blue', 'red'].map((color) => (
										<button
											key={color}
											className={`color-option ${selectedColor === color ? 'active' : ''}`}
											style={{ backgroundColor: color }}
											onClick={() => setSelectedColor(color)}
											aria-label={color}
										/>
									))}
								</div>
							</div>

							<div className="option-group">
								<label>Quantity:</label>
								<div className="quantity-selector">
									<button onClick={() => handleQuantityChange(-1)}>−</button>
									<span>{quantity}</span>
									<button onClick={() => handleQuantityChange(1)}>+</button>
								</div>
							</div>
						</div>

						<div className="product-actions">
							<button className="btn-add-to-cart" onClick={handleAddToCart}>
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
									<path d="M9 2a1 1 0 011-1h4a1 1 0 011 1v3h4l1 7H4l1-7h4V2z" />
									<path d="M7 12v10h10V12" />
								</svg>
								Add to Cart
							</button>
							<button className="btn-wishlist" onClick={handleAddToWishlist}>
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
									<path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
								</svg>
							</button>
							<button
								className="btn-share"
								onClick={openShareModal}
								aria-haspopup="dialog"
								aria-expanded={isShareOpen}
							>
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
									<circle cx="18" cy="5" r="3" />
									<circle cx="6" cy="12" r="3" />
									<circle cx="18" cy="19" r="3" />
									<line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
									<line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
								</svg>
							</button>
						</div>

						<div className="product-meta">
							<div className="meta-item">
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
									<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
									<circle cx="12" cy="10" r="3" />
								</svg>
								<span>Free shipping worldwide</span>
							</div>
							<div className="meta-item">
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
									<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
									<polyline points="9 22 9 12 15 12 15 22" />
								</svg>
								<span>30-day return policy</span>
							</div>
							<div className="meta-item">
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
									<rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
									<path d="M7 11V7a5 5 0 0110 0v4" />
								</svg>
								<span>Secure checkout</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			{isShareOpen ? (
				<div className="share-modal-overlay" onClick={closeShareModal}>
					<div
						className="share-modal"
						role="dialog"
						aria-modal="true"
						onClick={(event) => event.stopPropagation()}
					>
						<div className="share-modal-header">
							<h3>Share this product</h3>
							<button className="share-modal-close" onClick={closeShareModal}>
								x
							</button>
						</div>
						<p className="share-modal-subtitle">Choose a platform to share.</p>
						<div className="share-media-grid">
							{shareLinks.map((link) => (
								<a
									key={link.id}
									className={`share-media-card ${link.id}`}
									href={link.url}
									target="_blank"
									rel="noreferrer"
								>
									<span className="share-media-icon">{link.label[0]}</span>
									<span className="share-media-label">{link.label}</span>
								</a>
							))}
						</div>
					</div>
				</div>
			) : null}
			<Footer />
		</div>
	)
}
