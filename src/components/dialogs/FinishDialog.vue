<script lang="ts" setup>
import Button from 'primevue/button';
import { inject, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import useSound from '@/utils/useSound';
import { useI18n } from 'vue-i18n';

const router = useRouter();
const route = useRoute();
const dialogRef: any = inject('dialogRef');
const { t } = useI18n();

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
  <div class="text-3xl font-bold text-center mb-1">{{ t('finishDialog.title') }}</div>
  <div class="text-sm text-center mb-4">{{ t('finishDialog.subtitle') }}</div>
  <Button
    :label="t('finishDialog.buttons.level')"
    class="p-button-sm p-2 w-full mb-2"
    @click="onMenuClick('Level')"
  />
  <Button
    :label="t('finishDialog.buttons.home')"
    class="p-button-sm p-2 w-full"
    @click="onMenuClick('Home')"
  />
</template>
