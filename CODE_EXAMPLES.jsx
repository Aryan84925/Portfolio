// ═══════════════════════════════════════════════════════════════
// DASHBOARD IMPLEMENTATION - CODE EXAMPLES
// ═══════════════════════════════════════════════════════════════

// 📊 EXAMPLE 1: Using the Dashboard
// ═══════════════════════════════════════════════════════════════

import AdminDashbord from './AdminDashbord/AdminDashbord'

// In your router:
<Route path="/admin/dashboard" element={<AdminDashbord />} />

// The component automatically:
// ✓ Loads 4 sample projects
// ✓ Creates interactive charts
// ✓ Displays stat cards
// ✓ Handles user interactions


// 📊 EXAMPLE 2: Customizing Projects
// ═══════════════════════════════════════════════════════════════

// Original (in AdminDashbord.jsx):
const projects = [
  { 
    id: 1, 
    name: 'E-Commerce Platform', 
    views: 4500, 
    sales: 2400, 
    growth: 35 
  },
]

// YOUR CUSTOMIZATION:
const projects = [
  { 
    id: 1, 
    name: 'My App Name',      // ← Change name
    views: 5000,               // ← Change views count
    sales: 3000,               // ← Change sales
    growth: 45                 // ← Change growth %
  },
  { 
    id: 2, 
    name: 'Another Project',
    views: 2000,
    sales: 1500,
    growth: 20
  },
]


// 📊 EXAMPLE 3: Adding API Integration
// ═══════════════════════════════════════════════════════════════

import { useEffect, useState } from 'react'

export default function AdminDashbord() {
  const [projects, setProjects] = useState([])
  const [stats, setStats] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch projects from your API
    fetch('/api/projects/stats')
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error('Error:', err))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    // Fetch stats from your API
    fetch('/api/dashboard/stats')
      .then(res => res.json())
      .then(data => setStats(data))
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div className='dashboard_container'>
      {/* Rest of component */}
    </div>
  )
}


// 📊 EXAMPLE 4: Chart Types in DashboardCard
// ═══════════════════════════════════════════════════════════════

// User can toggle between 3 chart types:

// 1. LINE CHART - Shows trends over time
<LineChart data={chartData}>
  <Line 
    type="monotone" 
    dataKey="views" 
    stroke="#4AD7FF" 
    strokeWidth={3} 
  />
  <Line 
    type="monotone" 
    dataKey="sales" 
    stroke="#00D4FF" 
    strokeWidth={3} 
  />
</LineChart>

// 2. BAR CHART - Compares values side-by-side
<BarChart data={chartData}>
  <Bar dataKey="views" fill="#4AD7FF" radius={[8, 8, 0, 0]} />
  <Bar dataKey="sales" fill="#00D4FF" radius={[8, 8, 0, 0]} />
</BarChart>

// 3. PIE CHART - Shows distribution
<PieChart>
  <Pie
    data={pieData}
    cx="50%"
    cy="50%"
    outerRadius={80}
    dataKey="value"
  >
    {pieData.map((entry, index) => (
      <Cell key={`cell-${index}`} fill={COLORS[index]} />
    ))}
  </Pie>
</PieChart>


// 📊 EXAMPLE 5: Styling Customization
// ═══════════════════════════════════════════════════════════════

// All styles are in CSS files. To customize:

// Change card colors:
.dashboard_card {
  background: linear-gradient(135deg, #11141B 0%, #0F1419 100%);
  border: 2px solid rgba(74, 215, 255, 0.3);
  /* ↑ Edit these values */
}

// Change hover effects:
.dashboard_card:hover {
  border-color: var(--color-blue);
  box-shadow: 0 0 30px rgba(74, 215, 255, 0.3);
  transform: translateY(-5px);
  /* ↑ Adjust these values */
}

// Change chart colors:
const COLORS = ['#4AD7FF', '#00D4FF', '#00B8E6']
// ↑ Change these hex codes for pie chart colors


// 📊 EXAMPLE 6: Real-time Data Updates
// ═══════════════════════════════════════════════════════════════

// Setup polling for real-time updates:

useEffect(() => {
  const interval = setInterval(() => {
    // Refresh data every 30 seconds
    fetch('/api/projects/stats')
      .then(res => res.json())
      .then(data => setProjects(data))
  }, 30000)

  return () => clearInterval(interval)
}, [])

// Or use WebSocket for live updates:
useEffect(() => {
  const ws = new WebSocket('wss://your-api.com/stats')
  
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data)
    setProjects(data)
  }

  return () => ws.close()
}, [])


// 📊 EXAMPLE 7: Data Format Expected
// ═══════════════════════════════════════════════════════════════

// Your API should return projects like:
{
  "projects": [
    {
      "id": 1,
      "name": "Project Name",
      "views": 4500,
      "sales": 2400,
      "growth": 35
    }
  ]
}

// And stats like:
{
  "stats": [
    {
      "label": "Total Projects",
      "value": "4",
      "icon": "📊",
      "change": "+2"
    }
  ]
}


// 📊 EXAMPLE 8: Error Handling
// ═══════════════════════════════════════════════════════════════

const [error, setError] = useState(null)

useEffect(() => {
  fetch('/api/projects/stats')
    .then(res => {
      if (!res.ok) throw new Error('Failed to fetch')
      return res.json()
    })
    .then(data => setProjects(data))
    .catch(err => {
      setError(err.message)
      console.error(err)
    })
}, [])

// In JSX:
{error && <div className="error-message">{error}</div>}
{loading && <div className="loading">Loading...</div>}
{!error && !loading && <DashboardContent />}


// 📊 EXAMPLE 9: Adding New Stat Types
// ═══════════════════════════════════════════════════════════════

// Add more stats to the stats array:
const stats = [
  { label: 'Total Projects', value: '4', icon: '📊', change: '+2' },
  { label: 'Total Views', value: '14.5K', icon: '👁️', change: '+5.2%' },
  { label: 'Total Sales', value: '$7.8K', icon: '💰', change: '+12%' },
  { label: 'Users Active', value: '2.4K', icon: '👥', change: '+8%' },
  
  // ADD YOUR CUSTOM STATS:
  { label: 'Conversion Rate', value: '3.5%', icon: '📈', change: '+0.5%' },
  { label: 'Avg Rating', value: '4.8⭐', icon: '⭐', change: '+0.2' },
  { label: 'ROI', value: '245%', icon: '💹', change: '+45%' },
]


// 📊 EXAMPLE 10: Styling Individual Cards
// ═══════════════════════════════════════════════════════════════

// Each project card can have unique styling:
// (Add data to project object)

const projects = [
  { 
    id: 1, 
    name: 'Premium Project', 
    views: 4500, 
    sales: 2400, 
    growth: 35,
    badge: '⭐ Premium',     // ← New
    statusColor: '#4AD7FF'   // ← New
  },
]

// Then in DashboardCard.jsx, use these values:
{project.badge && <span className='project_badge'>{project.badge}</span>}


// ═══════════════════════════════════════════════════════════════
// END OF CODE EXAMPLES
// ═══════════════════════════════════════════════════════════════

// For more details, see:
// - QUICK_START.md
// - DASHBOARD_FEATURES.md
// - DASHBOARD_GUIDE_FA.md
