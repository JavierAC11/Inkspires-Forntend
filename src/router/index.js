import PublicLayout from '@/layouts/PublicLayout.vue'
import Home from '@/views/Home.vue'


import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {path: '/', 
  component: PublicLayout,
  
  children: [
    {
      path: '',
      name: 'Home',
      component: Home 

    },
    {
      path: "login",
      name: "Login",
      component: () => import('@/views/Login.vue')
    },
    {
      path: "register",
      name: "Register",
      component: () => import('@/views/Register.vue')
    },
    {
      path: "post/:id",
      name: "Post",
      component: () => import('@/views/TattooView.vue')
    },
      ]
  },
  {
    path: "/userProfile",
    component: () => import('@/layouts/PrivateLayout.vue'),
    children: [
      {
        path: "",
        name: "UserProfile",
        component: () => import('@/views/UserProfile.vue')
      },
      {
        path: "publicar",
        name: "Publicar",
        component: () => import('@/views/Publicar.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(""),
  routes
})

export default router
