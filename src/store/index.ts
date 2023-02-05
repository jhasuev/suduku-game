import { createStore } from 'vuex';
import Sudoku from '@/utils/sudoku';

import {
  TGameData,
  TLevelTypes,
  TMatrixNumSettingType,
  TGamePath,
} from '@/types';

const gameCommonParams = {
  id: -1,
  matrix: [],
  percent: 40,
  startTime: 0,
  finishTime: 0,
};
const gameParamsByLevel = {
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

export default createStore({
  state: {
    soundMuted: !!+localStorage.soundMuted || false as boolean,
    lang: localStorage.lang as string,
    allowLangs: ['ru', 'en'] as string[],
    games: {
      easy: [] as TGameData[],
      normal: [] as TGameData[],
      hard: [] as TGameData[],
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
    SET_SOUND_STATE(state, soundState: boolean) {
      state.soundMuted = soundState;
      localStorage.soundMuted = +soundState;
    },

    SET_LANG(state, lang: string) {
      state.lang = lang;
      localStorage.lang = lang;
    },

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
      // TODO loading start
      for (let i = 0; i < 10; i += 1) {
        dispatch('REQUEST_CREATE_LEVEL', level);
      }
      // TODO loading end
    },
  },
  modules: {
  },
});
