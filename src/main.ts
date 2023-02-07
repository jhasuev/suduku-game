import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import DialogService from 'primevue/dialogservice';
import i18n from '@/utils/i18n/';
import App from './App.vue';
import router from './router';
import store from './store';

import '@/assets/scss/main.scss';
import 'primevue/resources/themes/lara-light-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeflex/primeflex.min.css';
import 'primeicons/primeicons.css';

createApp(App)
  .use(PrimeVue)
  .use(DialogService)
  .use(store)
  .use(router)
  .use(i18n)
  .mount('#app');
