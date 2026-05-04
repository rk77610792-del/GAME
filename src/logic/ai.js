import { SUITS } from './deck';
import { getValidPlays, evaluateTrickWinner } from './game';

export function calculateAIBid(hand) {
  let bid = 0;
  for (const card of hand) {
    if (card.suit === SUITS.SPADES) {
      if (card.value >= 11) bid++; // J, Q, K, A of Spades
    } else {
      if (card.value >= 13) bid++; // K, A of other suits
    }
  }
  return Math.max(1, Math.min(bid, 13)); // Minimum 1 bid
}

export function getAICardPlay(hand, trick) {
  const validPlays = getValidPlays(hand, trick);
  
  if (validPlays.length === 1) return validPlays[0];

  // If leading
  if (trick.length === 0) {
    // Play highest non-trump if possible, else highest trump
    const nonTrumps = validPlays.filter(c => c.suit !== SUITS.SPADES);
    if (nonTrumps.length > 0) {
      nonTrumps.sort((a, b) => b.value - a.value);
      return nonTrumps[0];
    }
    validPlays.sort((a, b) => b.value - a.value);
    return validPlays[0];
  }

  // Not leading. Try to win if possible
  const winningPlays = [];
  const losingPlays = [];

  for (const card of validPlays) {
    const mockTrick = [...trick, { playerId: -1, card }];
    const winner = evaluateTrickWinner(mockTrick);
    if (winner === -1) {
      winningPlays.push(card);
    } else {
      losingPlays.push(card);
    }
  }

  if (winningPlays.length > 0) {
    // We can win right now. Play the lowest winning card to save high cards
    winningPlays.sort((a, b) => a.value - b.value);
    return winningPlays[0];
  } else {
    // We cannot win. Play the absolute lowest valid card
    losingPlays.sort((a, b) => a.value - b.value);
    return losingPlays[0];
  }
}
