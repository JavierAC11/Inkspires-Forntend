<template>
  <div class="publicar-post">
    <h2>Publicar nuevo post</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
  <label for="imagen">Imagen del tatuaje</label>
  <input type="file" id="imagen" @change="handleImageUpload" @blur="validateImage" accept="image/jpeg, image/png">
  <img v-if="imagePreview" :src="imagePreview" alt="Vista previa" class="image-preview">
  <button v-if="imagePreview" @click.prevent="clearImage" class="btn-clear">Eliminar imagen</button>
  <p id="info">Se admiten archivos JPEG, JPG y PNG con un tamaño máximo de 2 MB.</p>
  <p v-if="imageError" class="error-message">{{ imageError }}</p>
</div>

      
      <div class="form-group">
        <label for="descripcion">Descripción</label>
        <textarea id="descripcion" v-model="descripcion" @blur="validateDescripcion" rows="4"></textarea>
        <p v-if="descripcionError" class="error-message">{{ descripcionError }}</p>
      </div>
      
      <div class="form-group">
        <label for="estilo">Estilo de tatuaje</label>
        <select id="estilo" v-model="estilo" @blur="validateEstilo" required>
          <option value="">Selecciona un estilo</option>
          <option value="tradicional">Tradicional</option>
          <option value="realista">Realista</option>
          <option value="neotradicional">Neotradicional</option>
          <option value="blackwork">Blackwork</option>
        </select>
        <p v-if="estiloError" class="error-message">{{ estiloError }}</p>
      </div>
      
      <div class="form-group">
        <label for="tamano">Tamaño</label>
        <select id="tamano" v-model="tamano" @blur="validateTamano" required>
          <option value="">Selecciona un tamaño</option>
          <option value="pequeño">Pequeño</option>
          <option value="mediano">Mediano</option>
          <option value="grande">Grande</option>
        </select>
        <p v-if="tamanoError" class="error-message">{{ tamanoError }}</p>
      </div>
      
      <button type="submit" class="btn-publicar" :disabled="isLoading">
        {{ isLoading ? 'Publicando...' : 'Publicar' }}
      </button>
    </form>
    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>


<script>
import axios from 'axios';
import { useAuthStore } from '@/store/authStore';
import Swal from 'sweetalert2';

export default {
  name: 'PublicarPost',
  data() {
    return {
      imagen: null,
      imagePreview: null,
      descripcion: '',
      estilo: '',
      tamano: '',
      isLoading: false,
      error: null,
      imageError: null,
      descripcionError: null,
      estiloError: null,
      tamanoError: null,
      apiUrl: import.meta.env.VITE_API_URL

    }
  },
  methods: {
    handleImageUpload(event) {
      const file = event.target.files[0];
      const allowedFormats = ['image/jpeg', 'image/png'];
      const maxSize = 2 * 1024 * 1024; // 2 MB

      if (!allowedFormats.includes(file.type)) {
        this.imageError = 'Solo se admiten archivos JPEG o PNG.';
        this.imagen = null;
        this.imagePreview = null;
        return;
      }

      if (file.size > maxSize) {
        this.imageError = 'La imagen no puede superar los 2 MB.';
        this.imagen = null;
        this.imagePreview = null;
        return;
      }

      this.imagen = file;
      this.imagePreview = URL.createObjectURL(file);
      this.imageError = null;
    },
    validateImage() {
      if (!this.imagen) {
        this.imageError = 'Debes seleccionar una imagen.';
      } else {
        this.imageError = null;
      }
    },
    clearImage() {
      this.imagen = null
      this.imagePreview = null
    },
    validateDescripcion() {
      if (!this.descripcion) {
        this.descripcionError = 'La descripción es requerida.';
      } else {
        this.descripcionError = null;
      }
    },
    validateEstilo() {
      if (!this.estilo) {
        this.estiloError = 'El estilo es requerido.';
      } else {
        this.estiloError = null;
      }
    },
    validateTamano() {
      if (!this.tamano) {
        this.tamanoError = 'El tamaño es requerido.';
      } else {
        this.tamanoError = null;
      }
    },
    async handleSubmit() {
      this.validateImage();
      this.validateDescripcion();
      this.validateEstilo();
      this.validateTamano();

      if (this.imageError || this.descripcionError || this.estiloError || this.tamanoError) {
        this.showError('Por favor, verifica los campos.');
        return;
      }
      
      this.isLoading = true;
      this.error = null;
      const authStore = useAuthStore();
      
      try {
        const formData = new FormData()
        formData.append('imgUrl', this.imagen)
        formData.append('descripcion', this.descripcion)
        formData.append('estilo', this.estilo)
        formData.append('tamaño', this.tamano)
        
        const response = await axios.post(`${this.apiUrl}/posts`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${authStore.token}`
          }
        });
        
        console.log('Post creado:', response.data);
        // Aquí puedes manejar la respuesta exitosa, como mostrar un mensaje o redirigir
        this.$router.push('/userProfile'); // Redirige al perfil del usuario después de publicar
        
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401) {
            console.error('No autorizado:', error.response.data)
            this.error = 'No estás autorizado para publicar. Por favor, inicia sesión.';
          } else if (error.response.status === 422) {
            console.error('Error en los datos:', error.response.data)
            this.error = 'Hubo un error en los datos. Por favor, verifica los campos.';
          } else {
            console.error('Error al publicar:', error.response.data)
            this.error = 'Hubo un error al publicar el post. Por favor, intenta de nuevo.';
          }
        } else {
          console.error('Error al publicar:', error)
          this.error = 'Hubo un error al publicar el post. Por favor, intenta de nuevo.';
        }
      } finally {
        this.isLoading = false;
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

#info {
    font-size: 12px;
    color: #666;
}

.publicar-post {
  min-width: 600px;
  margin: 0 auto;
  padding: 20px;
  min-height: 75vh;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="file"], 
textarea,
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.image-preview {
  max-width: 100%;
  margin-top: 10px;
}

.btn-clear {
  margin-top: 5px;
  padding: 5px;
  border: none;
  border-radius: 4px;
  background-color: #1a1a1a;
  color: white;
  cursor: pointer;
}

.btn-clear:hover {
  background-color: #333;
}

.btn-publicar {
  background-color: #1a1a1a;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-publicar:hover {
  background-color: #333;
}

.btn-publicar:disabled {
  background-color: #999;
  cursor: not-allowed;
}

.error-message {
  color: red;
  margin-top: 10px;
}

@media screen and (max-width: 768px) {
  .publicar-post {
    min-width: 400px;
    padding: 10px;
  }

  
}

@media screen and (max-width: 480px) {
  .publicar-post {
    min-width: 300px;
  }

  input[type="file"],
  textarea,
  select {
    max-width: 350px;
    margin: auto;
  }
  

  
}

</style>
