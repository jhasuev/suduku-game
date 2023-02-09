<script lang="ts" setup>
import { onMounted } from 'vue';
import { getDetectedLang } from '@/helpers';
import TopMenu from '@/components/common/TopMenu.vue';
import DynamicDialog from 'primevue/dynamicdialog';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';

const { locale } = useI18n({ useScope: 'global' });
const store = useStore();

onMounted(() => {
  if (!store.state.app.lang) {
    store.commit('SET_LANG', getDetectedLang());
  }

  locale.value = store.state.app.lang;
});

</script>

<template>
  <top-menu />

  <router-view />

  <dynamic-dialog />
</template>
