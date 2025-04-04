
import React from 'react';
import { Clock, Star } from 'lucide-react';

export interface DreamEntryProps {
  id: string;
  title: string;
  description: string;
  date: Date;
  mood: string;
  symbols: string[];
}

const DreamEntry = ({ title, description, date, mood, symbols }: DreamEntryProps) => {
  // Format date to show day and month
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);

  return (
    <div className="cosmic-card mb-6 animate-fade-in">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-medium text-cosmic-highlight">{title}</h3>
        <div className="flex items-center text-sm text-cosmic-foreground/70">
          <Clock className="h-3 w-3 mr-1" />
          <span>{formattedDate}</span>
        </div>
      </div>
      
      <p className="text-cosmic-foreground/90 mb-4">{description}</p>
      
      <div className="flex flex-wrap justify-between items-center">
        <div className="mb-2">
          <span className="text-sm text-cosmic-foreground/70 mr-2">Mood:</span>
          <span className="text-cosmic-accent-light">{mood}</span>
        </div>
        
        {symbols.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {symbols.map((symbol, index) => (
              <span 
                key={index} 
                className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-cosmic-accent/20 text-cosmic-accent-light"
              >
                <Star className="h-3 w-3 mr-1" />
                {symbol}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DreamEntry;
