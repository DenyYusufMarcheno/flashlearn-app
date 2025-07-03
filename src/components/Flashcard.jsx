// src/components/Flashcard.jsx
import React from 'react';

function Flashcard({ front, back, isFlipped, onCardClick }) {
  const cardContainerStyle = {
    perspective: '1000px',
    width: '320px',
    height: '220px',
    margin: '30px auto',
    cursor: 'pointer',
    position: 'relative', // Penting untuk posisi absolut inner
  };

  const cardInnerStyle = {
    position: 'relative',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    transition: 'transform 0.6s',
    transformStyle: 'preserve-3d',
    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)', // Efek flip
  };

  const cardFaceStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    fontSize: '1.8em',
    fontWeight: 'bold',
    padding: '20px',
    boxSizing: 'border-box',
  };

  const cardFrontStyle = {
    ...cardFaceStyle,
    backgroundColor: '#ffffff',
    color: '#333',
    border: '2px solid #4CAF50',
  };

  const cardBackStyle = {
    ...cardFaceStyle,
    backgroundColor: '#e0ffe0', // Warna hijau muda
    color: '#333',
    border: '2px solid #4CAF50',
    transform: 'rotateY(180deg)',
  };

  return (
    <div style={cardContainerStyle} onClick={onCardClick}> {/* Tambahkan onClick */}
      <div style={cardInnerStyle}>
        {/* Sisi Depan */}
        <div style={cardFrontStyle}>
          {front}
        </div>
        {/* Sisi Belakang */}
        <div style={cardBackStyle}>
          {back}
        </div>
      </div>
    </div>
  );
}

export default Flashcard;