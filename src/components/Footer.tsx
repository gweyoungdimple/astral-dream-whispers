
import React from 'react';
import { SunMoon, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-16 py-8 border-t border-cosmic-accent/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <SunMoon className="text-cosmic-accent h-5 w-5" />
            <span className="text-cosmic-foreground/80 text-sm">Astral Dream Whispers</span>
          </div>
          
          <p className="text-cosmic-foreground/60 text-sm flex items-center">
            Created with <Heart className="h-3 w-3 text-cosmic-pink mx-1" /> for cosmic dreamers everywhere
          </p>
        </div>
        <p className="text-cosmic-foreground/40 text-xs text-center mt-6">
          © {new Date().getFullYear()} Astral Dream Whispers. The cosmos records all dreams.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
