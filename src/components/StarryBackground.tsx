
import React, { useEffect, useState } from 'react';

interface Star {
  id: number;
  size: number;
  top: number;
  left: number;
  animationDelay: number;
  animationDuration: number;
}

const StarryBackground = () => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const starCount = Math.floor(window.innerWidth * window.innerHeight / 5000);
      const newStars: Star[] = [];
      
      for (let i = 0; i < starCount; i++) {
        newStars.push({
          id: i,
          size: Math.random() * 2.5 + 0.5, // Size between 0.5px and 3px
          top: Math.random() * 100,
          left: Math.random() * 100,
          animationDelay: Math.random() * 5,
          animationDuration: Math.random() * 2 + 3, // Duration between 3s and 5s
        });
      }
      
      setStars(newStars);
    };

    generateStars();

    // Regenerate stars when window is resized
    window.addEventListener('resize', generateStars);
    
    return () => {
      window.removeEventListener('resize', generateStars);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star animate-twinkle"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            top: `${star.top}%`,
            left: `${star.left}%`,
            opacity: Math.random() * 0.5 + 0.5,
            animationDelay: `${star.animationDelay}s`,
            animationDuration: `${star.animationDuration}s`,
          }}
        />
      ))}
      
      {/* Large glowing stars */}
      <div className="absolute w-[100px] h-[100px] rounded-full bg-star-gradient top-[15%] left-[10%] opacity-10 blur-xl" />
      <div className="absolute w-[150px] h-[150px] rounded-full bg-star-gradient top-[70%] left-[80%] opacity-5 blur-xl" />
      <div className="absolute w-[200px] h-[200px] rounded-full bg-star-gradient top-[40%] left-[60%] opacity-10 blur-xl" />
    </div>
  );
};

export default StarryBackground;
