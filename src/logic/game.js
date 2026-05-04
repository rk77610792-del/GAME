import { SUITS } from './deck';

export function getValidPlays(hand, trick) {
  // If no cards played yet, any card is valid
  if (trick.length === 0) return hand;

  const ledSuit = trick[0].card.suit;
  const cardsOfLedSuit = hand.filter(c => c.suit === ledSuit);

  // Must follow suit if possible
  if (cardsOfLedSuit.length > 0) {
    return cardsOfLedSuit;
  }

  // Otherwise, can play any card (including trump)
  return hand;
}

export function evaluateTrickWinner(trick) {
  if (trick.length === 0) return null;

  const ledSuit = trick[0].card.suit;
  const trumpSuit = SUITS.SPADES;

  let winningPlay = trick[0];

  for (let i = 1; i < trick.length; i++) {
    const play = trick[i];
    const card = play.card;
    const currentWinningCard = winningPlay.card;

    if (card.suit === trumpSuit) {
      if (currentWinningCard.suit !== trumpSuit) {
        winningPlay = play;
      } else if (card.value > currentWinningCard.value) {
        winningPlay = play;
      }
    } else if (card.suit === ledSuit) {
      if (currentWinningCard.suit === ledSuit && card.value > currentWinningCard.value) {
        winningPlay = play;
      }
    }
  }

  return winningPlay.playerId;
}

export function calculateRoundScores(players) {
  return players.map(player => {
    const newScore = player.tricksWon >= player.bid 
      ? player.score + player.bid 
      : player.score - player.bid;
    return { ...player, score: newScore };
  });
}
