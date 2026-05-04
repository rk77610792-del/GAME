export const SUITS = {
  SPADES: '♠',
  HEARTS: '♥',
  DIAMONDS: '♦',
  CLUBS: '♣'
};

export const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

export const RANK_VALUES = {
  '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
  'J': 11, 'Q': 12, 'K': 13, 'A': 14
};

export function createDeck() {
  const deck = [];
  for (const suit of Object.values(SUITS)) {
    for (const rank of RANKS) {
      deck.push({ suit, rank, value: RANK_VALUES[rank] });
    }
  }
  return deck;
}

export function shuffleDeck(deck) {
  const newDeck = [...deck];
  for (let i = newDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
  }
  return newDeck;
}

export function dealCards() {
  const deck = shuffleDeck(createDeck());
  return {
    0: deck.slice(0, 13), // Player 0 (User)
    1: deck.slice(13, 26), // Player 1 (AI Top/Left)
    2: deck.slice(26, 39), // Player 2 (AI Right/Top)
    3: deck.slice(39, 52), // Player 3 (AI Bottom/Right)
  };
}

export function sortHand(hand) {
  return [...hand].sort((a, b) => {
    if (a.suit !== b.suit) {
      return a.suit.localeCompare(b.suit);
    }
    return b.value - a.value; // Descending order within suit
  });
}
