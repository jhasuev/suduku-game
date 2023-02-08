import { Module } from 'vuex';
import { TGlobalState } from '../../types';
import { TAppState } from './types';

const store: Module<TAppState, TGlobalState> = {
  state: {
    soundMuted: false,
    lang: '',
  },

  mutations: {
    SET_SOUND_STATE(state, soundState: boolean) {
      state.soundMuted = soundState;
    },

    SET_LANG(state, lang: string) {
      state.lang = lang;
    },
  },
};

export default store;
