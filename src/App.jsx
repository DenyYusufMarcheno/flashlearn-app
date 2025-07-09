// src/App.jsx
import React, { useState, useEffect, createContext, useMemo, useCallback } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Header from './components/Header';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import DeckDetailPage from './pages/DeckDetailPage';

export const FlashcardContext = createContext();

const API_BASE_URL = 'http://localhost:5000';

function App() {
  const navigate = useNavigate();

  const [decks, setDecks] = useState([]);
  const [selectedDeckId, setSelectedDeckId] = useState(null);
  const [cards, setCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [activeDeckInfo, setActiveDeckInfo] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showCreateCardForm, setShowCreateCardForm] = useState(false);

  const fetchAllDecks = useCallback(async () => {
    setIsLoading(true);
    setApiError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/decks`);
      setDecks(response.data);
      setIsLoading(false);
      document.title = `FlashLearn - ${response.data.length} Deck Siap!`;
    } catch (error) {
      console.error("Gagal mengambil deck:", error);
      setApiError("Gagal mengambil data deck. Pastikan JSON Server berjalan di port 5000.");
      setIsLoading(false);
      document.title = "FlashLearn - Error";
    }
  }, []);

  useEffect(() => {
    fetchAllDecks();
  }, [fetchAllDecks]);

  // Fungsi untuk memuat kartu berdasarkan deckId (menerima string ID)
  const loadDeckCards = useCallback(async (deckIdString) => { // Mengubah nama parameter menjadi deckIdString
    if (!deckIdString) { // Cek jika ID kosong atau null
      setCards([]);
      setCurrentCardIndex(0);
      setIsCardFlipped(false);
      setActiveDeckInfo(null);
      document.title = "FlashLearn - Pilih Deck Anda";
      return;
    }

    setIsLoading(true);
    setApiError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/decks/${deckIdString}`); // Menggunakan string ID
      const deckToLoad = response.data;

      if (deckToLoad) {
        setCards(deckToLoad.deckCards || []);
        setIsLoading(false);
        setActiveDeckInfo(deckToLoad);
        document.title = `FlashLearn - ${deckToLoad.title}`;
        setCurrentCardIndex(0);
        setIsCardFlipped(false);
      } else {
        console.warn(`Deck dengan ID ${deckIdString} tidak ditemukan di API.`);
        setCards([]);
        setIsLoading(false);
        setActiveDeckInfo(null);
        setCurrentCardIndex(0);
        setIsCardFlipped(false);
        document.title = "FlashLearn - Deck Tidak Ditemukan";
        navigate('/');
      }
    } catch (error) {
      console.error(`Gagal mengambil deck ${deckIdString}:`, error);
      if (error.response && error.response.status === 404) {
        setApiError(`Deck dengan ID ${deckIdString} tidak ditemukan. Deck mungkin sudah dihapus.`);
      } else {
        setApiError(`Gagal mengambil data deck. Terjadi masalah jaringan/server.`);
      }
      setIsLoading(false);
      setActiveDeckInfo(null);
      document.title = "FlashLearn - Error Deck";
      navigate('/');
    }
  }, [navigate]);

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

  const handleCreateDeck = useCallback(async (newDeckData) => {
    try {
      // TIDAK perlu lagi Math.max untuk ID, JSON Server akan memberikannya
      const response = await axios.post(`${API_BASE_URL}/decks`, {
        title: newDeckData.title,
        category: newDeckData.category,
        cardCount: 0,
        deckCards: [],
      });
      // Gunakan ID yang dikembalikan oleh API (yang merupakan string)
      setDecks((prevDecks) => [...prevDecks, response.data]);
      setShowCreateForm(false);
      // Navigasi langsung ke halaman detail deck yang baru dibuat (menggunakan string ID)
      navigate(`/deck/${response.data.id}`);
    } catch (error) {
      console.error("Gagal membuat deck baru:", error);
      setApiError("Gagal membuat deck. Mohon coba lagi.");
    }
  }, [navigate]);

  const handleDeleteDeck = useCallback(async (deckIdString) => { // Menerima string ID
    if (window.confirm("Apakah Anda yakin ingin menghapus deck ini? Semua kartu di dalamnya akan hilang.")) {
      try {
        await axios.delete(`${API_BASE_URL}/decks/${deckIdString}`); // Menggunakan string ID
        setDecks((prevDecks) => prevDecks.filter(deck => deck.id !== deckIdString)); // Membandingkan dengan string ID
        if (selectedDeckId === deckIdString) { // Membandingkan dengan string ID
          setSelectedDeckId(null);
          setCards([]);
          setActiveDeckInfo(null);
          navigate('/');
        }
      } catch (error) {
        console.error(`Gagal menghapus deck ${deckIdString}:`, error);
        setApiError("Gagal menghapus deck. Mohon coba lagi.");
      }
    }
  }, [selectedDeckId, navigate]);

  const handleAddCardToDeck = useCallback(async (deckIdString, cardData) => { // Menerima string ID
    try {
      const deckToUpdate = decks.find(deck => deck.id === deckIdString); // Membandingkan dengan string ID
      if (!deckToUpdate) {
        setApiError("Deck tidak ditemukan.");
        return;
      }
      // Logika ID kartu baru ini masih di frontend (karena tidak ada endpoint API terpisah untuk kartu)
      const currentDeckCards = deckToUpdate.deckCards || [];
      const newCardId = currentDeckCards.length > 0 ? Math.max(...currentDeckCards.map(c => c.id)) + 1 : 1;
      const newCard = { id: newCardId, ...cardData, category: deckToUpdate.category };

      const updatedDeck = {
        ...deckToUpdate,
        deckCards: [...currentDeckCards, newCard],
        cardCount: (deckToUpdate.cardCount || 0) + 1,
      };

      await axios.put(`${API_BASE_URL}/decks/${deckIdString}`, updatedDeck); // Menggunakan string ID
      setDecks((prevDecks) => prevDecks.map(deck => deck.id === deckIdString ? updatedDeck : deck)); // Membandingkan dengan string ID
      setShowCreateCardForm(false);
      if (selectedDeckId === deckIdString) { // Membandingkan dengan string ID
        setCards(updatedDeck.deckCards);
        setCurrentCardIndex(updatedDeck.deckCards.length -1);
        setIsCardFlipped(false);
      }
    } catch (error) {
      console.error(`Gagal menambahkan kartu ke deck ${deckIdString}:`, error);
      setApiError("Gagal menambahkan kartu. Mohon coba lagi.");
    }
  }, [decks, selectedDeckId]);

  const handleDeleteCardFromDeck = useCallback(async (deckIdString, cardIdToDelete) => { // Menerima string ID
    if (window.confirm("Apakah Anda yakin ingin menghapus kartu ini?")) {
      try {
        const deckToUpdate = decks.find(deck => deck.id === deckIdString); // Membandingkan dengan string ID
        if (!deckToUpdate) {
          setApiError("Deck tidak ditemukan.");
          return;
        }

        const updatedDeckCards = (deckToUpdate.deckCards || []).filter(
          (card) => card.id !== cardIdToDelete
        );
        const updatedDeck = {
          ...deckToUpdate,
          deckCards: updatedDeckCards,
          cardCount: Math.max(0, (deckToUpdate.cardCount || 0) - 1),
        };

        await axios.put(`${API_BASE_URL}/decks/${deckIdString}`, updatedDeck); // Menggunakan string ID
        setDecks((prevDecks) => prevDecks.map(deck => deck.id === deckIdString ? updatedDeck : deck)); // Membandingkan dengan string ID

        if (selectedDeckId === deckIdString) { // Membandingkan dengan string ID
          setCards(updatedDeck.deckCards);
          setCurrentCardIndex(0);
          setIsCardFlipped(false);
        }
      } catch (error) {
        console.error(`Gagal menghapus kartu dari deck ${deckIdString}:`, error);
        setApiError("Gagal menghapus kartu. Mohon coba lagi.");
      }
    }
  }, [decks, selectedDeckId]);


  const flashcardContextValue = useMemo(() => ({
    decks, setDecks, selectedDeckId, setSelectedDeckId, cards, setCards,
    currentCardIndex, setCurrentCardIndex, isCardFlipped, setIsCardFlipped,
    isLoading, apiError, activeDeckInfo, setActiveDeckInfo,
    showCreateForm, setShowCreateForm, showCreateCardForm, setShowCreateCardForm,
    loadDeckCards, handleNextCard, handlePrevCard, handleFlipCard, handleCreateDeck,
    handleDeleteDeck, handleAddCardToDeck, handleDeleteCardFromDeck,
    totalCards: cards.length,
  }), [
    decks, selectedDeckId, cards, currentCardIndex, isCardFlipped, isLoading, apiError, activeDeckInfo,
    showCreateForm, setShowCreateForm, showCreateCardForm, setShowCreateCardForm,
    loadDeckCards, handleNextCard, handlePrevCard, handleFlipCard, handleCreateDeck,
    handleDeleteDeck, handleAddCardToDeck, handleDeleteCardFromDeck, cards.length
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-sans">
      <Header />
      <main className="flex-grow p-5 max-w-7xl mx-auto w-full">
        {apiError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {apiError}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer" onClick={() => setApiError(null)}>
              <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
            </span>
          </div>
        )}
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