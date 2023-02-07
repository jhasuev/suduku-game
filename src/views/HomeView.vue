<script lang="ts" setup>
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import PageLayout from '@/components/common/PageLayout.vue';
import useSound from '@/utils/useSound';
import { useI18n } from 'vue-i18n';

const router = useRouter();
const { t } = useI18n();

const onClickMenu = (name: string): void => {
  useSound('buttonSound');
  router.push({ name });
};

</script>

<template>
  <page-layout :title="t('home.title')">
    <Button :label="t('home.buttons.play')" class="w-full mb-2" @click="onClickMenu('Levels')" />
    <Button :label="t('home.buttons.about')" class="w-full" @click="onClickMenu('About')" />
  </page-layout>
</template>
