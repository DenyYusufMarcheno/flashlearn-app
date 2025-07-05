// src/App.jsx
import React, { useState, useEffect, createContext } from 'react'; // Import createContext

import Header from './components/Header';
import DeckCard from './components/DeckCard';
import Flashcard from './components/Flashcard';
import CardControls from './components/CardControls';
import Footer from './components/Footer';
import SectionLayout from './components/SectionLayout'; // Komponen baru untuk props.children

// =============================================================
// 4. (Opsional/Tingkat Lanjut) Menggunakan useContext
// Membuat Context untuk Flashcard
export const FlashcardContext = createContext();
// =============================================================

function App() {
  // Data dummy untuk deck flashcard
  const initialDecks = [
    { id: 1, title: "Kosakata Bahasa Inggris", cardCount: 25, category: "Bahasa" },
    { id: 2, title: "Rumus Matematika Dasar", cardCount: 15, category: "Sains" },
    { id: 3, title: "Sejarah Kemerdekaan RI", cardCount: 30, category: "Sejarah" },
    { id: 4, title: "Istilah Teknologi", cardCount: 20, category: "Komputer" },
  ];

  // =============================================================
  // 1. Mengelola State dengan useState
  const [cards, setCards] = useState([]); // State untuk menyimpan data flashcard yang diambil
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // State untuk loading data
  // =============================================================

  // =============================================================
  // 3. Mengelola Side Effects dengan useEffect
  useEffect(() => {
    // Mensimulasikan pengambilan data dari API
    setIsLoading(true);
    setTimeout(() => {
      const fetchedCards = [
        { id: 1, front: "Hello", back: "Halo" },
        { id: 2, front: "World", back: "Dunia" },
        { id: 3, front: "Cat", back: "Kucing" },
        { id: 4, front: "Dog", back: "Anjing" },
        { id: 5, front: "Book", back: "Buku" },
      ];
      setCards(fetchedCards);
      setIsLoading(false);
      // Mengubah judul dokumen secara dinamis
      document.title = `FlashLearn - ${fetchedCards.length} Kartu Siap!`;
    }, 1500); // Simulasi delay 1.5 detik
  }, []); // [] agar useEffect hanya berjalan sekali setelah render pertama
  // =============================================================

  const handleNextCard = () => {
    setIsCardFlipped(false);
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handlePrevCard = () => {
    setIsCardFlipped(false);
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  const handleFlipCard = () => {
    setIsCardFlipped((prevFlipped) => !prevFlipped);
  };

  // Nilai yang akan disediakan oleh Context
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
        {/* =============================================================
        2. Membuat Komponen Layout dengan props.children
        ============================================================= */}
        <SectionLayout title="Koleksi Deck Anda">
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
            {initialDecks.map(deck => (
              <DeckCard
                key={deck.id}
                title={deck.title}
                cardCount={deck.cardCount}
                category={deck.category}
              />
            ))}
          </div>
        </SectionLayout>

        <SectionLayout title="Latihan Flashcard">
          <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
            Klik kartu untuk melihat sisi baliknya, gunakan tombol navigasi di bawah.
          </p>
          {isLoading ? (
            <p style={{ textAlign: 'center', fontSize: '1.2em', color: '#555' }}>Memuat kartu...</p>
          ) : (
            cards.length > 0 ? (
              // =============================================================
              // 4. (Opsional/Tingkat Lanjut) Menggunakan useContext
              // Pembungkus dengan FlashcardContext.Provider
              // =============================================================
              <FlashcardContext.Provider value={flashcardContextValue}>
                <Flashcard // Kini Flashcard akan mengambil props dari Context jika diubah
                    front={cards[currentCardIndex].front}
                    back={cards[currentCardIndex].back}
                    isFlipped={isCardFlipped}
                    onCardClick={handleFlipCard}
                />
                <CardControls
                  current={currentCardIndex + 1}
                  total={cards.length}
                  onPrev={handlePrevCard} // Masih perlu dikirim langsung karena CardControls tidak menggunakan Context
                  onNext={handleNextCard} // Sama
                />
              </FlashcardContext.Provider>
            ) : (
              <p style={{ textAlign: 'center' }}>Tidak ada kartu dalam deck ini.</p>
            )
          )}
        </SectionLayout>


        <section style={{ marginTop: '40px', textAlign: 'center', paddingTop: '20px', borderTop: '1px solid #eee' }}>
            <h2 style={{ color: '#333', marginBottom: '20px' }}>Mulai Buat Deck Anda Sendiri!</h2>
            <p style={{ color: '#666', marginBottom: '30px' }}>
                Atur materi pembelajaran Anda dengan mudah dan efektif.
            </p>
            <button style={{
                padding: '12px 25px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1.1em',
                fontWeight: 'bold',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                transition: 'background-color 0.3s ease'
            }}>
                + Buat Deck Baru
            </button>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;