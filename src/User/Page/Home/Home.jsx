import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
import './landing.css'
import './featuredProducts.css'
import './categories.css'
import Header from '../../Component/Header/Header'
import Footer from '../../Component/Footer/Footer'
import Boxs from '../../Component/Boxs/Boxs'


export default function Home() {
  return (
    <>
      <Header />
      <div className='home'>
        <section className='landing'>
          <div className='landing-bg-orbs' aria-hidden='true'>
            <div className='orb orb-1'></div>
            <div className='orb orb-2'></div>
            <div className='orb orb-3'></div>
          </div>

          <div className='landing-container'>
            <div className='hero-content'>
              <div className='hero-badge'>New Season Collection 2026</div>
              <h1 className='hero-title'>
                Define Your Style,
                <span className='hero-gradient'>Shop With Confidence</span>
              </h1>
              <p className='hero-description'>
                Discover curated collections of premium fashion, accessories, and lifestyle products.
                Elevate your everyday with pieces that speak to who you are.
              </p>
              <div className='hero-actions'>
                <button className='hero-btn hero-btn-primary'>Explore Collection</button>
                <button className='hero-btn hero-btn-secondary'>View Deals</button>
              </div>
              <div className='hero-stats'>
                <div className='stat'>
                  <span className='stat-value'>50K+</span>
                  <span className='stat-label'>Happy Customers</span>
                </div>
                <div className='stat'>
                  <span className='stat-value'>15K+</span>
                  <span className='stat-label'>Products</span>
                </div>
                <div className='stat'>
                  <span className='stat-value'>4.9★</span>
                  <span className='stat-label'>Rated</span>
                </div>
              </div>
            </div>

            <div className='hero-visual'>
              <div className='visual-card visual-card-1'>
                <div className='product-placeholder'>
                  <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'>
                    <path d='M12 2L2 7l10 5 10-5-10-5z' />
                    <path d='M2 17l10 5 10-5M2 12l10 5 10-5' />
                  </svg>
                </div>
                <span className='card-label'>Premium Quality</span>
              </div>
              <div className='visual-card visual-card-2'>
                <div className='product-placeholder'>
                  <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'>
                    <path d='M21 8v13H3V8M1 3h22v5H1z' />
                    <path d='M10 12h4' />
                  </svg>
                </div>
                <span className='card-label'>Fast Shipping</span>
              </div>
              <div className='visual-card visual-card-3'>
                <div className='product-placeholder'>
                  <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'>
                    <circle cx='12' cy='12' r='10' />
                    <path d='M12 6v6l4 2' />
                  </svg>
                </div>
                <span className='card-label'>24/7 Support</span>
              </div>
            </div>
          </div>
        </section>

        <section className='featured-products' id='featured-products'>
          <div className='featured-container'>
            <div className='section-header'>
              <div className='section-tag'>Trending Now</div>
              <h2 className='section-title'>Featured Products</h2>
              <p className='section-description'>Handpicked items from our latest collection</p>
            </div>

            <Boxs />

            <div className='section-cta'>
              <Link className='view-all-btn' to='/products'>View All Products</Link>
            </div>
          </div>
        </section>

        <section className='categories-section'>
          <div className='categories-container'>
            <div className='categories-header'>
              <div className='categories-tag'>Shop by Category</div>
              <h2 className='categories-title'>Find Your Next Favorite</h2>
              <p className='categories-description'>Browse curated categories and explore the latest trends.</p>
            </div>

            <div className='categories-grid'>
              <a className='category-card card-large' href='#'>
                <img
                  className='category-image'
                  src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80'
                  alt='Women category'
                  loading='lazy'
                />
                <div className='category-overlay'></div>
                <div className='category-content'>
                  <span className='category-label'>Women</span>
                  <span className='category-meta'>Summer Essentials</span>
                  <span className='category-cta'>Shop Now</span>
                </div>
              </a>

              <a className='category-card card-tall' href='#'>
                <img
                  className='category-image'
                  src='https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&w=1200&q=80'
                  alt='Men category'
                  loading='lazy'
                />
                <div className='category-overlay'></div>
                <div className='category-content'>
                  <span className='category-label'>Men</span>
                  <span className='category-meta'>Smart Casual</span>
                  <span className='category-cta'>Discover</span>
                </div>
              </a>

              <a className='category-card' href='#'>
                <img
                  className='category-image'
                  src='https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80'
                  alt='Accessories category'
                  loading='lazy'
                />
                <div className='category-overlay'></div>
                <div className='category-content'>
                  <span className='category-label'>Accessories</span>
                  <span className='category-meta'>Bold Details</span>
                  <span className='category-cta'>Browse</span>
                </div>
              </a>

              <a className='category-card' href='#'>
                <img
                  className='category-image'
                  src='https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80'
                  alt='Shoes category'
                  loading='lazy'
                />
                <div className='category-overlay'></div>
                <div className='category-content'>
                  <span className='category-label'>Shoes</span>
                  <span className='category-meta'>Everyday Comfort</span>
                  <span className='category-cta'>See More</span>
                </div>
              </a>

              <a className='category-card card-wide' href='#'>
                <img
                  className='category-image'
                  src='https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80'
                  alt='Beauty category'
                  loading='lazy'
                />
                <div className='category-overlay'></div>
                <div className='category-content'>
                  <span className='category-label'>Beauty</span>
                  <span className='category-meta'>Glow Rituals</span>
                  <span className='category-cta'>Explore</span>
                </div>
              </a>
            </div>
          </div>
        </section>

        <Footer />

      </div>
    </>
  )
}
