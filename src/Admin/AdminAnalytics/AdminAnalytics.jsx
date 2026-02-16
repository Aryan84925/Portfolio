import React, { useMemo } from 'react'
import './AdminAnalytics.css'
import StatCard from '../Component/StatCard/StatCard'

export default function AdminAnalytics() {
  const kpis = useMemo(
    () => [
      { label: 'Revenue', value: '$128.4K', icon: '💸', change: '+12.4%' },
      { label: 'Orders', value: '4.2K', icon: '🛒', change: '+3.1%' },
      { label: 'Visitors', value: '82.5K', icon: '👁️', change: '+7.8%' },
      { label: 'Conversion', value: '3.9%', icon: '⚡', change: '+0.6%' },
    ],
    [],
  )

  const traffic = useMemo(
    () => [
      { label: 'Mon', value: 62 },
      { label: 'Tue', value: 74 },
      { label: 'Wed', value: 58 },
      { label: 'Thu', value: 81 },
      { label: 'Fri', value: 96 },
      { label: 'Sat', value: 68 },
      { label: 'Sun', value: 55 },
    ],
    [],
  )

  const channels = useMemo(
    () => [
      { label: 'Organic', value: 42 },
      { label: 'Paid', value: 26 },
      { label: 'Referral', value: 18 },
      { label: 'Email', value: 9 },
      { label: 'Social', value: 5 },
    ],
    [],
  )

  const topProducts = useMemo(
    () => [
      { name: 'Aurora Headphones', sales: '$24.1K', growth: '+14%' },
      { name: 'Neon Keyboard', sales: '$19.7K', growth: '+8%' },
      { name: 'Quantum Mouse', sales: '$17.2K', growth: '+11%' },
      { name: 'Halo Monitor', sales: '$15.4K', growth: '+6%' },
    ],
    [],
  )

  return (
    <div className='analytics_page'>
      <div className='analytics_header'>
        <div>
          <p className='eyebrow'>Pulse</p>
          <h1>Analytics</h1>
          <p className='subtitle'>A quick view of revenue, visitors, and conversions with the neon admin vibe.</p>
        </div>
        <div className='header_actions'>
          <button className='ghost_btn'>Refresh</button>
          <button className='primary_btn'>Export Report</button>
        </div>
      </div>

      <div className='stats_grid'>
        {kpis.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      <div className='analytics_grid'>
        <section className='chart_card'>
          <div className='card_header'>
            <h3>Weekly Traffic</h3>
            <span>Sessions by day</span>
          </div>
          <div className='bar_chart'>
            {traffic.map(day => (
              <div key={day.label} className='bar_item'>
                <div className='bar_track'>
                  <div className='bar_fill' style={{ height: `${day.value}%` }} />
                </div>
                <span className='bar_label'>{day.label}</span>
                <span className='bar_value'>{day.value}K</span>
              </div>
            ))}
          </div>
        </section>

        <section className='chart_card'>
          <div className='card_header'>
            <h3>Channel Mix</h3>
            <span>Traffic sources</span>
          </div>
          <div className='channel_list'>
            {channels.map(ch => (
              <div key={ch.label} className='channel_row'>
                <div className='channel_meta'>
                  <span className='dot' />
                  <p className='channel_label'>{ch.label}</p>
                </div>
                <div className='channel_bar'>
                  <div style={{ width: `${ch.value}%` }} />
                </div>
                <span className='channel_value'>{ch.value}%</span>
              </div>
            ))}
          </div>
        </section>

        <section className='chart_card full'>
          <div className='card_header'>
            <h3>Top Products</h3>
            <span>Performance this week</span>
          </div>
          <div className='products_table'>
            <div className='table_head'>
              <span>Product</span>
              <span>Sales</span>
              <span>Growth</span>
            </div>
            {topProducts.map(prod => (
              <div key={prod.name} className='table_row'>
                <span>{prod.name}</span>
                <span>{prod.sales}</span>
                <span className={`growth ${prod.growth.startsWith('+') ? 'up' : 'down'}`}>{prod.growth}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
