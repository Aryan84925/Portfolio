import React, { useMemo, useState, useEffect } from 'react'
import './AdminUsers.css'
import { supabase } from '../../lib/supabaseClient'

export default function AdminUsers() {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState('view') // view, add, edit
  const [selectedUser, setSelectedUser] = useState(null)
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    role: 'Viewer',
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      setError('')
      const { data, error: err } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })

      if (err) {
        setError('Failed to fetch users: ' + err.message)
      } else if (data) {
        setUsers(data)
      }
      setLoading(false)
    }
    fetchUsers()
  }, [])

  const filteredUsers = useMemo(() => {
    const query = search.toLowerCase().trim()
    return users.filter(user => {
      const matchesSearch =
        (user.full_name || '').toLowerCase().includes(query) ||
        (user.email || '').toLowerCase().includes(query) ||
        (user.role || '').toLowerCase().includes(query)
      return matchesSearch
    })
  }, [search, users])

  const handleExportCSV = () => {
    const headers = ['ID', 'Full Name', 'Email', 'Role', 'Created']
    const csvContent = [
      headers.join(','),
      ...users.map(user =>
        [user.id, user.full_name, user.email, user.role, user.created_at].join(',')
      )
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `users_export_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const openAddModal = () => {
    setFormData({
      full_name: '',
      email: '',
      role: 'Viewer',
    })
    setSelectedUser(null)
    setModalMode('add')
    setModalOpen(true)
  }

  const openViewModal = user => {
    setSelectedUser(user)
    setFormData(user)
    setModalMode('view')
    setModalOpen(true)
  }

  const openEditModal = user => {
    setSelectedUser(user)
    setFormData({ ...user })
    setModalMode('edit')
    setModalOpen(true)
  }

  const handleFormChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    if (!formData.full_name.trim() || !formData.email.trim()) {
      alert('Full name and email are required!')
      return
    }

    if (modalMode === 'add') {
      supabase
        .from('profiles')
        .insert([
          {
            full_name: formData.full_name,
            email: formData.email,
            role: formData.role,
          },
        ])
        .select()
        .single()
        .then(({ data, error: err }) => {
          if (err) {
            setError('Create failed: ' + err.message)
            return
          }
          if (data) setUsers(prev => [data, ...prev])
          setModalOpen(false)
        })
    } else if (modalMode === 'edit' && selectedUser) {
      supabase
        .from('profiles')
        .update({
          full_name: formData.full_name,
          email: formData.email,
          role: formData.role,
        })
        .eq('id', selectedUser.id)
        .select()
        .single()
        .then(({ data, error: err }) => {
          if (err) {
            setError('Update failed: ' + err.message)
            return
          }
          if (data) setUsers(prev => prev.map(u => (u.id === data.id ? data : u)))
          setModalOpen(false)
        })
    }
  }

  const handleDelete = () => {
    if (!selectedUser) return
    if (window.confirm(`Delete ${selectedUser.full_name}?`)) {
      supabase
        .from('profiles')
        .delete()
        .eq('id', selectedUser.id)
        .then(({ error: err }) => {
          if (err) {
            setError('Delete failed: ' + err.message)
            return
          }
          setUsers(prev => prev.filter(u => u.id !== selectedUser.id))
          setModalOpen(false)
        })
    }
  }

  const handleQuickDelete = (user) => {
    if (window.confirm(`Delete ${user.full_name}?`)) {
      supabase
        .from('profiles')
        .delete()
        .eq('id', user.id)
        .then(({ error: err }) => {
          if (err) {
            setError('Delete failed: ' + err.message)
            return
          }
          setUsers(prev => prev.filter(u => u.id !== user.id))
        })
    }
  }

  return (
    <div className='users_page'>
      <div className='users_header'>
        <div>
          <p className='eyebrow'>User Insights</p>
          <h1>User Directory</h1>
          <p className='subtitle'>Track members, roles, and account health with a crisp neon-styled table.</p>
        </div>
        <div className='header_actions'>
          <button className='ghost_btn' onClick={handleExportCSV}>Export CSV</button>
          <button className='primary_btn' onClick={openAddModal}>Add User</button>
        </div>
      </div>

      {error && <div className='error_banner'>{error}</div>}
      {loading && <div className='loading_banner'>Loading users...</div>}

      <div className='users_panel'>
        <div className='panel_top'>
          <div className='search_box'>
            <span className='pill'>Search</span>
            <input
              type='text'
              placeholder='Name, email, role...'
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

        </div>

        <div className='table_wrap'>
          <table className='users_table'>
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>
                    <div className='user_cell'>
                      <div className='avatar'>{(user.full_name || '?').charAt(0)}</div>
                      <div>
                        <p className='user_name'>{user.full_name}</p>
                        <p className='user_email'>{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td><span className='role_tag'>{user.role}</span></td>
                  <td>{user.created_at ? new Date(user.created_at).toLocaleDateString() : '-'}</td>
                  <td>
                    <div className='action_btns'>
                      <button className='ghost_btn small' onClick={() => openViewModal(user)}>View</button>
                      <button className='primary_btn small' onClick={() => openEditModal(user)}>Edit</button>
                      <button className='danger_btn small' onClick={() => handleQuickDelete(user)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredUsers.length === 0 && (
            <div className='empty_state'>
              <p>No users match your filters yet.</p>
              <span>Try a different keyword.</span>
            </div>
          )}
        </div>
      </div>

      {modalOpen && (
        <div className='modal_overlay' onClick={() => setModalOpen(false)}>
          <div className='modal_content' onClick={e => e.stopPropagation()}>
            <div className='modal_header'>
              <h2>
                {modalMode === 'view' ? 'View User' : modalMode === 'add' ? 'Add New User' : 'Edit User'}
              </h2>
              <button className='close_btn' onClick={() => setModalOpen(false)}>✕</button>
            </div>

            <div className='modal_body'>
              {modalMode === 'view' ? (
                <div className='view_details'>
                  <div className='detail_item'>
                    <label>Full name</label>
                    <p>{formData.full_name}</p>
                  </div>
                  <div className='detail_item'>
                    <label>Email</label>
                    <p>{formData.email}</p>
                  </div>
                  <div className='detail_item'>
                    <label>Role</label>
                    <p>{formData.role}</p>
                  </div>
                  <div className='detail_item'>
                    <label>Created</label>
                    <p>{formData.created_at ? new Date(formData.created_at).toLocaleString() : '-'}</p>
                  </div>
                </div>
              ) : (
                <form className='form_fields'>
                  <div className='form_group'>
                    <label>Full name *</label>
                    <input
                      type='text'
                      name='full_name'
                      value={formData.full_name}
                      onChange={handleFormChange}
                      placeholder='Full name'
                    />
                  </div>
                  <div className='form_group'>
                    <label>Email *</label>
                    <input
                      type='email'
                      name='email'
                      value={formData.email}
                      onChange={handleFormChange}
                      placeholder='user@example.com'
                    />
                  </div>
                  <div className='form_group'>
                    <label>Role</label>
                    <select name='role' value={formData.role} onChange={handleFormChange}>
                      <option>Admin</option>
                      <option>Editor</option>
                      <option>Viewer</option>
                    </select>
                  </div>
                </form>
              )}
            </div>

            <div className='modal_footer'>
              {modalMode === 'view' && selectedUser && (
                <>
                  <button className='primary_btn' onClick={() => openEditModal(selectedUser)}>
                    Edit User
                  </button>
                  <button className='danger_btn' onClick={handleDelete}>Delete</button>
                </>
              )}
              {modalMode === 'add' && (
                <button className='primary_btn' onClick={handleSave}>Create User</button>
              )}
              {modalMode === 'edit' && (
                <>
                  <button className='ghost_btn' onClick={() => setModalOpen(false)}>Cancel</button>
                  <button className='primary_btn' onClick={handleSave}>Save Changes</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
