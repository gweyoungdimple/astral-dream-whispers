
import React, { useState, useRef } from 'react';
import { Moon, PlayCircle, PauseCircle, Volume2, VolumeX } from 'lucide-react';

interface Meditation {
  id: string;
  title: string;
  description: string;
  duration: string;
  audioUrl: string;
  celestialTheme: string;
}

const MEDITATIONS: Meditation[] = [
  {
    id: 'starlight-healing',
    title: 'Starlight Healing Meditation',
    description: 'Allow the gentle light of the stars to heal and renew your body and mind as you drift into deep relaxation.',
    duration: '5 minutes',
    audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-dreaming-big-31.mp3',
    celestialTheme: 'Stars'
  },
  {
    id: 'moon-reflection',
    title: 'Full Moon Reflection',
    description: 'Connect with the energy of the full moon to release what no longer serves you and set intentions for the future.',
    duration: '8 minutes',
    audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-horizon-6482.mp3',
    celestialTheme: 'Moon'
  },
  {
    id: 'cosmic-journey',
    title: 'Cosmic Journey Visualization',
    description: 'Travel through the cosmos, connecting with planets and stars while gaining perspective on your place in the universe.',
    duration: '10 minutes',
    audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3',
    celestialTheme: 'Cosmos'
  }
];

const GuidedMeditation = () => {
  const [activeMeditation, setActiveMeditation] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const handleMeditationSelect = (meditationId: string) => {
    if (activeMeditation === meditationId) {
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current?.play();
        setIsPlaying(true);
      }
      return;
    }
    
    // Stop current audio if playing
    if (audioRef.current) {
      audioRef.current.pause();
    }
    
    // Set up new audio
    const meditation = MEDITATIONS.find(m => m.id === meditationId);
    if (meditation) {
      setActiveMeditation(meditationId);
      
      audioRef.current = new Audio(meditation.audioUrl);
      audioRef.current.volume = isMuted ? 0 : volume;
      audioRef.current.loop = true;
      
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(error => {
        console.error("Audio playback error:", error);
        setIsPlaying(false);
      });
    }
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.volume = !isMuted ? 0 : volume;
    }
  };
  
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current && !isMuted) {
      audioRef.current.volume = newVolume;
    }
  };
  
  const activeMeditationData = MEDITATIONS.find(m => m.id === activeMeditation);
  
  return (
    <div className="cosmic-card mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Moon className="text-cosmic-accent" />
          Starlight Meditation & Visualization
        </h2>
        
        {activeMeditation && (
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleMute}
              className="p-2 rounded-full hover:bg-cosmic-accent/20 transition-colors"
            >
              {isMuted ? 
                <VolumeX className="h-5 w-5 text-cosmic-accent-light" /> : 
                <Volume2 className="h-5 w-5 text-cosmic-accent-light" />
              }
            </button>
            
            <div className="w-24 md:w-32">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full accent-cosmic-accent"
              />
            </div>
          </div>
        )}
      </div>
      
      <p className="text-cosmic-foreground/80 mb-6">
        Select a guided meditation to help calm your mind, enhance your dream recall, and connect with cosmic energy.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {MEDITATIONS.map((meditation) => (
          <div
            key={meditation.id}
            className={`cosmic-card animate-float cursor-pointer transition-all hover:scale-102 duration-300 ${activeMeditation === meditation.id ? 'bg-cosmic-accent/20 border-cosmic-accent' : ''}`}
            onClick={() => handleMeditationSelect(meditation.id)}
          >
            <div className="relative">
              <div className="mb-4 h-40 bg-cosmic-blue-light/30 rounded-lg flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-cosmic-accent via-transparent to-transparent"></div>
                {activeMeditation === meditation.id && isPlaying ? (
                  <PauseCircle className="h-16 w-16 text-cosmic-accent-light" />
                ) : (
                  <PlayCircle className="h-16 w-16 text-cosmic-accent-light" />
                )}
              </div>
              
              <h3 className="font-medium text-cosmic-highlight mb-1">{meditation.title}</h3>
              
              <div className="flex justify-between text-sm text-cosmic-foreground/70 mb-2">
                <span>{meditation.duration}</span>
                <span>{meditation.celestialTheme}</span>
              </div>
              
              <p className="text-sm text-cosmic-foreground/80">
                {meditation.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {activeMeditationData && (
        <div className="cosmic-card bg-gradient-to-br from-cosmic-blue/90 to-cosmic-blue-light/50 p-5 animate-fade-in">
          <h3 className="text-lg font-medium text-cosmic-highlight mb-3">
            Now Playing: {activeMeditationData.title}
          </h3>
          
          <p className="text-cosmic-foreground/90 mb-4">
            Find a comfortable position, close your eyes, and allow yourself to be guided through this meditation. 
            Focus on your breath and let cosmic energy fill your being.
          </p>
          
          <div className="text-sm text-cosmic-foreground/70">
            <p>As you listen to this {activeMeditationData.celestialTheme}-themed meditation:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Visualize cosmic light surrounding your body</li>
              <li>Release any tension with each breath</li>
              <li>Set an intention for your dreams tonight</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuidedMeditation;
