// src/App.jsx
import React, { useState, useEffect, createContext, useMemo } from 'react';

import Header from './components/Header';
import DeckCard from './components/DeckCard';
import Flashcard from './components/Flashcard';
import CardControls from './components/CardControls';
import Footer from './components/Footer';
import SectionLayout from './components/SectionLayout';
import CreateDeckForm from './components/CreateDeckForm';
import CreateCardForm from './components/CreateCardForm';

// Context untuk Flashcard
export const FlashcardContext = createContext();

function App() {
  // Data dummy awal untuk deck flashcard
  const initialDataDecks = useMemo(() => [
    { id: 1, title: "Kosakata Bahasa Inggris", cardCount: 5, category: "Bahasa", deckCards: [
        { id: 1, front: "Hello", back: "Halo", category: "Bahasa" },
        { id: 2, front: "World", back: "Dunia", category: "Bahasa" },
        { id: 3, front: "Cat", back: "Kucing", category: "Bahasa" },
        { id: 4, front: "Dog", back: "Anjing", category: "Bahasa" },
        { id: 5, front: "Book", back: "Buku", category: "Bahasa" },
      ]
    },
    { id: 2, title: "Rumus Matematika Dasar", cardCount: 3, category: "Sains", deckCards: [
        { id: 6, front: "2 + 2", back: "4", category: "Sains" },
        { id: 7, front: "Phytagorean Theorem", back: "a^2 + b^2 = c^2", category: "Sains" },
        { id: 8, front: "Newton's First Law", back: "Inertia", category: "Sains" },
      ]
    },
    { id: 3, title: "Sejarah Kemerdekaan RI", cardCount: 2, category: "Sejarah", deckCards: [
        { id: 9, front: "Proklamasi Kemerdekaan", back: "17 Agustus 1945", category: "Sejarah" },
        { id: 10, front: "Pancasila Sila Ke-3", back: "Persatuan Indonesia", category: "Sejarah" },
      ]
    },
    { id: 4, title: "Istilah Teknologi", cardCount: 2, category: "Komputer", deckCards: [
        { id: 11, front: "React", back: "Library JavaScript", category: "Komputer" },
        { id: 12, front: "Node.js", back: "Runtime JavaScript", category: "Komputer" },
      ]
    },
  ], []);

  const [decks, setDecks] = useState(initialDataDecks);
  const [selectedDeckId, setSelectedDeckId] = useState(null);
  const [cards, setCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeDeckInfo, setActiveDeckInfo] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showCreateCardForm, setShowCreateCardForm] = useState(false);

  // Effect untuk memuat kartu berdasarkan deck yang dipilih
  useEffect(() => {
    if (selectedDeckId === null) {
      setCards([]);
      setCurrentCardIndex(0);
      setIsCardFlipped(false);
      setActiveDeckInfo(null);
      document.title = "FlashLearn - Pilih Deck Anda";
      return;
    }

    setIsLoading(true);
    const deckToLoad = decks.find(deck => deck.id === selectedDeckId);

    if (deckToLoad) {
      setTimeout(() => {
        setCards(deckToLoad.deckCards || []);
        setIsLoading(false);
        setActiveDeckInfo(deckToLoad);
        document.title = `FlashLearn - ${deckToLoad.title}`;
        setCurrentCardIndex(0);
        setIsCardFlipped(false);
      }, 500);
    } else {
      setCards([]);
      setIsLoading(false);
      setActiveDeckInfo(null);
      setCurrentCardIndex(0);
      setIsCardFlipped(false);
      document.title = "FlashLearn - Deck Tidak Ditemukan";
    }
  }, [selectedDeckId, decks]);

  // Event Handlers
  const handleNextCard = () => {
    if (cards.length === 0) return;
    setIsCardFlipped(false);
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handlePrevCard = () => {
    if (cards.length === 0) return;
    setIsCardFlipped(false);
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  const handleFlipCard = () => {
    setIsCardFlipped((prevFlipped) => !prevFlipped);
  };

  const handleSelectDeck = (deckId) => {
    setSelectedDeckId(deckId);
    setShowCreateCardForm(false); // Sembunyikan form kartu saat memilih deck lain
  };

  // Fungsi untuk membuat deck baru
  const handleCreateDeck = (newDeckData) => {
    const newId = Math.max(0, ...decks.map(d => d.id)) + 1;
    const newDeck = {
      id: newId,
      title: newDeckData.title,
      category: newDeckData.category,
      cardCount: 0,
      deckCards: [],
    };
    setDecks((prevDecks) => [...prevDecks, newDeck]);
    setShowCreateForm(false);
    setSelectedDeckId(newId);
  };

  // Fungsi untuk menghapus deck
  const handleDeleteDeck = (deckId) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus deck ini? Semua kartu di dalamnya akan hilang.")) {
      setDecks((prevDecks) => prevDecks.filter(deck => deck.id !== deckId));
      if (selectedDeckId === deckId) {
        setSelectedDeckId(null);
      }
    }
  };

  // Fungsi untuk menambahkan kartu ke dalam deck
  const handleAddCardToDeck = (deckId, cardData) => {
    setDecks((prevDecks) => {
      return prevDecks.map((deck) => {
        if (deck.id === deckId) {
          const currentDeckCards = deck.deckCards || [];
          const newCardId = currentDeckCards.length > 0
            ? Math.max(...currentDeckCards.map(c => c.id)) + 1
            : 1;

          const newCard = { id: newCardId, ...cardData, category: deck.category };
          return {
            ...deck,
            deckCards: [...currentDeckCards, newCard],
            cardCount: (deck.cardCount || 0) + 1,
          };
        }
        return deck;
      });
    });
    setShowCreateCardForm(false);
  };

  // =============================================================
  // Fungsi untuk menghapus kartu dari dalam deck
  const handleDeleteCardFromDeck = (deckId, cardIdToDelete) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus kartu ini?")) {
      setDecks((prevDecks) => {
        return prevDecks.map((deck) => {
          if (deck.id === deckId) {
            const updatedDeckCards = (deck.deckCards || []).filter(
              (card) => card.id !== cardIdToDelete
            );
            return {
              ...deck,
              deckCards: updatedDeckCards,
              cardCount: Math.max(0, (deck.cardCount || 0) - 1),
            };
          }
          return deck;
        });
      });
      // Setelah menghapus, useEffect akan re-run dan me-reset currentCardIndex ke 0
      // atau menampilkan pesan "Tidak ada kartu" jika deck kosong.
    }
  };
  // =============================================================


  const flashcardContextValue = {
    cards,
    currentCardIndex,
    isCardFlipped,
    handleNextCard,
    handlePrevCard,
    handleFlipCard,
    totalCards: cards.length,
  };

  return (
    <div className="App" style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f7f6', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flexGrow: 1, padding: '20px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <SectionLayout title="Koleksi Deck Anda">
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
            {decks.map(deck => (
              <DeckCard
                key={deck.id}
                deckId={deck.id}
                title={deck.title}
                cardCount={deck.cardCount}
                category={deck.category}
                onSelectDeck={() => handleSelectDeck(deck.id)}
                onDeleteDeck={handleDeleteDeck}
              />
            ))}
          </div>
        </SectionLayout>

        <SectionLayout title="Latihan Flashcard">
          <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
            Pilih deck di atas untuk memulai latihan.
          </p>
          {selectedDeckId === null && (
              <p style={{ textAlign: 'center', fontSize: '1.2em', color: '#888' }}>Pilih salah satu deck di atas untuk memulai latihan.</p>
          )}

          {activeDeckInfo && !isLoading && cards.length > 0 && (
            <p style={{ textAlign: 'center', fontSize: '1.1em', color: '#4CAF50', marginTop: '-15px', marginBottom: '20px', fontWeight: 'bold' }}>
              Anda sedang berlatih: {activeDeckInfo.title} (Kategori: {activeDeckInfo.category})
            </p>
          )}

          {isLoading && selectedDeckId !== null ? (
            <p style={{ textAlign: 'center', fontSize: '1.2em', color: '#555' }}>Memuat kartu deck...</p>
          ) : (
            selectedDeckId !== null && cards.length > 0 ? (
              <>
                <FlashcardContext.Provider value={flashcardContextValue}>
                  <Flashcard />
                  <CardControls />
                </FlashcardContext.Provider>
                <div style={{ textAlign: 'center', marginTop: '30px' }}>
                    <button
                        onClick={() => setShowCreateCardForm(true)}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#6c757d',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '1em',
                            fontWeight: 'bold',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            transition: 'background-color 0.3s ease',
                            display: showCreateCardForm ? 'none' : 'inline-block',
                            marginRight: '10px'
                        }}
                    >
                        + Tambah Kartu ke Deck Ini
                    </button>

                    {/* =============================================================
                    Tombol Hapus Kartu Ini
                    ============================================================= */}
                    <button
                        onClick={() => handleDeleteCardFromDeck(selectedDeckId, cards[currentCardIndex].id)}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#dc3545', // Warna merah untuk delete
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '1em',
                            fontWeight: 'bold',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            transition: 'background-color 0.3s ease',
                            display: showCreateCardForm ? 'none' : 'inline-block'
                        }}
                    >
                        Hapus Kartu Ini
                    </button>
                    {/* ============================================================= */}

                    {showCreateCardForm && (
                        <CreateCardForm
                            deckId={selectedDeckId}
                            onCreateCard={handleAddCardToDeck}
                            onCancel={() => setShowCreateCardForm(false)}
                        />
                    )}
                </div>
              </>
            ) : (
              selectedDeckId !== null && (
                <div style={{ textAlign: 'center', marginTop: '30px' }}>
                  <p style={{ textAlign: 'center', fontSize: '1.2em', color: '#888' }}>Tidak ada kartu dalam deck ini.</p>
                  <button
                      onClick={() => setShowCreateCardForm(true)}
                      style={{
                          padding: '10px 20px',
                          backgroundColor: '#6c757d',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '1em',
                          fontWeight: 'bold',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                          transition: 'background-color 0.3s ease',
                          display: showCreateCardForm ? 'none' : 'inline-block'
                      }}
                  >
                      + Tambah Kartu ke Deck Ini
                  </button>
                  {showCreateCardForm && (
                      <CreateCardForm
                          deckId={selectedDeckId}
                          onCreateCard={handleAddCardToDeck}
                          onCancel={() => setShowCreateCardForm(false)}
                      />
                  )}
                </div>
              )
            )
          )}
        </SectionLayout>

        <section style={{ marginTop: '40px', textAlign: 'center', paddingTop: '20px', borderTop: '1px solid #eee' }}>
            <h2 style={{ color: '#333', marginBottom: '20px' }}>Mulai Buat Deck Anda Sendiri!</h2>
            <p style={{ color: '#666', marginBottom: '30px' }}>
                Atur materi pembelajaran Anda dengan mudah dan efektif.
            </p>
            <button
                onClick={() => setShowCreateForm(true)}
                style={{
                    padding: '12px 25px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '1.1em',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    transition: 'background-color 0.3s ease',
                    marginBottom: showCreateForm ? '20px' : '0'
                }}
            >
                + Buat Deck Baru
            </button>

            {showCreateForm && (
                <CreateDeckForm
                    onCreateDeck={handleCreateDeck}
                    onCancel={() => setShowCreateForm(false)}
                />
            )}
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;