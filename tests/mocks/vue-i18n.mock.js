/* eslint-disable no-undef */

jest.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: (key, data) => `${key}${JSON.stringify(data) ?? ''}`,
  }),
}));
