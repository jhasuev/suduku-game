<script lang="ts" setup>
import PageLayout from '@/components/PageLayout.vue';
import Button from 'primevue/button';
import MatrixTable from '@/components/MatrixTable.vue';
import OverlayPanel from 'primevue/overlaypanel';
import {
  computed,
  ref,
  Ref,
  ComputedRef,
  defineProps,
  onMounted,
  watch,
} from 'vue';
import { useStore } from 'vuex';
import { TLevelTypes, TSudokuGrid, TEditableColumnData } from '@/types';

type TProps = {
  level: TLevelTypes,
  id: string|number,
};

const props = defineProps<TProps>();
const store = useStore();
const op = ref();
const editableCol: Ref<TEditableColumnData> = ref({
  rowIndex: -1,
  colIndex: -1,
  column: null,
});

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

const onClickGuessedNumber = (event: MouseEvent, num: number): void => {
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

const matrix: ComputedRef<TSudokuGrid> = computed(() => (
  store.getters.getGame(props.level, +props.id)?.matrix
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

const finishGame = (): void => {
  alert('win!');
};

watch(() => matrix.value, () => {
  console.log(matrix.value);
  if (checkWin(matrix.value)) {
    finishGame();
  }
}, { deep: true });

onMounted(() => {
  if (!matrix.value?.length) {
    store.dispatch('CREATE_MATRIX', { level: props.level, id: +props.id });
  }
});

</script>

<template>
  <page-layout>
    {{  matrix  }}
    <matrix-table
      v-if="matrix?.length"
      :values="matrix"
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
