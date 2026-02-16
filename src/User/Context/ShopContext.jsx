import React, { createContext, useContext, useMemo, useRef, useState } from 'react'

const ShopContext = createContext(null)

const CART_STORAGE_KEY = 'storeline_cart_v1'
const WISHLIST_STORAGE_KEY = 'storeline_wishlist_v1'

const parsePrice = (value) => {
	if (typeof value === 'number') return value
	if (!value) return 0
	const normalized = String(value).replace(/[^0-9.]/g, '')
	return Number.parseFloat(normalized) || 0
}

const loadFromStorage = (key, fallback) => {
	if (typeof window === 'undefined') return fallback
	try {
		const stored = window.localStorage.getItem(key)
		if (!stored) return fallback
		const parsed = JSON.parse(stored)
		return Array.isArray(parsed) ? parsed : fallback
	} catch (error) {
		return fallback
	}
}

const persistToStorage = (key, value) => {
	if (typeof window === 'undefined') return
	try {
		window.localStorage.setItem(key, JSON.stringify(value))
	} catch (error) {
		// ignore storage errors
	}
}

export function ShopProvider({ children }) {
	const [cartItems, setCartItems] = useState(() =>
		loadFromStorage(CART_STORAGE_KEY, [])
	)
	const [wishlistItems, setWishlistItems] = useState(() =>
		loadFromStorage(WISHLIST_STORAGE_KEY, [])
	)
	const [toast, setToast] = useState(null)
	const toastTimerRef = useRef(null)

	const showToast = (message, type = 'success') => {
		setToast({ message, type })
		if (toastTimerRef.current) {
			clearTimeout(toastTimerRef.current)
		}
		toastTimerRef.current = setTimeout(() => {
			setToast(null)
		}, 3000)
	}

	const closeToast = () => {
		if (toastTimerRef.current) {
			clearTimeout(toastTimerRef.current)
		}
		setToast(null)
	}

	const addToCart = (product, options = {}) => {
		if (!product) return
		const {
			quantity = 1,
			size = 'M',
			color = 'black',
			imageUrl = product.imageUrl,
		} = options
		const normalizedQuantity = Math.max(1, Number(quantity) || 1)
		const price = parsePrice(product.priceCurrent ?? product.price)
		const nextItem = {
			id: product.id,
			name: product.name,
			price,
			quantity: normalizedQuantity,
			size,
			color,
			imageUrl,
		}

		setCartItems((prev) => {
			const existingIndex = prev.findIndex(
				(item) =>
					item.id === nextItem.id &&
					item.size === nextItem.size &&
					item.color === nextItem.color
			)
			if (existingIndex === -1) {
				const updated = [...prev, nextItem]
				persistToStorage(CART_STORAGE_KEY, updated)
				return updated
			}
			const updated = prev.map((item, index) =>
				index === existingIndex
					? { ...item, quantity: item.quantity + normalizedQuantity }
					: item
			)
			persistToStorage(CART_STORAGE_KEY, updated)
			return updated
		})
		showToast('Added to cart.', 'success')
	}

	const updateCartQuantity = (id, size, color, quantity) => {
		setCartItems((prev) => {
			const updated = prev.map((item) =>
				item.id === id && item.size === size && item.color === color
					? { ...item, quantity: Math.max(1, Number(quantity) || 1) }
					: item
			)
			persistToStorage(CART_STORAGE_KEY, updated)
			return updated
		})
	}

	const updateCartItem = (id, size, color, updates) => {
		setCartItems((prev) => {
			const updated = prev.map((item) =>
				item.id === id && item.size === size && item.color === color
					? { ...item, ...updates }
					: item
			)
			persistToStorage(CART_STORAGE_KEY, updated)
			return updated
		})
	}

	const removeCartItem = (id, size, color) => {
		setCartItems((prev) => {
			const updated = prev.filter(
				(item) => !(item.id === id && item.size === size && item.color === color)
			)
			persistToStorage(CART_STORAGE_KEY, updated)
			return updated
		})
	}

	const addToWishlist = (product) => {
		if (!product) return
		setWishlistItems((prev) => {
			if (prev.some((item) => item.id === product.id)) {
				showToast('Already in wishlist.', 'info')
				return prev
			}
			const updated = [
				...prev,
				{
					id: product.id,
					name: product.name,
					accent: product.category,
					price: parsePrice(product.priceCurrent ?? product.price),
					imageUrl: product.imageUrl,
				},
			]
			persistToStorage(WISHLIST_STORAGE_KEY, updated)
			showToast('Added to wishlist.', 'success')
			return updated
		})
	}

	const removeWishlistItem = (id) => {
		setWishlistItems((prev) => {
			const updated = prev.filter((item) => item.id !== id)
			persistToStorage(WISHLIST_STORAGE_KEY, updated)
			return updated
		})
	}

	const value = useMemo(
		() => ({
			cartItems,
			wishlistItems,
			toast,
			addToCart,
			updateCartQuantity,
			updateCartItem,
			removeCartItem,
			addToWishlist,
			removeWishlistItem,
			closeToast,
		}),
		[cartItems, wishlistItems, toast]
	)

	return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

export const useShop = () => {
	const context = useContext(ShopContext)
	if (!context) {
		throw new Error('useShop must be used within a ShopProvider')
	}
	return context
}
