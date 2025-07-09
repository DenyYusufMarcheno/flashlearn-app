// src/components/Flashcard.jsx
import React, { useContext } from 'react';
import { FlashcardContext } from '../App';

function Flashcard() {
  const { cards, currentCardIndex, isCardFlipped, handleFlipCard } = useContext(FlashcardContext);

  const currentCard = cards && cards.length > currentCardIndex ? cards[currentCardIndex] : null;

  if (!currentCard) {
    return (
      <div className="text-center p-10 text-lg text-gray-700">
        Tidak ada kartu untuk ditampilkan dalam deck ini.
      </div>
    );
  }

  const cardContainerStyle = {
    perspective: '1000px',
  };

  const cardInnerStyle = {
    transition: 'transform 0.6s',
    transformStyle: 'preserve-3d',
    transform: isCardFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
  };

  const cardFaceBaseClasses = "absolute w-full h-full backface-hidden flex items-center justify-center rounded-xl shadow-lg text-3xl font-bold p-5 box-border";

  return (
    <div 
      className="w-80 h-56 mx-auto my-8 cursor-pointer relative" 
      style={cardContainerStyle} 
      onClick={handleFlipCard}
    >
      <div className="relative w-full h-full text-center" style={cardInnerStyle}>
        <div className={`${cardFaceBaseClasses} bg-white text-gray-800 border-2 border-green-500`}>
          {currentCard.front}
        </div>
        <div className={`${cardFaceBaseClasses} bg-green-100 text-gray-800 border-2 border-green-500 transform rotate-y-180`} style={{ backfaceVisibility: 'hidden' }}>
          {currentCard.back}
        </div>
      </div>
    </div>
  );
}

export default Flashcard;