<script lang="ts" setup>
import Button from 'primevue/button';
import { inject } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const dialogRef: any = inject('dialogRef');

const onMenuClick = (routerName: string) => {
  router.push({ name: routerName });
  dialogRef.value.close();
};

</script>

<template>
  <div class="text-3xl font-bold text-center mb-1">You did it!</div>
  <div class="text-sm text-center mb-4">You finish this Sudoku!</div>
  <Button
    label="Select a game"
    class="p-button-sm p-2 w-full mb-2"
    @click="onMenuClick('Levels')"
  />
  <Button
    label="Home"
    class="p-button-sm p-2 w-full"
    @click="onMenuClick('Home')"
  />
</template>
