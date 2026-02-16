import React from 'react'
import './ConfirmModal.css'

export default function ConfirmModal({
  open,
  title = 'Confirm',
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  danger = false,
}) {
  if (!open) return null

  return (
    <div className='confirm_modal_overlay' role='dialog' aria-modal='true'>
      <div className='confirm_modal'>
        <div className='confirm_modal_header'>
          <h3>{title}</h3>
          <button className='confirm_modal_close' onClick={onCancel} aria-label='Close'>
            ✕
          </button>
        </div>
        <div className='confirm_modal_body'>
          <p>{message}</p>
        </div>
        <div className='confirm_modal_actions'>
          <button className='confirm_btn cancel' onClick={onCancel}>
            {cancelLabel}
          </button>
          <button className={`confirm_btn ${danger ? 'danger' : 'primary'}`} onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
