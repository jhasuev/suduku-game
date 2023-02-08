import {
  TGameData,
} from '@/types';

export type TGameState = {
  games: {
    easy: TGameData[],
    normal: TGameData[],
    hard: TGameData[],
  },
};
