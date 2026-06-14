
import React, { useState } from 'react';
import { Deck, Card } from '../types';
import { generateFlashcards } from '../services/geminiService';

interface DeckViewProps {
  deck: Deck;
  cards: Card[];
  onAddCard: (f: string, b: string, e: string, d: string) => void;
  onDeleteCard: (id: string) => void;
  onDeleteDeck: (id: string) => void;
  onStartReview: () => void;
  onBack: () => void;
}

const DeckView: React.FC<DeckViewProps> = ({ deck, cards, onAddCard, onDeleteCard, onDeleteDeck, onStartReview, onBack }) => {
  const [tab, setTab] = useState<'cards' | 'add'>('cards');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [explanation, setExplanation] = useState('');
  
  // AI related state
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiTopic, setAiTopic] = useState('');

  const now = Date.now();
  const dueCount = cards.filter(c => c.nextReviewAt <= now).length;

  const handleManualAdd = () => {
    if (front.trim() && back.trim()) {
      onAddCard(front, back, explanation, deck.id);
      setFront('');
      setBack('');
      setExplanation('');
      setTab('cards');
    }
  };

  const handleAiGenerate = async () => {
    if (!aiTopic.trim()) return;
    setIsGenerating(true);
    try {
      const proposals = await generateFlashcards(aiTopic);
      proposals.forEach(p => onAddCard(p.front, p.back, p.explanation, deck.id));
      setAiTopic('');
      setTab('cards');
    } catch (err) {
      alert("Failed to generate cards. Check console.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="text-gray-500 hover:text-indigo-600 flex items-center transition-colors">
          <i className="fas fa-chevron-left mr-2"></i> Back to Dashboard
        </button>
        <button 
          onClick={() => setShowDeleteConfirm(true)}
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          <i className="fas fa-trash"></i>
        </button>
      </div>

      <div className="bg-white border border-gray-100 p-8 rounded-3xl shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{deck.name}</h1>
            <p className="text-gray-500 mt-1">{deck.description}</p>
          </div>
          {dueCount > 0 && (
            <button 
              onClick={onStartReview}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-100 transition-all transform hover:scale-105"
            >
              Review {dueCount} Cards
            </button>
          )}
        </div>
      </div>

      <div className="flex border-b border-gray-200">
        <button 
          onClick={() => setTab('cards')}
          className={`px-6 py-3 font-semibold transition-colors border-b-2 ${tab === 'cards' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500'}`}
        >
          Cards ({cards.length})
        </button>
        <button 
          onClick={() => setTab('add')}
          className={`px-6 py-3 font-semibold transition-colors border-b-2 ${tab === 'add' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500'}`}
        >
          Add Cards
        </button>
      </div>

      {tab === 'cards' && (
        <div className="grid grid-cols-1 gap-4">
          {cards.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <i className="fas fa-ghost text-4xl mb-4"></i>
              <p>No cards in this deck yet.</p>
              <button onClick={() => setTab('add')} className="text-indigo-600 font-semibold mt-2 underline">Add some now</button>
            </div>
          ) : (
            cards.map(card => (
              <div key={card.id} className="bg-white border border-gray-100 p-6 rounded-2xl flex justify-between items-center group">
                <div className="flex-1 pr-4">
                  <div className="font-semibold text-gray-900 line-clamp-1">{card.front}</div>
                  <div className="text-gray-500 text-sm line-clamp-1 mt-1">{card.back}</div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-xs text-gray-400 italic">
                    {card.nextReviewAt <= Date.now() ? 'Due Now' : 'Upcoming'}
                  </div>
                  <button onClick={() => onDeleteCard(card.id)} className="text-gray-300 hover:text-red-500 p-2 transition-colors">
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {tab === 'add' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm h-fit">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <i className="fas fa-keyboard mr-2 text-indigo-500"></i> Manual Entry
            </h3>
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Front side (Question)"
                value={front}
                onChange={e => setFront(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <input 
                type="text" 
                placeholder="Back side (Answer)"
                value={back}
                onChange={e => setBack(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <textarea 
                placeholder="Explanation or context (Optional)"
                value={explanation}
                onChange={e => setExplanation(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none h-24"
              />
              <button 
                onClick={handleManualAdd}
                className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors"
              >
                Add Card
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-3xl shadow-xl text-white">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <i className="fas fa-magic mr-2"></i> AI Magic Generate
            </h3>
            <p className="text-indigo-100 text-sm mb-6">Enter a topic or paste a paragraph, and let Gemini create 5 high-quality flashcards for you instantly.</p>
            <div className="space-y-4">
              <textarea 
                placeholder="e.g., Photosynthesis process, The French Revolution, or paste your textbook text here..."
                value={aiTopic}
                onChange={e => setAiTopic(e.target.value)}
                disabled={isGenerating}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-indigo-200 focus:ring-2 focus:ring-white outline-none h-32 resize-none"
              />
              <button 
                onClick={handleAiGenerate}
                disabled={isGenerating || !aiTopic.trim()}
                className="w-full py-3 bg-white text-indigo-600 rounded-xl font-bold hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isGenerating ? (
                  <>
                    <i className="fas fa-circle-notch fa-spin mr-2"></i> Working...
                  </>
                ) : (
                  'Generate 5 Cards'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl">
            <h2 className="text-xl font-bold mb-4 text-red-600">Delete Deck?</h2>
            <p className="text-gray-600 mb-8">This will permanently delete this deck and all its {cards.length} cards. This cannot be undone.</p>
            <div className="flex space-x-3">
              <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 px-4 py-2 border border-gray-200 rounded-xl font-semibold text-gray-600">Cancel</button>
              <button onClick={() => { onDeleteDeck(deck.id); setShowDeleteConfirm(false); onBack(); }} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl font-semibold">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeckView;
