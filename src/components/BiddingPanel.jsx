import React from 'react';

export default function BiddingPanel({ onBid }) {
  const bids = Array.from({ length: 13 }, (_, i) => i + 1);

  return (
    <div className="bg-slate-900/90 p-4 sm:p-6 rounded-2xl shadow-2xl border border-green-500/30 max-w-md w-full mx-auto text-center backdrop-blur-md z-20">
      <h2 className="text-xl sm:text-2xl font-bold text-green-400 mb-2">Select Your Bid</h2>
      <p className="text-slate-300 mb-4 text-xs sm:text-sm">How many tricks will you win?</p>
      
      <div className="grid grid-cols-5 gap-2 mb-2">
        {bids.map(bid => (
          <button
            key={bid}
            onClick={() => onBid(bid)}
            className="bg-slate-800 hover:bg-green-600 text-white font-bold py-2 rounded shadow border border-slate-700 hover:border-green-400 transition-colors"
          >
            {bid}
          </button>
        ))}
      </div>
    </div>
  );
}
