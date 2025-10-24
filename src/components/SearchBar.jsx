import React from 'react'

export default function SearchBar({ value, onChange, className = '' }) {
  return (
    <div className="toolbar">
      <input
        type="search"
        placeholder="Search by name..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`search ${className}`}
        aria-label="Search contacts by name"
      />
    </div>
  )
}
