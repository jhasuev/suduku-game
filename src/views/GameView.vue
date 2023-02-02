<script lang="ts" setup>
import PageLayout from '@/components/PageLayout.vue';
import Button from 'primevue/button';
import MatrixTable from '@/components/MatrixTable.vue';
import OverlayPanel from 'primevue/overlaypanel';
import { computed, ref, ComputedRef } from 'vue';

const matrix = [
  [
    { num: 1, show: true },
    { num: 2, show: true },
    { num: 3, show: false },
  ],
  [
    { num: 4, show: true },
    { num: 5, show: false },
    { num: 6, show: true },
  ],
  [
    { num: 7, show: false },
    { num: 8, show: true },
    { num: 9, show: false },
  ],
];

const op = ref();

const overlayToggle = (event: MouseEvent): void => {
  op.value.toggle(event);
};

const onCellClick = (event: MouseEvent, data: any): void => {
  console.log(event, data);
  overlayToggle(event);
};

const allowedNumbers: ComputedRef<number[]> = computed(() => (
  Array(matrix.length).fill(0).map((n, i) => i + 1)
));

</script>

<template>
  <page-layout>
    <matrix-table
      :values="matrix"
    >
      <template #column="{ rowIndex, colIndex, column }">
        <div v-if="column.show" class="cell">
          {{ column.num }}
        </div>
        <div
          v-else
          class="cell cell--invisible"
          @click="onCellClick($event, { rowIndex, colIndex, column })"
          @keypress="() => {}"
        ></div>
      </template>
    </matrix-table>
  </page-layout>

  <OverlayPanel ref="op" :show-close-icon="true">
    <div class="grid">
      <div
        v-for="n in allowedNumbers"
        :key="n"
        class="flex-grow-1 p-1 col-4"
        @click="overlayToggle($event)"
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

.cell {
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
