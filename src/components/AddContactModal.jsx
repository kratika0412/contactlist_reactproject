import React, { useState, useEffect } from 'react'

export default function AddContactModal({ onAdd, onClose, contact, onUpdate }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    relation: '',
    photo: '',
    favorite: false,
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (contact) {
      setForm({
        name: contact.name || '',
        phone: contact.phone || '',
        email: contact.email || '',
        address: contact.address || '',
        relation: contact.relation || '',
        photo: contact.photo || '',
        favorite: !!contact.favorite,
      })
    }
  }, [contact])

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    if (type === 'checkbox') {
      setForm((p) => ({ ...p, [name]: checked }))
    } else {
      setForm((p) => ({ ...p, [name]: value }))
    }
  }

  // validate whenever form changes
  useEffect(() => {
    validateForm()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form])

  function validateForm() {
    const e = {}
    // name required
    if (!form.name || !form.name.trim()) {
      e.name = 'Name is required.'
    }

    // email optional but if present must look valid
    if (form.email && form.email.trim()) {
      const email = form.email.trim()
      const emailRe = /^\S+@\S+\.\S+$/
      if (!emailRe.test(email)) e.email = 'Please enter a valid email address.'
    }

    // phone optional but if present must have 7-15 digits
    if (form.phone && form.phone.trim()) {
      const digits = (form.phone || '').replace(/\D/g, '')
      if (digits.length < 7 || digits.length > 15) {
        e.phone = 'Please enter a valid phone number (7–15 digits).'
      }
    }

    setErrors(e)
    return e
  }

  function handleFile(e) {
    const file = e.target.files && e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setForm((p) => ({ ...p, photo: reader.result }))
    }
    reader.readAsDataURL(file)
  }

  function submit(e) {
    e.preventDefault()
    const eState = validateForm()
    if (Object.keys(eState).length) return
    if (contact && onUpdate) {
      onUpdate(contact.id, { ...form })
    } else if (onAdd) {
      onAdd({ ...form, id: Date.now() })
    }
    onClose()
  }

  const title = contact ? 'Edit Contact' : 'Add Contact'

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal">
        <h2>{title}</h2>
        <form onSubmit={submit} className="form">
          <label>
            Name
            <input name="name" value={form.name} onChange={handleChange} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'err-name' : undefined} />
            {errors.name && <div id="err-name" className="field-error">{errors.name}</div>}
          </label>
          <label>
            Phone
            <input name="phone" value={form.phone} onChange={handleChange} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'err-phone' : undefined} />
            {errors.phone && <div id="err-phone" className="field-error">{errors.phone}</div>}
          </label>
          <label>
            Email
            <input name="email" value={form.email} onChange={handleChange} type="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'err-email' : undefined} />
            {errors.email && <div id="err-email" className="field-error">{errors.email}</div>}
          </label>
          <label>
            Address
            <input name="address" value={form.address} onChange={handleChange} />
          </label>
          <label>
            Relation
            <input name="relation" value={form.relation} onChange={handleChange} />
          </label>

          <label>
            Photo
            <input type="file" accept="image/*" onChange={handleFile} />
          </label>

          {form.photo && (
            <div style={{ display: 'flex', justifyContent: 'center', margin: '0.25rem 0' }}>
              <img src={form.photo} alt="preview" style={{ width: 80, height: 80, borderRadius: 12, objectFit: 'cover', boxShadow: '0 6px 18px rgba(0,0,0,0.12)'}} />
            </div>
          )}

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="checkbox" name="favorite" checked={form.favorite} onChange={handleChange} />
            Mark as favorite
          </label>

          <div className="form-actions">
            <button type="submit" className="btn primary">
              {contact ? 'Save' : 'Add'}
            </button>
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
