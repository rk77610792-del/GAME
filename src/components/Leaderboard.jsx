import React from 'react';

export default function Leaderboard({ players }) {
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  
  return (
    <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 shadow-xl w-64">
      <h3 className="text-xl font-bold text-white mb-3 flex items-center justify-between">
        Leaderboard
        <span className="text-xs font-normal bg-blue-600 px-2 py-1 rounded">Live</span>
      </h3>
      
      <div className="space-y-2">
        {sortedPlayers.map((p, idx) => (
          <div 
            key={p.id} 
            className={`flex justify-between items-center p-2 rounded ${
              idx === 0 ? 'bg-yellow-900/30 border border-yellow-700' : 
              idx === 3 ? 'bg-red-900/30 border border-red-700' : 'bg-gray-700/50'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-gray-400 font-mono">{idx + 1}</span>
              <span className={`font-semibold ${idx === 0 ? 'text-yellow-400' : idx === 3 ? 'text-red-400' : 'text-gray-200'}`}>
                {p.name}
              </span>
            </div>
            <span className="font-bold text-white">{p.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
