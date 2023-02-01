<script lang="ts" setup>
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import PageLayout from '@/components/PageLayout.vue';

const router = useRouter();

</script>

<template>
  <page-layout title="Select a level">
    <Button label="Easy" class="w-full mb-2" @click="router.push('/levels')" />
    <Button label="Normal" class="w-full mb-2" @click="router.push('/levels')" />
    <Button label="Hard" class="w-full mb-2" @click="router.push('/levels')" />
    <Button label="Infinity" class="w-full" @click="router.push('/levels')" />
  </page-layout>
</template>
