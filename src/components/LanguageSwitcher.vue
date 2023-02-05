<script lang="ts" setup>
import Button from 'primevue/button';
import OverlayPanel from 'primevue/overlaypanel';
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const op = ref();

const switchLanguage = (lang: string): void => {
  store.commit('SET_LANG', lang);
};

const overlayToggle = (event: MouseEvent): void => {
  op.value.toggle(event);
};

</script>

<template>
  <Button icon="pi pi-language" class="p-button-rounded p-button-text" @click="overlayToggle" />
  <OverlayPanel ref="op" :show-close-icon="true">
    <Button
      v-for="lang in store.state.allowLangs"
      :key="lang"
      icon="pi pi-language"
      class="p-button-rounded p-button-sm"
      :class="{ 'p-button-text': lang !== store.state.lang }"

      @click="switchLanguage(lang)"
    >
      <img :src="require(`../assets/img/flags/${lang}.png`)" width="20" :alt="`flag ${lang}`">
    </Button>
  </OverlayPanel>
</template>
