import { Module } from 'vuex';
import {
  TGameData,
  TLevelTypes,
  TMatrixNumSettingType,
  TGamePath,
} from '@/types';
import Sudoku from '@/utils/sudoku';
import { gameParamsByLevel } from '@/configs';
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
        state.games[level].find((game: TGameData) => game.id === id)
      ) as TGameData;
    },

    getLevels(state) {
      return (level: TLevelTypes) => (
        state.games[level].map((game, i) => {
          const prevGame = state.games[level][i - 1];

          return {
            ...game,
            opened: prevGame ? prevGame.finishTime : true,
          };
        }) as TGameData[]
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
      const game = state.games[pathData.level].find((g: TGameData) => g.id === pathData.id);
      if (game) {
        game.finishTime = Date.now();
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

    REQUEST_CREATE_LEVEL({ commit, state }, level: TLevelTypes) {
      const params = gameParamsByLevel[level];
      const generatedMatrix = Sudoku.generate(params);
      const matrix = Sudoku.hide(generatedMatrix, params.percent);

      commit('SET_GAME', {
        ...params,
        id: Math.max(0, ...state.games[params.level].map((g) => +g.id)) + 1,
        matrix,
      });
    },

    REQUEST_CREATE_LEVELS({ dispatch }, level: TLevelTypes) {
      for (let i = 0; i < 10; i += 1) {
        dispatch('REQUEST_CREATE_LEVEL', level);
      }
    },
  },
};

export default store;
