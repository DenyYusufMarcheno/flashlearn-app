// src/components/DeckCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function DeckCard({ deckId, title, cardCount, category, onDeleteDeck }) {
  return (
    <div className="border border-gray-300 rounded-lg p-5 w-64 bg-white shadow-md flex flex-col justify-between transform transition-transform duration-200 hover:scale-105">
      <div className="flex-grow">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-3">
            Kategori: <span className="font-bold text-gray-700">{category}</span>
        </p>
        <p className="text-gray-700 text-lg font-bold">
            {cardCount} Kartu
        </p>
      </div>

      <div className="mt-5">
        <Link 
            to={`/deck/${deckId}`} 
            className="block w-full py-2 bg-blue-600 text-white font-bold rounded-md shadow-sm hover:bg-blue-700 transition-colors duration-300 text-center mb-2"
        >
            Pelajari Sekarang
        </Link>
        
        <button
            onClick={() => onDeleteDeck(deckId)}
            className="block w-full py-2 bg-red-600 text-white font-bold rounded-md shadow-sm hover:bg-red-700 transition-colors duration-300 text-center"
        >
            Hapus Deck
        </button>
      </div>
    </div>
  );
}

export default DeckCard;