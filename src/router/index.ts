import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/store/user'

import DemoPage from '@/pages/DemoPage.vue'
import IndexPage from '@/pages/IndexPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import HomePage from '@/pages/HomePage.vue'

const routes = [
  {
    path: '/',
    component: IndexPage,
    meta: {
      title: 'home',
    },
    redirect: 'home',
    children: [
      {
        path: 'home',
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
    name: 'Login',
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

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  if (to.path === '/login' && userStore.isLoggedIn) {
    next({ path: '/', replace: true })
  } else if (to.path !== '/login' && !userStore.isLoggedIn) {
    useUserStore().redirectPath = to.path
    next({ path: '/login', replace: true })
  } else {
    next()
  }
})

export default router
