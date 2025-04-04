
import React from 'react';
import StarryBackground from '../components/StarryBackground';
import Header from '../components/Header';
import MoonPhase from '../components/MoonPhase';
import AffirmationCard from '../components/AffirmationCard';
import DreamJournal from '../components/DreamJournal';
import GratitudeJournal from '../components/GratitudeJournal';
import CosmicAmbience from '../components/CosmicAmbience';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <StarryBackground />
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <section className="mb-12 text-center max-w-3xl mx-auto animate-fade-in">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-affirmation-gradient bg-clip-text text-transparent">
            Cosmic Affirmation & Dream Journal
          </h1>
          <p className="text-lg text-cosmic-foreground/80 mb-8">
            A celestial space for your dreams and affirmations, guided by the rhythm of the stars
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <MoonPhase />
            </div>
            <div className="md:col-span-2">
              <AffirmationCard />
            </div>
          </div>
        </section>
        
        <section className="mb-16">
          <CosmicAmbience />
        </section>
        
        <section className="mb-16">
          <DreamJournal />
        </section>
        
        <section className="mb-16">
          <GratitudeJournal />
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
