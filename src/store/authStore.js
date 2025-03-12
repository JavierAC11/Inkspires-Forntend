// pinia-plugin-persist --force

import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'

/**
 * Store de autenticación
 * @returns {Store}
 */
export const useAuthStore = defineStore('auth', {
  
    /**
     * Estados que se manejan en el store
     */
  state: () => ({
    token: null,
    isLogin: false,
  }),
  actions: {
    
    /**
     * Función para hacer login
     * @param {object} credentials
     * 
     */
    async login(credentials) {
      const apiUrl = import.meta.env.VITE_API_URL;

        try{
        const response = await axios.post(`${apiUrl}/login`, credentials);
          
        this.token = response.data.access_token;
        this.isLogin = true;
    }
        catch(error){
          throw error; 
        }
    },

    /**
     * Función para registrar un usuario
     * @param {object} userData 
     */
    async register(userData) {
      const apiUrl = import.meta.env.VITE_API_URL;

      try {
        const response = await axios.post(`${apiUrl}/register`, userData, {
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

    /**
     * Función para hacer logout
     */
    async logout() {
      const apiUrl = import.meta.env.VITE_API_URL;

      
        try{
          this.isLogin = false;  
          const response = await axios.post(`${apiUrl}/logout`, {}, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            });
            
            this.token = null;
            router.push('/login');
        }
        catch(error){
            console.log(error);
        }
        
    },
  },
  /**
   * Persistencia de datos
   * @type {Store} 
   */
   persist: {
    enabled: true,
    strategies: [
      {
        key: 'auth',
        storage: localStorage
      }
    ]
  },
})
