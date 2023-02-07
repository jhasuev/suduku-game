<script lang="ts" setup>
import { defineProps, useSlots } from 'vue';
import { useRouter } from 'vue-router';
import Card from 'primevue/card';
import Button from 'primevue/button';
import useSound from '@/utils/useSound';

const router = useRouter();

type TProps = {
  title?: string;
  subtitle?: string;
  backpath?: string;
};

const props = defineProps<TProps>();
const slots = useSlots();

const onBackClick = () => {
  if (props.backpath) {
    router.push(props.backpath);
    useSound('backSound');
  }
};

</script>

<template>
  <Card style="max-width: var(--game-container-width)" class="m-auto relative">
    <template v-if="backpath" #header>
      <div class="backable-btn">
        <Button
          icon="pi pi-arrow-left"
          class="p-button-rounded p-button-text p-button-sm"
          @click="onBackClick"
        />
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
  left: 8px;
  top: 10px;
}

</style>
