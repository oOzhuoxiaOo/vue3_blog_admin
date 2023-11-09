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
      // 别名
      alias: ["/home", "/admin"],
      name: 'home',
      component: HomeView,
      redirect: "/admin/admin-home",
      children: [
        {
          path: "admin-home",
          component: () => import("@/components/home/AdminHome.vue")
        },
        {
          path: "users",
          component: () => import("@/components/users/AdminUsers.vue")
        },
        {
          path: "note-management",
          children: [
            {
              path: "write",
              component: () => import("@/components/notes/manageWrite/Write.vue")
            },
            {
              path: "note",
              component: () => import("@/components/notes/manageNote/ManageNote.vue")
            },
            {
              path: "tag",
              component: () => import("@/components/notes/manageTag/ManageTag.vue")
            },
            {
              path: "type",
              component: () => import("@/components/notes/manageType/ManageType.vue")
            },
          ]
        },
        {
          path: "comment",
          component: () => import("@/components/home/AdminHome.vue")
        },
        {
          path: "personalCenter",
          component: () => import("@/components/personalCenter/personalManage.vue")
        },
        {
          path: "friends",
          children:[
            {
              path: "list",
              component: () => import("@/components/friends/FriendList.vue")
            },
          ]
        },
        {
          path: "setting",
          component: () => import("@/components/home/AdminHome.vue")
        },

      ]
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView,
      children: [
        {
          path: 'login',
          component: LoginFrom
        },
        {
          path: 'register',
          component: RegisterFrom
        },
        {
          path: 'resetPassword',
          component: ResetPasswordFrom
        },
      ]

    },
    // 404配置
    {
      path: '/404',
      name: '404',
      component: () => import("@/views/NotFount.vue")
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'Any',
      redirect: '/404',
    },
  ]
})

export default router
