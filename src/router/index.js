import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RoomsView from '../views/RoomsView.vue'

const adminGuard = (to, from, next) => {
  console.log('to', to)
  console.log('from', from)
  next()
  return true
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/rooms',
      name: 'rooms',
      component: RoomsView,
    },
    {
      path: '/admin',
      children: [
        {
          path: '/sign-in',
          name: 'Admin/SignIn',
          component: () => import('../views/admin/AdminLogin.vue'),
          beforeEnter: (to, from) => {
            // reject the navigation
            console.log('test')
            return true
          },
        },
        {
          path: '/panel',
          name: 'Admin/Panel',
          component: () => import('../views/admin/AdminPanel.vue'),
          beforeEnter: [adminGuard]
        }
      ],
      redirect: '/admin/sign-in'
    }
  ]
})

export default router
