<script lang="ts" setup>
import Button from 'primevue/button';
import { defineProps, withDefaults, defineEmits } from 'vue';

type TProps = {
  muted?: boolean
}

const props = withDefaults(defineProps<TProps>(), {
  muted: false,
});
const emit = defineEmits(['toggle']);

</script>

<template>
  <div class="flex">
    <Button
      v-if="props.muted"
      icon="pi pi-volume-off"
      class="p-button-rounded p-button-text p-button-secondary"
      @click="emit('toggle')"
    />
    <Button
      v-else
      icon="pi pi-volume-up"
      class="p-button-rounded p-button-text"
      @click="emit('toggle')"
    />
  </div>
</template>
