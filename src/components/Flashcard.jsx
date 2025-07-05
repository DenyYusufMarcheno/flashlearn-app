// src/components/Flashcard.jsx
import React, { useContext } from 'react';
import { FlashcardContext } from '../App'; // Import Context dari App.jsx

function Flashcard() { // Hapus props front, back, isFlipped, onCardClick
  const { cards, currentCardIndex, isCardFlipped, handleFlipCard } = useContext(FlashcardContext);

  // Jika belum ada kartu atau indeks tidak valid, tampilkan pesan
  if (!cards || cards.length === 0) {
    return <div style={{textAlign: 'center', padding: '50px', fontSize: '1.2em'}}>Tidak ada kartu untuk ditampilkan.</div>;
  }

  const currentCard = cards[currentCardIndex]; // Ambil kartu saat ini dari context

  const cardContainerStyle = {
    perspective: '1000px',
    width: '320px',
    height: '220px',
    margin: '30px auto',
    cursor: 'pointer',
    position: 'relative',
  };

  const cardInnerStyle = {
    position: 'relative',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    transition: 'transform 0.6s',
    transformStyle: 'preserve-3d',
    transform: isCardFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
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
    backgroundColor: '#e0ffe0',
    color: '#333',
    border: '2px solid #4CAF50',
    transform: 'rotateY(180deg)',
  };

  return (
    <div style={cardContainerStyle} onClick={handleFlipCard}>
      <div style={cardInnerStyle}>
        <div style={cardFrontStyle}>
          {currentCard.front}
        </div>
        <div style={cardBackStyle}>
          {currentCard.back}
        </div>
      </div>
    </div>
  );
}

export default Flashcard;