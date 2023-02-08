<script lang="ts" setup>
import Button from 'primevue/button';
import { useStore } from 'vuex';
import useSound from '@/utils/useSound';

const store = useStore();

const switchSound = (): void => {
  useSound('switchSound', store.state.app.soundMuted ? 1 : 0.125);
  store.commit('SET_SOUND_STATE', !store.state.app.soundMuted);
};

</script>

<template>
  <div class="flex">
    <Button
      v-if="store.state.app.soundMuted"
      icon="pi pi-volume-off"
      class="p-button-rounded p-button-text p-button-secondary"
      @click="switchSound()"
    />
    <Button
      v-else
      icon="pi pi-volume-up"
      class="p-button-rounded p-button-text"
      @click="switchSound()"
    />
  </div>
</template>
