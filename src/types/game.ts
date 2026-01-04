
import type { Player } from './player';

export type GameStatus = 'setup' | 'playing' | 'finished';

export interface GameSettings {
  initialLife: number;
  playerCount: 1 | 2 | 3 | 4;
}

export interface GameState {
  players: Player[];
  status: GameStatus;
  settings: GameSettings;
}