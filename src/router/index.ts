import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue';
import AuthView from "@/views/AuthView.vue";
import LoginFrom from "@/components/auth/LoginFrom.vue";
import RegisterFrom from "@/components/auth/RegisterFrom.vue";
import ResetPasswordFrom from "@/components/auth/ResetPasswordFrom.vue";



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView,
      children:[
        {
          path: 'login',
          component:LoginFrom
        },
        {
          path: 'register',
          component:RegisterFrom
        },
        {
          path: 'resetPassword',
          component:ResetPasswordFrom
        },
      ]

    }
  ]
})

export default router
