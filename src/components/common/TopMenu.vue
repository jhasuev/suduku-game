<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Button from 'primevue/button';
import useSound from '@/utils/useSound';
import LanguageSwitcher from '@/components/overlays/LanguageSwitcher.vue';
import OverlayPanel from 'primevue/overlaypanel';
import { useStore } from 'vuex';
import SoundSwitcher from './SoundSwitcher.vue';

const router = useRouter();
const route = useRoute();
const op = ref();
const store = useStore();

const overlayToggle = (event: MouseEvent): void => {
  op.value.toggle(event);
};

const onSwitchSoundClick = (): void => {
  useSound('switchSound', store.state.app.soundMuted ? 1 : 0.125);
  store.commit('SET_SOUND_STATE', !store.state.app.soundMuted);
};

</script>

<template>
  <nav class="bg-white p-2 mt-2 mb-2 m-auto border-round flex shadow-1">
    <Button
      icon="pi pi-home"
      class="p-button-rounded p-button-text"
      @click="useSound('buttonSound'); router.push('/')"
      :disabled="route.name === 'Home'"
    />

    <sound-switcher
      class="ml-auto"
      :muted="store.state.app.soundMuted"
      @toggle="onSwitchSoundClick"
    />

    <Button icon="pi pi-language" class="p-button-rounded p-button-text" @click="overlayToggle" />
    <OverlayPanel ref="op" :show-close-icon="true">
      <LanguageSwitcher />
    </OverlayPanel>
  </nav>
</template>

<style lang="scss" scoped>

nav {
  max-width: var(--game-container-width);
}

</style>
