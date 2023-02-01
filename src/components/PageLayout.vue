<script lang="ts" setup>
import Card from 'primevue/card';
import { defineProps, useSlots } from 'vue';
import Button from 'primevue/button';

type TProps = {
  title?: string;
  subtitle?: string;
  backable?: boolean;
};

const props = defineProps<TProps>();

const slots = useSlots();

</script>

<template>
  <Card style="max-width: var(--game-container-width)" class="m-auto relative">
    <template v-if="backable" #header>
      <div class="backable-btn">
        <Button icon="pi pi-arrow-left" class="p-button-rounded p-button-text p-button-sm" />
      </div>
    </template>

    <template v-if="props.title" #title>
      <div class="text-center px-4">{{ props.title }}</div>
    </template>

    <template v-if="props.subtitle" #subtitle>
      <div class="text-center">{{ props.subtitle }}</div>
    </template>

    <template v-if="slots.default" #content>
      <slot />
    </template>
  </Card>
</template>

<style lang="scss" scoped>

.backable-btn {
  position: absolute;
  left: 0;
  top: 10px;
}

</style>
