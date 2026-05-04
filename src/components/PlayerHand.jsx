import React from 'react';
import Card from './Card';

export default function PlayerHand({ player, isUser, isTurn, validPlays = [], onPlayCard, orientation = 'horizontal', phase }) {
  const isHorizontal = orientation === 'horizontal';

  // Container classes based on orientation
  const containerClass = isHorizontal 
    ? "flex flex-col items-center" 
    : "flex flex-col items-center justify-center";

  // Card overlap classes
  const stackClass = isHorizontal
    ? "flex flex-row -space-x-8 sm:-space-x-12"
    : "flex flex-col -space-y-16 sm:-space-y-24";

  const totalCards = player.hand.length;

  return (
    <div className={`${containerClass} ${isTurn && !isUser ? 'animate-pulse' : ''} relative`}>
      
      {/* Player Info Badge - Positioned to not overlap cards */}
      <div className={`mb-3 z-10 flex flex-col items-center bg-slate-900/90 backdrop-blur-sm px-4 py-1.5 rounded-full border shadow-lg ${isTurn ? 'border-yellow-400 ring-2 ring-yellow-400/50' : 'border-slate-700'}`}>
        <span className={`font-bold text-sm sm:text-base ${isTurn ? 'text-yellow-400' : 'text-slate-200'}`}>
          {player.name}
        </span>
        <span className="text-[10px] sm:text-xs text-slate-400 font-medium">
          Bid: <span className="text-white">{player.bid}</span> | Won: <span className="text-emerald-400">{player.tricksWon}</span>
        </span>
      </div>
      
      {/* Cards Stack */}
      <div className={stackClass} style={{ perspective: '1200px' }}>
        {player.hand.map((card, idx) => {
          const isPlayable = isUser && isTurn && validPlays.some(v => v.suit === card.suit && v.value === card.value);
          const dimUnplayable = isUser && phase === 'PLAYING';
          
          let transformStyle = {};
          if (isHorizontal && totalCards > 1) {
            const middleIdx = (totalCards - 1) / 2;
            const offsetFromMiddle = idx - middleIdx;
            
            const rotation = offsetFromMiddle * 4; 
            const yOffset = Math.abs(offsetFromMiddle) * Math.abs(offsetFromMiddle) * 1.5;
            
            transformStyle = { 
              transform: `rotateZ(${rotation}deg) translateY(${yOffset}px)`, 
              transformOrigin: 'bottom center'
            };
          }
          
          const zIndexStyle = { zIndex: idx };
          
          return (
            <div 
              key={idx} 
              className="relative transition-transform duration-500 ease-out hover:z-50 group"
              style={{ ...zIndexStyle, ...transformStyle }}
            >
              <Card 
                card={card} 
                faceUp={isUser} 
                playable={isPlayable}
                dimUnplayable={dimUnplayable}
                onClick={() => isPlayable && onPlayCard && onPlayCard(card)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
