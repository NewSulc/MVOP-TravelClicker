import { createRouter, createWebHistory } from 'vue-router';

import Clicker from '@/views/Clicker.vue';
import Challenge from '@/views/Challenge.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Clicker
    },
    {
      path: '/challenge',
      component: Challenge
    }
  ]
});

export default router;
