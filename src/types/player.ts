
export type PlayerColor = 'red' | 'blue' | 'green' | 'white' | 'black' | 'gray';

export interface Player {
  id: string;
  name: string;
  life: number;
  poison: number;
  color: PlayerColor;
  // En el futuro: commanderDamage: Record<string, number>;
}