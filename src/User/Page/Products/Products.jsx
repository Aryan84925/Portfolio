import React, { useMemo, useState } from 'react'
import Header from '../../Component/Header/Header'
import Footer from '../../Component/Footer/Footer'
import Boxs from '../../Component/Boxs/Boxs'
import products from '../../Component/Boxs/data'
import './Products.css'
import '../Home/featuredProducts.css'

const parsePrice = (value) => {
	if (!value) return 0
	const normalized = value.replace(/[^0-9.]/g, '')
	return Number.parseFloat(normalized) || 0
}

export default function Products() {
	const [searchTerm, setSearchTerm] = useState('')
	const [activeCategory, setActiveCategory] = useState('All')
	const [sortOption, setSortOption] = useState('popular')
	const [priceRange, setPriceRange] = useState('all')

	const categories = useMemo(() => {
		const unique = new Set(products.map((product) => product.category))
		return ['All', ...Array.from(unique)]
	}, [])

	const filteredProducts = useMemo(() => {
		const normalizedSearch = searchTerm.trim().toLowerCase()
		const matchesPriceRange = (productPrice) => {
			if (priceRange === 'all') return true
			const [min, max] = priceRange.split('-').map((val) => Number.parseFloat(val))
			if (Number.isNaN(min) || Number.isNaN(max)) return true
			return productPrice >= min && productPrice <= max
		}

		let filtered = products.filter((product) => {
			const matchesCategory =
				activeCategory === 'All' || product.category === activeCategory
			const matchesSearch = normalizedSearch
				? product.name.toLowerCase().includes(normalizedSearch) ||
					product.category.toLowerCase().includes(normalizedSearch)
				: true
			const productPrice = parsePrice(product.priceCurrent)
			const matchesPrice = matchesPriceRange(productPrice)
			return matchesCategory && matchesSearch && matchesPrice
		})

		const sorted = filtered.slice().sort((a, b) => {
			switch (sortOption) {
				case 'new':
					return b.id - a.id
				case 'price-asc':
					return parsePrice(a.priceCurrent) - parsePrice(b.priceCurrent)
				case 'price-desc':
					return parsePrice(b.priceCurrent) - parsePrice(a.priceCurrent)
				case 'popular':
				default:
					return b.ratingCount - a.ratingCount
			}
		})

		return sorted
	}, [activeCategory, priceRange, searchTerm, sortOption])

	return (
		<>
			<Header />
			<main className="products-page">
				<div className="products-orb products-orb-1" aria-hidden="true" />
				<div className="products-orb products-orb-2" aria-hidden="true" />
				<div className="products-orb products-orb-3" aria-hidden="true" />

				<section className="products-shell">
					<header className="products-filter-header">
						<div>
							<p className="products-eyebrow">All products</p>
							<h1 className="products-title">Find your next favorite</h1>
							<p className="products-subtitle">
								Filter by category, price, and availability to match your vibe.
							</p>
						</div>
						<div className="products-filter-actions">
							<div className="products-search">
								<input
									type="search"
									placeholder="Search products, brands, keywords"
									value={searchTerm}
									onChange={(event) => setSearchTerm(event.target.value)}
								/>
								<button type="button">Search</button>
							</div>
							<div className="products-filter-row">
								<div className="products-chip-group">
									{categories.map((category) => (
										<button
											key={category}
											type="button"
											className={`products-chip${activeCategory === category ? ' active' : ''}`}
											aria-pressed={activeCategory === category}
											onClick={() => setActiveCategory(category)}
										>
											{category}
										</button>
									))}
								</div>
								<div className="products-select">
									<label>
										<span>Sort by</span>
										<select
											value={sortOption}
											onChange={(event) => setSortOption(event.target.value)}
										>
											<option value="popular">Most popular</option>
											<option value="new">Newest</option>
											<option value="price-asc">Price: Low to High</option>
											<option value="price-desc">Price: High to Low</option>
										</select>
									</label>
									<label>
										<span>Price</span>
										<select
											value={priceRange}
											onChange={(event) => setPriceRange(event.target.value)}
										>
											<option value="all">All ranges</option>
											<option value="0-50">$0 - $50</option>
											<option value="50-150">$50 - $150</option>
											<option value="150-300">$150 - $300</option>
										</select>
									</label>
								</div>
							</div>
							<div className="products-filter-count">
								Showing {filteredProducts.length} items
							</div>
						</div>
					</header>

					<section className="products-list">
						<Boxs items={filteredProducts} />
					</section>
				</section>
			</main>
			<Footer />
		</>
	)
}
