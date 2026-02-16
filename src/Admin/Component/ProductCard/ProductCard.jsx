import React, { useState } from 'react'
import './ProductCard.css'

export default function ProductCard({ product, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState(product)

  const handleChange = (field, value) => {
    setEditData({ ...editData, [field]: value })
  }

  const handleImageUpload = e => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = evt => {
      const dataUrl = evt.target?.result?.toString()
      if (dataUrl) setEditData(prev => ({ ...prev, image: dataUrl }))
    }
    reader.readAsDataURL(file)
  }

  const handleSaveEdit = () => {
    onEdit(editData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData(product)
    setIsEditing(false)
  }

  const removeTag = (tagType, index) => {
    setEditData({
      ...editData,
      [tagType]: editData[tagType].filter((_, i) => i !== index),
    })
  }

  return (
    <div className='product_card'>
      <div className='card_top'>
        <div className='card_icon_section'>
          <div className='product_image'>
            <img src={product.image} alt={product.title} />
          </div>
        </div>
        <div className='card_actions'>
          {!isEditing && (
            <>
              <button
                className='action_btn edit_btn'
                onClick={() => setIsEditing(true)}
                title='Edit'
              >
                ✏️
              </button>
              <button
                className='action_btn delete_btn'
                onClick={() => onDelete(product.id)}
                title='Delete'
              >
                🗑️
              </button>
            </>
          )}
        </div>
      </div>

      {isEditing ? (
        <div className='edit_mode'>
          <input
            type='text'
            value={editData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className='edit_input title_input'
          />
          <textarea
            value={editData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            className='edit_input description_input'
          />

          <div className='edit_group'>
            <label>Project Image (URL or upload)</label>
            <input
              type='url'
              value={editData.image}
              onChange={(e) => handleChange('image', e.target.value)}
              className='edit_input'
              placeholder='https://...'
            />
            <input type='file' accept='image/*' onChange={handleImageUpload} className='file_input' />
            {editData.image && (
              <div className='image_preview'>
                <img src={editData.image} alt='preview' />
              </div>
            )}
          </div>

          <div className='edit_tags_section'>
            <div className='edit_tag_group'>
              <label>Languages</label>
              <div className='tags_edit'>
                {editData.languages.map((lang, idx) => (
                  <span key={idx} className='tag_edit'>
                    {lang}
                    <button
                      type='button'
                      onClick={() => removeTag('languages', idx)}
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className='edit_tag_group'>
              <label>Frameworks</label>
              <div className='tags_edit'>
                {editData.frameworks.map((fw, idx) => (
                  <span key={idx} className='tag_edit'>
                    {fw}
                    <button
                      type='button'
                      onClick={() => removeTag('frameworks', idx)}
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className='edit_tag_group'>
              <label>Plugins</label>
              <div className='tags_edit'>
                {editData.plugins.map((plugin, idx) => (
                  <span key={idx} className='tag_edit'>
                    {plugin}
                    <button
                      type='button'
                      onClick={() => removeTag('plugins', idx)}
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className='edit_actions'>
            <button className='save_btn' onClick={handleSaveEdit}>
              ✓ Save
            </button>
            <button className='cancel_btn' onClick={handleCancel}>
              ✕ Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className='card_content'>
            <h3 className='product_title'>{product.title}</h3>
            <p className='product_description'>{product.description}</p>
          </div>

          <div className='card_tags'>
            <div className='tag_section'>
              <span className='tag_label'>🔤 Languages:</span>
              <div className='tags_list'>
                {product.languages.map((lang, idx) => (
                  <span key={idx} className='product_tag language_tag'>
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            <div className='tag_section'>
              <span className='tag_label'>⚙️ Frameworks:</span>
              <div className='tags_list'>
                {product.frameworks.map((fw, idx) => (
                  <span key={idx} className='product_tag framework_tag'>
                    {fw}
                  </span>
                ))}
              </div>
            </div>

            <div className='tag_section'>
              <span className='tag_label'>🔌 Plugins:</span>
              <div className='tags_list'>
                {product.plugins.map((plugin, idx) => (
                  <span key={idx} className='product_tag plugin_tag'>
                    {plugin}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

    </div>
  )
}
