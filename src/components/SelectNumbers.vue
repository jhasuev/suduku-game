<script lang="ts" setup>
import Button from 'primevue/button';
import {
  defineProps,
  computed,
  ComputedRef,
  defineEmits,
  onMounted,
  onBeforeUnmount,
} from 'vue';
import {
  TSudokuGrid,
} from '@/types';
import useSound from '@/utils/useSound';

type TProps = {
  matrix: TSudokuGrid,
  showClear: boolean,
};

const props = defineProps<TProps>();
const emit = defineEmits(['selected']);

const allowedNumbers: ComputedRef<number[]> = computed(() => (
  Array(props.matrix.length).fill(0).map((n, i) => i + 1)
));

onMounted(() => {
  useSound('popupOpenSound');
});

onBeforeUnmount(() => {
  useSound('popupCloseSound');
});

</script>

<template>
  <div class="grid">
    <div
      v-for="num in allowedNumbers"
      :key="num"
      class="flex-grow-1 p-1 col-4"
      @click="emit('selected', { $event, num })"
      @keypress="() => {}"
    >
      <Button
        :label="String(num)"
        class="p-button-sm p-button-outlined p-button-secondary p-2 w-full"
      />
    </div>
    <div
      v-if="props.showClear"
      class="flex-grow-1 p-1 col-12"
      @click="emit('selected', { $event, num: null })"
      @keypress="() => {}"
    >
      <Button
        label="x"
        class="p-button-sm p-button-outlined p-button-secondary p-2 w-full"
      />
    </div>
  </div>
</template>
