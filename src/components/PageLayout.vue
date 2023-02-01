<script lang="ts" setup>
import Card from 'primevue/card';
import { defineProps, useSlots } from 'vue';

type TProps = {
  title: string
};
const props = defineProps<TProps>();
const slots = useSlots();

</script>

<template>
  <Card style="max-width: var(--game-container-width)" class="m-auto">
    <template #title>
      <div class="text-center">{{ props.title }}</div>
    </template>

    <template v-if="slots.default" #content>
      <slot />
    </template>
  </Card>
</template>
