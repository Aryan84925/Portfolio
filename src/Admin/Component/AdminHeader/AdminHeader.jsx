import React from 'react'
import './AdminHeader.css'
import { useNavigate } from 'react-router-dom'

export default function AdminHeader({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    navigate('/login')
  }

  return (
    <header className='admin_header'>
      <div className='admin_header_left'>
        <button 
          className='sidebar_toggle'
          onClick={() => setSidebarOpen(!sidebarOpen)}
          title="Toggle Sidebar"
        >
          <span className='hamburger_line'></span>
          <span className='hamburger_line'></span>
          <span className='hamburger_line'></span>
        </button>
        <div className='admin_header_logo'>
          <span className='logo_icon'>⚙️</span>
          <span className='logo_text'>Admin Panel</span>
        </div>
      </div>

      <div className='admin_header_center'>
        <h1 className='admin_title'>Dashboard</h1>
      </div>

      <div className='admin_header_right'>
        <div className='admin_header_user'>
          <div className='user_avatar'>👤</div>
          <span className='user_name'>Admin</span>
        </div>
        <button 
          className='logout_btn'
          onClick={handleLogout}
          title="Logout"
        >
          🚪 Logout
        </button>
      </div>
    </header>
  )
}
