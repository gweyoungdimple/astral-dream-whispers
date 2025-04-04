
import React, { useState } from 'react';
import { Search, Star, Moon, Book } from 'lucide-react';

interface DreamSymbol {
  symbol: string;
  meaning: string;
  affirmation: string;
  category: 'celestial' | 'nature' | 'emotion' | 'object' | 'action';
}

const DREAM_SYMBOLS: DreamSymbol[] = [
  {
    symbol: 'Stars',
    meaning: 'Stars in dreams often represent hope, guidance, and inspiration. They can signify your aspirations or cosmic connection.',
    affirmation: 'I follow my inner light to reach my highest potential.',
    category: 'celestial'
  },
  {
    symbol: 'Moon',
    meaning: 'The moon symbolizes intuition, the subconscious mind, and emotional cycles. Its phase in your dream may indicate your current emotional state.',
    affirmation: 'I honor my emotional rhythms and trust my intuition.',
    category: 'celestial'
  },
  {
    symbol: 'Flying',
    meaning: 'Flying in dreams often represents freedom, transcendence, and perspective. It can indicate a desire to rise above challenges.',
    affirmation: 'I rise above limitations and see my life from a higher perspective.',
    category: 'action'
  },
  {
    symbol: 'Water',
    meaning: 'Water symbolizes the emotions and the unconscious mind. Calm water reflects emotional peace, while stormy water may indicate emotional turbulence.',
    affirmation: 'I flow with life\'s currents and trust my emotional wisdom.',
    category: 'nature'
  },
  {
    symbol: 'Falling',
    meaning: 'Falling often represents insecurity, loss of control, or fear of failure. It may reflect anxiety about a specific situation in your life.',
    affirmation: 'I trust the process of life, even when I feel like I\'m falling.',
    category: 'action'
  },
  {
    symbol: 'Door',
    meaning: 'Doors in dreams symbolize opportunities, transitions, and choices. The state of the door (open, closed, locked) offers additional insight.',
    affirmation: 'I open myself to new possibilities and walk through doors of opportunity.',
    category: 'object'
  },
  {
    symbol: 'Light',
    meaning: 'Light represents insight, awareness, truth, and spiritual awakening. It can indicate guidance during a dark or confusing time.',
    affirmation: 'I am guided by my inner light and cosmic wisdom.',
    category: 'celestial'
  },
  {
    symbol: 'Shadow',
    meaning: 'Shadows may represent unknown or repressed aspects of yourself, fears, or potential that hasn\'t been recognized yet.',
    affirmation: 'I embrace all aspects of myself, including the shadows that help me grow.',
    category: 'emotion'
  }
];

const DreamSymbols = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSymbol, setSelectedSymbol] = useState<DreamSymbol | null>(null);
  
  const filteredSymbols = DREAM_SYMBOLS.filter(symbol => {
    const matchesSearch = symbol.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? symbol.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });
  
  const categories = [
    { id: 'celestial', name: 'Celestial', icon: <Star className="h-4 w-4" /> },
    { id: 'nature', name: 'Nature', icon: <Moon className="h-4 w-4" /> },
    { id: 'emotion', name: 'Emotions', icon: <Moon className="h-4 w-4" /> },
    { id: 'object', name: 'Objects', icon: <Moon className="h-4 w-4" /> },
    { id: 'action', name: 'Actions', icon: <Moon className="h-4 w-4" /> }
  ];
  
  return (
    <div className="cosmic-card mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Book className="text-cosmic-accent" />
          Astral Dream Dictionary
        </h2>
      </div>
      
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            className="cosmic-input w-full pl-10"
            placeholder="Search dream symbols..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cosmic-foreground/50 h-5 w-5" />
        </div>
      </div>
      
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          className={`px-3 py-1 rounded-full text-sm ${selectedCategory === null ? 'bg-cosmic-accent text-cosmic-foreground' : 'bg-cosmic-accent/20 text-cosmic-accent-light'}`}
          onClick={() => setSelectedCategory(null)}
        >
          All
        </button>
        
        {categories.map((category) => (
          <button
            key={category.id}
            className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${selectedCategory === category.id ? 'bg-cosmic-accent text-cosmic-foreground' : 'bg-cosmic-accent/20 text-cosmic-accent-light'}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.icon}
            {category.name}
          </button>
        ))}
      </div>
      
      {selectedSymbol ? (
        <div className="animate-fade-in">
          <button
            className="text-cosmic-accent-light mb-4 flex items-center"
            onClick={() => setSelectedSymbol(null)}
          >
            ← Back to symbols
          </button>
          
          <div className="cosmic-card bg-gradient-to-br from-cosmic-blue/90 to-cosmic-blue-light/50 p-5">
            <h3 className="text-lg font-medium text-cosmic-highlight mb-2 flex items-center">
              <Star className="mr-2 h-5 w-5" />
              {selectedSymbol.symbol}
            </h3>
            
            <p className="mb-4 text-cosmic-foreground/90">
              {selectedSymbol.meaning}
            </p>
            
            <div className="mb-2 text-sm text-cosmic-foreground/70">
              Cosmic Affirmation:
            </div>
            <p className="italic text-cosmic-accent-light">
              "{selectedSymbol.affirmation}"
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredSymbols.map((symbol) => (
            <div
              key={symbol.symbol}
              className="cosmic-card p-4 cursor-pointer transition-all hover:scale-105 animate-fade-in"
              onClick={() => setSelectedSymbol(symbol)}
            >
              <h3 className="font-medium text-cosmic-highlight mb-1">{symbol.symbol}</h3>
              <p className="text-sm text-cosmic-foreground/70 truncate">
                {symbol.meaning.substring(0, 60)}...
              </p>
              <div className="mt-2">
                <span className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-cosmic-accent/10 text-cosmic-accent-light">
                  {symbol.category}
                </span>
              </div>
            </div>
          ))}
          
          {filteredSymbols.length === 0 && (
            <div className="col-span-3 text-center py-8 text-cosmic-foreground/70">
              <p>No dream symbols found. Try a different search term or category.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DreamSymbols;
