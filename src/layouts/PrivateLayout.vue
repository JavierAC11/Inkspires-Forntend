<template>
  <div id="app">
    <Header />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import { onMounted } from 'vue';
import { useAuthStore } from '@/store/authStore';
import router from '@/router';

export default {

  name: 'PublicLayout',

  /**
   * Propiedades del componente
   */
  components: {
    Header,
    Footer
  },
  /**
   * Método que se ejecuta al montar el componente
   */
  setup() {
    /**
     * Store de autenticación
     */
    const { isLogin } = useAuthStore();

    /**
     * Redirecciona al login si el usuario no está logueado
     */
    onMounted(() => {
      if (!isLogin) {
        router.push('/login');
      }
    });
  }
  
}
</script>
  
  <style>
  body, html {
    margin: 0;
    padding: 0;
    height: 100%;
  }
  
  #app {
    font-family: Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  </style>
  