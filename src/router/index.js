import PublicLayout from '@/layouts/PublicLayout.vue'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'

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
  }
]

const router = createRouter({
  history: createWebHistory(""),
  routes
})

export default router
