
import React, { useState } from 'react';
import { Star, Moon, Plus, Save } from 'lucide-react';
import DreamEntry, { DreamEntryProps } from './DreamEntry';

const EXAMPLE_DREAMS: DreamEntryProps[] = [
  {
    id: '1',
    title: 'Flying Through the Cosmos',
    description: 'I dreamt I was soaring through a purple nebula, touching stars as I passed by. Each star whispered a secret to me, but I could only remember one: "The moon remembers what the stars forget."',
    date: new Date('2025-04-02'),
    mood: 'Peaceful',
    symbols: ['Stars', 'Flight', 'Secrets']
  },
  {
    id: '2',
    title: 'Ocean of Stars',
    description: 'I was swimming in an ocean where the waves were made of stardust. The deeper I swam, the more constellations appeared around me, forming a map that seemed to lead somewhere important.',
    date: new Date('2025-04-01'),
    mood: 'Curious',
    symbols: ['Ocean', 'Stars', 'Map']
  }
];

const MOOD_OPTIONS = ['Peaceful', 'Curious', 'Mystical', 'Anxious', 'Joyful', 'Confused', 'Inspired'];

const DreamJournal = () => {
  const [dreams, setDreams] = useState<DreamEntryProps[]>(EXAMPLE_DREAMS);
  const [isAdding, setIsAdding] = useState(false);
  
  // New dream form state
  const [newDream, setNewDream] = useState({
    title: '',
    description: '',
    mood: 'Peaceful',
    symbols: [] as string[],
    currentSymbol: ''
  });
  
  const handleAddDream = () => {
    if (!newDream.title || !newDream.description) return;
    
    const dream: DreamEntryProps = {
      id: Date.now().toString(),
      title: newDream.title,
      description: newDream.description,
      date: new Date(),
      mood: newDream.mood,
      symbols: newDream.symbols
    };
    
    setDreams([dream, ...dreams]);
    setNewDream({
      title: '',
      description: '',
      mood: 'Peaceful',
      symbols: [],
      currentSymbol: ''
    });
    setIsAdding(false);
  };
  
  const addSymbol = () => {
    if (!newDream.currentSymbol.trim()) return;
    if (newDream.symbols.includes(newDream.currentSymbol.trim())) return;
    
    setNewDream({
      ...newDream,
      symbols: [...newDream.symbols, newDream.currentSymbol.trim()],
      currentSymbol: ''
    });
  };
  
  const removeSymbol = (symbol: string) => {
    setNewDream({
      ...newDream,
      symbols: newDream.symbols.filter(s => s !== symbol)
    });
  };
  
  return (
    <div id="dreams" className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <Moon className="text-cosmic-accent" />
          Dream Journal
        </h2>
        
        {!isAdding && (
          <button 
            className="cosmic-button flex items-center gap-2"
            onClick={() => setIsAdding(true)}
          >
            <Plus className="h-4 w-4" />
            New Dream
          </button>
        )}
      </div>
      
      {isAdding && (
        <div className="cosmic-card mb-8 animate-fade-in">
          <h3 className="text-lg font-medium mb-4">Record a New Dream</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Dream Title</label>
              <input
                type="text"
                className="cosmic-input w-full"
                placeholder="Give your dream a name..."
                value={newDream.title}
                onChange={(e) => setNewDream({...newDream, title: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Dream Description</label>
              <textarea
                className="cosmic-input w-full min-h-[120px]"
                placeholder="Describe what happened in your dream..."
                value={newDream.description}
                onChange={(e) => setNewDream({...newDream, description: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Mood</label>
              <select
                className="cosmic-input w-full"
                value={newDream.mood}
                onChange={(e) => setNewDream({...newDream, mood: e.target.value})}
              >
                {MOOD_OPTIONS.map((mood) => (
                  <option key={mood} value={mood}>{mood}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Dream Symbols</label>
              <div className="flex">
                <input
                  type="text"
                  className="cosmic-input w-full"
                  placeholder="Add a symbol (e.g., Moon, Water, Flying...)"
                  value={newDream.currentSymbol}
                  onChange={(e) => setNewDream({...newDream, currentSymbol: e.target.value})}
                  onKeyPress={(e) => e.key === 'Enter' && addSymbol()}
                />
                <button 
                  className="ml-2 px-4 bg-cosmic-accent/30 rounded-lg hover:bg-cosmic-accent/50"
                  onClick={addSymbol}
                >
                  Add
                </button>
              </div>
              
              {newDream.symbols.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {newDream.symbols.map((symbol, index) => (
                    <span 
                      key={index} 
                      className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-cosmic-accent/20 text-cosmic-accent-light cursor-pointer hover:bg-cosmic-accent/30"
                      onClick={() => removeSymbol(symbol)}
                    >
                      <Star className="h-3 w-3 mr-1" />
                      {symbol} ×
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex justify-end gap-3 pt-2">
              <button 
                className="px-4 py-2 text-cosmic-accent-light hover:text-cosmic-foreground"
                onClick={() => setIsAdding(false)}
              >
                Cancel
              </button>
              <button 
                className="cosmic-button flex items-center gap-2"
                onClick={handleAddDream}
              >
                <Save className="h-4 w-4" />
                Save Dream
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="space-y-4">
        {dreams.length > 0 ? (
          dreams.map((dream) => (
            <DreamEntry key={dream.id} {...dream} />
          ))
        ) : (
          <div className="text-center py-8 text-cosmic-foreground/70">
            <p>No dreams recorded yet. Click "New Dream" to begin your cosmic journey.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DreamJournal;
