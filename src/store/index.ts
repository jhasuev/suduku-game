import { createStore } from 'vuex';

export default createStore({
  state: {
    soundMuted: !!+localStorage.soundMuted || false,
    lang: localStorage.lang,
    allowLangs: ['ru', 'en'],
  },
  getters: {
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
  },
  actions: {
  },
  modules: {
  },
});
