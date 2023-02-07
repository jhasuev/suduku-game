<script lang="ts" setup>
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import PageLayout from '@/components/common/PageLayout.vue';
import useSound from '@/utils/useSound';
import { TLevelTypes } from '@/types';
import { useI18n } from 'vue-i18n';
import { computed, ComputedRef } from 'vue';

const { t } = useI18n();
const router = useRouter();

type TMenuLevelItem = {
  label: string,
  param: TLevelTypes,
}

const levels: ComputedRef<TMenuLevelItem[]> = computed(() => [
  { label: t('levels.buttons.easy'), param: 'easy' },
  { label: t('levels.buttons.normal'), param: 'normal' },
  { label: t('levels.buttons.hard'), param: 'hard' },
]);

const onClickMenu = (level: TLevelTypes): void => {
  useSound('buttonSound');
  router.push({ name: 'Level', params: { level } });
};

</script>

<template>
  <page-layout :title="t('levels.title')">
    <Button
      v-for="(level, i) in levels"
      :key="i"
      :label="level.label"
      class="w-full mb-2"
      @click="onClickMenu(level.param)"
    />
  </page-layout>
</template>
