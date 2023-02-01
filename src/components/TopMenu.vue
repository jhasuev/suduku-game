<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router';
import Button from 'primevue/button';
import SoundSwitcher from './SoundSwitcher.vue';
import LanguageSwitcher from './LanguageSwitcher.vue';

const router = useRouter();
const route = useRoute();

// console.log(route.name === 'home');

</script>

<template>
  <nav class="p-2 mt-1 mb-3 m-auto border-round flex">
    <Button
      icon="pi pi-home"
      class="p-button-rounded p-button-text"
      @click="router.push('/')"
      :disabled="route.name === 'home'"
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
