import React, { useMemo, useState } from 'react'
import './AdminOrders.css'

const MOCK_ORDERS = [
  { id: 'ORD-1024', customer: 'Ava Thompson', email: 'ava.thompson@example.com', total: '$320.00', status: 'Paid', date: '2024-12-18', method: 'Visa **** 4242' },
  { id: 'ORD-1025', customer: 'Liam Carter', email: 'liam.carter@example.com', total: '$148.00', status: 'Pending', date: '2024-12-18', method: 'PayPal' },
  { id: 'ORD-1026', customer: 'Sophia Reed', email: 'sophia.reed@example.com', total: '$890.00', status: 'Shipped', date: '2024-12-17', method: 'Mastercard **** 5588' },
  { id: 'ORD-1027', customer: 'Noah Brooks', email: 'noah.brooks@example.com', total: '$74.00', status: 'Refunded', date: '2024-12-16', method: 'Visa **** 9921' },
  { id: 'ORD-1028', customer: 'Isabella Diaz', email: 'isabella.diaz@example.com', total: '$215.00', status: 'Paid', date: '2024-12-16', method: 'Apple Pay' },
  { id: 'ORD-1029', customer: 'James Cooper', email: 'james.cooper@example.com', total: '$129.00', status: 'Pending', date: '2024-12-15', method: 'PayPal' },
]

export default function AdminOrders() {
  const [orders, setOrders] = useState(MOCK_ORDERS)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const filteredOrders = useMemo(() => {
    const query = search.toLowerCase().trim()
    return orders.filter(order => {
      const matchesSearch =
        order.id.toLowerCase().includes(query) ||
        order.customer.toLowerCase().includes(query) ||
        order.email.toLowerCase().includes(query)

      const matchesStatus = statusFilter === 'All' || order.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [orders, search, statusFilter])

  const statusTags = ['All', 'Paid', 'Pending', 'Shipped', 'Refunded']

  const updateStatus = (id, nextStatus) => {
    setOrders(prev => prev.map(o => (o.id === id ? { ...o, status: nextStatus } : o)))
  }

  const handleRefund = id => {
    if (window.confirm('Confirm refund for this order?')) {
      updateStatus(id, 'Refunded')
    }
  }

  const handleMarkShipped = id => {
    updateStatus(id, 'Shipped')
  }

  return (
    <div className='orders_page'>
      <div className='orders_header'>
        <div>
          <p className='eyebrow'>Orders</p>
          <h1>Order Management</h1>
          <p className='subtitle'>Review payments, shipping status, and refunds with the neon admin style.</p>
        </div>
        <div className='header_actions'>
          <button className='ghost_btn'>Export</button>
          <button className='primary_btn'>Create Manual Order</button>
        </div>
      </div>

      <div className='orders_panel'>
        <div className='panel_top'>
          <div className='search_box'>
            <span className='pill'>Search</span>
            <input
              type='text'
              placeholder='Order ID, name, email...'
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div className='status_filters'>
            {statusTags.map(tag => (
              <button
                key={tag}
                className={`filter_chip ${statusFilter === tag ? 'active' : ''}`}
                onClick={() => setStatusFilter(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className='table_wrap'>
          <table className='orders_table'>
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
                <th>Method</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => (
                <tr key={order.id}>
                  <td className='mono'>{order.id}</td>
                  <td>
                    <div className='customer_cell'>
                      <div className='avatar'>{order.customer.charAt(0)}</div>
                      <div>
                        <p className='customer_name'>{order.customer}</p>
                        <p className='customer_email'>{order.email}</p>
                      </div>
                    </div>
                  </td>
                  <td>{order.total}</td>
                  <td>
                    <span className={`status_badge status_${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>{order.date}</td>
                  <td>{order.method}</td>
                  <td>
                    <div className='action_btns'>
                      <button className='ghost_btn small' onClick={() => handleMarkShipped(order.id)}>Ship</button>
                      <button className='primary_btn small'>View</button>
                      <button className='danger_btn small' onClick={() => handleRefund(order.id)}>Refund</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredOrders.length === 0 && (
            <div className='empty_state'>
              <p>No orders found.</p>
              <span>Try a different keyword or reset the status.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
