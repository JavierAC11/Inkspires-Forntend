<template>
  <div :class="{'register-container': true, 'full-height': form.esTatuador}">
    <form @submit.prevent="handleSubmit" class="register-form">
      <h2>Registro</h2>

      <!-- Campos básicos -->
      <div class="form-group">
        <label for="nombre">Nombre</label>
        <input type="text" id="nombre" @blur="handleBlur($event)" v-model.trim="form.nombre" />
        <p v-if="errors.nombre" class="error">{{ errors.nombre }}</p>
      </div>

      <div class="form-group">
        <label for="email">Correo Electrónico</label>
        <input type="email" id="email" @blur="handleBlur($event)" v-model.trim="form.email" />
        <p v-if="errors.email" class="error">{{ errors.email }}</p>
      </div>

      <div class="form-group">
        <label for="password">Contraseña</label>
        <input type="password" id="password" @blur="handleBlur($event)" v-model="form.password" />
        <p v-if="errors.password" class="error">{{ errors.password }}</p>
      </div>
      <div class="form-group">
        <label for="passwordRepeat">Repetir Contraseña</label>
        <input 
          id="passwordRepeat" 
          @blur="handleBlur($event)"
          v-model="form.passwordRepeat" 
          type="password" 
          placeholder="Repetir contraseña" 
        />
        <p v-if="errors.passwordRepeat" class="error">{{ errors.passwordRepeat }}</p>
      </div>

      <!-- Switch para tatuadores -->
      <div class="form-group switch-container">
        <label class="switch">
          <input type="checkbox" v-model="form.esTatuador">
          <span class="slider round"></span>
        </label>
        <span>¿Eres tatuador?</span>
      </div>

      <!-- Campos adicionales para tatuadores -->
      <div v-if="form.esTatuador">
        <div class="form-group">
          <label for="estilo">Estilo de tatuaje</label>
          <select id="estilo" v-model="form.estilo"
          @blur="handleBlur($event)"
          >
          <option value="">Selecciona un estilo</option>
          <option value="tradicional">Tradicional</option>
          <option value="realista">Realista</option>
          <option value="neotradicional">Neotradicional</option>
          <option value="blackwork">Blackwork</option>
        </select>
          <p v-if="errors.estilo" class="error">{{ errors.estilo }}</p>
        </div>

        <div class="form-group">
          <label for="precioMedio">Precio medio</label>
          <input type="number" step="1" min="0" id="precioMedio" v-model.number="form.precioMedio" @blur="handleBlur($event)"
          />
          <p v-if="errors.precioMedio" class="error">{{ errors.precioMedio }}</p>
        </div>

        <div class="form-group">
          <label for="descripcion">Descripción</label>
          <textarea id="descripcion"           @blur="handleBlur($event)"
          v-model.trim="form.descripcion"></textarea>
          <p v-if="errors.descripcion" class="error">{{ errors.descripcion }}</p>
        </div>

        <!-- Campo de ubicación con autocompletado de Google Maps -->
        <div class="form-group">
          <label for="ubicacion">Ubicación</label>
          <input 
            type="text" 
            id="ubicacion" 
            ref="autocompleteInput" 
            v-model="form.ubicacion"
            placeholder="Introduce tu ubicación..."
            @blur="handleBlur($event)" 
          />
          <p v-if="errors.ubicacion" class="error">{{ errors.ubicacion }}</p>
        </div>
      </div>

      <!-- Botón de registro -->
      <button type="submit" class="register-button">Registrarse</button>
    </form>
  </div>
</template>

<script>
import { Loader } from "@googlemaps/js-api-loader";
import router from '@/router';
import { useAuthStore } from '@/store/authStore';
import Swal from "sweetalert2";

export default {
  name: "Register",
  /**
   * Propiedades del componente
   * @returns {Object}
   * @property {Object} form - Datos del formulario
   * @property {String} form.nombre - Nombre del usuario
   * @property {String} form.email - Correo electrónico del usuario
   * @property {String} form.password - Contraseña del usuario
   * @property {Boolean} form.esTatuador - Indica si el usuario es tatuador
   * @property {String} form.estilo - Estilo de tatuaje del tatuador
   * @property {Number} form.precioMedio - Precio medio del tatuador
   * @property {String} form.descripcion - Descripción del tatuador
   * @property {String} form.ubicacion - Ubicación del tatuador
   * @property {Object} errors - Errores de validación
   * @property {Object} autocomplete - Autocompletado de Google Maps
   * @property {String} apiKey - Clave de la API de Google Maps
   */
  data() {
    return {
      form: {
        nombre: "",
        email: "",
        password: "",
        esTatuador: false,
        estilo: "",
        precioMedio: null,
        descripcion: "",
        ubicacion: ""
      },
      errors: {},
      autocomplete: null,
      apiKey: import.meta.env.VITE_API_GOOGLE_MAPS_KEY
    };
  },
  /**
   * Método que se ejecuta al montar el componente
   */
  mounted() {
    if (this.form.esTatuador) {
      this.initAutocomplete();
    }
  },
  /**
   * Observador que se ejecuta al cambiar el valor de `form.esTatuador`
   * @param {Boolean} newValue - Nuevo valor de `form.esTatuador`
   * @returns {void}
   */
  watch: {
    'form.esTatuador'(newValue) {
      if (newValue) {
        this.$nextTick(() => {
          this.initAutocomplete();
        });
      }
    }
  },
  methods: {
    /**
     * Inicializa el autocompletado de Google Maps
     */
    async initAutocomplete() {
      const loader = new Loader({
        apiKey: this.apiKey,
        libraries: ["places"]
      });

      const google = await loader.load();
      
      this.autocomplete = new google.maps.places.Autocomplete(this.$refs.autocompleteInput, {
        types: ["geocode"], // Limita los resultados a ubicaciones geográficas
      });

      this.autocomplete.addListener("place_changed", () => {
        const place = this.autocomplete.getPlace();
        
        if (place.geometry) {
          this.form.ubicacion = place.formatted_address; // Guarda la dirección completa
          console.log("Ubicación seleccionada:", this.form.ubicacion);
        } else {
          console.error("No se encontró una ubicación válida.");
          this.errors.ubicacion = "Por favor selecciona una ubicación válida.";
        }
      });
    },
    /**
     * Maneja el evento `blur` de los campos del formulario
     * @param {Event} event - Evento de cambio de foco
     */
    handleBlur(event) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (event.target.id === "nombre") {
        if (!this.form.nombre) this.errors.nombre = "El nombre es requerido.";
        else delete this.errors.nombre;
      } else if (event.target.id === "email") {
        if (this.form.email === '' || !emailRegex.test(this.form.email)) this.errors.email = "El correo electrónico es incorrecto.";
        else delete this.errors.email;
      }
      else if (event.target.id === "password"){
        if (this.form.password.length < 8) this.errors.password = "La contraseña debe tener al menos 8 caracteres.";
        else delete this.errors.password;
      }
      else if(event.target.id === "passwordRepeat"){
        if (this.form.password !== this.form.passwordRepeat) this.errors.passwordRepeat = "Las contraseñas no coinciden.";
        else delete this.errors.passwordRepeat;
      }
      else if(event.target.id === "estilo"){
        if (!this.form.estilo) this.errors.estilo = "El estilo es requerido.";
        else delete this.errors.estilo;
      }
      else if(event.target.id === "precioMedio"){
        if (!this.form.precioMedio) this.errors.precioMedio = "El precio medio es requerido.";
        else if (this.form.precioMedio < 0) this.errors.precioMedio = "El precio medio no puede ser negativo.";
        else delete this.errors.precioMedio;
      }
      else if(event.target.id === "descripcion"){
        console.log(this.form.descripcion)
        if (!this.form.descripcion) this.errors.descripcion = "La descripción es requerida.";
        else delete this.errors.descripcion;
      }
      else if(event.target.id === "ubicacion"){
        if (!this.form.ubicacion) this.errors.ubicacion = "La ubicación es requerida.";
        else delete this.errors.ubicacion;
      }
      
        
    },
    /**
     * Maneja el envío del formulario
     */
    async handleSubmit() {
      console.log('Registrando usuario con:', this.form);

      console.log("Entrando...")
      if (Object.keys(this.errors).length === 0) {
        if (!this.form.esTatuador){
          if (!this.form.nombre || !this.form.email || !this.form.password || !this.form.passwordRepeat){
            this.showError("Por favor, completa todos los campos correctamente.");
            return;
          } 
        }
        else{
          if (!this.form.nombre || !this.form.email || !this.form.password || !this.form.passwordRepeat || !this.form.estilo || !this.form.precioMedio || !this.form.descripcion || !this.form.ubicacion){
            this.showError("Por favor, completa todos los campos correctamente.");
            return;
          }
        }
        const authStore = useAuthStore();

        try {
          await authStore.register(this.form);
          router.push('/userProfile');
        } catch (error) {
          console.log(error.errors)
          if (error.errors.email.includes("The email has already been taken.")) {
            this.showError("El correo electrónico ya está en uso.");
            router.push('/login');
          } else {

          console.error('Error en el registro:', error);
          this.errors.general = "Hubo un problema al registrarse. Por favor, inténtelo nuevamente.";
        }
      }
      }
      else {
        this.showError("Por favor, completa todos los campos correctamente.");
      }
    },
    /**
     * Muestra un mensaje de error
     * @param {String} message - Mensaje de error
     */
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
  width: 93%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.form-group select{
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.register-button {
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
@media screen and (max-width: 768px) {
  .register-form {
    padding: 1rem;
  }

  .register-container {
    min-height: 80vh;
  }
  
}
</style>
