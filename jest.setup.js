/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import {
  VueRouterMock,
  createRouterMock,
  injectRouterMock,
} from 'vue-router-mock';
import { config } from '@vue/test-utils';

// create one router per test file
const router = createRouterMock();
beforeEach(() => {
  injectRouterMock(router);
});

// Add properties to the wrapper
config.plugins.VueWrapper.install(VueRouterMock);

// audio files mocking
const audio = 'data:audio/wave;base64,UklGRjIAAABXQVZFZm10IBIAAAABAAEAQB8AAEAfAAABAAgAAABmYWN0BAAAAAAAAABkYXRhAAAAAA==';
jest.mock('@/assets/sounds/buttonSound.ogg', () => audio);
jest.mock('@/assets/sounds/selectSound.ogg', () => audio);
jest.mock('@/assets/sounds/switchSound.ogg', () => audio);
jest.mock('@/assets/sounds/backSound.ogg', () => audio);
jest.mock('@/assets/sounds/popupOpenSound.ogg', () => audio);
jest.mock('@/assets/sounds/popupCloseSound.ogg', () => audio);
jest.mock('@/assets/sounds/finishSound.ogg', () => audio);

jest.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: (key, data) => `${key}${JSON.stringify(data) ?? ''}`,
  }),
}));
