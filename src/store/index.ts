import { createStore } from 'vuex';
import VuexPersistence from 'vuex-persist';
import { TGlobalState } from './types';
import AppModule from './modules/app';
import GameModule from './modules/game';

const vuexPersist = new VuexPersistence({
  storage: window.localStorage,
});

export default createStore<TGlobalState>({
  modules: {
    app: AppModule,
    game: GameModule,
  },

  plugins: [vuexPersist.plugin],
});
