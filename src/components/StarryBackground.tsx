
import React, { useEffect, useState, useRef, useCallback } from 'react';

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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isInteracting, setIsInteracting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const frameRef = useRef<number | null>(null);
  
  const generateStars = useCallback(() => {
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
  }, []);

  useEffect(() => {
    generateStars();

    // Regenerate stars when window is resized
    window.addEventListener('resize', generateStars);
    
    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      
      frameRef.current = requestAnimationFrame(() => {
        setMousePosition({
          x: e.clientX,
          y: e.clientY
        });
        
        setIsInteracting(true);
        
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        
        timeoutRef.current = setTimeout(() => {
          setIsInteracting(false);
        }, 2000);
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('resize', generateStars);
      window.removeEventListener('mousemove', handleMouseMove);
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [generateStars]);

  // Calculate distance from mouse to create a subtle parallax effect
  const getParallaxStyle = (starLeft: number, starTop: number) => {
    if (!isInteracting) return {};
    
    const starX = (starLeft / 100) * window.innerWidth;
    const starY = (starTop / 100) * window.innerHeight;
    
    const deltaX = (mousePosition.x - starX) / window.innerWidth;
    const deltaY = (mousePosition.y - starY) / window.innerHeight;
    
    // Small subtle movement based on mouse position
    return {
      transform: `translate(${deltaX * -8}px, ${deltaY * -8}px)`,
      transition: 'transform 0.5s ease-out'
    };
  };
  
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
            ...getParallaxStyle(star.left, star.top)
          }}
        />
      ))}
      
      {/* Large glowing stars with responsive movement */}
      <div 
        className="absolute w-[100px] h-[100px] rounded-full bg-star-gradient top-[15%] left-[10%] opacity-10 blur-xl transition-transform duration-700"
        style={getParallaxStyle(10, 15)}
      />
      <div 
        className="absolute w-[150px] h-[150px] rounded-full bg-star-gradient top-[70%] left-[80%] opacity-5 blur-xl transition-transform duration-700"
        style={getParallaxStyle(80, 70)}
      />
      <div 
        className="absolute w-[200px] h-[200px] rounded-full bg-star-gradient top-[40%] left-[60%] opacity-10 blur-xl transition-transform duration-700"
        style={getParallaxStyle(60, 40)}
      />
      
      {/* Mouse follower glow effect */}
      {isInteracting && (
        <div 
          className="absolute w-[300px] h-[300px] rounded-full bg-cosmic-glow pointer-events-none animate-pulse-light blur-3xl"
          style={{ 
            left: mousePosition.x - 150,
            top: mousePosition.y - 150,
            opacity: 0.15,
            transition: 'opacity 0.3s ease-out'
          }}
        />
      )}
    </div>
  );
};

export default StarryBackground;
