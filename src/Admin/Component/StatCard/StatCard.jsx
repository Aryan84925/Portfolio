import React from 'react'
import './StatCard.css'

export default function StatCard({ label, value, icon, change }) {
  return (
    <div className='stat_card'>
      <div className='stat_card_top'>
        <div className='stat_icon'>{icon}</div>
        <span className='stat_change'>{change}</span>
      </div>
      <div className='stat_card_content'>
        <p className='stat_card_label'>{label}</p>
        <h3 className='stat_card_value'>{value}</h3>
      </div>
    </div>
  )
}
