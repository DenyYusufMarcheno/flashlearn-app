// src/App.jsx
import React, { useState, useEffect, createContext, useMemo, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import DeckDetailPage from './pages/DeckDetailPage';

export const FlashcardContext = createContext();

function App() {
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


  const loadDeckCards = useCallback((deckId) => {
    if (deckId === null) {
      setCards([]);
      setCurrentCardIndex(0);
      setIsCardFlipped(false);
      setActiveDeckInfo(null);
      document.title = "FlashLearn - Pilih Deck Anda";
      return;
    }

    setIsLoading(true);
    const deckToLoad = decks.find(deck => deck.id === deckId);

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
  }, [decks]);

  const handleNextCard = useCallback(() => {
    if (cards.length === 0) return;
    setIsCardFlipped(false);
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
  }, [cards.length]);

  const handlePrevCard = useCallback(() => {
    if (cards.length === 0) return;
    setIsCardFlipped(false);
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  }, [cards.length]);

  const handleFlipCard = useCallback(() => {
    setIsCardFlipped((prevFlipped) => !prevFlipped);
  }, []);

  const handleCreateDeck = useCallback((newDeckData) => {
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
  }, [decks]);

  const handleDeleteDeck = useCallback((deckId) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus deck ini? Semua kartu di dalamnya akan hilang.")) {
      setDecks((prevDecks) => prevDecks.filter(deck => deck.id !== deckId));
      if (selectedDeckId === deckId) {
        setSelectedDeckId(null);
      }
    }
  }, [selectedDeckId]);

  const handleAddCardToDeck = useCallback((deckId, cardData) => {
    setDecks((prevDecks) => {
      return prevDecks.map((deck) => {
        if (deck.id === deckId) {
          const currentDeckCards = deck.deckCards || [];
          const newCardId = currentDeckCards.length > 0 ? Math.max(...currentDeckCards.map(c => c.id)) + 1 : 1;
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
  }, []);

  const handleDeleteCardFromDeck = useCallback((deckId, cardIdToDelete) => {
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
    }
  }, []);

  const flashcardContextValue = useMemo(() => ({
    decks,
    setDecks,
    selectedDeckId,
    setSelectedDeckId,
    cards,
    setCards,
    currentCardIndex,
    setCurrentCardIndex,
    isCardFlipped,
    setIsCardFlipped,
    isLoading,
    activeDeckInfo,
    setActiveDeckInfo,
    showCreateForm,
    setShowCreateForm,
    showCreateCardForm,
    setShowCreateCardForm,
    loadDeckCards,
    handleNextCard,
    handlePrevCard,
    handleFlipCard,
    handleCreateDeck,
    handleDeleteDeck,
    handleAddCardToDeck,
    handleDeleteCardFromDeck,
    totalCards: cards.length,
  }), [
    decks, selectedDeckId, cards, currentCardIndex, isCardFlipped, isLoading, activeDeckInfo,
    showCreateForm, setShowCreateForm, showCreateCardForm, setShowCreateCardForm,
    loadDeckCards, handleNextCard, handlePrevCard, handleFlipCard, handleCreateDeck,
    handleDeleteDeck, handleAddCardToDeck, handleDeleteCardFromDeck, cards.length
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-sans">
      <Header />
      <main className="flex-grow p-5 max-w-7xl mx-auto w-full">
        <FlashcardContext.Provider value={flashcardContextValue}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/deck/:deckId" element={<DeckDetailPage />} />
            <Route path="*" element={<h2 className="text-center text-red-500 text-2xl mt-10">404 - Halaman Tidak Ditemukan</h2>} />
          </Routes>
        </FlashcardContext.Provider>
      </main>
      <Footer />
    </div>
  );
}

export default App;