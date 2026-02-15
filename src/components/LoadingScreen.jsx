import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: () => {
              if (onComplete) onComplete();
            }
          });
          return 100;
        }
        // Random increment for realistic feel
        const increment = Math.random() * 10;
        return Math.min(prev + increment, 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#121212] text-white font-mono">
      <div className="mb-4 text-4xl font-bold flex items-center gap-2">
         <img src="/macbook.png" alt="Macbook" className="w-[128px] h-auto mb-4" />
      </div>

      <div className="w-[200px] h-[2px] bg-gray-800 rounded relative overflow-hidden">
        <div 
          className="absolute top-0 left-0 h-full bg-white transition-all duration-200 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-2 text-xs text-gray-500 font-mono">
        {Math.round(progress)}%
      </div>
    </div>
  );
};

export default LoadingScreen;
