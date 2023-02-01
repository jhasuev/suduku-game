<script lang="ts" setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import PageLayout from '@/components/PageLayout.vue';

type TProps = {
  type: string
};

const props = defineProps<TProps>();

const router = useRouter();

</script>

<template>
  <page-layout>
    <div class="grid">
      <div
        v-for="n in 9*9"
        :key="n"
        class="col-1 p-0 flex-grow-1"
      >
        <Button
          :label="`${n}`"
          class="p-button-sm p-button-outlined p-button-secondary p-0 w-full"
          @click="router.push({ name: 'Game', params: { type: props.type, id: n } })"
        />
      </div>
    </div>
  </page-layout>
</template>
