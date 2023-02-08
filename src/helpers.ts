/* eslint-disable import/prefer-default-export */
import store from '@/store/';
import { useI18n } from 'vue-i18n';
import { allowLangs } from '@/configs';

import { TSudokuGrid } from '@/types';

export const checkWin = (matrixData: TSudokuGrid): boolean => (
  matrixData.flat().every((c) => (
    c.show || c.user === c.num
  ))
);

export const delay = (ms: number): Promise<never> => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

export const parseTime = (secs: number): string => {
  const { t } = useI18n();

  const minutes: number = Math.floor(secs / 60);
  const seconds: number = secs % 60;

  return t('game.time', { minutes, seconds });
};

export const setAutoLang = (): string => {
  const userLang = allowLangs.find((code) => (
    navigator.language.includes(code)
  )) ?? allowLangs[0];

  store.commit('SET_LANG', userLang);

  return userLang;
};
