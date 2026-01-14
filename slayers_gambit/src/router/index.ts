import { createRouter, createWebHistory } from 'vue-router'
import MainMenuView from '@/views/MainMenuView.vue'

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'menu',
      component: MainMenuView,
    },
    {
      path: '/hero-select',
      name: 'hero-select',
      component: () => import('@/views/HeroSelectView.vue'),
    },
    {
      path: '/game',
      name: 'game',
      component: () => import('@/views/GameSceneView.vue'),
    },
  ],
})

export default router
