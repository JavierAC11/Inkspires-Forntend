<template>
  <div :class="{'register-container': true, 'full-height': form.is_tatuador}">
    <form v-on:submit.prevent="handleSubmit" class="register-form">
      <h2>Registro</h2>

      <div class="form-group">
        <label for="name">Nombre</label>
        <input type="text" id="name" v-on:blur="handleBlur($event)" v-model.trim="form.name" required />
        <p v-if="errors.name" class="error">{{ errors.name }}</p>
      </div>

      <div class="form-group">
        <label for="email">Correo Electrónico</label>
        <input type="email" id="email" v-on:blur="handleBlur($event)" v-model.trim="form.email" required />
        <p v-if="errors.email" class="error">{{ errors.email }}</p>
      </div>

      <div class="form-group">
        <label for="password">Contraseña</label>
        <input type="password" id="password" v-on:blur="handleBlur($event)" v-model="form.password" required />
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
          <label for="estilos">Estilos de tatuaje</label>
          <input type="text" id="estilos" v-model.trim="form.estilos" />
          <p v-if="errors.estilos" class="error">{{ errors.estilos }}</p>
        </div>

        <div class="form-group">
          <label for="precio_medio">Precio medio</label>
          <input type="number" step="0.01" id="precio_medio" v-model.number="form.precio_medio" />
          <p v-if="errors.precio_medio" class="error">{{ errors.precio_medio }}</p>
        </div>

        <div class="form-group">
          <label for="descripcion">Descripción</label>
          <textarea id="descripcion" v-model.trim="form.descripcion"></textarea>
          <p v-if="errors.descripcion" class="error">{{ errors.descripcion }}</p>
        </div>

        <div class="form-group">
          <label for="ubicacion">Ubicación</label>
          <input type="text" id="ubicacion" v-model.trim="form.ubicacion" />
          <p v-if="errors.ubicacion" class="error">{{ errors.ubicacion }}</p>
        </div>
      </div>

      <button type="submit" class="register-button">Registrarse</button>
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
        estilos: "",
        precio_medio: null,
        descripcion: "",
        ubicacion: ""
      },
      errors: {}
    };
  },
  methods: {
    handleBlur(event) {

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/


      if (event.target.id === "name") {
        if (!this.form.name) this.errors.name = "El nombre es requerido.";
        else delete this.errors.name;
      }
      else if (event.target.id === "email") {
        if (this.form.email === '' || !emailRegex.test(this.form.email)) this.errors.email = "El correo electrónico es incorrecto.";
        else delete this.errors.email;
      } 
      else if (event.target.id === "password") {
        console.log(this.form.password)
        if (this.form.password === '' || !passwordRegex.test(this.form.password)) this.errors.password = "La contraseña debe tener al menos 8 caracteres e incluir una letra mayúscula, una minúscula, un número y un carácter especial (@$!%*?&).";
        else delete this.errors.password;
      }
    },
    handleSubmit() {
      console.log('Registrando usuario con:', this.form)
      // TODO: Implementar lógica de registro
    }

  }
};



</script>

<style scoped>
.register-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 2rem 0;
}

.full-height {
  height: auto;
}

.register-form {
  background-color: #fff;
  padding: 2rem;
  padding-top: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.register-form h2 {
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
.form-group input[type="password"],
.form-group input[type="number"],
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.register-button {
  width: 93%;
  padding: 0.75rem;
  background-color: #1a1a1a;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.register-button:hover {
  background-color: #333;
}

.error {
  color: #D32F2F;
  font-size: 0.9em;
  margin-top: 5px;
}

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
</style>
