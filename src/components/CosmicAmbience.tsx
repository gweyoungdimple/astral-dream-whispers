
import React, { useState, useEffect, useRef } from 'react';
import { Music, Moon, Star, Volume2, VolumeX, Sun } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface SoundscapeOption {
  id: string;
  name: string;
  file: string;
  icon: React.ReactNode;
  bgColor: string;
}

const SOUNDSCAPE_OPTIONS: SoundscapeOption[] = [
  { 
    id: 'whispers-moon', 
    name: 'Whispers of the Moon', 
    file: 'https://assets.mixkit.co/music/preview/mixkit-dreaming-big-31.mp3',
    icon: <Moon className="h-5 w-5" />,
    bgColor: 'from-cosmic-blue-light/30 to-cosmic-blue/50'
  },
  { 
    id: 'cosmic-wind', 
    name: 'Cosmic Wind', 
    file: 'https://assets.mixkit.co/music/preview/mixkit-horizon-6482.mp3',
    icon: <Star className="h-5 w-5" />,
    bgColor: 'from-cosmic-pink/30 to-cosmic-accent/40'
  },
  { 
    id: 'nebula-lullaby', 
    name: 'Nebula Lullaby', 
    file: 'https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3',
    icon: <Music className="h-5 w-5" />,
    bgColor: 'from-cosmic-highlight/20 to-cosmic-pink/30'
  }
];

const CosmicAmbience = () => {
  const [activeSoundscape, setActiveSoundscape] = useState<string | null>(null);
  const [volume, setVolume] = useState(0.3);
  const [muted, setMuted] = useState(false);
  const [relaxationMode, setRelaxationMode] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();
  
  // Time of day state
  const [timeOfDay, setTimeOfDay] = useState<'day' | 'night'>('day');
  
  // Check time of day
  useEffect(() => {
    const checkTimeOfDay = () => {
      const hour = new Date().getHours();
      setTimeOfDay(hour >= 6 && hour < 18 ? 'day' : 'night');
    };
    
    checkTimeOfDay();
    const interval = setInterval(checkTimeOfDay, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, []);
  
  // Handle audio playback
  const toggleSoundscape = (soundId: string) => {
    if (activeSoundscape === soundId) {
      audioRef.current?.pause();
      setActiveSoundscape(null);
      toast({
        title: "Soundscape stopped",
        description: "Cosmic sounds have been silenced."
      });
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      const sound = SOUNDSCAPE_OPTIONS.find(s => s.id === soundId);
      if (sound) {
        audioRef.current = new Audio(sound.file);
        audioRef.current.volume = muted ? 0 : volume;
        audioRef.current.loop = true;
        audioRef.current.play().catch(err => {
          console.error("Audio playback error:", err);
          toast({
            title: "Playback Error",
            description: "Could not play the cosmic sounds. Please try again.",
            variant: "destructive"
          });
        });
        setActiveSoundscape(soundId);
        toast({
          title: "Soundscape activated",
          description: `Now playing: ${sound.name}`
        });
      }
    }
  };
  
  // Update volume when changed
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = muted ? 0 : volume;
    }
  }, [volume, muted]);
  
  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  
  // Toggle mute
  const toggleMute = () => {
    setMuted(!muted);
    if (audioRef.current) {
      audioRef.current.volume = !muted ? 0 : volume;
    }
  };
  
  // Toggle relaxation mode
  const toggleRelaxationMode = () => {
    setRelaxationMode(!relaxationMode);
    // Apply relaxation mode class to body
    if (!relaxationMode) {
      document.body.classList.add('relaxation-mode');
      toast({
        title: "Relaxation Mode Enabled",
        description: "Enjoy a calmer environment for your cosmic journey."
      });
    } else {
      document.body.classList.remove('relaxation-mode');
      toast({
        title: "Relaxation Mode Disabled",
        description: "Returning to standard cosmic illumination."
      });
    }
  };
  
  return (
    <div className={`cosmic-card mb-8 ${relaxationMode ? 'relaxation-active' : ''}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Music className="text-cosmic-accent" />
          Cosmic Sound & Light
        </h2>
        
        <div className="flex items-center space-x-3">
          <button 
            onClick={toggleMute}
            className="p-2 rounded-full hover:bg-cosmic-accent/20 transition-colors"
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? 
              <VolumeX className="h-5 w-5 text-cosmic-accent-light" /> : 
              <Volume2 className="h-5 w-5 text-cosmic-accent-light" />
            }
          </button>
          
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-24 md:w-32 accent-cosmic-accent"
              aria-label="Volume control"
            />
          </div>
          
          <button
            onClick={toggleRelaxationMode}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full transition-colors ${
              relaxationMode
                ? 'bg-cosmic-accent text-cosmic-foreground'
                : 'bg-cosmic-blue-light/30 text-cosmic-accent-light hover:bg-cosmic-blue-light/50'
            }`}
            aria-label={relaxationMode ? "Disable relaxation mode" : "Enable relaxation mode"}
          >
            {timeOfDay === 'day' ? 
              <Sun className="h-4 w-4" /> : 
              <Moon className="h-4 w-4" />
            }
            <span className="text-sm">Relaxation Mode</span>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        {SOUNDSCAPE_OPTIONS.map((sound) => (
          <div 
            key={sound.id}
            onClick={() => toggleSoundscape(sound.id)}
            className={`relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 ${
              activeSoundscape === sound.id
                ? 'border-2 border-cosmic-accent shadow-lg shadow-cosmic-accent/30'
                : 'border border-cosmic-accent/20'
            }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${sound.bgColor} opacity-60`}></div>
            <div className={`absolute inset-0 ${activeSoundscape === sound.id ? 'animate-pulse-slow' : ''}`}>
              <div className="h-full w-full bg-star-gradient opacity-10 blur-md"></div>
            </div>
            
            <div className="relative z-10 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${
                  activeSoundscape === sound.id
                    ? 'bg-cosmic-accent text-cosmic-foreground'
                    : 'bg-cosmic-accent/20 text-cosmic-accent-light'
                }`}>
                  {sound.icon}
                </div>
                <span className="font-medium text-cosmic-foreground">{sound.name}</span>
              </div>
              
              <div className={`h-2 w-2 rounded-full ${
                activeSoundscape === sound.id
                  ? 'bg-cosmic-accent animate-pulse'
                  : 'bg-cosmic-foreground/30'
              }`}></div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 rounded-lg bg-cosmic-blue-light/20 text-cosmic-foreground/80 text-sm">
        <p className="flex items-center">
          <Star className="h-4 w-4 mr-2 text-cosmic-accent-light" />
          {timeOfDay === 'day' 
            ? "The stars are always present, even in daylight. Listen closely to their whispers."
            : "The night sky is alive with cosmic energy. Let the stars guide your journey."}
        </p>
      </div>
    </div>
  );
};

export default CosmicAmbience;
