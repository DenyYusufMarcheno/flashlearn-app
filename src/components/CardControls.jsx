// src/components/CardControls.jsx
import React from 'react';

function CardControls({ onPrev, onNext, current, total }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px', gap: '15px' }}>
      <button 
        onClick={onPrev} 
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '1em',
          transition: 'background-color 0.3s ease'
        }}
      >
        &larr; Sebelumnya
      </button>
      <span style={{ fontSize: '1.1em', fontWeight: 'bold', color: '#555' }}>
        {current} / {total}
      </span>
      <button 
        onClick={onNext} 
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '1em',
          transition: 'background-color 0.3s ease'
        }}
      >
        Selanjutnya &rarr;
      </button>
    </div>
  );
}

export default CardControls;