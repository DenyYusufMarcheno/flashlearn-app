// src/pages/HomePage.jsx
import React, { useContext } from 'react';
import { FlashcardContext } from '../App';
import SectionLayout from '../components/SectionLayout';
import DeckCard from '../components/DeckCard';
import CreateDeckForm from '../components/CreateDeckForm';

function HomePage() {
  const { decks, handleDeleteDeck, showCreateForm, setShowCreateForm, handleCreateDeck } = useContext(FlashcardContext);

  return (
    <div className="py-5">
      <SectionLayout title="Koleksi Deck Anda">
        <div className="flex flex-wrap justify-center gap-5">
          {decks.map(deck => (
            <DeckCard
              key={deck.id}
              deckId={deck.id}
              title={deck.title}
              cardCount={deck.cardCount}
              category={deck.category}
              onDeleteDeck={handleDeleteDeck}
            />
          ))}
        </div>
      </SectionLayout>

      <section className="mt-10 text-center pt-5 border-t border-gray-200">
          <h2 className="text-3xl font-semibold text-gray-800 mb-5">Mulai Buat Deck Anda Sendiri!</h2>
          <p className="text-gray-600 mb-8">
              Atur materi pembelajaran Anda dengan mudah dan efektif.
          </p>
          <button
              onClick={() => setShowCreateForm(true)}
              className="px-6 py-3 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition-colors duration-300 transform hover:scale-105"
              style={{ display: showCreateForm ? 'none' : 'inline-block' }}
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
    </div>
  );
}

export default HomePage;