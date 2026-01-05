// src/components/PlayerCard.tsx
import { useGame } from '../context/GameContext';

interface PlayerCardProps {
  playerId: string;
  isUpsideDown?: boolean;
}

export const PlayerCard = ({ playerId, isUpsideDown }: PlayerCardProps) => {
  const { players, updateLife } = useGame();
  
  // Buscamos los datos de este jugador específico
  const player = players.find(p => p.id === playerId);

  if (!player) return null;

  // Mapa de colores para Tailwind (basado en lo que elegimos en el formulario)
  const bgColors: Record<string, string> = {
    white: 'bg-slate-100 text-slate-900',
    blue: 'bg-blue-600 text-white',
    black: 'bg-zinc-900 text-slate-100',
    red: 'bg-red-600 text-white',
    green: 'bg-emerald-700 text-white',
  };

  return (
    <div className={`
      flex-1 flex flex-col items-center justify-center relative
      ${bgColors[player.color] || 'bg-slate-800'}
      ${isUpsideDown ? 'rotate-180' : ''}
      transition-colors duration-500
    `}>
      
      {/* Nombre del jugador */}
      <span className="absolute top-4 text-xs m-1 font-bold uppercase tracking-widest opacity-70">
        {player.name}
      </span>

      {/* Contador de Vida */}
      <div className="flex items-center gap-8">
        <button 
          onClick={() => updateLife(player.id, -1)}
          className="w-16 h-16 rounded-full bg-black/20 text-4xl font-light hover:bg-black/30 active:scale-90 transition-transform"
        >
          -
        </button>
        
        <span className="text-8xl font-black tabular-nums tracking-tighter">
          {player.life}
        </span>

        <button 
          onClick={() => updateLife(player.id, 1)}
          className="w-16 h-16 rounded-full bg-white/20 text-4xl font-light hover:bg-white/30 active:scale-90 transition-transform"
        >
          +
        </button>
      </div>
    </div>
  );
};