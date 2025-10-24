import React from 'react'
import ContactCard from './ContactCard'

export default function ContactsGrid({ contacts, onToggleFavorite, onDelete, onEdit }) {
  return (
    <section className="cards">
      {contacts.length === 0 ? (
        <p className="empty">No contacts found.</p>
      ) : (
        contacts.map((c) => (
          <ContactCard
            key={c.id}
            contact={c}
            onToggleFavorite={onToggleFavorite}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))
      )}
    </section>
  )
}
