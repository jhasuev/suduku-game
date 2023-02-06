<script lang="ts" setup>
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import PageLayout from '@/components/PageLayout.vue';
import useSound from '@/utils/useSound';

const router = useRouter();

const onClickMenu = (name: string): void => {
  useSound('buttonSound');
  router.push({ name });
};

</script>

<template>
  <page-layout title="Menu">
    <Button label="Play" class="w-full mb-2" @click="onClickMenu('Levels')" />
    <Button label="About" class="w-full" @click="onClickMenu('About')" />
  </page-layout>
</template>
