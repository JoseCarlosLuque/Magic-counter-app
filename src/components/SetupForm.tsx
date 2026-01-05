import React, { useState } from "react";
import { useGame } from "../context/GameContext";
import type { Player } from "../types/player";

export const SetupForm = () => {
  const { startGame } = useGame();

  // 1. Estado local para el número de jugadores (2 a 4)
  const [count, setCount] = useState(1);

  // 1. Estado local para los puntos de vida de los jugadores:
  const [lifePoints, setlifePoints] = useState(20);

  const updatePlayer = (id: string, field: "name" | "color", value: string) => {
    setPlayersData((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  // 2. Estado local para los datos temporales de los jugadores
  const [playersData, setPlayersData] = useState<Partial<Player>[]>([
    { id: "1", name: "", color: "blue", life: 20 },
  ]);

  // Cambiar cantidad de jugadores
  const handleCountChange = (newCount: number) => {
    setCount(newCount);
    // Ajustamos el array de datos para que coincida con el número elegido
    const newPlayers = Array.from({ length: newCount }, (_, i) => ({
      id: (i + 1).toString(),
      name: playersData[i]?.name || "",
      color: playersData[i]?.color || "blue",
      life: 20,
    }));
    setPlayersData(newPlayers);
  };

  // Actualizar nombre de un jugador específico
  const updateName = (index: number, name: string) => {
    const updated = [...playersData];
    updated[index].name = name;
    setPlayersData(updated);
  };

  // Enviar a la nube
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validamos que tengan nombre (o ponemos uno por defecto)
    const finalPlayers = playersData.map((p, i) => ({
      ...p,
      name: p.name || `Jugador ${i + 1}`,
      life: lifePoints,
      poison: 0
    })) as Player[];

    startGame(finalPlayers);
  };

  return (
    <div className="flex flex-col items-center justify-center p-2 max-w-md mx-auto">
      <div className="flex justify-center pt-4 pb-4">
        <img 
          src="/logo-magic-blanco.png" 
          alt="Magic The Gathering Logo" 
          className="w-60 h-auto drop-shadow-[0_0_15px_rgba(255,165,0,0.3)] object-contain"
        />
      </div>

      {/* Selector de cantidad */}
      <div className="flex gap-4 mb-8">
        {[1, 2, 3, 4].map((num) => (
          <button
            key={num}
            onClick={() => handleCountChange(num)}
            className={`w-12 h-12 rounded-full font-bold transition-colors ${
              count === num
                ? "bg-blue-600 text-white"
                : "bg-slate-700 text-slate-300"
            }`}
          >
            {num}
          </button>
        ))}
      </div>
      {/* Input de vida de jugadores */}
      <label className="block text-center text-xs font-bold text-slate-400 uppercase mb-3">
        Vida Inicial 
      </label>
      <div className="flex items-center justify-center gap-4">
        <input
          type="number"
          value={lifePoints}
          onChange={(e) => setlifePoints(parseInt(e.target.value) || 0)}
          className="w-20 text-center text-2xl font-bold bg-slate-900 border border-slate-700 rounded-lg p-2 focus:ring-2 focus:ring-orange-500 outline-none"
        />
      </div>
      {/* Inputs de Nombres */}
      <form onSubmit={handleSubmit} className="w-full space-y-4">
        {playersData.map((player, index) => (
          <div key={player.id} className="flex flex-col gap-2">
            <label className="text-sm text-slate-400">
              Jugador {index + 1}
            </label>
            <input
              type="text"
              placeholder="Nombre..."
              value={player.name}
              onChange={(e) => updateName(index, e.target.value)}
              className="flex-1 bg-slate-800 border border-slate-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              className="bg-slate-800 border border-slate-700 p-3 rounded-lg"
              value={player.color}
              onChange={(e) =>
                updatePlayer(player.id!, "color", e.target.value)
              }
            >
              <option value="white">⚪ Blanco</option>
              <option value="blue">🔵 Azul</option>
              <option value="black">⚫ Negro</option>
              <option value="red">🔴 Rojo</option>
              <option value="green">🟢 Verde</option>
            </select>
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl mt-8 transition-transform active:scale-95"
        >
          ¡EMPEZAR DUELO!
        </button>
      </form>
    </div>
  );
};
