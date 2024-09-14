import { createRouter, createWebHistory } from 'vue-router'
import { useMainStore } from '@/store/index'

import DemoPage from '@/pages/DemoPage.vue'
import IndexPage from '@/pages/IndexPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import HomePage from '@/pages/HomePage.vue'
import ExplorePage from '@/pages/ExplorePage.vue'
import MessagesPage from '@/pages/MessagesPage.vue'
import ProfilePage from '@/pages/ProfilePage.vue'
import StatusPage from '@/pages/StatusPage.vue'

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
        name: 'home',
        component: HomePage,
        meta: {
          title: 'Home',
        },
      },
      {
        path: 'explore',
        component: ExplorePage,
        meta: {
          title: 'explore',
        },
      },
      {
        path: 'messages',
        component: MessagesPage,
        meta: {
          title: 'messages',
        },
      },
      {
        path: 'profile/:handle',
        component: ProfilePage,
        props: true,
        meta: {
          title: 'profile',
        },
      },
      {
        path: ':handle/status/:feedID',
        name: 'status',
        component: StatusPage,
        props: true,
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
    name: 'login',
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
  const mainStore = useMainStore()
  if (to.path === '/login' && mainStore.isLoggedIn) {
    next({ path: '/', replace: true })
  } else if (to.path !== '/login' && !mainStore.isLoggedIn) {
    next({ path: '/login', replace: true })
  } else {
    next()
  }
})

export default router
