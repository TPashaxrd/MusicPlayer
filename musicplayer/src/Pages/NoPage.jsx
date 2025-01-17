import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const NoPage = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const location = useLocation();

  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosition({ x: event.pageX, y: event.pageY });
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div style={{ userSelect: 'none' }} className="relative w-screen h-screen bg-gradient-to-br from-gray-800 via-blue-900 to-gray-600 overflow-hidden flex items-center justify-center">
      <div className="relative z-10 text-center">
        <h1 className="text-white text-9xl font-extrabold drop-shadow-lg">404</h1>
        <h2 className="text-white text-4xl font-semibold mt-4">Oops! Page Not Found</h2>
        <h3 className="text-gray-300 text-lg mt-2">
          We couldn't locate{' '}
          <span className="text-red-400 font-bold hover:text-white cursor-pointer"><a href="/">{location.pathname}</a></span>.
        </h3>
      </div>
      <div
        className="absolute w-40 h-40 bg-gradient-to-br from-white/50 to-black/70 rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
        style={{
          top: `${position.y}px`,
          left: `${position.x}px`,
        }}
      ></div>
    </div>
  );
};

export default NoPage;