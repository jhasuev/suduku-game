<script lang="ts" setup>
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import PageLayout from '@/components/PageLayout.vue';

const router = useRouter();

</script>

<template>
  <page-layout title="Levels">
    <Button label="Easy" class="w-full mb-2" @click="router.push('/level/easy')" />
    <Button label="Normal" class="w-full mb-2" @click="router.push('/level/normal')" />
    <Button label="Hard" class="w-full mb-2" @click="router.push('/level/hard')" />
    <Button label="Infinity" class="w-full" @click="router.push('/level/infinity')" />
  </page-layout>
</template>
