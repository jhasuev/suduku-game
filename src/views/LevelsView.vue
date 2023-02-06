<script lang="ts" setup>
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import PageLayout from '@/components/common/PageLayout.vue';
import useSound from '@/utils/useSound';
import { TLevelTypes } from '@/types';

const router = useRouter();

type TMenuLevelItem = {
  label: string,
  param: TLevelTypes,
}

const levels: TMenuLevelItem[] = [
  { label: 'Easy', param: 'easy' },
  { label: 'Normal', param: 'normal' },
  { label: 'Hard', param: 'hard' },
];

const onClickMenu = (level: TLevelTypes): void => {
  useSound('buttonSound');
  router.push({ name: 'Level', params: { level } });
};

</script>

<template>
  <page-layout title="Levels">
    <Button
      v-for="(level, i) in levels"
      :key="i"
      :label="level.label"
      class="w-full mb-2"
      @click="onClickMenu(level.param)"
    />
  </page-layout>
</template>
