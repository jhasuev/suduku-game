<script lang="ts" setup>
import Button from 'primevue/button';
import { inject, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import useSound from '@/utils/useSound';

const router = useRouter();
const route = useRoute();
const dialogRef: any = inject('dialogRef');

const goToLevel = () => {
  router.push({ name: 'Level', params: { level: route.params.level } });
};

const goToHome = () => {
  router.push({ name: 'Home' });
};

const onMenuClick = (routerName: string) => {
  if (routerName === 'Home') goToHome();
  if (routerName === 'Level') goToLevel();

  dialogRef.value.close();
  useSound('popupCloseSound');
};

onMounted(() => {
  useSound('finishSound');
});

</script>

<template>
  <div class="text-3xl font-bold text-center mb-1">You did it!</div>
  <div class="text-sm text-center mb-4">You finish this Sudoku!</div>
  <Button
    label="Select a game"
    class="p-button-sm p-2 w-full mb-2"
    @click="onMenuClick('Level')"
  />
  <Button
    label="Home"
    class="p-button-sm p-2 w-full"
    @click="onMenuClick('Home')"
  />
</template>
