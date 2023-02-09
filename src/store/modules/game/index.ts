import { Module } from 'vuex';
import {
  TGameData,
  TLevelTypes,
  TMatrixNumSettingType,
  TGamePath,
} from '@/types';
import Sudoku from '@/utils/sudoku';
import { gameParamsByLevel, GAMES_ADDING_COUNT } from '@/configs';
import { TGlobalState } from '../../types';
import { TGameState } from './types';

const store: Module<TGameState, TGlobalState> = {
  state: {
    games: {
      easy: [],
      normal: [],
      hard: [],
    },
  },

  getters: {
    getGame(state) {
      return (level: TLevelTypes, id: number) => (
        state.games[level]?.find((game: TGameData) => game.id === id)
      ) as TGameData;
    },

    getLevels(state) {
      return (level: TLevelTypes) => (
        state.games[level]?.map((game) => game) as TGameData[]
      );
    },
  },

  mutations: {
    SET_GAME(state, data: TGameData) {
      state.games[data.level].push(data);
    },

    START_GAME(state, data: TGameData) {
      const game = state.games[data.level].find((g: TGameData) => g.id === data.id);
      if (game) {
        game.startTime = Date.now();
      }
    },

    SET_MATRIX_NUMBER(state, data: TMatrixNumSettingType) {
      const game = state.games[data.level].find((g: TGameData) => g.id === data.id);
      if (game) {
        game.matrix[data.data.rowIndex][data.data.colIndex].user = data.num;
      }
    },

    FINISH_GAME(state, pathData: TGamePath) {
      const gameIndex = state.games[pathData.level].findIndex(
        (g: TGameData) => g.id === pathData.id,
      );
      const game = state.games[pathData.level][gameIndex];
      if (game) {
        game.finishTime = Date.now();

        const nextGame = state.games[pathData.level][gameIndex + 1];
        if (nextGame) {
          nextGame.opened = true;
        }
      }
    },
  },

  actions: {
    REQUEST_START_GAME({ commit, getters }, pathData: TGamePath) {
      const game = getters.getGame(pathData.level, pathData.id);
      if (game) {
        commit('START_GAME', game);
      }
    },

    REQUEST_CREATE_LEVELS({ commit, getters }, level: TLevelTypes) {
      const allGames = getters.getLevels(level);
      const lastGame = allGames[allGames.length - 1];

      const allIds: number[] = allGames.map((g: TGameData) => +g.id);
      let lastId: number = Math.max(0, ...allIds) + 1;

      for (let i = 0; i < GAMES_ADDING_COUNT; i += 1) {
        const params = gameParamsByLevel[level];
        const generatedMatrix = Sudoku.generate(params);
        const matrix = Sudoku.hide(generatedMatrix, params.percent);

        commit('SET_GAME', {
          ...params,
          id: lastId,
          matrix,
          opened: lastGame ? !!lastGame.finishTime && i === 0 : i === 0,
        });

        lastId += 1;
      }
    },
  },
};

export default store;
