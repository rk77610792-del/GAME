import { useState, useCallback } from 'react';
import { dealCards, sortHand } from '../logic/deck';
import { calculateRoundScores, evaluateTrickWinner } from '../logic/game';
import { calculateAIBid } from '../logic/ai';

const INITIAL_PLAYERS = [
  { id: 0, name: 'You', hand: [], bid: 0, tricksWon: 0, score: 0 },
  { id: 1, name: 'AI 1 (Top)', hand: [], bid: 0, tricksWon: 0, score: 0 },
  { id: 2, name: 'AI 2 (Right)', hand: [], bid: 0, tricksWon: 0, score: 0 },
  { id: 3, name: 'AI 3 (Left)', hand: [], bid: 0, tricksWon: 0, score: 0 }
];

export function useGameState() {
  const [players, setPlayers] = useState(INITIAL_PLAYERS);
  const [phase, setPhase] = useState('SETUP'); // SETUP, BIDDING, PLAYING, ROUND_OVER, GAME_OVER
  const [round, setRound] = useState(1);
  const [trick, setTrick] = useState([]); // [{ playerId, card }]
  const [turn, setTurn] = useState(0);
  const [leader, setLeader] = useState(0); // Who led the current trick
  const [tricksPlayed, setTricksPlayed] = useState(0);

  const startRound = useCallback(() => {
    const hands = dealCards();
    setPlayers(prev => prev.map(p => ({
      ...p,
      hand: sortHand(hands[p.id]),
      bid: 0,
      tricksWon: 0
    })));
    setTrick([]);
    setTricksPlayed(0);
    // User always bids first, or we can just say AI auto-bids immediately
    setPhase('BIDDING');
  }, []);

  const handleUserBid = useCallback((bid) => {
    setPlayers(prev => prev.map(p => {
      if (p.id === 0) return { ...p, bid };
      // AI auto-bids
      return { ...p, bid: calculateAIBid(p.hand) };
    }));
    setPhase('PLAYING');
    // Randomize leader for first trick of the round, or let Player 0 lead
    const firstLeader = Math.floor(Math.random() * 4);
    setLeader(firstLeader);
    setTurn(firstLeader);
  }, []);

  const playCard = useCallback((playerId, card) => {
    // Remove card from player hand
    setPlayers(prev => prev.map(p => {
      if (p.id === playerId) {
        return { ...p, hand: p.hand.filter(c => c.suit !== card.suit || c.value !== card.value) };
      }
      return p;
    }));

    // Add to trick
    setTrick(prev => {
      const newTrick = [...prev, { playerId, card }];
      return newTrick;
    });

    // Advance turn
    setTurn(prev => (prev + 1) % 4);
  }, []);

  const resolveTrick = useCallback(() => {
    const winnerId = evaluateTrickWinner(trick);
    
    setPlayers(prev => prev.map(p => {
      if (p.id === winnerId) return { ...p, tricksWon: p.tricksWon + 1 };
      return p;
    }));

    setTrick([]);
    setLeader(winnerId);
    setTurn(winnerId);
    
    setTricksPlayed(prev => {
      const newPlayed = prev + 1;
      if (newPlayed === 13) {
        setPhase('ROUND_OVER');
      }
      return newPlayed;
    });
  }, [trick]);

  const endRound = useCallback(() => {
    setPlayers(prev => calculateRoundScores(prev));
    if (round === 5) {
      setPhase('GAME_OVER');
    } else {
      setRound(prev => prev + 1);
      setPhase('SETUP');
    }
  }, [round]);

  const restartGame = useCallback(() => {
    setPlayers(INITIAL_PLAYERS);
    setRound(1);
    setPhase('SETUP');
  }, []);

  // Sync scores with localStorage when game is over
  // We can do this in a useEffect in the component

  return {
    players, phase, round, trick, turn, leader, tricksPlayed,
    startRound, handleUserBid, playCard, resolveTrick, endRound, restartGame,
    setPhase
  };
}
