// src/components/SectionLayout.jsx
import React from 'react';

function SectionLayout({ title, children }) { // Menerima props 'title' dan 'children'
  return (
    <section style={{ marginBottom: '40px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
      <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '25px' }}>{title}</h2>
      {children} {/* Ini akan merender semua elemen yang diletakkan di antara tag <SectionLayout> */}
    </section>
  );
}

export default SectionLayout;