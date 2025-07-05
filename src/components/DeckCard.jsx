// src/components/DeckCard.jsx
import React from 'react';

function DeckCard({ deckId, title, cardCount, category, onSelectDeck, onDeleteDeck }) { // Menerima props 'deckId' dan 'onDeleteDeck'
  return (
    <div style={{
        border: '1px solid #ddd',
        borderRadius: '10px',
        padding: '20px',
        width: '250px',
        backgroundColor: 'white',
        boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
        textAlign: 'center',
        display: 'flex', // Menggunakan flexbox untuk penempatan tombol
        flexDirection: 'column',
        justifyContent: 'space-between', // Untuk menempatkan tombol di bagian bawah
        position: 'relative' // Untuk posisi tombol delete absolut
    }}>
      <div style={{ flexGrow: 1 }}> {/* Konten utama kartu */}
        <h3 style={{ color: '#333', marginBottom: '10px' }}>{title}</h3>
        <p style={{ color: '#666', fontSize: '0.9em', marginBottom: '15px' }}>
            Kategori: <span style={{ fontWeight: 'bold', color: '#555' }}>{category}</span>
        </p>
        <p style={{ color: '#555', fontSize: '1.1em', fontWeight: 'bold' }}>
            {cardCount} Kartu
        </p>
      </div>

      <div style={{ marginTop: '20px' }}> {/* Container untuk tombol */}
        <button
            onClick={onSelectDeck}
            style={{
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '1em',
                transition: 'background-color 0.3s ease',
                width: '100%' // Tombol Pelajari Sekarang mengisi lebar
            }}
        >
            Pelajari Sekarang
        </button>
        {/* =============================================================
        Tombol Hapus Deck
        ============================================================= */}
        <button
            onClick={() => onDeleteDeck(deckId)} // Meneruskan ID deck ke handler delete
            style={{
                padding: '8px 15px',
                backgroundColor: '#dc3545', // Warna merah untuk delete
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '0.9em',
                marginTop: '10px', // Jarak dari tombol atas
                width: '100%',
                transition: 'background-color 0.3s ease'
            }}
        >
            Hapus Deck
        </button>
        {/* ============================================================= */}
      </div>
    </div>
  );
}

export default DeckCard;