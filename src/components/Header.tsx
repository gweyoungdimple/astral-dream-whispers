
import React from 'react';
import { Link } from 'react-router-dom';
import { Moon, Star, SunMoon, Music } from 'lucide-react';

const Header = () => {
  return (
    <header className="py-6 animate-fade-in">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <SunMoon className="text-cosmic-accent h-7 w-7" />
            <h1 className="text-xl md:text-2xl font-bold bg-affirmation-gradient bg-clip-text text-transparent">
              Astral Dream Whispers
            </h1>
          </Link>
        </div>
        
        <nav>
          <ul className="flex space-x-6 items-center">
            <li>
              <Link to="/soundscapes" className="cosmic-link flex items-center gap-2">
                <Music className="h-4 w-4" />
                <span className="hidden md:inline">Soundscapes</span>
              </Link>
            </li>
            <li>
              <a href="#dreams" className="cosmic-link flex items-center gap-2">
                <Moon className="h-4 w-4" />
                <span className="hidden md:inline">Dreams</span>
              </a>
            </li>
            <li>
              <a href="#affirmations" className="cosmic-link flex items-center gap-2">
                <Star className="h-4 w-4" />
                <span className="hidden md:inline">Affirmations</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
