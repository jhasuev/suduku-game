/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */

// READY ?????
jest.mock('vuex', () => {
  const vuexMockData = {
    commit: (commit, data = null) => ({
      commit,
      data,
    }),
    state: {
      app: {
        soundMuted: true,
      },
    },
  };

  return {
    useStore: () => ({ ...vuexMockData }),
    createStore: () => ({ ...vuexMockData }),
  };
});
