import React, { useEffect, useState } from 'react';
import { useGameState } from './hooks/useGameState';
import PlayerHand from './components/PlayerHand';
import GameBoard from './components/GameBoard';
import BiddingPanel from './components/BiddingPanel';
import Leaderboard from './components/Leaderboard';
import ScoreModal from './components/ScoreModal';
import { getValidPlays } from './logic/game';
import { getAICardPlay } from './logic/ai';

function App() {
  const {
    players, phase, round, trick, turn, leader, tricksPlayed,
    startRound, handleUserBid, playCard, resolveTrick, endRound, restartGame,
    setPhase
  } = useGameState();

  const [aiThinking, setAiThinking] = useState(false);

  // Trick Resolution Effect
  useEffect(() => {
    if (trick.length === 4) {
      const timer = setTimeout(() => {
        resolveTrick();
      }, 1500); // 1.5s delay to show the final trick
      return () => clearTimeout(timer);
    }
  }, [trick, resolveTrick]);

  // AI Play Effect
  useEffect(() => {
    if (phase === 'PLAYING' && trick.length < 4 && turn !== 0) {
      setAiThinking(true);
      const timer = setTimeout(() => {
        const aiPlayer = players.find(p => p.id === turn);
        const cardToPlay = getAICardPlay(aiPlayer.hand, trick);
        playCard(turn, cardToPlay);
        setAiThinking(false);
      }, 1000 + Math.random() * 500); // 1-1.5s delay for realism
      return () => clearTimeout(timer);
    }
  }, [phase, trick, turn, players, playCard]);

  // Handle User Play
  const handleUserPlay = (card) => {
    if (phase === 'PLAYING' && turn === 0 && trick.length < 4) {
      playCard(0, card);
    }
  };

  const userPlayer = players[0];
  const ai1Player = players[1]; // Top
  const ai2Player = players[2]; // Right
  const ai3Player = players[3]; // Left

  const validUserPlays = phase === 'PLAYING' ? getValidPlays(userPlayer.hand, trick) : [];

  return (
    <div className="min-h-screen w-full flex flex-col bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-800 via-green-900 to-green-950 text-white overflow-hidden relative font-sans">

      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none mix-blend-overlay"></div>

      {/* Header Info */}
      <div className="w-full flex justify-between items-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-md border-b border-green-800/50 z-20 shadow-xl">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-green-400 drop-shadow-md tracking-wide uppercase">
            Call Break
          </h1>
          <p className="text-[10px] sm:text-xs text-green-200/60">Single Player vs AI</p>
        </div>
        <div className="flex gap-2 sm:gap-4 items-center">
          <div className="bg-slate-800/80 px-3 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-bold border border-slate-700">
            Round <span className="text-blue-400 text-sm sm:text-lg">{round}</span> / 5
          </div>
          <div className="bg-slate-800/80 px-3 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-bold border border-slate-700">
            Tricks <span className="text-emerald-400 text-sm sm:text-lg">{tricksPlayed}</span> / 13
          </div>
        </div>
      </div>

      {/* Main Game Area */}
      <div className="flex-1 relative flex items-center justify-center p-2 sm:p-4 z-10 overflow-hidden">

        {phase === 'SETUP' ? (
          <div className="relative w-full h-full max-w-5xl max-h-[800px] flex items-center justify-center rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(16,185,129,0.2)] border border-green-500/30 group" style={{ perspective: '1000px' }}>

            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img src="/hero-image.png" alt="Call Break Magic" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-[3s] ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent"></div>
            </div>

            <div className="text-center z-10 p-8 sm:p-12 relative flex flex-col items-center w-full">
              {/* Title / Icon */}
              <div className="text-7xl mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] animate-pulse">♠️</div>

              <h2 className="text-6xl sm:text-8xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white via-green-100 to-green-600 drop-shadow-2xl uppercase tracking-widest">
                Call Break
              </h2>

              <p className="text-xl sm:text-3xl text-green-200/90 mb-12 font-bold tracking-wide drop-shadow-lg bg-slate-900/40 px-6 py-2 rounded-full border border-green-500/20 backdrop-blur-sm">
                Round {round} <span className="mx-2 text-green-500/50">•</span> Are you ready?
              </p>

              {/* 3D Button */}
              <button
                onClick={startRound}
                className="group/btn relative inline-flex items-center justify-center px-12 py-5 font-bold text-white transition-all duration-300 transform style-preserve-3d hover:scale-110 hover:-rotate-1"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Button Base Shadow/3D offset */}
                <div className="absolute inset-0 w-full h-full rounded-full bg-green-950 transform translate-y-3 shadow-[0_20px_40px_rgba(0,0,0,0.8)] transition-transform duration-300 group-hover/btn:translate-y-5"></div>

                {/* Button Face */}
                <div className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-r from-emerald-600 to-green-500 border-2 border-green-300/50 shadow-inner transform transition-transform duration-300 group-hover/btn:-translate-y-1"></div>

                {/* Glowing Aura */}
                <div className="absolute inset-0 w-full h-full rounded-full bg-green-400 opacity-0 group-hover/btn:opacity-40 blur-2xl transition-opacity duration-300"></div>

                <span className="relative text-2xl sm:text-3xl tracking-widest flex items-center gap-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] group-hover/btn:-translate-y-1 transition-transform duration-300">
                  DEAL CARDS <span className="text-4xl">✨</span>
                </span>
              </button>
            </div>
          </div>
        ) : (
          /* CSS Grid Table Layout */
          <div className="w-full h-full max-w-6xl max-h-[900px] grid grid-cols-[80px_1fr_80px] sm:grid-cols-[120px_1fr_120px] grid-rows-[auto_1fr_auto] gap-2 sm:gap-4 items-center justify-items-center">

            <div className="col-start-2 row-start-1">
              <PlayerHand player={ai1Player} isUser={false} isTurn={turn === 1} validPlays={[]} onPlayCard={() => { }} orientation="horizontal" phase={phase} />
            </div>

            <div className="col-start-1 row-start-2">
              <PlayerHand player={ai3Player} isUser={false} isTurn={turn === 3} validPlays={[]} onPlayCard={() => { }} orientation="vertical" phase={phase} />
            </div>

            {/* Center Board or Bidding Panel */}
            <div className="col-start-2 row-start-2 relative flex items-center justify-center w-full h-full">
              {phase === 'BIDDING' ? (
                <BiddingPanel onBid={handleUserBid} />
              ) : (
                <>
                  <GameBoard trick={trick} />

                  {/* Turn Indicator */}
                  <div className="absolute top-4 sm:top-10 left-1/2 -translate-x-1/2 text-xs sm:text-sm font-bold text-yellow-400 whitespace-nowrap bg-slate-900/80 px-4 py-1.5 rounded-full border border-yellow-500/30 shadow-lg backdrop-blur-sm">
                    {turn === 0 ? "Your Turn!" : `${players[turn].name} is thinking...`}
                  </div>
                </>
              )}
            </div>

            <div className="col-start-3 row-start-2">
              <PlayerHand player={ai2Player} isUser={false} isTurn={turn === 2} validPlays={[]} onPlayCard={() => { }} orientation="vertical" phase={phase} />
            </div>

            {/* Bottom User */}
            <div className="col-start-2 row-start-3">
              <PlayerHand
                player={userPlayer}
                isUser={true}
                isTurn={turn === 0}
                validPlays={validUserPlays}
                onPlayCard={handleUserPlay}
                orientation="horizontal"
                phase={phase}
              />
            </div>

          </div>
        )}
      </div>

      {/* Leaderboard Panel (Desktop fixed, mobile hidden) */}
      {phase !== 'SETUP' && (
        <div className="hidden xl:block absolute top-24 left-6 z-30 opacity-90 hover:opacity-100 transition-opacity">
          <Leaderboard players={players} />
        </div>
      )}

      {(phase === 'ROUND_OVER' || phase === 'GAME_OVER') && (
        <ScoreModal
          phase={phase}
          round={round}
          players={players}
          onNextRound={endRound}
          onRestart={restartGame}
        />
      )}

    </div>
  );
}

export default App;
