<script lang="ts" setup>
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import PageLayout from '@/components/PageLayout.vue';

const router = useRouter();

</script>

<template>
  <page-layout title="Menu">
    <Button label="Play" class="w-full mb-2" @click="router.push('/levels')" />
    <Button label="About" class="w-full" @click="router.push('/about')" />
  </page-layout>
</template>
