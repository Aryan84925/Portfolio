import React, { useMemo, useState } from 'react'
import './AdminSetting.css'

export default function AdminSetting() {
  const [profile, setProfile] = useState({
    name: 'Ava Thompson',
    email: 'ava.thompson@example.com',
    role: 'Admin',
    timezone: 'UTC',
  })

  const [toggles, setToggles] = useState({
    darkMode: true,
    emailAlerts: true,
    pushAlerts: false,
    weeklyReport: true,
    twoFactor: false,
  })

  const recentDevices = useMemo(
    () => [
      { id: 1, device: 'Chrome on Windows', location: 'Tehran, IR', time: 'Just now', active: true },
      { id: 2, device: 'Safari on iOS', location: 'Berlin, DE', time: '2h ago', active: false },
      { id: 3, device: 'Edge on MacOS', location: 'London, UK', time: '1d ago', active: false },
    ],
    [],
  )

  const handleToggle = key => setToggles(prev => ({ ...prev, [key]: !prev[key] }))

  const handleProfileChange = e => {
    const { name, value } = e.target
    setProfile(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className='settings_page'>
      <div className='settings_header'>
        <div>
          <p className='eyebrow'>Control Center</p>
          <h1>Admin Settings</h1>
          <p className='subtitle'>Manage profile, security, and notifications with the neon admin look.</p>
        </div>
        <div className='header_actions'>
          <button className='ghost_btn'>Reset</button>
          <button className='primary_btn'>Save Changes</button>
        </div>
      </div>

      <div className='settings_grid'>
        <section className='setting_card'>
          <div className='card_header'>
            <h3>Profile</h3>
            <span>Identity & contact</span>
          </div>
          <div className='form_grid'>
            <label className='form_group'>
              <span>Name</span>
              <input name='name' value={profile.name} onChange={handleProfileChange} />
            </label>
            <label className='form_group'>
              <span>Email</span>
              <input name='email' value={profile.email} onChange={handleProfileChange} />
            </label>
            <label className='form_group'>
              <span>Role</span>
              <input name='role' value={profile.role} onChange={handleProfileChange} />
            </label>
            <label className='form_group'>
              <span>Timezone</span>
              <select name='timezone' value={profile.timezone} onChange={handleProfileChange}>
                <option value='UTC'>UTC</option>
                <option value='GMT+3:30'>GMT+3:30 Tehran</option>
                <option value='GMT+1'>GMT+1 Berlin</option>
                <option value='GMT+4'>GMT+4 Dubai</option>
              </select>
            </label>
          </div>
        </section>

        <section className='setting_card'>
          <div className='card_header'>
            <h3>Theme & Display</h3>
            <span>Personalize the dashboard</span>
          </div>
          <div className='toggle_list'>
            <ToggleRow
              label='Dark Mode'
              desc='Neon-friendly dark UI'
              checked={toggles.darkMode}
              onChange={() => handleToggle('darkMode')}
            />
            <ToggleRow
              label='Compact Cards'
              desc='Tighter padding for tables'
              checked={false}
              onChange={() => {}}
              disabled
            />
          </div>
        </section>

        <section className='setting_card'>
          <div className='card_header'>
            <h3>Notifications</h3>
            <span>Stay up to date</span>
          </div>
          <div className='toggle_list'>
            <ToggleRow
              label='Email Alerts'
              desc='Send security and activity updates'
              checked={toggles.emailAlerts}
              onChange={() => handleToggle('emailAlerts')}
            />
            <ToggleRow
              label='Push Alerts'
              desc='Show push notifications on this device'
              checked={toggles.pushAlerts}
              onChange={() => handleToggle('pushAlerts')}
            />
            <ToggleRow
              label='Weekly Report'
              desc='Analytics snapshot every Monday'
              checked={toggles.weeklyReport}
              onChange={() => handleToggle('weeklyReport')}
            />
          </div>
        </section>

        <section className='setting_card'>
          <div className='card_header'>
            <h3>Security</h3>
            <span>Protect your account</span>
          </div>
          <div className='toggle_list'>
            <ToggleRow
              label='Two-Factor Auth'
              desc='OTP via authenticator app'
              checked={toggles.twoFactor}
              onChange={() => handleToggle('twoFactor')}
            />
          </div>
          <div className='security_actions'>
            <button className='ghost_btn'>Change Password</button>
            <button className='danger_btn'>Logout All Sessions</button>
          </div>
        </section>

        <section className='setting_card full'>
          <div className='card_header'>
            <h3>Active Sessions</h3>
            <span>Recent devices</span>
          </div>
          <div className='sessions_list'>
            {recentDevices.map(device => (
              <div key={device.id} className={`session_row ${device.active ? 'active' : ''}`}>
                <div>
                  <p className='session_title'>{device.device}</p>
                  <p className='session_meta'>{device.location} • {device.time}</p>
                </div>
                {device.active ? <span className='badge_live'>Current</span> : <button className='ghost_btn small'>Revoke</button>}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

function ToggleRow({ label, desc, checked, onChange, disabled = false }) {
  return (
    <label className={`toggle_row ${disabled ? 'disabled' : ''}`}>
      <div>
        <p className='toggle_label'>{label}</p>
        <p className='toggle_desc'>{desc}</p>
      </div>
      <div className={`switch ${checked ? 'on' : 'off'}`}>
        <input type='checkbox' checked={checked} onChange={onChange} disabled={disabled} />
        <span className='thumb' />
      </div>
    </label>
  )
}
