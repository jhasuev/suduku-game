<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import PageLayout from '@/components/common/PageLayout.vue';

const { t } = useI18n();

</script>

<template>
  <page-layout :title="t('about.title')">
    <div v-html="t('about.content')" />
  </page-layout>
</template>
