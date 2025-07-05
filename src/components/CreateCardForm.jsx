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
    onCreateCard(deckId, { front, back }); // Meneruskan deckId, front, back
    setFront(''); // Reset form
    setBack(''); // Reset form
  };

  const formStyle = {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    maxWidth: '500px',
    margin: '20px auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  };

  const inputStyle = {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '1em',
  };

  const buttonGroupStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    marginTop: '10px'
  };

  const primaryButtonStyle = {
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1em',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  };

  const saveButtonStyle = {
    ...primaryButtonStyle,
    backgroundColor: '#007bff',
    color: 'white',
  };

  const cancelButtonStyle = {
    ...primaryButtonStyle,
    backgroundColor: '#dc3545',
    color: 'white',
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h3 style={{ margin: '0 0 15px', textAlign: 'center', color: '#333' }}>Tambah Kartu Baru</h3>
      <div>
        <label htmlFor="cardFront" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Sisi Depan:</label>
        <input
          type="text"
          id="cardFront"
          value={front}
          onChange={(e) => setFront(e.target.value)}
          placeholder="Misal: 'Hello'"
          required
          style={inputStyle}
        />
      </div>
      <div>
        <label htmlFor="cardBack" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Sisi Belakang:</label>
        <input
          type="text"
          id="cardBack"
          value={back}
          onChange={(e) => setBack(e.target.value)}
          placeholder="Misal: 'Halo'"
          required
          style={inputStyle}
        />
      </div>
      <div style={buttonGroupStyle}>
        <button type="button" onClick={onCancel} style={cancelButtonStyle}>
          Batal
        </button>
        <button type="submit" style={saveButtonStyle}>
          Simpan Kartu
        </button>
      </div>
    </form>
  );
}

export default CreateCardForm;