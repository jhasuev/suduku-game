<script lang="ts" setup>
import LangsDialog from '@/components/LangsDialog.vue';
import Button from 'primevue/button';
import OverlayPanel from 'primevue/overlaypanel';
import { ref } from 'vue';

const op = ref();

const overlayToggle = (event: MouseEvent): void => {
  op.value.toggle(event);
};
</script>

<template>
  <Button icon="pi pi-language" class="p-button-rounded p-button-text" @click="overlayToggle" />
  <OverlayPanel ref="op" :show-close-icon="true">
    <LangsDialog />
  </OverlayPanel>
</template>
