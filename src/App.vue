<script lang="ts" setup>
import { onMounted } from 'vue';
import { setAutoLang } from '@/helpers';
import TopMenu from '@/components/common/TopMenu.vue';
import DynamicDialog from 'primevue/dynamicdialog';

onMounted(() => {
  if (!localStorage.lang) {
    setAutoLang();
  }
});

</script>

<template>
  <top-menu />

  <router-view />

  <dynamic-dialog />
</template>
