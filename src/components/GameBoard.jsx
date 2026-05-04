import React from 'react';
import Card from './Card';

export default function GameBoard({ trick }) {
  // trick is array of { playerId, card }
  const getPositionClass = (playerId) => {
    switch (playerId) {
      case 0: return 'bottom-0 left-1/2 -translate-x-1/2 translate-y-4'; // User (Bottom)
      case 1: return 'top-0 left-1/2 -translate-x-1/2 -translate-y-4'; // AI 1 (Top)
      case 2: return 'top-1/2 right-0 -translate-y-1/2 translate-x-4'; // AI 2 (Right)
      case 3: return 'top-1/2 left-0 -translate-y-1/2 -translate-x-4'; // AI 3 (Left)
      default: return '';
    }
  };

  const getRotationClass = (playerId) => {
    switch (playerId) {
      case 0: return 'rotate-0';
      case 1: return 'rotate-0';
      case 2: return '-rotate-12 sm:-rotate-90'; // Actually let's just keep them straight but slightly angled for realism, or 90 deg for left/right
      case 3: return 'rotate-12 sm:rotate-90';
      default: return '';
    }
  };

  return (
    <div className="relative w-48 h-48 sm:w-72 sm:h-72 rounded-full border border-green-700/30 bg-green-900/20 shadow-inner flex items-center justify-center">
      {trick.length === 0 ? (
        <div className="text-green-800/40 text-xl font-bold uppercase tracking-widest flex flex-col items-center">
          <span className="text-4xl mb-2">♠</span>
          Call Break
        </div>
      ) : null}

      {trick.map((play, idx) => (
        <div 
          key={play.playerId} 
          className={`absolute transition-all duration-300 ease-out z-${10 + idx} ${getPositionClass(play.playerId)}`}
        >
          <div className={`${getRotationClass(play.playerId)} drop-shadow-2xl`}>
             <Card card={play.card} faceUp={true} />
          </div>
        </div>
      ))}
    </div>
  );
}
