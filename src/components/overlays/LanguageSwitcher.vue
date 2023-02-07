<script lang="ts" setup>
import Button from 'primevue/button';
import { onMounted, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';
import useSound from '@/utils/useSound';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n({ useScope: 'global' });
const store = useStore();

const switchLanguage = (lang: string): void => {
  locale.value = lang;
  store.commit('SET_LANG', lang);
  useSound('switchSound');
};

onMounted(() => {
  useSound('popupOpenSound');
});

onBeforeUnmount(() => {
  useSound('popupCloseSound');
});

</script>

<template>
  <Button
    v-for="lang in store.state.allowLangs"
    :key="lang"
    icon="pi pi-language"
    class="p-button-rounded p-button-sm"
    :class="{ 'p-button-text': lang !== store.state.lang }"

    @click="switchLanguage(lang)"
  >
    <img :src="require(`@/assets/img/flags/${lang}.png`)" width="20" :alt="`flag ${lang}`">
  </Button>
</template>
