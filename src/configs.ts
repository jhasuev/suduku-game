/* eslint-disable import/prefer-default-export */
import { TGameData } from '@/types';

const gameCommonParams = {
  id: -1,
  matrix: [],
  percent: 40,
  startTime: 0,
  finishTime: 0,
};

export const gameParamsByLevel = {
  easy: {
    ...gameCommonParams,
    level: 'easy',
    sizes: { x: 3, y: 3 },
    percent: 50,
  } as TGameData,

  normal: {
    ...gameCommonParams,
    level: 'normal',
    sizes: { x: 6, y: 6 },
  } as TGameData,

  hard: {
    ...gameCommonParams,
    level: 'hard',
    sizes: { x: 9, y: 9 },
  } as TGameData,
};

export const allowLangs: string[] = ['ru', 'en'];
