import React, { useCallback, useEffect, useState } from 'react'
import './AdminProducts.css'
import ProductForm from '../Component/ProductForm/ProductForm'
import ProductCard from '../Component/ProductCard/ProductCard'
import { supabase } from '../../lib/supabaseClient'

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [showForm, setShowForm] = useState(false)

  const normalizeArray = useCallback((val) => {
    if (Array.isArray(val)) return val
    if (typeof val === 'string') return val.split(',').map(v => v.trim()).filter(Boolean)
    return []
  }, [])

  const mapRowToProduct = useCallback((row) => ({
    id: row.id,
    title: row.title || '',
    description: row.desc || '',
    image: row.img || '',
    languages: normalizeArray(row.language),
    frameworks: normalizeArray(row.framework),
    plugins: normalizeArray(row.plugin),
    viewerUrl: row.viewerUrl || '',
  }), [normalizeArray])

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    setError('')
    const { data, error: err } = await supabase
      .from('Project')
      .select('*')
      .order('created_at', { ascending: false })

    if (err) {
      setError('Failed to fetch projects: ' + err.message)
    } else if (data) {
      setProducts(data.map(mapRowToProduct))
    }
    setLoading(false)
  }, [mapRowToProduct])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const handleAddProduct = async (newProduct) => {
    setError('')
    setLoading(true)
    try {
      const { data, error: err } = await supabase
        .from('Project')
        .insert([
          {
            title: newProduct.title,
            desc: newProduct.description,
            img: newProduct.image,
            viewerUrl: newProduct.viewerUrl || '',
            // JSONB columns - send as arrays
            language: newProduct.languages,
            framework: newProduct.frameworks,
            plugin: newProduct.plugins,
          },
        ])
        .select()
        .single()

      if (err) {
        setError('Save failed: ' + err.message)
        setLoading(false)
        return
      }

      if (data) {
        setProducts(prev => [mapRowToProduct(data), ...prev])
        setShowForm(false)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProduct = async (id) => {
    setError('')
    setLoading(true)
    try {
      const { error: err } = await supabase.from('Project').delete().eq('id', id)
      if (err) {
        setError('Delete failed: ' + err.message)
        return
      }
      setProducts(prev => prev.filter(p => p.id !== id))
    } finally {
      setLoading(false)
    }
  }

  const handleEditProduct = async (updatedProduct) => {
    setError('')
    setLoading(true)
    try {
      const { data, error: err } = await supabase
        .from('Project')
        .update({
          title: updatedProduct.title,
          desc: updatedProduct.description,
          img: updatedProduct.image,
          viewerUrl: updatedProduct.viewerUrl || '',
          // JSONB columns - send as arrays
          language: updatedProduct.languages,
          framework: updatedProduct.frameworks,
          plugin: updatedProduct.plugins,
        })
        .eq('id', updatedProduct.id)
        .select()
        .single()

      if (err) {
        setError('Update failed: ' + err.message)
        return
      }

      if (data) {
        const mapped = mapRowToProduct(data)
        setProducts(prev => prev.map(p => (p.id === mapped.id ? mapped : p)))
        setShowForm(false)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='products_container'>
      <div className='products_header'>
        <div className='products_header_content'>
          <h1>Manage Products</h1>
          <p>Add, edit, and manage your portfolio projects here</p>
        </div>
        <button 
          className='add_product_btn'
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '✕ Close' : '+ Add Project'}
        </button>
      </div>

      {showForm && (
        <div className='form_section'>
          <ProductForm onAddProduct={handleAddProduct} />
        </div>
      )}

      {error && <div className='error_banner'>{error}</div>}
      {loading && (
        <div className='loading_overlay'>
          <div className='loading_spinner'>
            <div className='spinner'></div>
            <p>Processing...</p>
          </div>
        </div>
      )}

      <div className='products_grid'>
        {loading ? (
          <div className='empty_state'>
            <p className='empty_icon'>⏳</p>
            <p className='empty_text'>Loading projects...</p>
          </div>
        ) : products.length > 0 ? (
          products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onDelete={handleDeleteProduct}
              onEdit={handleEditProduct}
            />
          ))
        ) : (
          <div className='empty_state'>
            <p className='empty_icon'>📭</p>
            <p className='empty_text'>No projects yet. Add your first project!</p>
          </div>
        )}
      </div>
    </div>
  )
}