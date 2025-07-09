// src/components/Footer.jsx
import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-800 text-white text-center p-5 mt-auto text-sm">
      <p>&copy; {currentYear} FlashLearn. All rights reserved.</p>
      <p className="mt-1">Dibuat untuk Tugas Final Project PIBITI 2025.</p>
    </footer>
  );
}

export default Footer;