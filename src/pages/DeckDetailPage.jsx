// src/pages/DeckDetailPage.jsx
import React, { useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FlashcardContext } from '../App';
import SectionLayout from '../components/SectionLayout';
import Flashcard from '../components/Flashcard';
import CardControls from '../components/CardControls';
import CreateCardForm from '../components/CreateCardForm';

function DeckDetailPage() {
  const { 
    decks, loadDeckCards, activeDeckInfo, isLoading, cards,
    showCreateCardForm, setShowCreateCardForm, handleAddCardToDeck, handleDeleteCardFromDeck,
    currentCardIndex
  } = useContext(FlashcardContext);
  
  const { deckId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const id = parseInt(deckId);
    if (isNaN(id)) {
        navigate('/');
        return;
    }
    loadDeckCards(id);
  }, [deckId, decks, loadDeckCards, navigate]);

  if (!activeDeckInfo && isLoading) {
    return <p className="text-center text-xl text-gray-700 mt-10">Memuat deck...</p>;
  }

  if (!activeDeckInfo) {
    return (
      <div className="text-center text-xl text-red-500 mt-10">
        Deck tidak ditemukan atau belum dipilih. Kembali ke <button onClick={() => navigate('/')} className="text-blue-600 underline hover:text-blue-800">Halaman Utama</button>.
      </div>
    );
  }

  return (
    <div className="py-5">
      <SectionLayout title={`Latihan Flashcard: ${activeDeckInfo.title} (Kategori: ${activeDeckInfo.category})`}>
        {isLoading ? (
          <p className="text-center text-lg text-gray-500">Memuat kartu...</p>
        ) : (
          cards.length > 0 ? (
            <>
              <Flashcard />
              <CardControls />
              <div className="text-center mt-8">
                <button
                    onClick={() => setShowCreateCardForm(true)}
                    className="px-5 py-2 bg-gray-600 text-white font-bold rounded-lg shadow-md hover:bg-gray-700 transition-colors duration-300 mr-2"
                    style={{ display: showCreateCardForm ? 'none' : 'inline-block' }}
                >
                    + Tambah Kartu
                </button>

                {cards.length > 0 && (
                    <button
                        onClick={() => handleDeleteCardFromDeck(activeDeckInfo.id, cards[currentCardIndex]?.id)}
                        className="px-5 py-2 bg-red-600 text-white font-bold rounded-lg shadow-md hover:bg-red-700 transition-colors duration-300"
                        style={{ display: showCreateCardForm ? 'none' : 'inline-block' }}
                    >
                        Hapus Kartu Ini
                    </button>
                )}

                {showCreateCardForm && (
                    <CreateCardForm
                        deckId={activeDeckInfo.id}
                        onCreateCard={handleAddCardToDeck}
                        onCancel={() => setShowCreateCardForm(false)}
                    />
                )}
              </div>
            </>
          ) : (
            <div className="text-center">
              <p className="text-lg text-gray-700 mb-5">Tidak ada kartu dalam deck ini.</p>
              <button
                  onClick={() => setShowCreateCardForm(true)}
                  className="px-5 py-2 bg-gray-600 text-white font-bold rounded-lg shadow-md hover:bg-gray-700 transition-colors duration-300"
              >
                  + Tambah Kartu Pertama
              </button>
              {showCreateCardForm && (
                  <CreateCardForm
                      deckId={activeDeckInfo.id}
                      onCreateCard={handleAddCardToDeck}
                      onCancel={() => setShowCreateCardForm(false)}
                  />
              )}
            </div>
          )
        )}
      </SectionLayout>
    </div>
  );
}

export default DeckDetailPage;