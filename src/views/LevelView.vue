<script lang="ts" setup>
import {
  defineProps,
  onMounted,
  computed,
  ComputedRef,
} from 'vue';
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import PageLayout from '@/components/PageLayout.vue';
import { useStore } from 'vuex';
import {
  TGameData,
} from '@/types';
import useSound from '@/utils/useSound';

type TProps = {
  level: string
};

const props = defineProps<TProps>();
const router = useRouter();
const store = useStore();

const getLevels: ComputedRef<TGameData[]> = computed(() => (
  store.getters.getLevels(props.level)
));

onMounted(() => {
  if (!getLevels.value.length) {
    store.dispatch('REQUEST_CREATE_LEVELS', props.level);
  }
});

const onGameClick = (id: number|string): void => {
  router.push({ name: 'Game', params: { type: props.level, id } });
  useSound('buttonSound');
};

</script>

<template>
  <page-layout
    title="Select a game"
    :subtitle='`Selected level "${ props.level }"`'
    backable
  >
    <div class="grid">
      <div
        v-for="level in getLevels"
        :key="level.id"
        class="col-6 flex-grow-1"
      >
        <Button
          :icon="`pi ${ level.finishTime ? 'pi-check' : !level.opened ? 'pi-ban': '' }`"
          :label="`№ ${level.id}`"
          :disabled="!level.opened"
          class="p-button-sm p-button-outlined p-button-secondary p-2 py-3 w-full"
          @click="onGameClick(level.id)"
        />
      </div>
    </div>
  </page-layout>
</template>
