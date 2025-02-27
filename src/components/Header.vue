<template>
  <header class="header">
    <div class="logo">
      <img src="../assets/Logo.png" alt="Inkspires Logo" />
    </div>
    <nav class="nav-menu">
      <ul v-if="!isLogin">
        <li><router-link to="/">Inicio</router-link></li>
        <li><router-link to="/login">Login</router-link></li>
        <li><router-link to="/register">Register</router-link></li>
      </ul>
      <ul v-else>
        <li><router-link to="/">Inicio</router-link></li>
        <li><router-link to="/userProfile">{{ currentUser?.email }}</router-link></li>
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
  data() {
    return {
      currentUser: null
    }
  },
  computed: {
    ...mapState(useAuthStore, ['isLogin'])
  },
  mounted() {
    if (this.isLogin) {
      const authStore = useAuthStore();
      getMe().then((user) => {
        this.currentUser = user;
      });
    }
  },
  methods: {
    logout() {
      const authStore = useAuthStore();
      authStore.logout();
      this.$router.push('/login');
    }
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

.nav-menu ul {
  display: flex;
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
  font-size: 1rem;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-menu a:hover {
  color: #e0e0e0;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    padding: 1rem;
  }

  .nav-menu {
    margin-top: 1rem;
  }

  .nav-menu ul {
    flex-direction: column;
    align-items: center;
  }

  .nav-menu li {
    margin: 0.5rem 0;
  }
}
</style>
