// src/components/DeckCard.jsx
import React from 'react';

function DeckCard({ title, cardCount, category }) { // Menerima props 'category'
  return (
    <div style={{ 
        border: '1px solid #ddd', 
        borderRadius: '10px', 
        padding: '20px', 
        width: '250px', 
        backgroundColor: 'white', 
        boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
        textAlign: 'center',
        transition: 'transform 0.2s ease-in-out',
        // Tambahkan ':hover' di CSS eksternal jika ingin efek interaktif
    }}>
      <h3 style={{ color: '#333', marginBottom: '10px' }}>{title}</h3>
      <p style={{ color: '#666', fontSize: '0.9em', marginBottom: '15px' }}>
          Kategori: <span style={{ fontWeight: 'bold', color: '#555' }}>{category}</span>
      </p>
      <p style={{ color: '#555', fontSize: '1.1em', fontWeight: 'bold' }}>
          {cardCount} Kartu
      </p>
      <button style={{ 
          marginTop: '15px', 
          padding: '10px 20px', 
          backgroundColor: '#007bff', 
          color: 'white', 
          border: 'none', 
          borderRadius: '5px', 
          cursor: 'pointer',
          fontSize: '1em',
          transition: 'background-color 0.3s ease'
          // :hover bisa ditambahkan via CSS eksternal
      }}>
          Pelajari Sekarang
      </button>
    </div>
  );
}

export default DeckCard;