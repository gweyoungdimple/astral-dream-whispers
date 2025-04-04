
import React, { useState, useRef } from 'react';
import StarryBackground from '../components/StarryBackground';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Moon, Play, Pause, Volume2, VolumeX, Music } from 'lucide-react';

// Define the sound types
interface SoundOption {
  id: string;
  name: string;
  file: string;
  category: 'cosmic' | 'nature' | 'lullaby';
  icon: React.ReactNode;
}

const SOUND_OPTIONS: SoundOption[] = [
  { 
    id: 'cosmic-wind', 
    name: 'Cosmic Wind', 
    file: 'https://assets.mixkit.co/music/preview/mixkit-dreaming-big-31.mp3',
    category: 'cosmic',
    icon: <Moon className="h-5 w-5" />
  },
  { 
    id: 'star-whispers', 
    name: 'Star Whispers', 
    file: 'https://assets.mixkit.co/music/preview/mixkit-horizon-6482.mp3',
    category: 'cosmic',
    icon: <Moon className="h-5 w-5" />
  },
  { 
    id: 'gentle-rain', 
    name: 'Gentle Rain', 
    file: 'https://assets.mixkit.co/music/preview/mixkit-misty-forest-632.mp3',
    category: 'nature',
    icon: <Moon className="h-5 w-5" />
  },
  { 
    id: 'moonlit-lullaby', 
    name: 'Moonlit Lullaby', 
    file: 'https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3',
    category: 'lullaby',
    icon: <Moon className="h-5 w-5" />
  },
];

const Soundscapes = () => {
  const [playing, setPlaying] = useState<string | null>(null);
  const [volume, setVolume] = useState<number>(0.5);
  const [muted, setMuted] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const togglePlay = (soundId: string) => {
    if (playing === soundId) {
      audioRef.current?.pause();
      setPlaying(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      const sound = SOUND_OPTIONS.find(s => s.id === soundId);
      if (sound) {
        audioRef.current = new Audio(sound.file);
        audioRef.current.volume = muted ? 0 : volume;
        audioRef.current.loop = true;
        audioRef.current.play();
        setPlaying(soundId);
      }
    }
  };
  
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = muted ? 0 : newVolume;
    }
  };
  
  const toggleMute = () => {
    setMuted(!muted);
    if (audioRef.current) {
      audioRef.current.volume = !muted ? 0 : volume;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <StarryBackground />
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <section className="mb-12 text-center max-w-3xl mx-auto animate-fade-in">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-affirmation-gradient bg-clip-text text-transparent">
            Starry Sky Sleep Soundscapes
          </h1>
          <p className="text-lg text-cosmic-foreground/80 mb-8">
            Drift into peaceful dreams with our collection of celestial and nature soundscapes
          </p>
        </section>
        
        <section className="mb-8">
          <div className="cosmic-card p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Music className="text-cosmic-accent" />
                Sleep Soundscapes
              </h2>
              
              <div className="flex items-center space-x-4">
                <button 
                  onClick={toggleMute}
                  className="p-2 rounded-full hover:bg-cosmic-accent/20 transition-colors"
                >
                  {muted ? <VolumeX className="h-5 w-5 text-cosmic-accent-light" /> : <Volume2 className="h-5 w-5 text-cosmic-accent-light" />}
                </button>
                
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-24 md:w-32 accent-cosmic-accent"
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {SOUND_OPTIONS.map((sound) => (
                <div 
                  key={sound.id}
                  className={`cosmic-card animate-float cursor-pointer transition-all hover:scale-102 duration-300 ${playing === sound.id ? 'bg-cosmic-accent/20 border-cosmic-accent' : ''}`}
                  onClick={() => togglePlay(sound.id)}
                >
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-cosmic-accent/20 p-2 rounded-full">
                        {sound.icon}
                      </div>
                      <div>
                        <h3 className="font-medium text-cosmic-highlight">{sound.name}</h3>
                        <p className="text-sm text-cosmic-foreground/70 capitalize">{sound.category}</p>
                      </div>
                    </div>
                    
                    <button className="h-10 w-10 flex items-center justify-center rounded-full bg-cosmic-accent/30 hover:bg-cosmic-accent/50 transition-colors">
                      {playing === sound.id ? (
                        <Pause className="h-5 w-5 text-cosmic-foreground" />
                      ) : (
                        <Play className="h-5 w-5 ml-0.5 text-cosmic-foreground" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-4 rounded-lg bg-cosmic-blue-light/20 text-cosmic-foreground/80 text-sm">
              <p className="flex items-center">
                <Moon className="h-4 w-4 mr-2 text-cosmic-accent-light" />
                Playing soft cosmic sounds can help reduce anxiety and improve sleep quality.
              </p>
            </div>
          </div>
        </section>
        
        <section className="mb-16 animate-fade-in">
          <div className="cosmic-card p-6">
            <h2 className="text-xl font-semibold mb-4">Create Your Dream Atmosphere</h2>
            <p className="text-cosmic-foreground/80 mb-4">
              Combining gentle sounds with the right sleep environment can help you drift off to peaceful dreams.
              Try these tips for a more restful night:
            </p>
            
            <ul className="space-y-3 text-cosmic-foreground/80">
              <li className="flex items-start">
                <span className="inline-block bg-cosmic-accent/20 p-1 rounded-full mr-3 mt-1">
                  <Moon className="h-3 w-3 text-cosmic-accent-light" />
                </span>
                <span>Dim the lights 30 minutes before bedtime to signal your body it's time to rest</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block bg-cosmic-accent/20 p-1 rounded-full mr-3 mt-1">
                  <Moon className="h-3 w-3 text-cosmic-accent-light" />
                </span>
                <span>Set a comfortable volume that masks distracting noises without being too loud</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block bg-cosmic-accent/20 p-1 rounded-full mr-3 mt-1">
                  <Moon className="h-3 w-3 text-cosmic-accent-light" />
                </span>
                <span>Keep a dream journal by your bed to record any inspirations that come during the night</span>
              </li>
            </ul>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Soundscapes;
