import React, { useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Header from '../../Component/Header/Header'
import Footer from '../../Component/Footer/Footer'
import { useShop } from '../../Context/ShopContext'
import './Payment.css'

export default function Payment() {
	const { cartItems } = useShop()
	const location = useLocation()
	const navigate = useNavigate()

	const [cardNumber, setCardNumber] = useState('')
	const [cardName, setCardName] = useState('')
	const [expiry, setExpiry] = useState('')
	const [cvv2, setCvv2] = useState('')
	const [otp, setOtp] = useState('')
	const isFormValid =
		cardNumber.trim() &&
		cardName.trim() &&
		expiry.trim() &&
		cvv2.trim() &&
		otp.trim()

	const subtotal = useMemo(
		() => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
		[cartItems]
	)
	const total = typeof location.state?.total === 'number' ? location.state.total : subtotal
	const itemsCount =
		typeof location.state?.itemsCount === 'number'
			? location.state.itemsCount
			: cartItems.reduce((count, item) => count + item.quantity, 0)

	const handlePay = (event) => {
		event.preventDefault()
		if (cartItems.length === 0 || !isFormValid) return
		navigate('/order-success', {
			state: {
				total,
				itemsCount,
			},
		})
	}

	return (
		<>
			<Header />
			<main className="payment-page">
				<section className="payment-hero">
					<div className="payment-hero-content">
						<p className="payment-eyebrow">Final step</p>
						<h1 className="payment-title">Pay securely and complete your order.</h1>
						<p className="payment-subtitle">
							Enter your card details to finish the purchase.
						</p>
					</div>
					<div className="payment-orb orb-1" aria-hidden="true" />
					<div className="payment-orb orb-2" aria-hidden="true" />
				</section>

				<section className="payment-shell">
					<div className="payment-left">
						<form className="payment-card" onSubmit={handlePay}>
							<div className="payment-card-header">
								<h2>Card details</h2>
								<span className="payment-secure">Secure payment</span>
							</div>
							<div className="payment-grid">
								<div className="field">
									<label htmlFor="cardNumber">Card number</label>
									<input
										id="cardNumber"
										type="text"
										value={cardNumber}
										onChange={(event) => setCardNumber(event.target.value)}
										placeholder="6037 0000 0000 0000"
										required
									/>
								</div>
								<div className="field">
									<label htmlFor="cardName">Card holder</label>
									<input
										id="cardName"
										type="text"
										value={cardName}
										onChange={(event) => setCardName(event.target.value)}
										placeholder="Sara Kiani"
										required
									/>
								</div>
								<div className="field">
									<label htmlFor="expiry">Expiry date</label>
									<input
										id="expiry"
										type="text"
										value={expiry}
										onChange={(event) => setExpiry(event.target.value)}
										placeholder="12/08"
										required
									/>
								</div>
								<div className="field">
									<label htmlFor="cvv2">CVV2</label>
									<input
										id="cvv2"
										type="password"
										value={cvv2}
										onChange={(event) => setCvv2(event.target.value)}
										placeholder="1234"
										required
									/>
								</div>
								<div className="field otp">
									<label htmlFor="otp">Second password</label>
									<input
										id="otp"
										type="password"
										value={otp}
										onChange={(event) => setOtp(event.target.value)}
										placeholder="One-time password"
										required
									/>
									<button type="button" className="otp-btn">Send OTP</button>
								</div>
							</div>

							<div className="payment-actions">
								<button
									type="submit"
									className="pay-btn"
									disabled={cartItems.length === 0 || !isFormValid}
								>
									Pay ${total.toFixed(2)}
								</button>
								<Link className="ghost-link" to="/checkout">Back to checkout</Link>
							</div>
						</form>
					</div>

					<div className="payment-right">
						<div className="payment-card summary">
							<div className="summary-header">
								<h2>Summary</h2>
								<Link to="/products">Edit cart</Link>
							</div>
							<div className="summary-meta">
								<span>{itemsCount} items</span>
								<span>Total: ${total.toFixed(2)}</span>
							</div>
							<div className="summary-list">
								{cartItems.map((item) => (
									<div
										className="summary-item"
										key={`${item.id}-${item.size}-${item.color}`}
									>
										<div className="summary-image" aria-hidden="true">
											{item.imageUrl ? <img src={item.imageUrl} alt={item.name} /> : null}
										</div>
										<div>
											<p className="summary-name">{item.name}</p>
											<p className="summary-meta-item">
												{item.color} · {item.size} · Qty {item.quantity}
											</p>
										</div>
										<p className="summary-price">${(item.price * item.quantity).toFixed(2)}</p>
									</div>
								))}
							</div>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	)
}
