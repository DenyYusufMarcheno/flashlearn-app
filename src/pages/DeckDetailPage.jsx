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
  
  const { deckId } = useParams(); // deckId sudah berupa string dari URL
  const navigate = useNavigate();

  useEffect(() => {
    if (!deckId) { // Cek jika deckId dari URL kosong
        navigate('/');
        return;
    }
    loadDeckCards(deckId); // Langsung gunakan string ID dari useParams
  }, [deckId, decks, loadDeckCards, navigate]); // Tambahkan `decks` ke dependency untuk re-render saat decks berubah

  // Jika tidak ada activeDeckInfo dan masih loading
  if (!activeDeckInfo && isLoading) {
    return <p className="text-center text-xl text-gray-700 mt-10">Memuat deck...</p>;
  }

  // Jika activeDeckInfo null (setelah loading atau tidak ditemukan)
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
                        // Menggunakan activeDeckInfo.id (string) dan cards[currentCardIndex]?.id (string/number)
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
          ) : ( // Kondisi ketika deck dipilih tapi tidak ada kartu (cards.length === 0)
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