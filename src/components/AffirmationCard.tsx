
import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';

// List of cosmic affirmations
const AFFIRMATIONS = [
  "You are as infinite as the stars above",
  "Your dreams contain the wisdom of the cosmos",
  "You are connected to the rhythm of the universe",
  "Like the moon, you can shine even in darkness",
  "Your light is unique in the cosmos",
  "Trust the timing of your journey through the stars",
  "You hold galaxies of potential within you",
  "Every phase of your life has purpose, like the moon",
  "The universe conspires to help you dream",
  "Your energy ripples across the cosmic web",
  "You are made of stardust and magic",
  "Your path is illuminated by inner starlight",
  "Like constellations, your experiences connect to form meaning",
  "The cosmos whispers ancient wisdom to your dreaming mind",
  "Your soul shines with the light of a thousand stars"
];

const AffirmationCard = () => {
  const [affirmation, setAffirmation] = useState("");
  
  useEffect(() => {
    // Get today's date to seed the random generator
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    
    // Simple pseudo-random generator with seed
    const seededRandom = () => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };
    
    // Get a consistent affirmation for the day
    const affirmationIndex = Math.floor(seededRandom() * AFFIRMATIONS.length);
    setAffirmation(AFFIRMATIONS[affirmationIndex]);
  }, []);
  
  return (
    <div id="affirmations" className="cosmic-card flex flex-col items-center text-center max-w-xl mx-auto transition-all hover:scale-102 duration-500 bg-gradient-to-br from-cosmic-blue/90 to-cosmic-blue-light/50">
      <div className="mb-4">
        <Star className="h-6 w-6 text-cosmic-highlight" />
      </div>
      <h3 className="text-xl font-semibold mb-3">Today's Cosmic Affirmation</h3>
      <p className="text-lg md:text-xl italic mb-6 text-cosmic-accent-light">
        "{affirmation}"
      </p>
      <p className="text-sm text-cosmic-foreground/70">
        Reflect on this affirmation as you journey through your day
      </p>
    </div>
  );
};

export default AffirmationCard;
