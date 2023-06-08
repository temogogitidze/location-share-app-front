import { createRouter, createWebHistory } from 'vue-router'
import { checkTokenAuthenticity } from '@/router/guards/authGuard'
import { check } from 'prettier'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/landing',
      name: 'landing',
      component: () => import('@/views/LandingView.vue')
    }
  ]
})

router.beforeEach((to, from) => {
  if (to.name === 'login') {
    return true
  }

  if (!localStorage.getItem('token')) {
    return { name: 'login' }
  }

  checkTokenAuthenticity()
    .then(() => {
      console.log('success')
    })
    .catch(() => {
      localStorage.removeItem('token')
      return { name: 'login' }
    })
})

export default router
