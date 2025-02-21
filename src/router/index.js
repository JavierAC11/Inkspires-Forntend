import PublicLayout from '@/layouts/PublicLayout.vue'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import PrivateLayout from '@/layouts/PrivateLayout.vue'
import UserProfile from '@/views/UserProfile.vue'
import Publicar from '@/views/Publicar.vue'

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
      component: Login
    },
    {
      path: "register",
      name: "Register",
      component: Register
    },
      ]
  },
  {
    path: "/userProfile",
    component: PrivateLayout,
    children: [
      {
        path: "",
        name: "UserProfile",
        component: UserProfile
      },
      {
        path: "publicar",
        name: "Publicar",
        component: Publicar
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(""),
  routes
})

export default router
