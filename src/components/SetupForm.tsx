import React, { useState } from "react";
import { useGame } from "../context/GameContext";
import type { Player } from "../types/player";

export const SetupForm = () => {
  const { startGame } = useGame();

  // 1. Estado local para el número de jugadores (2 a 4)
  const [count, setCount] = useState(1);

  const updatePlayer = (id: string, field: 'name' | 'color', value: string) => {
  setPlayersData(prev => 
    prev.map(p => (p.id === id ? { ...p, [field]: value } : p))
  );    
};  

  // 2. Estado local para los datos temporales de los jugadores
  const [playersData, setPlayersData] = useState<Partial<Player>[]>([
    { id: "1", name: "", color: "blue", life: 40 },
    { id: "2", name: "", color: "red", life: 40 },
  ]);

  // Cambiar cantidad de jugadores
  const handleCountChange = (newCount: number) => {
    setCount(newCount);
    // Ajustamos el array de datos para que coincida con el número elegido
    const newPlayers = Array.from({ length: newCount }, (_, i) => ({
      id: (i + 1).toString(),
      name: playersData[i]?.name || "",
      color: playersData[i]?.color || "blue",
      life: 40,
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
      life: 40,
    })) as Player[];

    startGame(finalPlayers);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-8">Nueva Partida</h1>

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
              onChange={(e) => updatePlayer(player.id!, 'color', e.target.value)}
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

const getHexColor = (color: string) => {
  const colors: Record<string, string> = {
    white: '#f8fafc',
    blue: '#3b82f6',
    black: '#18181b',
    red: '#ef4444',
    green: '#22c55e',
  };
  return colors[color] || '#3b82f6';
};