<script lang="ts" setup>
import { onMounted } from 'vue';
import setAutoLang from '@/utils/setAutoLang';
import TopMenu from '@/components/TopMenu.vue';

onMounted(() => {
  if (!localStorage.lang) {
    setAutoLang();
  }
});

</script>

<template>
  <top-menu />

  <router-view/>
</template>
