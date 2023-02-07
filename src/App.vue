<script lang="ts" setup>
import { onMounted } from 'vue';
import { setAutoLang } from '@/helpers';
import TopMenu from '@/components/common/TopMenu.vue';
import DynamicDialog from 'primevue/dynamicdialog';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';

const { locale } = useI18n({ useScope: 'global' });
const store = useStore();

onMounted(() => {
  if (!localStorage.lang) {
    setAutoLang();
  }

  locale.value = store.state.lang;
});

</script>

<template>
  <top-menu />

  <router-view />

  <dynamic-dialog />
</template>
