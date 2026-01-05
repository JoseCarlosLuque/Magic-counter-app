
import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { GameStatus } from '../types/game'; // Importando tus tipos aislados
import type {Player} from '../types/player'

interface GameContextType {
  players: Player[];
  status: GameStatus;
  startGame: (playersConfig: Player[]) => void;
  updateLife: (playerId: string, amount: number) => void;
  updatePoison: (playerId: string, amount: number) => void;
  resetGame: () => void;

}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [status, setStatus] = useState<GameStatus>('setup');

  // Función para iniciar la partida desde el formulario
  const startGame = (playersConfig: Player[]) => {
    setPlayers(playersConfig);
    setStatus('playing');
  };

  // Función para actualizar vida (accesible desde cada PlayerCard)
  const updateLife = (playerId: string, amount: number) => {
    setPlayers(currentPlayers =>
      currentPlayers.map(p =>
        p.id === playerId ? { ...p, life: p.life + amount } : p
      )
    );
  };
  
  // Función para actualizar vida (accesible desde cada PlayerCard)
  const updatePoison = (playerId:string, amount: number) => {
    setPlayers(currentPlayers =>
      currentPlayers.map(p =>
        p.id === playerId ? {...p, poison: p.poison + amount } : p
      )
    );
  };

  const resetGame = () => {
    setPlayers([]);
    setStatus('setup');
  };

  return (
    <GameContext.Provider value={{ players, status, startGame, updateLife, updatePoison, resetGame }}>
      {children}
    </GameContext.Provider>
  );
};

// Hook personalizado para que usarlo sea súper fácil
export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame debe usarse dentro de un GameProvider');
  return context;
};

