import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createPortal } from 'react-dom'
import './Header.css'
import { useShop } from '../../Context/ShopContext'

export default function Header() {
    const navigate = useNavigate()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [accountOpen, setAccountOpen] = useState(false)
    const [helpOpen, setHelpOpen] = useState(false)
    const [cartOpen, setCartOpen] = useState(false)
    const [wishlistOpen, setWishlistOpen] = useState(false)
    const [editingItemId, setEditingItemId] = useState(null)
    const {
        cartItems,
        wishlistItems,
        addToCart,
        updateCartQuantity,
        updateCartItem,
        removeCartItem,
        removeWishlistItem,
    } = useShop()
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0, origin: 'top right' })
    const accountTriggerRef = useRef(null)
    const accountMenuRef = useRef(null)
    const isLoggedIn = true

    useEffect(() => {
        if (mobileMenuOpen || helpOpen || cartOpen || wishlistOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [mobileMenuOpen, helpOpen, cartOpen, wishlistOpen])

    useEffect(() => {
        const handleClickOutside = (event) => {
            const target = event.target
            if (
                accountMenuRef.current &&
                !accountMenuRef.current.contains(target) &&
                accountTriggerRef.current &&
                !accountTriggerRef.current.contains(target)
            ) {
                setAccountOpen(false)
            }
        }

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setAccountOpen(false)
                setHelpOpen(false)
                setCartOpen(false)
                setWishlistOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    useLayoutEffect(() => {
        if (!accountOpen) {
            return
        }

        const updatePosition = () => {
            const triggerRect = accountTriggerRef.current?.getBoundingClientRect()
            const menuWidth = accountMenuRef.current?.offsetWidth ?? 280
            const menuHeight = accountMenuRef.current?.offsetHeight ?? 0
            const padding = 12

            if (!triggerRect) {
                return
            }

            let left = triggerRect.right - menuWidth
            let top = triggerRect.bottom + 12
            let origin = 'top right'

            const maxLeft = window.innerWidth - padding - menuWidth
            left = Math.min(Math.max(left, padding), maxLeft)

            const spaceBelow = window.innerHeight - padding - triggerRect.bottom
            const spaceAbove = triggerRect.top - padding

            const preferBelow = spaceBelow >= menuHeight || spaceBelow >= spaceAbove
            if (preferBelow) {
                top = triggerRect.bottom + 12
                if (top + menuHeight > window.innerHeight - padding) {
                    top = Math.max(padding, window.innerHeight - padding - menuHeight)
                }
            } else {
                top = triggerRect.top - menuHeight - 12
                origin = 'bottom right'
                if (top < padding) {
                    top = padding
                }
            }

            setMenuPosition({ top, left, origin })
        }

        updatePosition()
        window.addEventListener('resize', updatePosition)
        window.addEventListener('scroll', updatePosition, true)

        return () => {
            window.removeEventListener('resize', updatePosition)
            window.removeEventListener('scroll', updatePosition, true)
        }
    }, [accountOpen])

    const handleQuantityChange = (id, size, color, delta) => {
        const item = cartItems.find(
            (cartItem) => cartItem.id === id && cartItem.size === size && cartItem.color === color
        )
        if (!item) return
        updateCartQuantity(id, size, color, item.quantity + delta)
    }

    const handleQuantityInput = (id, size, color, value) => {
        updateCartQuantity(id, size, color, value)
    }

    const handleRemoveItem = (id, size, color) => {
        removeCartItem(id, size, color)
    }

    const handleRemoveWishlistItem = (id) => {
        removeWishlistItem(id)
    }

    const handleEditToggle = (id) => {
        setEditingItemId((prev) => (prev === id ? null : id))
    }

    const handleItemUpdate = (id, size, color, updates) => {
        updateCartItem(id, size, color, updates)
    }

    const cartSubtotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    )

    const handleShopNow = () => {
        const section = document.getElementById('featured-products')
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }

    const handleCheckout = () => {
        setCartOpen(false)
        navigate('/checkout')
    }

    return (
        <header className="site-header">
            <div className="header-sheen" aria-hidden="true" />
            <div className="header-ribbon">
                <div className="header-container ribbon-row">
                    <p className="ribbon-text">Free shipping over $75 · Easy returns · 24/7 support</p>
                    <div className="ribbon-actions">
                        <button type="button" className="ribbon-btn">Track order</button>
                        <button type="button" className="ribbon-btn" onClick={() => setHelpOpen(true)}>Help</button>
                    </div>
                </div>
            </div>

            <div className="header-main">
                <div className="header-container header-row">
                    <div className="brand">
                        <div className="brand-mark">S</div>
                        <div className="brand-text">
                            <span className="brand-name">Storeline</span>
                            <span className="brand-tagline">Smart shopping, bold style</span>
                        </div>
                    </div>

                    <div className="search">
                        <input
                            type="search"
                            placeholder="Search products, brands, categories"
                            aria-label="Search products"
                            className="search-input"
                        />
                        <button type="button" className="search-btn">Search</button>
                    </div>

                    <div className="header-actions">
                        <button
                            type="button"
                            className="mobile-menu-toggle"
                            aria-label="Toggle menu"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                {mobileMenuOpen ? (
                                    <>
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </>
                                ) : (
                                    <>
                                        <line x1="3" y1="12" x2="21" y2="12" />
                                        <line x1="3" y1="6" x2="21" y2="6" />
                                        <line x1="3" y1="18" x2="21" y2="18" />
                                    </>
                                )}
                            </svg>
                        </button>
                        <button
                            type="button"
                            className="icon-btn"
                            aria-label="Wishlist"
                            onClick={() => {
                                setWishlistOpen(true)
                                setAccountOpen(false)
                            }}
                        >
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M12 20.5l-1.45-1.32C5.4 14.36 2 11.28 2 7.5 2 5 4 3 6.5 3c1.74 0 3.41.81 4.5 2.09C12.09 3.81 13.76 3 15.5 3 18 3 20 5 20 7.5c0 3.78-3.4 6.86-8.55 11.68L12 20.5z" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            className="icon-btn"
                            aria-label="Cart"
                            onClick={() => {
                                setCartOpen(true)
                                setAccountOpen(false)
                            }}
                        >
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM7.17 14h9.58c.75 0 1.4-.41 1.74-1.03l3.24-5.88-1.74-.96-3.08 5.59H7.71L6.27 4H2v2h2.27l2.2 8.58A2 2 0 0 0 7.17 14z" />
                            </svg>
                            {cartItems.length > 0 && <span className="badge">{cartItems.length}</span>}
                        </button>
                        <button
                            type="button"
                            className="icon-btn account-trigger"
                            aria-label="Account"
                            aria-haspopup="menu"
                            aria-expanded={accountOpen}
                            onClick={() => setAccountOpen((prev) => !prev)}
                            ref={accountTriggerRef}
                        >
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div
                    className={`header-container header-bottom ${mobileMenuOpen ? 'mobile-open' : ''}`}
                    onClick={(e) => {
                        if (e.target.classList.contains('header-bottom')) {
                            setMobileMenuOpen(false)
                        }
                    }}
                >
                    <nav className="nav-links" aria-label="Primary">
                        <a href="#" className="nav-link">New Arrivals</a>
                        <a href="#" className="nav-link">Women</a>
                        <a href="#" className="nav-link">Men</a>
                        <a href="#" className="nav-link">Accessories</a>
                        <a href="#" className="nav-link">Deals</a>
                    </nav>
                    <button type="button" className="cta-btn" onClick={handleShopNow}>Shop Now</button>
                </div>
            </div>
            {accountOpen &&
                createPortal(
                    <div
                        className="account-dropdown open"
                        role="menu"
                        aria-label="Account menu"
                        ref={accountMenuRef}
                        style={{
                            top: `${menuPosition.top}px`,
                            left: `${menuPosition.left}px`,
                            transformOrigin: menuPosition.origin,
                        }}
                    >
                        <div className="account-header">
                            <div className="account-avatar">S</div>
                            <div>
                                <p className="account-title">Welcome</p>
                                <p className="account-subtitle">
                                    {isLoggedIn ? 'Glad to see you back' : 'Sign in for a better experience'}
                                </p>
                            </div>
                        </div>
                        <div className="account-divider" />
                        {isLoggedIn ? (
                            <div className="account-list">
                                <div className="account-profile">
                                    <div>
                                        <p className="account-name">Sara Kiani</p>
                                        <p className="account-email">sara.kiani@storeline.com</p>
                                    </div>
                                    <span className="account-chip">Gold Member</span>
                                </div>
                                <div className="account-stats">
                                    <div className="account-stat">
                                        <span className="stat-value">12</span>
                                        <span className="stat-label">Orders</span>
                                    </div>
                                    <div className="account-stat">
                                        <span className="stat-value">4</span>
                                        <span className="stat-label">Active</span>
                                    </div>
                                    <div className="account-stat">
                                        <span className="stat-value">1.2k</span>
                                        <span className="stat-label">Points</span>
                                    </div>
                                </div>
                                <Link
                                    className="account-item primary"
                                    to="/profile"
                                    role="menuitem"
                                    onClick={() => setAccountOpen(false)}
                                >
                                    View profile
                                </Link>
                                <Link
                                    className="account-item"
                                    to="/orders"
                                    role="menuitem"
                                    onClick={() => setAccountOpen(false)}
                                >
                                    Orders
                                </Link>
                                <Link
                                    className="account-item"
                                    to="/saved"
                                    role="menuitem"
                                    onClick={() => setAccountOpen(false)}
                                >
                                    Saved items
                                </Link>
                                <Link
                                    className="account-item"
                                    to="/settings"
                                    role="menuitem"
                                    onClick={() => setAccountOpen(false)}
                                >
                                    Settings
                                </Link>
                                <Link
                                    className="account-item"
                                    to="/help-center"
                                    role="menuitem"
                                    onClick={() => setAccountOpen(false)}
                                >
                                    Help center
                                </Link>
                                <div className="account-divider" />
                                <button type="button" className="account-item danger" role="menuitem">Sign out</button>
                            </div>
                        ) : (
                            <div className="account-list">
                                <Link className="account-item primary" to="/login" role="menuitem">Sign in</Link>
                                <Link className="account-item outline" to="/signup" role="menuitem">Sign up</Link>
                                <Link
                                    className="account-item"
                                    to="/help-center"
                                    role="menuitem"
                                    onClick={() => setAccountOpen(false)}
                                >
                                    Help center
                                </Link>
                            </div>
                        )}
                    </div>,
                    document.body
                )}
            {helpOpen &&
                createPortal(
                    <div
                        className="help-modal-overlay"
                        role="presentation"
                        onClick={() => setHelpOpen(false)}
                    >
                        <div
                            className="help-modal"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="help-center-title"
                            onClick={(event) => event.stopPropagation()}
                        >
                            <div className="help-modal-header">
                                <div>
                                    <p className="help-eyebrow">Help center</p>
                                    <h2 className="help-title" id="help-center-title">How can we help?</h2>
                                </div>
                                <button
                                    type="button"
                                    className="help-close"
                                    aria-label="Close help center"
                                    onClick={() => setHelpOpen(false)}
                                >
                                    <svg viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M18 6L6 18M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="help-card-grid">
                                <div className="help-card">
                                    <p className="help-card-title">Track your order</p>
                                    <p className="help-card-text">Real-time updates, delivery windows, and courier info.</p>
                                    <button type="button" className="help-card-action">Open tracking</button>
                                </div>
                                <div className="help-card">
                                    <p className="help-card-title">Returns and exchanges</p>
                                    <p className="help-card-text">Start a return, print a label, or swap sizes in minutes.</p>
                                    <button type="button" className="help-card-action">Start a return</button>
                                </div>
                                <div className="help-card">
                                    <p className="help-card-title">Account support</p>
                                    <p className="help-card-text">Reset your password, update details, or recover access.</p>
                                    <button type="button" className="help-card-action">Manage account</button>
                                </div>
                            </div>

                            <div className="help-cta">
                                <div>
                                    <p className="help-cta-title">Need a human?</p>
                                    <p className="help-cta-text">Chat with our 24/7 concierge or email support@storeline.com.</p>
                                </div>
                                <div className="help-cta-actions">
                                    <button type="button" className="help-cta-btn primary">Start live chat</button>
                                    <button type="button" className="help-cta-btn">Send email</button>
                                </div>
                            </div>
                        </div>
                    </div>,
                    document.body
                )}
            {cartOpen &&
                createPortal(
                    <div
                        className="cart-modal-overlay"
                        role="presentation"
                        onClick={() => setCartOpen(false)}
                    >
                        <div
                            className="cart-modal"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="cart-title"
                            onClick={(event) => event.stopPropagation()}
                        >
                            <div className="cart-modal-header">
                                <div>
                                    <p className="cart-eyebrow">Your cart</p>
                                    <h2 className="cart-title" id="cart-title">Ready to check out?</h2>
                                </div>
                                <button
                                    type="button"
                                    className="cart-close"
                                    aria-label="Close cart"
                                    onClick={() => setCartOpen(false)}
                                >
                                    <svg viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M18 6L6 18M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="cart-items">
                                {cartItems.length === 0 ? (
                                    <div className="cart-empty">
                                        <p className="cart-empty-title">Your cart is empty</p>
                                        <p className="cart-empty-text">Add favorites to start a checkout.</p>
                                    </div>
                                ) : (
                                    cartItems.map((item) => (
                                        <div className="cart-item" key={`${item.id}-${item.size}-${item.color}`}>
                                            <div className="cart-item-image" aria-hidden="true" />
                                            <div className="cart-item-body">
                                                <div className="cart-item-top">
                                                    <div>
                                                        <p className="cart-item-title">{item.name}</p>
                                                        <p className="cart-item-meta">
                                                            {item.color} · Size {item.size}
                                                        </p>
                                                    </div>
                                                    <p className="cart-item-price">${item.price}</p>
                                                </div>

                                                <div className="cart-item-controls">
                                                    <div className="cart-qty">
                                                        <button
                                                            type="button"
                                                            className="qty-btn"
                                                            onClick={() =>
                                                                handleQuantityChange(item.id, item.size, item.color, -1)
                                                            }
                                                        >
                                                            -
                                                        </button>
                                                        <input
                                                            type="number"
                                                            min="1"
                                                            value={item.quantity}
                                                            onChange={(event) =>
                                                                handleQuantityInput(
                                                                    item.id,
                                                                    item.size,
                                                                    item.color,
                                                                    event.target.value
                                                                )
                                                            }
                                                        />
                                                        <button
                                                            type="button"
                                                            className="qty-btn"
                                                            onClick={() =>
                                                                handleQuantityChange(item.id, item.size, item.color, 1)
                                                            }
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    <div className="cart-item-actions">
                                                        <button
                                                            type="button"
                                                            className="cart-item-link"
                                                            onClick={() => handleEditToggle(`${item.id}-${item.size}-${item.color}`)}
                                                        >
                                                            {editingItemId === `${item.id}-${item.size}-${item.color}`
                                                                ? 'Done'
                                                                : 'Edit'}
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="cart-item-link danger"
                                                            onClick={() => handleRemoveItem(item.id, item.size, item.color)}
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>

                                                {editingItemId === `${item.id}-${item.size}-${item.color}` && (
                                                    <div className="cart-item-edit">
                                                        <label>
                                                            <span>Color</span>
                                                            <select
                                                                value={item.color}
                                                                onChange={(event) =>
                                                                    handleItemUpdate(item.id, item.size, item.color, {
                                                                        color: event.target.value,
                                                                    })
                                                                }
                                                            >
                                                                <option>Ivory</option>
                                                                <option>Midnight</option>
                                                                <option>Sand</option>
                                                                <option>Rose</option>
                                                            </select>
                                                        </label>
                                                        <label>
                                                            <span>Size</span>
                                                            <select
                                                                value={item.size}
                                                                onChange={(event) =>
                                                                    handleItemUpdate(item.id, item.size, item.color, {
                                                                        size: event.target.value,
                                                                    })
                                                                }
                                                            >
                                                                <option>XS</option>
                                                                <option>S</option>
                                                                <option>M</option>
                                                                <option>L</option>
                                                            </select>
                                                        </label>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="cart-summary">
                                <div>
                                    <p className="cart-summary-label">Subtotal</p>
                                    <p className="cart-summary-value">${cartSubtotal.toFixed(2)}</p>
                                    <p className="cart-summary-note">Shipping calculated at checkout.</p>
                                </div>
                                <button type="button" className="cart-checkout" onClick={handleCheckout}>
                                    Proceed to checkout
                                </button>
                            </div>
                        </div>
                    </div>,
                    document.body
                )}
            {wishlistOpen &&
                createPortal(
                    <div
                        className="wishlist-modal-overlay"
                        role="presentation"
                        onClick={() => setWishlistOpen(false)}
                    >
                        <div
                            className="wishlist-modal"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="wishlist-title"
                            onClick={(event) => event.stopPropagation()}
                        >
                            <div className="wishlist-modal-header">
                                <div>
                                    <p className="wishlist-eyebrow">Wishlist</p>
                                    <h2 className="wishlist-title" id="wishlist-title">Your saved favorites</h2>
                                </div>
                                <button
                                    type="button"
                                    className="wishlist-close"
                                    aria-label="Close wishlist"
                                    onClick={() => setWishlistOpen(false)}
                                >
                                    <svg viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M18 6L6 18M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="wishlist-items">
                                {wishlistItems.length === 0 ? (
                                    <div className="wishlist-empty">
                                        <p className="wishlist-empty-title">Nothing saved yet</p>
                                        <p className="wishlist-empty-text">Tap the heart on products to save them here.</p>
                                    </div>
                                ) : (
                                    wishlistItems.map((item) => (
                                        <div
                                            className="wishlist-item"
                                            key={item.id}
                                            onClick={() => {
                                                setWishlistOpen(false)
                                                navigate(`/product/${item.id}`)
                                            }}
                                        >
                                            <div className="wishlist-item-image" aria-hidden="true" />
                                            <div className="wishlist-item-body">
                                                <div className="wishlist-item-top">
                                                    <div>
                                                        <p className="wishlist-item-title">{item.name}</p>
                                                        <p className="wishlist-item-meta">{item.accent}</p>
                                                    </div>
                                                    <p className="wishlist-item-price">${item.price}</p>
                                                </div>
                                                <div className="wishlist-item-actions">
                                                    <button
                                                        type="button"
                                                        className="wishlist-btn"
                                                        onClick={(event) => {
                                                            event.stopPropagation()
                                                            addToCart(
                                                                { id: item.id, name: item.name, price: item.price },
                                                                { quantity: 1, size: 'M', color: 'black' }
                                                            )
                                                        }}
                                                    >
                                                        Add to cart
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="wishlist-link"
                                                        onClick={(event) => {
                                                            event.stopPropagation()
                                                            handleRemoveWishlistItem(item.id)
                                                        }}
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="wishlist-footer">
                                <p className="wishlist-footer-text">Keep exploring new drops curated for you.</p>
                                <button type="button" className="wishlist-cta">Continue shopping</button>
                            </div>
                        </div>
                    </div>,
                    document.body
                )}
        </header>
    )
}
