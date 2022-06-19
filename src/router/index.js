import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RoomsView from '../views/RoomsView.vue'
import AdminView from "../views/admin/AdminView.vue"
import AdminService from "../services/admin.service"
import RoomView from '../views/RoomView.vue'
import ReservationView from '../views/ReservationView.vue'
import BookingSummaryView from '../views/BookingSummaryView.vue'

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
      name: 'Admin',
      component: AdminView,
      children: [
        {
          path: 'sign-in',
          name: 'Admin/SignIn',
          component: () => import('../views/admin/AdminLoginView.vue'),
        },
        {
          path: 'rooms',
          name: 'Admin/Rooms',
          component: () => import('../views/admin/AdminRoomsView.vue')
        },
        {
          path: 'reservations',
          name: 'Admin/Reservations',
          component: () => import('../views/admin/AdminReservationsView.vue')
        }
      ],
      redirect: '/admin/sign-in'
    },
    {
      path: '/room/:id',
      name: 'room',
      component: RoomView
    },
    {
      path: '/reservation/:id',
      name: 'reservation',
      component: ReservationView
    },
    {
      path: '/reservation/:id/summary',
      name: 'summary',
      component: BookingSummaryView
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  if (to.path.startsWith('/admin/')) { // guard for admin panel
    const sessionData = AdminService.getAdminSessionData();
    const isAuthenticated = sessionData && sessionData.token;

    if (isAuthenticated) {
      if (to.name === 'Admin/SignIn') {
        next({name: 'Admin/Panel'})
      } else {
        next()
      }
    } else {
      if (to.name === 'Admin/SignIn') {
        next()
      } else {
        next({name: 'Admin/SignIn'})
      }
    }
  } else {
    next();
  }
})

export default router
