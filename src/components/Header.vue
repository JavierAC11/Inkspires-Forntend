<template>
  <header class="header">
    <!-- Logo que controla la visibilidad del menú -->
    <div class="logo" >
      <img src="../assets/Logo.png" alt="Inkspires Logo" />
    </div>
    <!-- Menú -->
    <nav class="nav-menu">
      <ul v-if="!isLogin">
        <li><router-link to="/">Inicio</router-link></li>
        <li><router-link to="/login">Login</router-link></li>
        <li><router-link to="/register">Register</router-link></li>
      </ul>
      <ul v-else-if="!currentUser">
        Cargando...
      </ul>
      <ul v-else>
        <li><router-link to="/">Inicio</router-link></li>
        <li><router-link to="/userProfile">{{ currentUser?.data.nombre }}</router-link></li>
        <li><router-link to="/userProfile/publicar">Publicar</router-link></li>
        <li @click="logout">Logout</li>
      </ul>
    </nav>
  </header>
</template>


<script>
import { getMe } from '@/helpers/getMe';
import { useAuthStore } from '@/store/authStore';
import { mapState } from 'pinia';

export default {
  name: "Header",
  /**
   * Propiedades del componente
   * @returns {Object}
   * @property {Object} currentUser - Usuario actual
   * 
   */
  data() {
    return {
      currentUser: null,
    };
  },
  /**
   * Propiedades computadas
   * @returns {Object}
   * @property {Boolean} isLogin - Indica si el usuario está logueado
   */
  computed: {
    ...mapState(useAuthStore, ['isLogin']),
  },
  /**
   * Método que se ejecuta al montar el componente
   * Obtiene los datos del usuario actual
   */
  async mounted() {
    const authStore = useAuthStore();
    try {
      if (this.isLogin) {
        await getMe().then((user) => {
          this.currentUser = user;
        });
      }
    } catch (error) {
      authStore.token = null;
      authStore.isLogin = false;
      this.currentUser = null;
      
    }
/*    if (this.isLogin) {
      const authStore = useAuthStore();
      getMe().then((user) => {
        this.currentUser = user;
      });
    }*/
  },
  methods: {
    /**
     * Cierra la sesión del usuario
     */
    logout() {
      const authStore = useAuthStore();
      authStore.logout();
      this.$router.push('/login');
    },
  },
};

</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #1a1a1a;
  color: #ffffff;
}

.logo img {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ffffff;
}

/* Estilos del menú */
.nav-menu ul {
  display: flex; /* Ocultar por defecto */
}


.nav-menu ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.nav-menu li {
  margin-left: 1.5rem;
}

.nav-menu a {
  color: #ffffff;
  text-decoration: none;
}

.nav-menu a:hover {
  color: #e0e0e0;
}

/* Estilos para responsive */
@media (max-width: 768px) {
  .header {
    flex-direction: column; /* Alinear verticalmente en responsive */
    padding: 1rem;
    gap: .5rem; /* Espaciado entre logo y menú */
    align-items: center; /* Centrar contenido */
    text-align: center; /* Centrar texto */
    position: relative; /* Para manejar el menú */
    z-index: auto; 
}
}

</style>
