
import React, { useState, useEffect } from 'react';
import { Star, Plus, Save, Calendar } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface GratitudeEntry {
  id: string;
  text: string;
  date: Date;
  mood: string;
}

const MOOD_OPTIONS = ['Grateful', 'Blessed', 'Peaceful', 'Inspired', 'Joyful'];

const GratitudeJournal = () => {
  const [entries, setEntries] = useState<GratitudeEntry[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newEntry, setNewEntry] = useState({
    text: '',
    mood: 'Grateful'
  });
  const { toast } = useToast();
  
  // Load any saved entries from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('gratitudeEntries');
      if (saved) {
        const parsedEntries = JSON.parse(saved);
        // Convert date strings back to Date objects
        const formattedEntries = parsedEntries.map((entry: any) => ({
          ...entry,
          date: new Date(entry.date)
        }));
        setEntries(formattedEntries);
      }
    } catch (error) {
      console.error("Error loading gratitude entries:", error);
    }
  }, []);
  
  // Save entries to localStorage when they change
  useEffect(() => {
    if (entries.length > 0) {
      localStorage.setItem('gratitudeEntries', JSON.stringify(entries));
    }
  }, [entries]);
  
  const handleAddEntry = () => {
    if (!newEntry.text.trim()) {
      toast({
        title: "Entry Required",
        description: "Please write what you're grateful for",
        variant: "destructive",
      });
      return;
    }
    
    const entry: GratitudeEntry = {
      id: Date.now().toString(),
      text: newEntry.text,
      date: new Date(),
      mood: newEntry.mood
    };
    
    setEntries([entry, ...entries]);
    setNewEntry({
      text: '',
      mood: 'Grateful'
    });
    setIsAdding(false);
    
    toast({
      title: "Gratitude Recorded",
      description: "Your cosmic gratitude has been saved ✨",
    });
  };
  
  // Format date as "Month Day, Year"
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };
  
  return (
    <div id="gratitude" className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <Star className="text-cosmic-accent" />
          Cosmic Gratitude Journal
        </h2>
        
        {!isAdding && (
          <button 
            className="cosmic-button flex items-center gap-2"
            onClick={() => setIsAdding(true)}
          >
            <Plus className="h-4 w-4" />
            Add Gratitude
          </button>
        )}
      </div>
      
      {isAdding && (
        <div className="cosmic-card mb-8 animate-fade-in">
          <h3 className="text-lg font-medium mb-4">What are you grateful for today?</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Gratitude Entry</label>
              <textarea
                className="cosmic-input w-full min-h-[120px]"
                placeholder="Today I'm grateful for..."
                value={newEntry.text}
                onChange={(e) => setNewEntry({...newEntry, text: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Current Mood</label>
              <select
                className="cosmic-input w-full"
                value={newEntry.mood}
                onChange={(e) => setNewEntry({...newEntry, mood: e.target.value})}
              >
                {MOOD_OPTIONS.map((mood) => (
                  <option key={mood} value={mood}>{mood}</option>
                ))}
              </select>
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
                onClick={handleAddEntry}
              >
                <Save className="h-4 w-4" />
                Save Gratitude
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="space-y-4">
        {entries.length > 0 ? (
          entries.map((entry) => (
            <div key={entry.id} className="cosmic-card mb-6 animate-fade-in">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center text-sm text-cosmic-foreground/70">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>{formatDate(entry.date)}</span>
                </div>
                <span className="text-sm text-cosmic-accent-light">{entry.mood}</span>
              </div>
              
              <p className="text-cosmic-foreground/90 mb-2">{entry.text}</p>
              
              <div className="w-8 h-8 mx-auto mt-4 animate-glow">
                <div className="w-8 h-8 rounded-full bg-star-gradient opacity-40"></div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 cosmic-card bg-cosmic-blue/50">
            <Star className="mx-auto h-10 w-10 text-cosmic-accent-light mb-4 opacity-60" />
            <h3 className="text-xl font-medium text-cosmic-highlight mb-2">Your Gratitude Journal Awaits</h3>
            <p className="text-cosmic-foreground/70 max-w-md mx-auto">
              Begin recording the things you're grateful for to illuminate your cosmic journey.
              Each entry adds a star to your personal constellation.
            </p>
            <button 
              className="cosmic-button mt-6"
              onClick={() => setIsAdding(true)}
            >
              Start Your Gratitude Practice
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GratitudeJournal;
