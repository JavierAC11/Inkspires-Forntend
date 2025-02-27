// pinia-plugin-persist --force

import { defineStore } from 'pinia'
import axios from 'axios'



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
    logout() {
      this.token = null;
      this.isLogin = false;
    },
  },
  persist: {
    enabled: true,
  },
})
