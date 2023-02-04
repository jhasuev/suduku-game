import { createStore } from 'vuex';
import Sudoku from '@/utils/sudoku';

import { TGameData, TLevelTypes, TMatrixNumSettingType } from '@/types';

const gameParamsByLevel = {
  easy: {
    id: -1,
    level: 'easy',
    sizes: { x: 3, y: 3 },
    percent: 50,
    matrix: [],
    finished: false,
  } as TGameData,
  normal: {
    id: -1,
    level: 'normal',
    sizes: { x: 6, y: 6 },
    percent: 40,
    matrix: [],
    finished: false,
  } as TGameData,
  hard: {
    id: -1,
    level: 'hard',
    sizes: { x: 9, y: 9 },
    percent: 40,
    matrix: [],
    finished: false,
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
      );
    },
  },
  mutations: {
    SET_SOUND_STATE(state, soundState) {
      state.soundMuted = soundState;
      localStorage.soundMuted = +soundState;
    },

    SET_LANG(state, lang) {
      state.lang = lang;
      localStorage.lang = lang;
    },

    SET_MATRIX(state, data: TGameData) {
      state.games[data.level].push(data);
    },

    SET_MATRIX_NUMBER(state, data: TMatrixNumSettingType) {
      console.log(data);
      const game = state.games[data.level].find((g: TGameData) => g.id === data.id) as TGameData;
      if (game.matrix) {
        game.matrix[data.data.rowIndex][data.data.colIndex].user = data.num;
      }
    },
  },
  actions: {
    CREATE_MATRIX({ commit }, { level, id }: { level: TLevelTypes, id: number }) {
      const params = gameParamsByLevel[level];

      const generatedMatrix = Sudoku.generate(params);
      const matrix = Sudoku.hide(generatedMatrix, params.percent);

      commit('SET_MATRIX', { ...params, id, matrix });

      // Math.max(0, ...state.games[params.level].map((g) => +g.id)) + 1
    },
  },
  modules: {
  },
});
