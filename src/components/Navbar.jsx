import React from 'react'

export default function Navbar({ onOpen }) {
  return (
    <header className="navbar">
      <div className="nav-inner">
        <div className="nav-left">
          <img src="/src/assets/contactlistlogo.png" className="nav-logo" alt="Logo" />
        </div>
        {/* <h1 className="brand">Contact List</h1> */}
        <div className="nav-right" />
      </div>
    </header>
  )
}
