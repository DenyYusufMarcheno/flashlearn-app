// src/components/Footer.jsx
import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear(); // Dapatkan tahun saat ini
  return (
    <footer style={{ 
        backgroundColor: '#333', 
        color: 'white', 
        textAlign: 'center', 
        padding: '20px 0', 
        marginTop: 'auto', // Agar footer selalu di bawah
        fontSize: '0.9em' 
    }}>
      <p>&copy; {currentYear} FlashLearn. All rights reserved.</p>
      <p>Dibuat untuk Tugas Final Project PIBITI 2025.</p>
    </footer>
  );
}

export default Footer;