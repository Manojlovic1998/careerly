import { createRouter, createWebHistory } from 'vue-router'
import JobBoardView from '../views/JobBoardView.vue'
import JobDetailView from '../views/JobDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/job-board',
    },
    {
      path: '/job-board',
      name: 'job-board',
      component: JobBoardView,
    },
    {
      path: '/job/:slug',
      name: 'job-detail',
      component: JobDetailView,
    },
  ],
})

export default router
