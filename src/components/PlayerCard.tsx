// src/components/PlayerCard.tsx
import { useGame } from "../context/GameContext";

interface PlayerCardProps {
  playerId: string;
  isUpsideDown?: boolean;
}

export const PlayerCard = ({ playerId, isUpsideDown }: PlayerCardProps) => {
  // Traemos el contexto para usarlo en el componente
  const { players, updateLife, updatePoison } = useGame();

  // Creamos una variable booleana para detectar cuando tenemos más de 2 jugadores.
  const isMultiplayer = players.length >= 3;

  // Buscamos los datos de este jugador específico
  const player = players.find((p) => p.id === playerId);

  if (!player) return null;

  // Mapa de colores para Tailwind (basado en lo que elegimos en el formulario)
  const bgColors: Record<string, string> = {
    white: "bg-slate-100 text-slate-900",
    blue: "bg-blue-600 text-white",
    black: "bg-zinc-900 text-slate-100",
    red: "bg-red-600 text-white",
    green: "bg-emerald-700 text-white",
  };

  return (
    <div
      className={`
      flex-1 flex flex-col items-center justify-center relative
      ${bgColors[player.color] || "bg-slate-800"}
      ${isUpsideDown ? "rotate-180" : ""}
      transition-colors duration-500
    `}
    >
      {/* Nombre del jugador */}
      <span className="absolute top-4 text-xs m-1 font-bold uppercase tracking-widest opacity-70">
        {player.name}
      </span>

      {/* Contador de Vida */}
      <div className="flex items-center gap-8">
        <button
          onClick={() => updateLife(player.id, -1)}
          className={`rounded-full bg-black/20
          ${isMultiplayer ? 'w-12 h-12' : 'w-16 h-16'}
          text-4xl font-light hover:bg-black/30 active:scale-90 transition-transform`}
        >
          -
        </button>

        <span className={` font-black 
        ${isMultiplayer ? 'text-6xl' : 'text-8xl'}
        tabular-nums tracking-tighter`}>
          {player.life}
        </span>

        <button
          onClick={() => updateLife(player.id, 1)}
          className={`rounded-full bg-white/20 
           ${isMultiplayer ? 'w-12 h-12' : 'w-16 h-16'}
          text-4xl font-light hover:bg-white/30 active:scale-90 transition-transform`}
        >
          +
        </button>
      </div>

      <div
        className="absolute bottom-1 left-1/2 -translate-x-1/2
        flex items-center justify-center bg-black/30 rounded-full px-4 py-1 gap-4 border border-white/5 m-1 w-[90%] max-w-[250px]"
        
      >
        {/* Icono y número de veneno */}
        <div className="flex items-center gap-1 pl-1">
          <span className="text-xl">☣️</span>
          <span className="text-3xl font-black min-w-[1.5rem] text-center">
            {player.poison || 0}
          </span>
        </div>

        {/* Botones de control (Apilados para ahorrar espacio horizontal) */}
        {/* Botones de control de veneno */}
        <div
          className="flex gap-1 flex-row"
        >
          <button
            onClick={() => updatePoison(player.id, 1)}
            className={`${
              isMultiplayer ? "w-10 h-10" : "w-11 h-11"
            } bg-green-500/80 rounded-lg flex items-center justify-center text-xl font-bold active:scale-90`}
          >
            +
          </button>
          <button
            onClick={() => updatePoison(player.id, -1)}
            className={`${isMultiplayer ? "w-10 h-10" : "w-11 h-11"}
            bg-red-500/80 rounded-lg flex items-center justify-center text-xl font-bold active:scale-90`}
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
};
