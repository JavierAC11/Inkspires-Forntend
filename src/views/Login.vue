<template>
  <div class="login-container">
    <form @submit.prevent="handleSubmit" class="login-form">
      <h2>Iniciar sesión</h2>
      <div class="form-group">
        <label for="email">Correo electrónico</label>
        <input 
          id="email" 
          @blur="handleBlur($event)"
          v-model="email" 
          type="email" 
          placeholder="ejemplo@dominio.com" 
        />
        <p class="error" v-if="emailError">{{ emailError }}</p>
      </div>
      <div class="form-group">
        <label for="password">Contraseña</label>
        <input 
          id="password" 
          @blur="handleBlur($event)"
          v-model="password" 
          type="password" 
          placeholder="Contraseña" 
          
        />
        <p v-if="passwordError" class="error">{{ passwordError }}</p>
      </div>
      <p v-if="loginError" class="error">{{ loginErrorMessage }}</p>
      <button type="submit" class="login-button">Entrar</button>
    </form>
  </div>
</template>



<script>
import { mapState } from 'pinia';
import { useAuthStore } from '@/store/authStore';
import router from '@/router';
import Swal from 'sweetalert2';

export default {
  name: "Login",
  data() {
    return {
      email: '',
      password: '',
      emailError: false,
      passwordError: false,
      loginError: false
    }
  },
  computed: {
    ...mapState(useAuthStore, ['isLogin', 'user'])
  },
  setup() {
    const { isLogin } = useAuthStore();
    if (isLogin) {
      router.push('/userProfile');
    }
  },
  methods: {
    async handleSubmit() {

      if (!this.emailError && !this.passwordError) {
        if(this.email || this.password){
          const authStore = useAuthStore();
        try {
          await authStore.login({
            email: this.email,
            password: this.password
          });
          router.push('/userProfile');
        } catch (error) {
          this.showError('Credenciales inválidas. Por favor, inténtalo de nuevo.');
          this.email = '';
          this.password = '';
        }
        }
        else{
          this.showError('Por favor, completa todos los campos correctamente.');
        }
        
      } else {
        this.showError('Por favor, completa todos los campos correctamente.');
      }
    },
    handleBlur(event) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      if (event.target.id === 'email') {
        if (this.email === '') {
          this.emailError = "Email invalido";
        } else if (!emailRegex.test(this.email)) {
          this.emailError = "Email invalido";
        } else {
          this.emailError = false;
        }
      } else if (event.target.id === 'password') {
        if (this.password === '') {
          this.passwordError = "La contraseña no puede estar vacia";
        } else {
          this.passwordError = false;
        }
      }
    },
    showError(message) {
      console.log("error: "+ message)
      Swal.fire({
        title: '¡Error!',
        text: message,
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  }
}
</script>


<style scoped>
.error {
  color: #D32F2F;
  font-size: 0.9em;
  margin-top: 5px;
}

.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
  background-color: #f5f5f5;
}

.login-form {
  background-color: #fff;
  padding: 2rem;
  padding-top: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.login-form h2 {
  margin-bottom: 1.5rem;
  text-align: center;
  color: #333;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
}

.form-group input {
  width: 93%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.login-button {
  width: 100%;
  padding: 0.75rem;
  background-color: #1a1a1a;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: #333;
}
</style>
