
import React, { useEffect, useState } from 'react';

// Moon phase names
const MOON_PHASES = [
  "New Moon",
  "Waxing Crescent",
  "First Quarter",
  "Waxing Gibbous",
  "Full Moon",
  "Waning Gibbous",
  "Last Quarter",
  "Waning Crescent"
];

// Moon phase descriptions
const MOON_DESCRIPTIONS = [
  "A time for new beginnings and setting intentions",
  "A time for growth, building momentum and taking action",
  "A time for decision making and overcoming challenges",
  "A time for refinement, hard work and continued progress",
  "A time for completion, celebration and manifestation",
  "A time for gratitude, sharing and self-reflection",
  "A time for release, letting go and forgiveness",
  "A time for rest, surrender and preparing for renewal"
];

const MoonPhase = () => {
  const [moonPhase, setMoonPhase] = useState<number>(0);
  
  useEffect(() => {
    // Simple moon phase calculation
    // This calculates a rough approximation of the moon phase
    const calculateMoonPhase = () => {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      
      // Calculating the Julian date
      const jd = (day - 32075 + Math.floor(1461 * (year + 4800 + Math.floor((month - 14) / 12)) / 4) + 
                 Math.floor(367 * (month - 2 - 12 * Math.floor((month - 14) / 12)) / 12) - 
                 Math.floor(3 * Math.floor((year + 4900 + Math.floor((month - 14) / 12)) / 100) / 4)) - 0.5;
      
      // Calculating the moon phase (0-7)
      const moonPhaseDay = Math.floor(((jd / 29.53) % 1) * 8);
      
      setMoonPhase(moonPhaseDay);
    };
    
    calculateMoonPhase();
  }, []);
  
  // Moon phase visualization
  let moonVisualization;
  
  switch(moonPhase) {
    case 0: // New Moon
      moonVisualization = (
        <div className="w-16 h-16 rounded-full bg-cosmic-blue border border-cosmic-accent/30"></div>
      );
      break;
    case 1: // Waxing Crescent
      moonVisualization = (
        <div className="w-16 h-16 rounded-full bg-cosmic-blue border border-cosmic-accent/30 overflow-hidden">
          <div className="h-full w-4 ml-3 bg-cosmic-foreground/90"></div>
        </div>
      );
      break;
    case 2: // First Quarter
      moonVisualization = (
        <div className="w-16 h-16 rounded-full bg-cosmic-blue border border-cosmic-accent/30 overflow-hidden">
          <div className="h-full w-8 bg-cosmic-foreground/90"></div>
        </div>
      );
      break;
    case 3: // Waxing Gibbous
      moonVisualization = (
        <div className="w-16 h-16 rounded-full bg-cosmic-blue border border-cosmic-accent/30 overflow-hidden">
          <div className="h-full w-12 bg-cosmic-foreground/90"></div>
        </div>
      );
      break;
    case 4: // Full Moon
      moonVisualization = (
        <div className="w-16 h-16 rounded-full bg-moon-gradient border border-cosmic-accent/30 animate-glow"></div>
      );
      break;
    case 5: // Waning Gibbous
      moonVisualization = (
        <div className="w-16 h-16 rounded-full bg-cosmic-blue border border-cosmic-accent/30 overflow-hidden">
          <div className="h-full w-12 ml-auto bg-cosmic-foreground/90"></div>
        </div>
      );
      break;
    case 6: // Last Quarter
      moonVisualization = (
        <div className="w-16 h-16 rounded-full bg-cosmic-blue border border-cosmic-accent/30 overflow-hidden">
          <div className="h-full w-8 ml-auto bg-cosmic-foreground/90"></div>
        </div>
      );
      break;
    case 7: // Waning Crescent
      moonVisualization = (
        <div className="w-16 h-16 rounded-full bg-cosmic-blue border border-cosmic-accent/30 overflow-hidden">
          <div className="h-full w-4 ml-auto mr-3 bg-cosmic-foreground/90"></div>
        </div>
      );
      break;
    default:
      moonVisualization = (
        <div className="w-16 h-16 rounded-full bg-cosmic-blue border border-cosmic-accent/30"></div>
      );
  }
  
  return (
    <div className="cosmic-card animate-float">
      <h3 className="text-lg font-semibold mb-4 text-center">Today's Moon</h3>
      <div className="flex flex-col items-center space-y-4">
        <div className="p-2">
          {moonVisualization}
        </div>
        <div className="text-center">
          <p className="text-cosmic-highlight font-medium">{MOON_PHASES[moonPhase]}</p>
          <p className="text-sm text-cosmic-foreground/80 mt-2 max-w-xs">
            {MOON_DESCRIPTIONS[moonPhase]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MoonPhase;
