// src/components/CardControls.jsx
import React, { useContext } from 'react';
import { FlashcardContext } from '../App';

function CardControls() {
  const { currentCardIndex, totalCards, handlePrevCard, handleNextCard } = useContext(FlashcardContext);

  return (
    <div className="flex justify-center items-center mt-5 space-x-4">
      <button
        onClick={handlePrevCard}
        className="px-5 py-2 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
      >
        &larr; Sebelumnya
      </button>
      <span className="text-lg font-bold text-gray-700">
        {currentCardIndex + 1} / {totalCards}
      </span>
      <button
        onClick={handleNextCard}
        className="px-5 py-2 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
      >
        Selanjutnya &rarr;
      </button>
    </div>
  );
}

export default CardControls;