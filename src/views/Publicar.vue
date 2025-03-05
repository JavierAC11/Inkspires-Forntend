<template>
  <div class="publicar-post">
    <h2>Publicar nuevo post</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="imagen">Imagen del tatuaje</label>
        <input type="file" id="imagen" @change="handleImageUpload" accept="image/*" required>
        <img v-if="imagePreview" :src="imagePreview" alt="Vista previa" class="image-preview">
      </div>
      
      <div class="form-group">
        <label for="descripcion">Descripción</label>
        <textarea id="descripcion" v-model="descripcion" rows="4" required></textarea>
      </div>
      
      <div class="form-group">
        <label for="estilo">Estilo de tatuaje</label>
        <select id="estilo" v-model="estilo" required>
          <option value="">Selecciona un estilo</option>
          <option value="tradicional">Tradicional</option>
          <option value="realista">Realista</option>
          <option value="neotradicional">Neotradicional</option>
          <option value="blackwork">Blackwork</option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="tamano">Tamaño</label>
        <select id="tamano" v-model="tamano" required>
          <option value="">Selecciona un tamaño</option>
          <option value="pequeño">Pequeño</option>
          <option value="mediano">Mediano</option>
          <option value="grande">Grande</option>
        </select>
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
      error: null
    }
  },
  methods: {
    handleImageUpload(event) {
      const file = event.target.files[0]
      this.imagen = file
      this.imagePreview = URL.createObjectURL(file)
    },
    async handleSubmit() {
      this.isLoading = true;
      this.error = null;
      const authStore = useAuthStore();
      
      try {
        console.log(this.imagen)
        const formData = new FormData()
        formData.append('imgUrl', this.imagen)
        formData.append('descripcion', this.descripcion)
        formData.append('estilo', this.estilo)
        formData.append('tamaño', this.tamano)
        
        const response = await axios.post('http://localhost/api/posts', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${authStore.token}`
          }
        });
        
        console.log('Post creado:', response.data);
        // Aquí puedes manejar la respuesta exitosa, como mostrar un mensaje o redirigir
        this.$router.push('/userProfile'); // Redirige al perfil del usuario después de publicar
        
      } 
      
      catch (error) { 
        if (error.response) {
          if (error.response.status === 401) {
            console.error('No autorizado:', error.response.data)
            this.error = 'No estás autorizado para publicar. Por favor, inicia sesión.';
          } else if (error.response.status === 422) {
            if (error.response.data.errors.imgUrl) {
              console.error('Error en la imagen:', error.response.data.errors.imgUrl)
              this.error = 'La imagen es requerida, pruebe con otra imagen.';
            } else {
              console.error('Error en los datos:', error.response.data)
              this.error = 'Hubo un error en los datos. Por favor, verifica los campos.';
            } 
          }
        else {
          console.error('Error al publicar:', error)
          this.error = 'Hubo un error al publicar el post. Por favor, intenta de nuevo.';
        }
        
      }
      else {
        console.error('Error al publicar:', error)
        this.error = 'Hubo un error al publicar el post. Por favor, intenta de nuevo.';
      }
      } 
      
      
      finally {
        this.isLoading = false;
      }
    }
  }
}
</script>

<style scoped>
.publicar-post {
  min-width: 1000px;
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
</style>
