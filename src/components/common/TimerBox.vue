<script lang="ts" setup>
import { parseTime } from '@/helpers';
import {
  ref,
  onMounted,
  onBeforeUnmount,
  defineProps,
} from 'vue';

type TProps = {
  startTime: number,
  finishTime?: number,
};

const props = defineProps<TProps>();
let timer: ReturnType<typeof setInterval> = -1;
const time = ref(0);

const updateTime = (): void => {
  if (props.startTime) {
    time.value = ((props.finishTime || Date.now()) - props.startTime) / 1000;
    time.value = Math.floor(time.value);
  }
};

onMounted(() => {
  updateTime();
  if (!props.finishTime) {
    timer = setInterval(() => updateTime(), 1000);
  }
});

onBeforeUnmount(() => {
  clearInterval(timer);
});

</script>

<template>
  <div class="text-center mb-2"><b>{{ parseTime(time) }}</b></div>
</template>
