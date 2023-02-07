import { createI18n } from 'vue-i18n';
import messages from './messages';

export default createI18n({
  legacy: false,
  messages,
  locale: 'ru',
  fallbackLocale: 'en',
});
