<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router';
import Button from 'primevue/button';
import useSound from '@/utils/useSound';
import SoundSwitcher from './SoundSwitcher.vue';
import LanguageSwitcher from './LanguageSwitcher.vue';

const router = useRouter();
const route = useRoute();

</script>

<template>
  <nav class="p-2 mt-2 mb-2 m-auto border-round flex shadow-1">
    <Button
      icon="pi pi-home"
      class="p-button-rounded p-button-text"
      @click="useSound('buttonSound'); router.push('/')"
      :disabled="route.name === 'Home'"
    />

    <sound-switcher class="ml-auto" />

    <language-switcher />
  </nav>
</template>

<style lang="scss" scoped>

nav {
  max-width: var(--game-container-width);
  background-color: #fff;
}

</style>
