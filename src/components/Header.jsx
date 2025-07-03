// src/components/Header.jsx
import React from 'react';

function Header() {
  return (
    <header style={{ 
        backgroundColor: '#4CAF50', // Warna hijau
        color: 'white', 
        padding: '25px 0', 
        textAlign: 'center', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)' 
    }}>
      <h1 style={{ margin: 0, fontSize: '2.5em', letterSpacing: '1px' }}>FlashLearn</h1>
      <p style={{ margin: '5px 0 0', fontSize: '1.1em' }}>Platform Pembelajaran Interaktif dengan Flashcard</p>
    </header>
  );
}

export default Header;