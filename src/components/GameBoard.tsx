// src/components/GameBoard.tsx
import { useGame } from '../context/GameContext';
import { PlayerCard } from './PlayerCard';

export const GameBoard = () => {
  const { players, resetGame } = useGame();

  const handleReset = () => {
    const confirmReset = window.confirm("¿Seguro que quieres reiniciar la partida? Se perderán todos los datos actuales.");
    if (confirmReset) {
      resetGame();
    }
  };

  return (
    <div className="h-screen w-full bg-black flex flex-col relative overflow-hidden">
      
      {/* Botón central de Reset (opcional, muy útil en Magic) */}
      <button 
        onClick={handleReset}
        className={`absolute
        ${[3,4].includes(players.length) ? 'top-[5%]' : 'top-1/2'}
        ${[1, 3, 4].includes(players.length) 
      ? 'left-4 translate-x-0 top-[40%]' 
      : 'left-1/2 -translate-x-1/2 top-1/2'
    }
        z-10 -translate-x-1/2 -translate-y-1/2 bg-slate-900/80 p-3 rounded-full border border-slate-700 text-xs text-slate-400 uppercase tracking-widest`}
      >
        RESET
      </button>

      {/* Contenedor de las cartas */}
      <div className="flex-1 flex flex-col">
        {players.map((player, index) => (
          <PlayerCard 
            key={player.id} 
            playerId={player.id} 
            // Si hay 2 jugadores, el primero (index 0) se rota 180 grados
            isUpsideDown={players.length == 2 && index === 0} 
          />
        ))}
      </div>
    </div>
  );
};