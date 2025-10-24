import React from 'react'

export default function ContactCard({ contact, onToggleFavorite, onDelete, onEdit }) {
  const initials = (contact.name || '')
    .split(' ')
    .map((n) => (n ? n[0] : ''))
    .slice(0, 2)
    .join('')

  return (
    <article className="card contact-card">
      <div className="card-content">
        <div className="card-header">
        <div className="avatar">
          {contact.photo ? <img src={contact.photo} alt={contact.name} /> : initials}
        </div>

        <div className="card-title">
          <h3>{contact.name}</h3>
          <p className="relation">{contact.relation}</p>
        </div>

        <div className="card-actions">
          <button
            className={`favorite-btn ${contact.favorite ? 'fav' : ''}`}
            onClick={() => onToggleFavorite && onToggleFavorite(contact.id)}
            aria-pressed={!!contact.favorite}
            title={contact.favorite ? 'Unmark favorite' : 'Mark favorite'}
          >
            {contact.favorite ? '★' : '☆'}
          </button>
          <button
            className="edit-btn"
            onClick={() => onEdit && onEdit(contact)}
            title="Edit contact"
          >
            ✎
          </button>
          <button
            className="delete-btn"
            onClick={() => onDelete && onDelete(contact.id)}
            title="Delete contact"
          >
            🗑
          </button>
        </div>
        </div>
        <div className="card-body">
        <p>
          <strong>Phone:</strong> {contact.phone || '—'}
        </p>
        <p>
          <strong>Email:</strong> {contact.email || '—'}
        </p>
        {contact.address && (
          <p>
            <strong>Address:</strong> {contact.address}
          </p>
        )}
        </div>
      </div>
    </article>
  )
}
