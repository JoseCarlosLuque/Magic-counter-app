// src/components/GameBoard.tsx
import { useGame } from '../context/GameContext';
import { PlayerCard } from './PlayerCard';

export const GameBoard = () => {
  const { players, resetGame } = useGame();

  return (
    <div className="h-screen w-full bg-black flex flex-col relative overflow-hidden">
      
      {/* Botón central de Reset (opcional, muy útil en Magic) */}
      <button 
        onClick={resetGame}
        className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900/80 p-3 rounded-full border border-slate-700 text-xs text-slate-400 uppercase tracking-widest"
      >
        Reset
      </button>

      {/* Contenedor de las cartas */}
      <div className="flex-1 flex flex-col">
        {players.map((player, index) => (
          <PlayerCard 
            key={player.id} 
            playerId={player.id} 
            // Si hay 2 jugadores, el primero (index 0) se rota 180 grados
            isUpsideDown={players.length > 1 && index === 0} 
          />
        ))}
      </div>
    </div>
  );
};