<script lang="ts" setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import PageLayout from '@/components/PageLayout.vue';

type TProps = {
  level: string
};

const props = defineProps<TProps>();

const router = useRouter();

</script>

<template>
  <page-layout
    title="Select a game"
    :subtitle='`Selected level "${ props.level }"`'
    backable
  >
    <div class="grid">
      <div
        v-for="n in 10"
        :key="n"
        class="col-4 flex-grow-1"
      >
        <Button
          :icon="n > 2 ? `pi pi-ban` : n > 1 ? `` : 'pi pi-check'"
          :label="`№ ${n}`"
          :disabled="n > 2"
          class="p-button-sm p-button-outlined p-button-secondary p-2 py-3 w-full"
          @click="router.push({ name: 'Game', params: { type: props.type, id: n } })"
        />
      </div>
    </div>
  </page-layout>
</template>
