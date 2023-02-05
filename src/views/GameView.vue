<script lang="ts" setup>
import delay from '@/utils/delay';
import PageLayout from '@/components/PageLayout.vue';
import Button from 'primevue/button';
import MatrixTable from '@/components/MatrixTable.vue';
import FinishDialog from '@/components/FinishDialog.vue';
import OverlayPanel from 'primevue/overlaypanel';
import { useDialog } from 'primevue/usedialog';
import {
  computed,
  ref,
  Ref,
  ComputedRef,
  defineProps,
  onMounted,
  watch,
  onBeforeUnmount,
} from 'vue';
import { useStore } from 'vuex';
import {
  TLevelTypes,
  TSudokuGrid,
  TEditableColumnData,
  TGameData,
} from '@/types';
import { useRouter } from 'vue-router';

type TProps = {
  level: TLevelTypes,
  id: string|number,
};

const dialog = useDialog();
const router = useRouter();
const props = defineProps<TProps>();
const store = useStore();
const op = ref();
const editableCol: Ref<TEditableColumnData> = ref({
  rowIndex: -1,
  colIndex: -1,
  column: null,
});
let timer: ReturnType<typeof setInterval> = -1;
const time = ref(0);

const clearEditableColumn = (): void => {
  editableCol.value.colIndex = -1;
  editableCol.value.rowIndex = -1;
  editableCol.value.column = null;
};

const overlayToggle = (event: MouseEvent): void => {
  op.value.toggle(event);
};

const onColumnClick = (event: MouseEvent, data: TEditableColumnData): void => {
  overlayToggle(event);
  editableCol.value = data;
};

const onClickGuessedNumber = (event: MouseEvent, num: number|null): void => {
  overlayToggle(event);
  console.log(editableCol.value);

  store.commit('SET_MATRIX_NUMBER', {
    id: +props.id,
    level: props.level,
    data: { ...editableCol.value },
    num,
  });

  clearEditableColumn();
};

const gameData: ComputedRef<TGameData> = computed(() => (
  store.getters.getGame(props.level, +props.id)
));

const matrix: ComputedRef<TSudokuGrid> = computed(() => (
  gameData.value?.matrix
));

const allowedNumbers: ComputedRef<number[]> = computed(() => (
  Array(matrix.value.length).fill(0).map((n, i) => i + 1)
));

const checkWin = (matrixData: TSudokuGrid): boolean => (
  matrixData.flat().every((c) => {
    if (c.show) return true;
    return c.user === c.num;
  })
);

const finishGame = async (): Promise<void> => {
  store.commit('FINISH_GAME', { level: props.level, id: +props.id });

  await delay(500);

  dialog.open(FinishDialog, {
    props: {
      breakpoints: {
        '100vw': 'var(--game-container-width)',
      },
      closable: false,
      modal: true,
    },
  });
};

watch(() => matrix.value, () => {
  console.log(matrix.value);
  if (checkWin(matrix.value)) {
    finishGame();
  }
}, { deep: true });

const updateTime = (): void => {
  if (gameData.value) {
    time.value = ((gameData.value.finishTime || Date.now()) - gameData.value.startTime) / 1000;
    time.value = Math.floor(time.value);
  }
};

onMounted(() => {
  if (!gameData.value) {
    router.push({ name: 'Levels' });
  } else if (!gameData.value.startTime) {
    store.dispatch('REQUEST_START_GAME', { level: props.level, id: +props.id });
  }

  updateTime();
  if (!gameData.value?.finishTime) {
    timer = setInterval(() => updateTime(), 1000);
  }
});

onBeforeUnmount(() => {
  clearInterval(timer);
});

const parseTime = (secs: number) => {
  const minutes: number = Math.floor(secs / 60);
  const seconds: number = secs % 60;

  return `${minutes}m ${seconds}s`;
};

</script>

<template>
  <page-layout>
    <div class="text-center mb-2"><b>{{ parseTime(time) }}</b></div>
    <!-- {{  editableCol  }} -->
    <matrix-table
      v-if="matrix?.length"
      :values="matrix"
      :disabled="!!gameData.finishTime"
    >
      <template #column="{ rowIndex, colIndex, column }">
        <div v-if="column.show" class="column">
          {{ column.num }}
        </div>
        <div
          v-else
          class="column column--invisible"
          @click="onColumnClick($event, { rowIndex, colIndex, column })"
          @keypress="() => {}"
        >{{ column.user }}</div>
      </template>
    </matrix-table>
  </page-layout>

  <OverlayPanel ref="op" :show-close-icon="true">
    <div class="grid">
      <div
        v-for="n in allowedNumbers"
        :key="n"
        class="flex-grow-1 p-1 col-4"
        @click="onClickGuessedNumber($event, n)"
        @keypress="() => {}"
      >
        <Button
          :label="String(n)"
          class="p-button-sm p-button-outlined p-button-secondary p-2 w-full"
        />
      </div>
      <div
        v-if="editableCol.column && editableCol.column.user"
        class="flex-grow-1 p-1 col-12"
        @click="onClickGuessedNumber($event, null)"
        @keypress="() => {}"
      >
        <Button
          label="x"
          class="p-button-sm p-button-outlined p-button-secondary p-2 w-full"
        />
      </div>
    </div>
  </OverlayPanel>
</template>

<style lang="scss">

.column {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 20px;

  &--invisible {
    background-color: #f0f0f0;
    color: #3B82F6;
    cursor: pointer;
  }
}

</style>
