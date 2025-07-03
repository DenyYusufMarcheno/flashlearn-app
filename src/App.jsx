// src/App.jsx
import React, { useState } from 'react'; // Import useState
import Header from './components/Header';
import DeckCard from './components/DeckCard';
import Flashcard from './components/Flashcard';
import CardControls from './components/CardControls'; // Komponen baru
import Footer from './components/Footer';

function App() {
  // Data dummy untuk deck flashcard
  const initialDecks = [
    { id: 1, title: "Kosakata Bahasa Inggris", cardCount: 25, category: "Bahasa" },
    { id: 2, title: "Rumus Matematika Dasar", cardCount: 15, category: "Sains" },
    { id: 3, title: "Sejarah Kemerdekaan RI", cardCount: 30, category: "Sejarah" },
    { id: 4, title: "Istilah Teknologi", cardCount: 20, category: "Komputer" },
  ];

  // Data dummy untuk kartu dalam satu deck (misalnya deck Kosakata Bahasa Inggris)
  const englishVocabCards = [
    { id: 1, front: "Hello", back: "Halo" },
    { id: 2, front: "World", back: "Dunia" },
    { id: 3, front: "Cat", back: "Kucing" },
    { id: 4, front: "Dog", back: "Anjing" },
    { id: 5, front: "Book", back: "Buku" },
  ];

  // State untuk mengelola kartu yang sedang ditampilkan
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false); // State untuk flip kartu

  const handleNextCard = () => {
    setIsCardFlipped(false); // Balik kartu ke depan saat ganti
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % englishVocabCards.length);
  };

  const handlePrevCard = () => {
    setIsCardFlipped(false); // Balik kartu ke depan saat ganti
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + englishVocabCards.length) % englishVocabCards.length);
  };

  const handleFlipCard = () => {
    setIsCardFlipped((prevFlipped) => !prevFlipped);
  };

  return (
    <div className="App" style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f7f6', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flexGrow: 1, padding: '20px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '25px' }}>Koleksi Deck Anda</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
            {/* Iterasi data deck menggunakan .map() */}
            {initialDecks.map(deck => (
              <DeckCard 
                key={deck.id} 
                title={deck.title} 
                cardCount={deck.cardCount} 
                category={deck.category} 
              />
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '40px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
          <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '25px' }}>Latihan Flashcard</h2>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
            Klik kartu untuk melihat sisi baliknya, gunakan tombol navigasi di bawah.
          </p>
          {englishVocabCards.length > 0 ? (
            <>
              <Flashcard 
                front={englishVocabCards[currentCardIndex].front} 
                back={englishVocabCards[currentCardIndex].back} 
                isFlipped={isCardFlipped} // Kirim state isFlipped ke komponen Flashcard
                onCardClick={handleFlipCard} // Kirim handler ke Flashcard
              />
              <CardControls 
                onPrev={handlePrevCard} 
                onNext={handleNextCard} 
                current={currentCardIndex + 1}
                total={englishVocabCards.length}
              />
            </>
          ) : (
            <p style={{textAlign: 'center'}}>Tidak ada kartu dalam deck ini.</p>
          )}
          
        </section>

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