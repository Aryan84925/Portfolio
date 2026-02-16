import React, { useState } from 'react'
import './ProductForm.css'

export default function ProductForm({ onAddProduct }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    viewerUrl: '',
    languages: [],
    frameworks: [],
    plugins: [],
  })

  const [languageInput, setLanguageInput] = useState('')
  const [frameworkInput, setFrameworkInput] = useState('')
  const [pluginInput, setPluginInput] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleAddTag = (tagType, value) => {
    if (value.trim() && !formData[tagType].includes(value)) {
      setFormData({
        ...formData,
        [tagType]: [...formData[tagType], value],
      })
      if (tagType === 'languages') setLanguageInput('')
      if (tagType === 'frameworks') setFrameworkInput('')
      if (tagType === 'plugins') setPluginInput('')
    }
  }

  const handleRemoveTag = (tagType, index) => {
    setFormData({
      ...formData,
      [tagType]: formData[tagType].filter((_, i) => i !== index),
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.title && formData.description) {
      onAddProduct(formData)
      setFormData({
        title: '',
        description: '',
        image: '',
        viewerUrl: '',
        languages: [],
        frameworks: [],
        plugins: [],
      })
    }
  }

  /* const [img, setImg] = useState()
  const [title, setTitle] = useState()
  const [desc, setDesc] = useState()
  const [language, setLanguage] = useState({})
  const [framework, setFramework] = useState({})
  const [plugin, setPlugin] = useState({})
  const handleAddProduct = async (e) => {
    e.preventDefault()
    try {
      const { data, error } = await supabase
        .from('Project')
        .insert([{
          img,
          title,
          desc,
          language,
          framework,
          plugin,
          user_id: (await supabase.auth.getUser()).data.user.id,
        }])

      if (error) {
        alert('Error adding the project' + error.message)
      } else {
        alert('Project added successfully!')
        setImg('')
        setTitle('')
        setDesc('')
        setLanguage({})
        setFramework({})
        setPlugin({})
      }
    } catch (error) {
      console.error('Error adding project:', error)
      alert('An unexpected error occurred.')
    }
  } */
  return (
    <form className='product_form' onSubmit={handleSubmit}>
      <div className='form_section_title'>
        <h2>Add New Project</h2>
      </div>

      <div className='form_grid'>
        <div className='form_group'>
          <label htmlFor='title'>Project Title *</label>
          <input
            type='text'
            id='title'
            name='title'
            value={formData.title}
            onChange={handleChange}
            placeholder='Enter project title'
            required
          />
        </div>

        <div className='form_group'>
          <label htmlFor='image'>Project Image URL</label>
          <input
            type='url'
            id='image'
            name='image'
            value={formData.image}
            onChange={handleChange}
            placeholder='https://...'
          />
          <div className='upload_hint'>or upload an image</div>
          <input
            type='file'
            accept='image/*'
            className='file_input'
            onChange={async e => {
              const file = e.target.files?.[0]
              if (!file) return
              const reader = new FileReader()
              reader.onload = evt => {
                const dataUrl = evt.target?.result?.toString()
                if (dataUrl) setFormData(prev => ({ ...prev, image: dataUrl }))
              }
              reader.readAsDataURL(file)
            }}
          />
          {formData.image && (
            <div className='image_preview'>
              <img src={formData.image} alt='preview' />
            </div>
          )}
        </div>

        <div className='form_group'>
          <label htmlFor='viewerUrl'>Project Demo URL</label>
          <input
            type='url'
            id='viewerUrl'
            name='viewerUrl'
            value={formData.viewerUrl}
            onChange={handleChange}
            placeholder='https://project-demo.com'
          />
        </div>

        <div className='form_group full_width'>
          <label htmlFor='description'>Project Description *</label>
          <textarea
            id='description'
            name='description'
            value={formData.description}
            onChange={handleChange}
            placeholder='Describe your project...'
            rows='4'
            required
          />
        </div>


        <div className='tags_form_group'>
          <div className='form_group'>
            <label>Programming Languages</label>
            <div className='tag_input'>
              <input
                type='text'
                value={languageInput}
                onChange={(e) => setLanguageInput(e.target.value)}
                placeholder='Type and press button'
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleAddTag('languages', languageInput)
                  }
                }}
              />
              <button
                type='button'
                onClick={() => handleAddTag('languages', languageInput)}
              >
                Add
              </button>
            </div>
            <div className='tags'>
              {formData.languages.map((lang, idx) => (
                <span key={idx} className='tag'>
                  {lang}
                  <button
                    type='button'
                    onClick={() => handleRemoveTag('languages', idx)}
                    className='tag_remove'
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className='form_group'>
            <label>Frameworks</label>
            <div className='tag_input'>
              <input
                type='text'
                value={frameworkInput}
                onChange={(e) => setFrameworkInput(e.target.value)}
                placeholder='Type and press button'
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleAddTag('frameworks', frameworkInput)
                  }
                }}
              />
              <button
                type='button'
                onClick={() => handleAddTag('frameworks', frameworkInput)}
              >
                Add
              </button>
            </div>
            <div className='tags'>
              {formData.frameworks.map((fw, idx) => (
                <span key={idx} className='tag'>
                  {fw}
                  <button
                    type='button'
                    onClick={() => handleRemoveTag('frameworks', idx)}
                    className='tag_remove'
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className='form_group'>
            <label>Plugins & Libraries</label>
            <div className='tag_input'>
              <input
                type='text'
                value={pluginInput}
                onChange={(e) => setPluginInput(e.target.value)}
                placeholder='Type and press button'
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleAddTag('plugins', pluginInput)
                  }
                }}
              />
              <button
                type='button'
                onClick={() => handleAddTag('plugins', pluginInput)}
              >
                Add
              </button>
            </div>
            <div className='tags'>
              {formData.plugins.map((plugin, idx) => (
                <span key={idx} className='tag'>
                  {plugin}
                  <button
                    type='button'
                    onClick={() => handleRemoveTag('plugins', idx)}
                    className='tag_remove'
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
      <div className='form_actions'>
        <button type='submit' className='submit_btn'>
          ✓ Add Project
        </button>
      </div>
    </form>
  )
}
