// src/components/CreateCardForm.jsx
import React, { useState } from 'react';

function CreateCardForm({ deckId, onCreateCard, onCancel }) {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!front.trim() || !back.trim()) {
      alert('Sisi depan dan belakang kartu tidak boleh kosong!');
      return;
    }
    onCreateCard(deckId, { front, back });
    setFront('');
    setBack('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto flex flex-col space-y-4">
      <h3 className="text-2xl font-semibold text-gray-800 text-center mb-4">Tambah Kartu Baru</h3>
      <div>
        <label htmlFor="cardFront" className="block text-gray-700 text-sm font-bold mb-2">Sisi Depan:</label>
        <input
          type="text"
          id="cardFront"
          value={front}
          onChange={(e) => setFront(e.target.value)}
          placeholder="Misal: 'Hello'"
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div>
        <label htmlFor="cardBack" className="block text-gray-700 text-sm font-bold mb-2">Sisi Belakang:</label>
        <input
          type="text"
          id="cardBack"
          value={back}
          onChange={(e) => setBack(e.target.value)}
          placeholder="Misal: 'Halo'"
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="flex justify-end space-x-4 mt-4">
        <button type="button" onClick={onCancel} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200">
          Batal
        </button>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200">
          Simpan Kartu
        </button>
      </div>
    </form>
  );
}

export default CreateCardForm;