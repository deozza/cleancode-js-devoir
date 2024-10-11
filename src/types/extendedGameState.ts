import type { GameState } from './gameType';

export interface ExtendedGameState extends GameState {
  playerWeaponChanges: number;
  usedWeapons: Set<string>;
}