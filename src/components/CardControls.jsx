// src/components/CardControls.jsx
import React, { useContext } from 'react';
import { FlashcardContext } from '../App'; // Import Context dari App.jsx

function CardControls() { // Hapus props onPrev, onNext, current, total
  const { currentCardIndex, totalCards, handlePrevCard, handleNextCard } = useContext(FlashcardContext);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px', gap: '15px' }}>
      <button
        onClick={handlePrevCard}
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
        {currentCardIndex + 1} / {totalCards}
      </span>
      <button
        onClick={handleNextCard}
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