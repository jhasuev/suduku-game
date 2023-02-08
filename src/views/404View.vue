<script lang="ts" setup>
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import PageLayout from '@/components/common/PageLayout.vue';
import useSound from '@/utils/useSound';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const router = useRouter();

const onClickHome = (): void => {
  router.push({ name: 'Levels' });
  useSound('buttonSound');
};

</script>

<template>
  <page-layout
    :title="t('error404.title')"
    :subtitle="t('error404.subtitle')"
  >
    <Button
      :label="t('error404.homeBtn')"
      class="p-button-sm p-2 w-full"
      @click="onClickHome()"
    />
  </page-layout>
</template>
