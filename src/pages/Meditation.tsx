
import React from 'react';
import StarryBackground from '../components/StarryBackground';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GuidedMeditation from '../components/GuidedMeditation';
import DreamSymbols from '../components/DreamSymbols';
import { Sparkles, Star } from 'lucide-react';

const Meditation = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <StarryBackground />
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <section className="mb-12 text-center max-w-3xl mx-auto animate-fade-in">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-affirmation-gradient bg-clip-text text-transparent">
            Starlight Meditation & Dream Insights
          </h1>
          <p className="text-lg text-cosmic-foreground/80 mb-8">
            Explore guided visualizations and decode the symbols in your dreams
          </p>
        </section>
        
        <section className="mb-8">
          <GuidedMeditation />
        </section>
        
        <section className="mb-8">
          <DreamSymbols />
        </section>
        
        <section className="mb-16 animate-fade-in">
          <div className="cosmic-card p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="text-cosmic-accent" />
              Connecting Dreams to Cosmic Energy
            </h2>
            
            <p className="text-cosmic-foreground/80 mb-6">
              The practice of meditation can enhance your dream recall and help you connect more deeply with cosmic energies.
              Here are some tips to strengthen this connection:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="cosmic-card bg-cosmic-blue-light/20 p-4">
                <h3 className="font-medium text-cosmic-highlight mb-2 flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  Before Sleep Practices
                </h3>
                
                <ul className="space-y-3 text-cosmic-foreground/80">
                  <li className="flex items-start">
                    <span className="inline-block bg-cosmic-accent/20 p-1 rounded-full mr-3 mt-1">
                      <Star className="h-3 w-3 text-cosmic-accent-light" />
                    </span>
                    <span>Set an intention to remember your dreams before falling asleep</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block bg-cosmic-accent/20 p-1 rounded-full mr-3 mt-1">
                      <Star className="h-3 w-3 text-cosmic-accent-light" />
                    </span>
                    <span>Place a dream journal by your bed to record dreams upon waking</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block bg-cosmic-accent/20 p-1 rounded-full mr-3 mt-1">
                      <Star className="h-3 w-3 text-cosmic-accent-light" />
                    </span>
                    <span>Visualize cosmic light surrounding you as you drift to sleep</span>
                  </li>
                </ul>
              </div>
              
              <div className="cosmic-card bg-cosmic-blue-light/20 p-4">
                <h3 className="font-medium text-cosmic-highlight mb-2 flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  Enhancing Dream Clarity
                </h3>
                
                <ul className="space-y-3 text-cosmic-foreground/80">
                  <li className="flex items-start">
                    <span className="inline-block bg-cosmic-accent/20 p-1 rounded-full mr-3 mt-1">
                      <Star className="h-3 w-3 text-cosmic-accent-light" />
                    </span>
                    <span>Practice regular meditation to calm the mind and increase awareness</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block bg-cosmic-accent/20 p-1 rounded-full mr-3 mt-1">
                      <Star className="h-3 w-3 text-cosmic-accent-light" />
                    </span>
                    <span>Avoid screens at least 30 minutes before bedtime</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block bg-cosmic-accent/20 p-1 rounded-full mr-3 mt-1">
                      <Star className="h-3 w-3 text-cosmic-accent-light" />
                    </span>
                    <span>Create a peaceful sleep environment with soft lighting</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Meditation;
