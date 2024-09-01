import { createRouter, createWebHistory } from 'vue-router'

import DemoPage from '@/pages/DemoPage.vue'
import IndexPage from '@/pages/IndexPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import HomePage from '@/pages/HomePage.vue'

const routes = [
  {
    path: '/',
    component: IndexPage,
    meta: {
      title: 'Home',
    },
    redirect: 'Home',
    children: [
      {
        path: 'Home',
        component: HomePage,
        meta: {
          title: 'Home',
        },
      },
    ],
  },

  {
    path: '/demo/',
    component: DemoPage,
    meta: {
      title: 'Demo title',
    },
  },
  {
    path: '/login/',
    component: LoginPage,
    meta: {
      title: 'Login',
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
