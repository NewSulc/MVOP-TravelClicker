import { createRouter, createWebHistory } from 'vue-router';

import Clicker from '@/views/Clicker.vue';
import Challenge from '@/views/Challenge.vue';
import Settings from '@/views/Settings.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Clicker
    },
    {
      path: '/challenge/:type/:item/:speed/:count',
      component: Challenge
    },
    {
      path: '/settings',
      component: Settings
    }
  ]
});

export default router;
