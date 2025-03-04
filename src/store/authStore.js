// pinia-plugin-persist --force

import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'



export const useAuthStore = defineStore('auth', {
    
  state: () => ({
    token: null,
    isLogin: false,
  }),
  actions: {
    
    async login(credentials) {
        try{
            console.log(credentials)
        const response = await axios.post(`http://localhost/api/login`, credentials);
          
        this.token = response.data.access_token;
        this.isLogin = true;
            console.log(this.token)
    }
        catch(error){
                console.log(error);
            }
    },

    async register(userData) {
      try {
        console.log('Datos a enviar:', userData);
        const response = await axios.post('http://localhost/api/register', userData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        this.token = response.data.access_token;
        this.isLogin = true;
      } 
      catch (error) {
        if (error.response) {
          console.error('Error de respuesta:', error.response.data);
          throw error.response.data;
        } else {
          console.error('Error:', error);
          throw error;
        }
      }
    },

    async logout() {
      
        try{
            const response = await axios.post(`http://localhost/api/logout`, {}, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            });
            this.token = null;
            this.isLogin = false;
            router.push('/login');
        }
        catch(error){
            console.log(error);
        }
        
    },
  },
  persist: {
    enabled: true,
  },
})
