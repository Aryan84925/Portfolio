import React, { useState } from 'react'
import './DashboardCard.css'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

export default function DashboardCard({ project }) {
  const [chartType, setChartType] = useState('line')
  const [showDetails, setShowDetails] = useState(false)

  // Sample data for charts
  const chartData = [
    { month: 'Jan', views: Math.floor(project.views * 0.6), sales: Math.floor(project.sales * 0.5) },
    { month: 'Feb', views: Math.floor(project.views * 0.7), sales: Math.floor(project.sales * 0.6) },
    { month: 'Mar', views: Math.floor(project.views * 0.75), sales: Math.floor(project.sales * 0.7) },
    { month: 'Apr', views: Math.floor(project.views * 0.85), sales: Math.floor(project.sales * 0.8) },
    { month: 'May', views: Math.floor(project.views * 0.95), sales: Math.floor(project.sales * 0.9) },
    { month: 'Jun', views: project.views, sales: project.sales },
  ]

  const pieData = [
    { name: 'Direct', value: Math.floor(project.views * 0.4) },
    { name: 'Referral', value: Math.floor(project.views * 0.35) },
    { name: 'Social', value: Math.floor(project.views * 0.25) },
  ]

  const COLORS = ['#4AD7FF', '#00D4FF', '#00B8E6']

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className='custom_tooltip'>
          <p>{payload[0].payload.month}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(74, 215, 255, 0.1)" />
              <XAxis dataKey="month" stroke="rgba(255, 255, 255, 0.5)" />
              <YAxis stroke="rgba(255, 255, 255, 0.5)" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line type="monotone" dataKey="views" stroke="#4AD7FF" strokeWidth={3} dot={{ fill: '#4AD7FF', r: 5 }} activeDot={{ r: 7 }} />
              <Line type="monotone" dataKey="sales" stroke="#00D4FF" strokeWidth={3} dot={{ fill: '#00D4FF', r: 5 }} activeDot={{ r: 7 }} />
            </LineChart>
          </ResponsiveContainer>
        )
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(74, 215, 255, 0.1)" />
              <XAxis dataKey="month" stroke="rgba(255, 255, 255, 0.5)" />
              <YAxis stroke="rgba(255, 255, 255, 0.5)" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="views" fill="#4AD7FF" radius={[8, 8, 0, 0]} />
              <Bar dataKey="sales" fill="#00D4FF" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )
      default:
        return null
    }
  }

  const detailStats = () => {
    const conversion = project.views ? Math.round((project.sales / project.views) * 1000) / 10 : 0
    const avgOrder = project.sales ? Math.round(project.sales / 42) : 0 // placeholder sample
    const ctr = project.views ? Math.round((project.views * 0.18 / project.views) * 1000) / 10 : 0
    return {
      conversion,
      avgOrder,
      ctr,
      topSources: pieData,
    }
  }

  const statsDetail = detailStats()

  return (
    <div className='dashboard_card'>
      <div className='card_header'>
        <div className='card_title_section'>
          <h3 className='card_title'>{project.name}</h3>
          <span className='card_growth'>{project.growth > 0 ? '📈' : '📉'} {project.growth}%</span>
        </div>
        <div className='chart_type_selector'>
          <button
            className={`chart_btn ${chartType === 'line' ? 'active' : ''}`}
            onClick={() => setChartType('line')}
            title="Line Chart"
          >
            📉
          </button>
          <button
            className={`chart_btn ${chartType === 'bar' ? 'active' : ''}`}
            onClick={() => setChartType('bar')}
            title="Bar Chart"
          >
            📊
          </button>
          <button
            className={`chart_btn ${chartType === 'pie' ? 'active' : ''}`}
            onClick={() => setChartType('pie')}
            title="Pie Chart"
          >
            🥧
          </button>
        </div>
      </div>

      <div className='card_stats'>
        <div className='stat_item'>
          <span className='stat_label'>Views</span>
          <span className='stat_value'>{project.views.toLocaleString()}</span>
        </div>
        <div className='stat_item'>
          <span className='stat_label'>Sales</span>
          <span className='stat_value'>${project.sales.toLocaleString()}</span>
        </div>
      </div>

      <div className='card_chart'>
        {renderChart()}
      </div>

      <div className='card_footer'>
        <button className='card_action_btn' onClick={() => setShowDetails(true)}>View Details</button>
      </div>

      {showDetails && (
        <div className='detail_overlay'>
          <div className='detail_modal'>
            <div className='detail_header'>
              <div>
                <p className='detail_kicker'>Project Insights</p>
                <h4>{project.name}</h4>
              </div>
              <button className='detail_close' onClick={() => setShowDetails(false)} aria-label='Close details'>
                ✕
              </button>
            </div>

            <div className='detail_grid'>
              <div className='detail_stat'>
                <span className='detail_label'>Views</span>
                <span className='detail_value'>{project.views.toLocaleString()}</span>
              </div>
              <div className='detail_stat'>
                <span className='detail_label'>Sales</span>
                <span className='detail_value'>${project.sales.toLocaleString()}</span>
              </div>
              <div className='detail_stat'>
                <span className='detail_label'>Growth</span>
                <span className='detail_value'>{project.growth}%</span>
              </div>
              <div className='detail_stat'>
                <span className='detail_label'>Conversion</span>
                <span className='detail_value'>{statsDetail.conversion}%</span>
              </div>
              <div className='detail_stat'>
                <span className='detail_label'>CTR</span>
                <span className='detail_value'>{statsDetail.ctr}%</span>
              </div>
              <div className='detail_stat'>
                <span className='detail_label'>Avg Order</span>
                <span className='detail_value'>${statsDetail.avgOrder.toLocaleString()}</span>
              </div>
            </div>

            <div className='detail_sources'>
              <h5>Top Sources</h5>
              <ul>
                {statsDetail.topSources.map(src => (
                  <li key={src.name}>
                    <span>{src.name}</span>
                    <span className='source_value'>{src.value.toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className='detail_actions'>
              <button className='detail_btn secondary' onClick={() => setShowDetails(false)}>Close</button>
              <button className='detail_btn primary'>Open Project</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
