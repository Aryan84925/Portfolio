import React, { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../../Component/Header/Header'
import Footer from '../../Component/Footer/Footer'
import { useShop } from '../../Context/ShopContext'
import './Checkout.css'

export default function Checkout() {
	const { cartItems } = useShop()
	const navigate = useNavigate()
	const [address, setAddress] = useState('')
	const [city, setCity] = useState('')
	const [postalCode, setPostalCode] = useState('')
	const [phone, setPhone] = useState('')
	const [note, setNote] = useState('')

	const subtotal = useMemo(
		() => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
		[cartItems]
	)
	const shipping = subtotal > 0 ? 0 : 0
	const total = subtotal + shipping

	const handlePlaceOrder = () => {
		if (cartItems.length === 0) return
		navigate('/payment', {
			state: {
				total,
				itemsCount: cartItems.reduce((count, item) => count + item.quantity, 0),
			},
		})
	}

	return (
		<>
			<Header />
			<main className="checkout-page">
				<section className="checkout-hero">
					<div className="checkout-hero-content">
						<p className="checkout-eyebrow">Secure checkout</p>
						<h1 className="checkout-title">Finish strong. Your cart is ready.</h1>
						<p className="checkout-subtitle">
							Review your items, confirm delivery, and choose how you want it packed.
						</p>
					</div>
					<div className="checkout-hero-orb orb-1" aria-hidden="true" />
					<div className="checkout-hero-orb orb-2" aria-hidden="true" />
				</section>

				<section className="checkout-shell">
					<div className="checkout-left">
						<div className="checkout-card">
							<h2>Delivery location</h2>
							<p className="checkout-card-subtitle">We use this to schedule your delivery.</p>
							<div className="location-grid">
								<div className="field">
									<label htmlFor="address">Street address</label>
									<input
										id="address"
										type="text"
										value={address}
										onChange={(event) => setAddress(event.target.value)}
										placeholder="123 Sunset Blvd"
									/>
								</div>
								<div className="field">
									<label htmlFor="city">City</label>
									<input
										id="city"
										type="text"
										value={city}
										onChange={(event) => setCity(event.target.value)}
										placeholder="Tehran"
									/>
								</div>
								<div className="field">
									<label htmlFor="postal">Postal code</label>
									<input
										id="postal"
										type="text"
										value={postalCode}
										onChange={(event) => setPostalCode(event.target.value)}
										placeholder="14566"
									/>
								</div>
								<div className="field">
									<label htmlFor="phone">Phone</label>
									<input
										id="phone"
										type="tel"
										value={phone}
										onChange={(event) => setPhone(event.target.value)}
										placeholder="+98 912 000 0000"
									/>
								</div>
							</div>
							<div className="location-actions">
								<button type="button" className="ghost-btn">Use current location</button>
								<p className="helper">Location permission is optional.</p>
							</div>
						</div>

						<div className="checkout-card">
							<h2>Order notes</h2>
							<p className="checkout-card-subtitle">Add delivery tips or gift requests.</p>
							<textarea
								rows="4"
								value={note}
								onChange={(event) => setNote(event.target.value)}
								placeholder="Leave at the reception, please."
							/>
						</div>
					</div>

					<div className="checkout-right">
						<div className="checkout-card summary">
							<div className="summary-header">
								<h2>Order summary</h2>
								<Link to="/products">Edit cart</Link>
							</div>
							{cartItems.length === 0 ? (
								<div className="summary-empty">
									<p>Your cart is empty.</p>
									<Link to="/products">Browse products</Link>
								</div>
							) : (
								<div className="summary-list">
									{cartItems.map((item) => (
										<div
											className="summary-item"
											key={`${item.id}-${item.size}-${item.color}`}
										>
											<div className="summary-image" aria-hidden="true">
												{item.imageUrl ? (
													<img src={item.imageUrl} alt={item.name} />
												) : null}
											</div>
											<div className="summary-info">
												<p className="summary-name">{item.name}</p>
												<p className="summary-meta">
													{item.color} · Size {item.size} · Qty {item.quantity}
												</p>
											</div>
											<p className="summary-price">${(item.price * item.quantity).toFixed(2)}</p>
										</div>
									))}
								</div>
							)}

							<div className="summary-totals">
								<div>
									<span>Subtotal</span>
									<span>${subtotal.toFixed(2)}</span>
								</div>
								<div>
									<span>Shipping</span>
									<span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
								</div>
								<div className="summary-total">
									<span>Total</span>
									<span>${total.toFixed(2)}</span>
								</div>
							</div>

							<button
								type="button"
								className="checkout-cta"
								disabled={cartItems.length === 0}
								onClick={handlePlaceOrder}
							>
								Place order
							</button>
							<p className="summary-footnote">Taxes are included in the total shown.</p>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	)
}
