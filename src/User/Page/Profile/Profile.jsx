import React from 'react'
import './Profile.css'

export default function Profile() {
  return (
    <main className="profile-page">
      <div className="profile-orb profile-orb-1" aria-hidden="true" />
      <div className="profile-orb profile-orb-2" aria-hidden="true" />
      <div className="profile-orb profile-orb-3" aria-hidden="true" />

      <section className="profile-shell">
        <header className="profile-hero">
          <div className="profile-identity">
            <div className="profile-avatar">SK</div>
            <div>
              <p className="profile-eyebrow">Member since 2022</p>
              <h1 className="profile-name">Sara Kiani</h1>
              <p className="profile-handle">@sara.k · Gold Member</p>
              <div className="profile-meta">
                <span>Tehran, IR</span>
                <span>120 orders</span>
                <span>1,240 points</span>
              </div>
            </div>
          </div>
          <div className="profile-hero-actions">
            <button type="button" className="profile-btn primary">Edit profile</button>
            <button type="button" className="profile-btn">Share profile</button>
            <button type="button" className="profile-btn ghost">View loyalty tiers</button>
          </div>
          <div className="profile-hero-stats">
            <div className="profile-stat">
              <p className="stat-value">92%</p>
              <p className="stat-label">On-time delivery</p>
            </div>
            <div className="profile-stat">
              <p className="stat-value">4.9</p>
              <p className="stat-label">Average rating</p>
            </div>
            <div className="profile-stat">
              <p className="stat-value">8</p>
              <p className="stat-label">Active returns</p>
            </div>
          </div>
        </header>

        <div className="profile-grid">
          <aside className="profile-card profile-side">
            <div className="profile-card-header">
              <h2 className="profile-card-title">Account snapshot</h2>
              <span className="profile-chip">Verified</span>
            </div>
            <div className="profile-info">
              <div>
                <p className="info-label">Email</p>
                <p className="info-value">sara.kiani@storeline.com</p>
              </div>
              <div>
                <p className="info-label">Phone</p>
                <p className="info-value">+98 912 000 0000</p>
              </div>
              <div>
                <p className="info-label">Shipping</p>
                <p className="info-value">Azadi Ave, Tehran</p>
              </div>
            </div>

            <div className="profile-divider" />

            <div className="profile-section">
              <h3 className="profile-section-title">Preferences</h3>
              <div className="profile-preferences">
                <div className="preference-row">
                  <span>Smart restock alerts</span>
                  <span className="preference-pill active">On</span>
                </div>
                <div className="preference-row">
                  <span>Weekly style drops</span>
                  <span className="preference-pill">Off</span>
                </div>
                <div className="preference-row">
                  <span>SMS delivery updates</span>
                  <span className="preference-pill active">On</span>
                </div>
              </div>
            </div>

            <div className="profile-divider" />

            <div className="profile-section">
              <h3 className="profile-section-title">Next milestone</h3>
              <p className="profile-progress-label">Unlock Platinum at 1,500 points</p>
              <div className="profile-progress">
                <div className="profile-progress-bar" style={{ width: '82%' }} />
              </div>
            </div>
          </aside>

          <section className="profile-card profile-main">
            <div className="profile-card-header">
              <h2 className="profile-card-title">Your Storeline world</h2>
              <button type="button" className="profile-link">View all activity</button>
            </div>

            <div className="profile-kpis">
              <div className="profile-kpi">
                <p className="kpi-label">Total spend</p>
                <p className="kpi-value">$4,780</p>
                <p className="kpi-foot">+12% this month</p>
              </div>
              <div className="profile-kpi">
                <p className="kpi-label">Active orders</p>
                <p className="kpi-value">3</p>
                <p className="kpi-foot">2 arriving today</p>
              </div>
              <div className="profile-kpi">
                <p className="kpi-label">Saved items</p>
                <p className="kpi-value">48</p>
                <p className="kpi-foot">8 new this week</p>
              </div>
            </div>

            <div className="profile-activity">
              <h3 className="profile-section-title">Recent activity</h3>
              <ul className="activity-list">
                <li>
                  <div className="activity-dot" />
                  <div>
                    <p className="activity-title">Order #5432 shipped</p>
                    <p className="activity-meta">Expected delivery · Today 18:30</p>
                  </div>
                  <span className="activity-chip">In transit</span>
                </li>
                <li>
                  <div className="activity-dot" />
                  <div>
                    <p className="activity-title">Wishlist updated</p>
                    <p className="activity-meta">Added 4 items · 2 back in stock</p>
                  </div>
                  <span className="activity-chip soft">Saved</span>
                </li>
                <li>
                  <div className="activity-dot" />
                  <div>
                    <p className="activity-title">Rewards boosted</p>
                    <p className="activity-meta">Double points activated · 3 days left</p>
                  </div>
                  <span className="activity-chip glow">Boost</span>
                </li>
              </ul>
            </div>

            <div className="profile-saved">
              <h3 className="profile-section-title">Top picks for you</h3>
              <div className="saved-grid">
                <div className="saved-card">
                  <div className="saved-image" aria-hidden="true" />
                  <p className="saved-title">Aurora wrap blazer</p>
                  <p className="saved-meta">2 colors · 15% off</p>
                </div>
                <div className="saved-card">
                  <div className="saved-image alt" aria-hidden="true" />
                  <p className="saved-title">NOVA trainer set</p>
                  <p className="saved-meta">Limited restock</p>
                </div>
                <div className="saved-card">
                  <div className="saved-image warm" aria-hidden="true" />
                  <p className="saved-title">Luna tote bag</p>
                  <p className="saved-meta">Member exclusive</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}
