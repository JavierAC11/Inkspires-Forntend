<template>
  <div class="login-container">
    <form v-on:submit.prevent="handleRegister" class="login-form">
      <h2>Registro</h2>

      <div class="form-group">
        <label for="name">Nombre</label>
        <input type="text" id="name" v-model="form.name" required />
        <p v-if="errors.name" class="error">{{ errors.name }}</p>
      </div>

      <div class="form-group">
        <label for="email">Correo Electrónico</label>
        <input type="email" id="email" v-model="form.email" required />
        <p v-if="errors.email" class="error">{{ errors.email }}</p>
      </div>

      <div class="form-group">
        <label for="password">Contraseña</label>
        <input type="password" id="password" v-model="form.password" required />
        <p v-if="errors.password" class="error">{{ errors.password }}</p>
      </div>

      <div class="form-group switch-container">
        <label class="switch">
        <input type="checkbox" v-model="form.is_tatuador">
        <span class="slider round"></span>
        </label>
        <span>¿Eres tatuador?</span>
      </div>

      <!-- Campos adicionales para tatuadores -->
      <div v-if="form.is_tatuador">
        <div class="form-group">
          <label for="estilo">Estilo de tatuaje</label>
          <input type="text" id="estilo" v-model="form.estilo" />
          <p v-if="errors.estilo" class="error">{{ errors.estilo }}</p>
        </div>

        <div class="form-group">
          <label for="precio_medio">Precio medio</label>
          <input type="number" id="precio_medio" v-model="form.precio_medio" />
          <p v-if="errors.precio_medio" class="error">{{ errors.precio_medio }}</p>
        </div>

        <div class="form-group">
          <label for="descripcion">Descripción</label>
          <textarea id="descripcion" v-model="form.descripcion"></textarea>
          <p v-if="errors.descripcion" class="error">{{ errors.descripcion }}</p>
        </div>
      </div>

      <button type="submit" class="login-button">Registrarse</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
        is_tatuador: false,
        estilo: "",
        precio_medio: null,
        descripcion: ""
      },
      errors: {}
    };
  },
  methods: {
    handleRegister() {
      this.errors = {};

      if (!this.form.name) {
        this.errors.name = "El nombre es requerido.";
      }
      if (!this.form.email) {
        this.errors.email = "El correo electrónico es requerido.";
      }
      if (!this.form.password) {
        this.errors.password = "La contraseña es requerida.";
      } else if (this.form.password.length < 8) {
        this.errors.password = "La contraseña debe tener al menos 8 caracteres.";
      }

      if (this.form.is_tatuador) {
        if (!this.form.estilo) {
          this.errors.estilo = "El estilo de tatuaje es requerido para tatuadores.";
        }
        if (!this.form.precio_medio) {
          this.errors.precio_medio = "El precio medio es requerido para tatuadores.";
        }
        if (!this.form.descripcion) {
          this.errors.descripcion = "La descripción es requerida para tatuadores.";
        }
      }

      if (Object.keys(this.errors).length === 0) {
        console.log("Datos de registro:", this.form);
        // Aquí puedes conectar con tu API de registro
      }
    }
  }
};
</script>

<style scoped>
/* ... (mantén los estilos anteriores) ... */

.switch-container {
  display: flex;
  align-items: center;
}
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;
  margin-right: 10px;
}
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
}
.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
}
input:checked + .slider {
  background-color: #1a1a1a;
}
input:checked + .slider:before {
  transform: translateX(20px);
}
.slider.round {
  border-radius: 34px;
}
.slider.round:before {
  border-radius: 50%;
}


textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  resize: vertical;
}
</style>

  
  <style scoped>
  .login-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f5f5f5;
  }
  
  .login-form {
    background-color: #fff;
    padding: 2rem;
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
  
  .form-group input[type="text"],
  .form-group input[type="email"],
  .form-group input[type="password"] {
    width: 100%;
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
  
  .error {
    color: #D32F2F;
    font-size: 0.9em;
    margin-top: 5px;
  }
  </style>
  