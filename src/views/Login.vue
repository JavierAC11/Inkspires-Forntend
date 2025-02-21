<template>
    <div class="login-container">
      <form v-on:submit.prevent="handleSubmit" class="login-form">
        <h2>Iniciar sesión</h2>
        <div class="form-group">
          <label for="email">Correo electrónico</label>
          <input 
            id="email" 
            v-on:blur="handleBlur($event)"
            v-model="email" 
            type="email" 
            placeholder="ejemplo@dominio.com" 
            required
          />
          <p class="error" v-if="emailError">Email incorrecto</p>
        </div>
        <div class="form-group">
          <label for="password">Contraseña</label>
          <input 
            id="password" 
            v-on:blur="handleBlur($event)"
            v-model="password" 
            type="password" 
            placeholder="Contraseña" 
            required
          />
          <p v-if="passwordError" class="error">La contraseña no puede estar vacía.</p>
        </div>
        <button type="submit" class="login-button">Entrar</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: "Login",
    data() {
      return {
        email: '',
        password: '',
        emailError: false,
        passwordError: false
      }
    },
    methods: {
      handleSubmit() {
        // Aquí puedes implementar la lógica de autenticación
        console.log('Iniciando sesión con:', this.email, this.password)
        // Por ejemplo, llamar a una API de autenticación o actualizar el estado global
      },
      handleBlur(event) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (event.target.id === 'email') {
          if (this.email === '' || !emailRegex.test(this.email)) {
            this.emailError = true
          } else {
            this.emailError = false
          }
        } else if (event.target.id === 'password') {
          if (this.password === '') {
            this.passwordError = true
          } else {
            this.passwordError = false
        }
      }
    }
  }
    }
  </script>
  
  <style scoped>

    .error {
    color: #D32F2F; /* Un tono rojo para indicar error */
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
  