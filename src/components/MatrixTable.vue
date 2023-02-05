<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue';

type TProps = {
  values: object[],
  disabled?: boolean,
};

const props = withDefaults(defineProps<TProps>(), {
  values: () => [],
});

</script>

<template>
  <table
    class="table"
    :class="{ 'table--disabled': props.disabled }"
  >
    <tr
      v-for="row, rowIndex in props.values"
      :key="rowIndex"
    >
      <td
        v-for="col, colIndex in row"
        :key="colIndex"
      >
        <div class="table__content p-1">
          <slot
            name="column"
            :column="(col as any)"
            :rowIndex="(rowIndex as number)"
            :colIndex="(colIndex as number)"
          />
        </div>
      </td>
    </tr>
  </table>
</template>

<style lang="scss" scoped>

.table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;

  &--disabled {
    filter: blur(1px);
    opacity: .5;
    pointer-events: none;
  }

  td {
    border: 1px solid var(--surface-border);
    position: relative;

    &::after {
      content: "";
      display: block;
      padding-top: 100%;
    }
  }

  &__content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}

</style>
