import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/levels',
    name: 'Levels',
    component: () => import('../views/LevelsView.vue'),
  },
  {
    path: '/level/:level',
    props: true,
    name: 'Level',
    component: () => import('../views/LevelView.vue'),
  },
  {
    path: '/level/:level/:id',
    props: true,
    name: 'Game',
    component: () => import('../views/GameView.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue'),
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404View.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/404View.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
