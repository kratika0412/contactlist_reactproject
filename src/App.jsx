import React, { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import SearchBar from './components/SearchBar'
import ContactsGrid from './components/ContactsGrid'
import AddContactModal from './components/AddContactModal'
import Footer from './components/Footer'
import fetchContacts from './api/mockApi'

/* SAMPLE_CONTACTS kept for reference but we now fetch from a mock API when there are no saved contacts */
const SAMPLE_CONTACTS = []

function App() {
  const [contacts, setContacts] = useState(() => {
    try {
      const saved = localStorage.getItem('contacts_v1')
      return saved ? JSON.parse(saved) : SAMPLE_CONTACTS
    } catch (e) {
      return SAMPLE_CONTACTS
    }
  })

  const [loading, setLoading] = useState(false)
  const [cardsVisible, setCardsVisible] = useState(true)
  const [notification, setNotification] = useState(null)

  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingContact, setEditingContact] = useState(null)
  const [showFavorites, setShowFavorites] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem('contacts_v1', JSON.stringify(contacts))
    } catch (e) {
      // ignore localStorage errors
    }
  }, [contacts])

  // On first load, if there are no saved contacts, mimic fetching from an API
  useEffect(() => {
    // Development mode: always fetch fresh mock data on load so the UI shows many cards.
    setLoading(true)
    fetchContacts(30, 800)
      .then((data) => {
        setContacts(data)
        try {
          localStorage.setItem('contacts_v1', JSON.stringify(data))
        } catch (e) {
          // ignore
        }
      })
      .finally(() => setLoading(false))
  }, [])

  function handleAddContact(contact) {
    setContacts((prev) => [contact, ...prev])
    // show a browser alert and a brief in-app notification
    try {
      // use the contact name if available
      const name = contact && contact.name ? contact.name : 'New contact'
      // browser alert (blocking) to notify immediately
      window.alert(`Added new contact: ${name}`)
    } catch (e) {
      // ignore if alerts are unavailable
    }
    setNotification('Added new contact')
    setTimeout(() => setNotification(null), 2500)
  }

  function handleToggleFavorite(id) {
    setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, favorite: !c.favorite } : c)))
  }

  function handleDeleteContact(id) {
    setContacts((prev) => prev.filter((c) => c.id !== id))
  }

  function handleEditContact(contact) {
    setEditingContact(contact)
    setShowModal(true)
  }

  function handleUpdateContact(id, updated) {
    setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, ...updated } : c)))
  }

  const filtered = contacts.filter((c) =>
    c.name.toLowerCase().includes(search.trim().toLowerCase()),
  )

  // sort alphabetically by name (case-insensitive)
  const sortedFiltered = [...filtered].sort((a, b) =>
    String(a.name || '').localeCompare(String(b.name || ''), undefined, { sensitivity: 'base' }),
  )

  return (
    <div className="app-root">
  <Navbar onOpen={() => { setEditingContact(null); setShowModal(true); }} />

      <main>
        <div className="container">
          <div className="content">
            <div className="hero">
              <div className="hero-overlay" />
              <div className="hero-inner">
                <h2 className="page-title">Contact List</h2>
                <p className="page-sub">Easily manage your contacts — add phone, email, address, photo and mark favorites.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="control-bar">
          <div className="control-inner">
            <div className="left">
              <SearchBar value={search} onChange={setSearch} className="wide" />
            </div>

            <div className="right controls">
              <button
                className={`btn toggle-btn ${showFavorites ? 'active' : ''}`}
                onClick={() => setShowFavorites((s) => !s)}
                aria-pressed={showFavorites}
                title={showFavorites ? 'Showing favourites' : 'Show favourites only'}
              >
                <span className={`toggle-switch ${showFavorites ? 'on' : ''}`} aria-hidden="true">
                  <span className="knob" />
                </span>
                <span className="toggle-label">Favourites</span>
              </button>

              <button className="btn primary" onClick={() => { setEditingContact(null); setShowModal(true); }}>Add New Contact</button>

              <button className="btn view-btn" onClick={() => setCardsVisible((v) => !v)}>{cardsVisible ? 'Hide Contact List' : 'View Contact List'}</button>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="content">
            {notification && <div className="notification">{notification}</div>}
            {loading ? (
              <div className="loader" role="status" aria-live="polite">
                <div className="spinner" aria-hidden="true" />
                <div style={{ marginLeft: 12 }}>Loading contacts…</div>
              </div>
            ) : cardsVisible ? (
              <ContactsGrid
                contacts={showFavorites ? sortedFiltered.filter((c) => c.favorite) : sortedFiltered}
                onToggleFavorite={handleToggleFavorite}
                onDelete={handleDeleteContact}
                onEdit={handleEditContact}
              />
            ) : (
              <div className="empty">Contact list is hidden.</div>
            )}
          </div>
        </div>

      </main>

      {showModal && (
        <AddContactModal
          contact={editingContact}
          onAdd={(c) => handleAddContact(c)}
          onUpdate={(id, updated) => handleUpdateContact(id, updated)}
          onClose={() => { setShowModal(false); setEditingContact(null); }}
        />
      )}

      <Footer />
    </div>
  )
}

export default App
