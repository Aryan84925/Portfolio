import React from 'react'
import './AdminSidebar.css'
import { Link, useLocation } from 'react-router-dom'

export default function AdminSidebar({ isOpen }) {
  const location = useLocation()

  const menuItems = [
    { id: 1, label: 'Dashboard', icon: '📊', path: '/admin' },
    { id: 2, label: 'Products', icon: '📦', path: '/admin/products' },
    { id: 3, label: 'Orders', icon: '🛒', path: '/admin/orders' },
    { id: 4, label: 'Users', icon: '👥', path: '/admin/users' },
    { id: 5, label: 'Analytics', icon: '📈', path: '/admin/analytics' },
    { id: 6, label: 'Settings', icon: '⚙️', path: '/admin/settings' },
  ]

  return (
    <aside className={`admin_sidebar ${isOpen ? 'open' : 'closed'}`}>
      <nav className='sidebar_nav'>
        {menuItems.map(item => (
          <Link
            key={item.id}
            to={item.path}
            className={`nav_item ${location.pathname === item.path ? 'active' : ''}`}
            title={item.label}
          >
            <span className='nav_icon'>{item.icon}</span>
            <span className='nav_label'>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className='sidebar_footer'>
        <div className='sidebar_footer_item'>
          <span className='footer_icon'>ℹ️</span>
          <span className='footer_label'>Version 1.0</span>
        </div>
      </div>
    </aside>
  )
}
