<script lang="ts" setup>
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import PageLayout from '@/components/PageLayout.vue';

const router = useRouter();

const levels = [
  { label: 'Easy', param: 'easy' },
  { label: 'Normal', param: 'normal' },
  { label: 'Hard', param: 'hard' },
  { label: 'Infinity', param: 'infinity' },
];

</script>

<template>
  <page-layout title="Levels">
    <Button
      v-for="(level, i) in levels"
      :key="i"
      :label="level.label"
      class="w-full mb-2"
      @click="router.push({ name: 'Level', params: { level: level.param } })"
    />
  </page-layout>
</template>
