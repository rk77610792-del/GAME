import React from 'react';

export default function ScoreModal({ phase, round, players, onNextRound, onRestart }) {
  if (phase !== 'ROUND_OVER' && phase !== 'GAME_OVER') return null;

  const isGameOver = phase === 'GAME_OVER';
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  const winner = sortedPlayers[0];

  return (
    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 p-6 md:p-8 rounded-2xl shadow-2xl border border-gray-600 max-w-2xl w-full text-center">
        
        <h2 className={`text-3xl md:text-4xl font-extrabold mb-2 ${isGameOver ? 'text-yellow-400' : 'text-white'}`}>
          {isGameOver ? 'Game Over!' : `Round ${round} Completed`}
        </h2>
        
        {isGameOver && (
          <p className="text-xl text-gray-300 mb-6">
            <span className="font-bold text-white">{winner.name}</span> wins the game with <span className="text-green-400 font-bold">{winner.score}</span> points!
          </p>
        )}

        <div className="overflow-x-auto mb-8">
          <table className="w-full text-left text-gray-300">
            <thead className="bg-gray-700 text-gray-100">
              <tr>
                <th className="p-3 rounded-tl-lg">Player</th>
                <th className="p-3">Bid</th>
                <th className="p-3">Won</th>
                <th className="p-3">Round Score</th>
                <th className="p-3 rounded-tr-lg">Total Score</th>
              </tr>
            </thead>
            <tbody>
              {players.map((p, i) => {
                const roundScore = p.tricksWon >= p.bid ? p.bid : -p.bid;
                const scoreColor = roundScore > 0 ? 'text-green-400' : 'text-red-400';
                return (
                  <tr key={p.id} className="border-b border-gray-700 bg-gray-800/50">
                    <td className="p-3 font-semibold">{p.name}</td>
                    <td className="p-3 text-center">{p.bid}</td>
                    <td className="p-3 text-center font-bold text-blue-400">{p.tricksWon}</td>
                    <td className={`p-3 text-center font-bold ${scoreColor}`}>
                      {roundScore > 0 ? '+' : ''}{roundScore}
                    </td>
                    <td className="p-3 text-center font-bold text-white text-lg">{p.score}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center gap-4">
          {!isGameOver && (
            <button
              onClick={onNextRound}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-transform hover:scale-105"
            >
              Start Round {round + 1}
            </button>
          )}
          <button
            onClick={onRestart}
            className={`${isGameOver ? 'bg-blue-600 hover:bg-blue-500' : 'bg-gray-600 hover:bg-gray-500'} text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-transform hover:scale-105`}
          >
            {isGameOver ? 'Play Again' : 'Restart Game'}
          </button>
        </div>

      </div>
    </div>
  );
}
