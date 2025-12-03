import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue')
  },
  {
    path: '/country/:code',
    name: 'CountryDetail',
    props: true,
    component: () => import('../views/CountryDetail.vue')
  },
  {
    path: '/compare',
    name: 'Compare',
    component: () => import('../views/Compare.vue')
  },
  {
    path: '/quiz',
    name: 'Quiz',
    component: () => import('../views/Quiz.vue')
  }
]

const router = createRouter({
  history: createWebHistory('/countries/'),
  routes
})

export default router
