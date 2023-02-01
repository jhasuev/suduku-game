import store from '@/store/';

export default (): string => {
  const userLang = store.state.allowLangs.find((code) => (
    navigator.language.includes(code)
  )) ?? store.state.allowLangs[0];

  store.commit('SET_LANG', userLang);

  return userLang;
};
