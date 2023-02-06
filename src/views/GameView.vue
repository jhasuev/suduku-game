<script lang="ts" setup>
import { checkWin, delay } from '@/helpers';
import TimerBox from '@/components/common/TimerBox.vue';
import PageLayout from '@/components/common/PageLayout.vue';
import MatrixTable from '@/components/common/MatrixTable.vue';
import FinishDialog from '@/components/dialogs/FinishDialog.vue';
import SelectNumbers from '@/components/overlays/SelectNumbers.vue';
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

const clearEditableColumn = (): void => {
  editableCol.value.colIndex = -1;
  editableCol.value.rowIndex = -1;
  editableCol.value.column = null;
};

const overlayToggle = (event: MouseEvent): void => {
  op.value.toggle(event);
};

const onColumnClick = (event: MouseEvent, data: TEditableColumnData): void => {
  if (!editableCol.value?.column) {
    overlayToggle(event);
    editableCol.value = data;
  }
};

const onNumberSelected = ({ $event, num }: { $event: MouseEvent|null, num: number|null}): void => {
  if ($event) {
    overlayToggle($event);
  }

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

const finishGame = async (): Promise<void> => {
  store.commit('FINISH_GAME', { level: props.level, id: +props.id });

  await delay(1500);

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
  if (checkWin(matrix.value)) {
    finishGame();
  }
}, { deep: true });

onMounted(() => {
  if (!gameData.value) {
    router.push({ name: 'Levels' });
  } else if (!gameData.value.startTime) {
    store.dispatch('REQUEST_START_GAME', { level: props.level, id: +props.id });
  }
});

</script>

<template>
  <page-layout>
    <timer-box
      v-if="gameData"
      :start-time="gameData.startTime"
      :finish-time="gameData.finishTime"
    />
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
          :class="{
            'column--selected': (
              editableCol.rowIndex === rowIndex
              &&
              editableCol.colIndex === colIndex
            )
          }"
          @click="onColumnClick($event, { rowIndex, colIndex, column })"
          @keypress="() => {}"
        >{{ column.user }}</div>
      </template>
    </matrix-table>
  </page-layout>

  <OverlayPanel ref="op" :show-close-icon="true">
    <SelectNumbers
      :matrix="matrix"
      :show-clear="!!(editableCol.column && editableCol.column.user)"
      @selected="onNumberSelected($event)"
    />
  </OverlayPanel>
</template>

<style lang="scss">

.column {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 18px;
  font-size: min(6vw, 30px);

  &--selected {
    border: 2px solid;
  }
  &--invisible {
    background-color: #f0f0f0;
    color: #3B82F6;
    cursor: pointer;
  }
}

</style>
