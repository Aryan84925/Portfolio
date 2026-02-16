import React, { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Header from '../../Component/Header/Header'
import Footer from '../../Component/Footer/Footer'
import { useShop } from '../../Context/ShopContext'
import './OrderSuccess.css'

export default function OrderSuccess() {
	const { cartItems } = useShop()
	const location = useLocation()

	const fallbackTotal = useMemo(
		() => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
		[cartItems]
	)
	const total = typeof location.state?.total === 'number' ? location.state.total : fallbackTotal
	const itemsCount =
		typeof location.state?.itemsCount === 'number'
			? location.state.itemsCount
			: cartItems.reduce((count, item) => count + item.quantity, 0)

	return (
		<>
			<Header />
			<main className="order-success">
				<section className="order-success-card">
					<div className="order-success-icon">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
							<circle cx="12" cy="12" r="10" />
							<path d="M8 12l3 3 5-6" />
						</svg>
					</div>
					<p className="order-success-eyebrow">Order confirmed</p>
					<h1 className="order-success-title">Thank you for your purchase.</h1>
					<p className="order-success-subtitle">
						We are packing your items now. A receipt has been sent to your email.
					</p>

					<div className="order-success-summary">
						<div>
							<span>Items</span>
							<strong>{itemsCount}</strong>
						</div>
						<div>
							<span>Total paid</span>
							<strong>${total.toFixed(2)}</strong>
						</div>
						<div>
							<span>Estimated delivery</span>
							<strong>2-4 days</strong>
						</div>
					</div>

					<div className="order-success-actions">
						<Link className="primary" to="/orders">View orders</Link>
						<Link className="ghost" to="/products">Continue shopping</Link>
					</div>
				</section>
			</main>
			<Footer />
		</>
	)
}
