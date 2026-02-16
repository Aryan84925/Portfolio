import React, { useState } from 'react'
import './Admin.css'
import { Outlet, useNavigate } from 'react-router-dom'
import AdminHeader from './Component/AdminHeader/AdminHeader'
import AdminSidebar from './Component/AdminSidebar/AdminSidebar'

export default function Admin() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const navigate = useNavigate()

  return (
    <div className='admin_container'>
      <AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className='admin_main'>
        <AdminSidebar isOpen={sidebarOpen} />
        <div className='admin_content'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
