import React from 'react'
import './AdminDashbord.css'
import DashboardCard from '../Component/DashboardCard/DashboardCard'
import StatCard from '../Component/StatCard/StatCard'

export default function AdminDashbord() {
  const projects = [
    { id: 1, name: 'E-Commerce Platform', views: 4500, sales: 2400, growth: 35 },
    { id: 2, name: 'Social Media App', views: 3200, sales: 1800, growth: 28 },
    { id: 3, name: 'Task Management', views: 2800, sales: 1500, growth: 22 },
    { id: 4, name: 'Analytics Dashboard', views: 3900, sales: 2100, growth: 31 },
  ]

  const stats = [
    { label: 'Total Projects', value: '4', icon: '📊', change: '+2' },
    { label: 'Total Views', value: '14.5K', icon: '👁️', change: '+5.2%' },
    { label: 'Total Sales', value: '$7.8K', icon: '💰', change: '+12%' },
    { label: 'Users Active', value: '2.4K', icon: '👥', change: '+8%' },
  ]

  return (
    <div className='dashboard_container'>
      <div className='dashboard_header'>
        <h1>Dashboard Analytics</h1>
        <p>Welcome back! Here's your project performance overview</p>
      </div>

      <div className='stats_grid'>
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className='projects_grid'>
        {projects.map(project => (
          <DashboardCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}
