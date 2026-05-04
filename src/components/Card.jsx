import React from 'react';
import { SUITS } from '../logic/deck';

export default function Card({ card, faceUp = true, onClick, playable = false, dimUnplayable = true }) {
  if (!faceUp) {
    return (
      <div className="w-[60px] h-[84px] sm:w-[80px] sm:h-[112px] bg-indigo-900 rounded-lg border-2 border-indigo-300 shadow-[0_4px_6px_rgba(0,0,0,0.5)] flex items-center justify-center p-1 overflow-hidden transition-all duration-300">
        <div className="w-full h-full bg-indigo-700 rounded bg-[repeating-linear-gradient(45deg,transparent,transparent_8px,rgba(255,255,255,0.15)_8px,rgba(255,255,255,0.15)_16px)]"></div>
      </div>
    );
  }

  const isRed = card.suit === SUITS.HEARTS || card.suit === SUITS.DIAMONDS;
  const textColor = isRed ? 'text-red-600' : 'text-slate-900';
  const opacityClass = (dimUnplayable && !playable && onClick) ? 'opacity-80 brightness-50 grayscale-[20%]' : 'opacity-100';
  const hoverClass = playable ? 'cursor-pointer hover:-translate-y-6 hover:scale-110 hover:shadow-[0_15px_30px_rgba(0,0,0,0.5)] hover:z-50' : '';

  return (
    <div 
      onClick={playable ? onClick : undefined}
      className={`relative w-[60px] h-[84px] sm:w-[80px] sm:h-[112px] bg-white rounded-lg border border-slate-300 shadow-[0_4px_6px_rgba(0,0,0,0.3)] flex flex-col items-center justify-between py-1 sm:py-2 transition-all duration-300 ${opacityClass} ${hoverClass}`}
    >
      {/* Top Left */}
      <div className={`absolute top-1 left-1 sm:top-2 sm:left-2 flex flex-col items-center leading-none ${textColor}`}>
        <span className="text-sm sm:text-xl font-bold">{card.rank}</span>
        <span className="text-xs sm:text-sm">{card.suit}</span>
      </div>
      
      {/* Center Suit */}
      <div className={`text-3xl sm:text-5xl my-auto ${textColor}`}>
        {card.suit}
      </div>

      {/* Bottom Right */}
      <div className={`absolute bottom-1 right-1 sm:bottom-2 sm:right-2 flex flex-col items-center leading-none rotate-180 ${textColor}`}>
        <span className="text-sm sm:text-xl font-bold">{card.rank}</span>
        <span className="text-xs sm:text-sm">{card.suit}</span>
      </div>
    </div>
  );
}
