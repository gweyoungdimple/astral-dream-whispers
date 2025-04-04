
import React, { useState } from 'react';
import StarryBackground from '../components/StarryBackground';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Sparkles, Moon, Star, Compass } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const ZODIAC_SIGNS = [
  { name: 'Aries', dates: 'March 21 - April 19', element: 'Fire', 
    description: 'Bold and ambitious, Aries dives headfirst into challenging situations.' },
  { name: 'Taurus', dates: 'April 20 - May 20', element: 'Earth',
    description: 'Reliable and devoted, Taurus values stability and security in life.' },
  { name: 'Gemini', dates: 'May 21 - June 20', element: 'Air',
    description: 'Expressive and quick-witted, Gemini represents two different sides of personality.' },
  { name: 'Cancer', dates: 'June 21 - July 22', element: 'Water',
    description: 'Deeply intuitive and sentimental, Cancer can be hard to know from the outside.' },
  { name: 'Leo', dates: 'July 23 - August 22', element: 'Fire',
    description: 'Creative and dramatic, Leo loves to bask in the spotlight and celebrate themselves.' },
  { name: 'Virgo', dates: 'August 23 - September 22', element: 'Earth',
    description: 'Practical and systematic, Virgo pays attention to the smallest details.' },
  { name: 'Libra', dates: 'September 23 - October 22', element: 'Air',
    description: 'Diplomatic and gracious, Libra values harmony and cooperation.' },
  { name: 'Scorpio', dates: 'October 23 - November 21', element: 'Water',
    description: 'Passionate and determined, Scorpio dives deep into the mysteries of life.' },
  { name: 'Sagittarius', dates: 'November 22 - December 21', element: 'Fire',
    description: 'Curious and energetic, Sagittarius is an idealistic explorer.' },
  { name: 'Capricorn', dates: 'December 22 - January 19', element: 'Earth',
    description: 'Responsible and disciplined, Capricorn is a master of self-control.' },
  { name: 'Aquarius', dates: 'January 20 - February 18', element: 'Air',
    description: 'Progressive and original, Aquarius values intellectual stimulation.' },
  { name: 'Pisces', dates: 'February 19 - March 20', element: 'Water',
    description: 'Compassionate and artistic, Pisces can often sense what others are feeling.' }
];

const HOROSCOPES = {
  "Aries": "The moon's phase is encouraging you to embrace new dreams. Your subconscious may reveal creative paths you haven't considered. Trust your intuition and write down any vivid symbols from recent dreams.",
  "Taurus": "Under the current cosmic alignment, your dreams may contain messages about security and comfort. Look for recurring symbols of home or stability, and consider what your subconscious is trying to tell you.",
  "Gemini": "The stars are aligning to enhance your communication through dreams. Pay attention to conversations in your dream state, as they may provide solutions to waking challenges.",
  "Cancer": "Your emotional dream landscape is particularly potent now. The moon's energy is amplifying your intuition. Record any emotions that linger after waking for deeper insight.",
  "Leo": "Celestial forces are highlighting your creative potential through dreams. Look for symbols of light or performance in your dream journal, as they may inspire your next creative project.",
  "Virgo": "The cosmos is sending you healing energy through your dreams. Details matter - even small symbols in your dreams carry significant meaning for your personal growth right now.",
  "Libra": "Balance is the cosmic message in your dreams currently. Notice if your dreams feature scales, symmetry, or partnership themes, as they reflect your inner harmony.",
  "Scorpio": "Transformation themes are strong in your dream state. The universe is guiding you through symbolic death and rebirth in your subconscious - embrace this powerful time of change.",
  "Sagittarius": "Your dreams may take you on journeys to distant places, reflecting your spirit's desire for expansion. Record these adventures as they contain wisdom about your path.",
  "Capricorn": "Structure in your dreams reflects your disciplined approach to life. The cosmos is showing you how to build stable foundations for your aspirations through dream symbols.",
  "Aquarius": "Unusual or futuristic dream symbols are messages from the stars about innovation in your life. Your subconscious is connecting to collective wisdom.",
  "Pisces": "The boundary between dreams and reality is especially thin for you now. Your natural connection to the cosmic dreamscape is enhanced, revealing spiritual insights."
};

const HoroscopeGuide = () => {
  const [selectedSign, setSelectedSign] = useState<string | null>(null);
  const [birthDate, setBirthDate] = useState('');
  const { toast } = useToast();

  const handleSignSelect = (sign: string) => {
    setSelectedSign(sign);
    toast({
      title: `${sign} Selected`,
      description: "Your cosmic insights have been updated",
    });
  };

  const getZodiacSign = (date: string) => {
    try {
      const dateObj = new Date(date);
      const month = dateObj.getMonth() + 1;
      const day = dateObj.getDate();
      
      if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
      if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
      if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini";
      if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer";
      if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
      if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
      if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
      if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio";
      if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius";
      if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn";
      if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius";
      if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Pisces";
      
      return null;
    } catch (e) {
      return null;
    }
  };

  const handleDateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sign = getZodiacSign(birthDate);
    if (sign) {
      setSelectedSign(sign);
      toast({
        title: `Your Sign: ${sign}`,
        description: "Your cosmic profile has been updated",
      });
    } else {
      toast({
        title: "Invalid Date",
        description: "Please enter a valid birth date",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <StarryBackground />
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <section className="mb-12 text-center max-w-3xl mx-auto animate-fade-in">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-affirmation-gradient bg-clip-text text-transparent">
            Cosmic Horoscope Guide
          </h1>
          <p className="text-lg text-cosmic-foreground/80 mb-8">
            Discover how the stars and moon influence your dreams and affirmations
          </p>
        </section>
        
        <section className="mb-8">
          <div className="cosmic-card p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Compass className="text-cosmic-accent mr-2" />
              Find Your Cosmic Sign
            </h2>
            
            <form onSubmit={handleDateSubmit} className="mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label htmlFor="birthdate" className="block text-sm font-medium mb-2 text-cosmic-foreground/80">
                    Enter your birth date
                  </label>
                  <input 
                    type="date" 
                    id="birthdate"
                    className="cosmic-input w-full" 
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-end">
                  <button type="submit" className="cosmic-button">
                    Reveal My Sign
                  </button>
                </div>
              </div>
            </form>

            <div className="text-center py-2 mb-4">
              <div className="inline-block px-4 py-1 rounded-full bg-cosmic-accent/20 text-cosmic-accent-light">
                - or select your sign below -
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {ZODIAC_SIGNS.map((sign) => (
                <div 
                  key={sign.name}
                  className={`cosmic-card p-4 cursor-pointer transition-all hover:scale-105 ${selectedSign === sign.name ? 'bg-cosmic-accent/20 border-cosmic-accent' : ''}`}
                  onClick={() => handleSignSelect(sign.name)}
                >
                  <div className="flex flex-col items-center">
                    <Star className={`h-6 w-6 ${selectedSign === sign.name ? 'text-cosmic-highlight' : 'text-cosmic-accent'}`} />
                    <h3 className="font-medium mt-2">{sign.name}</h3>
                    <p className="text-xs text-cosmic-foreground/60">{sign.dates}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {selectedSign && (
            <div className="cosmic-card p-6 animate-fade-in">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold flex items-center">
                  <Sparkles className="text-cosmic-highlight mr-2" />
                  Your Cosmic Dream Guidance
                </h2>
                <div className="px-3 py-1 bg-cosmic-accent/20 rounded-full text-sm text-cosmic-accent-light">
                  {selectedSign}
                </div>
              </div>
              
              <div className="mb-6">
                {ZODIAC_SIGNS.find(sign => sign.name === selectedSign) && (
                  <div className="flex items-center mb-4">
                    <div className="bg-cosmic-accent/10 p-2 rounded-full mr-3">
                      <Moon className="h-5 w-5 text-cosmic-accent-light" />
                    </div>
                    <div>
                      <p className="text-sm text-cosmic-foreground/80">
                        <span className="text-cosmic-highlight font-medium">Element:</span> {ZODIAC_SIGNS.find(sign => sign.name === selectedSign)?.element}
                      </p>
                    </div>
                  </div>
                )}
                
                <p className="text-cosmic-foreground/90 mb-4">
                  {ZODIAC_SIGNS.find(sign => sign.name === selectedSign)?.description}
                </p>
                
                <div className="cosmic-card bg-gradient-to-br from-cosmic-blue/90 to-cosmic-blue-light/50 p-4">
                  <h3 className="text-lg font-medium text-cosmic-highlight mb-2">Dream Horoscope</h3>
                  <p className="italic text-cosmic-accent-light">
                    {HOROSCOPES[selectedSign as keyof typeof HOROSCOPES]}
                  </p>
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="text-lg font-medium mb-3 flex items-center">
                  <Star className="text-cosmic-highlight mr-2 h-5 w-5" />
                  Cosmic Affirmations for {selectedSign}
                </h3>
                
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="bg-cosmic-accent/10 p-1 rounded-full mr-2 mt-1">
                      <Star className="h-3 w-3 text-cosmic-accent-light" />
                    </div>
                    <p className="text-cosmic-foreground/90">
                      "My dreams are guiding me toward my true cosmic purpose."
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-cosmic-accent/10 p-1 rounded-full mr-2 mt-1">
                      <Star className="h-3 w-3 text-cosmic-accent-light" />
                    </div>
                    <p className="text-cosmic-foreground/90">
                      "I am connected to the wisdom of the stars and the moon."
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-cosmic-accent/10 p-1 rounded-full mr-2 mt-1">
                      <Star className="h-3 w-3 text-cosmic-accent-light" />
                    </div>
                    <p className="text-cosmic-foreground/90">
                      "My intuition grows stronger with each lunar cycle."
                    </p>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Dream Symbols for {selectedSign}</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-cosmic-accent/20 text-cosmic-accent-light">
                    <Star className="h-3 w-3 mr-1" />
                    Stars
                  </span>
                  <span className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-cosmic-accent/20 text-cosmic-accent-light">
                    <Star className="h-3 w-3 mr-1" />
                    Moon
                  </span>
                  <span className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-cosmic-accent/20 text-cosmic-accent-light">
                    <Star className="h-3 w-3 mr-1" />
                    Water
                  </span>
                  <span className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-cosmic-accent/20 text-cosmic-accent-light">
                    <Star className="h-3 w-3 mr-1" />
                    Light
                  </span>
                  <span className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-cosmic-accent/20 text-cosmic-accent-light">
                    <Star className="h-3 w-3 mr-1" />
                    Journey
                  </span>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HoroscopeGuide;
