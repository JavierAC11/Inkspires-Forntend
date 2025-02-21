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
        
        <button type="submit" class="btn-publicar">Publicar</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PublicarPost',
    data() {
      return {
        imagen: null,
        imagePreview: null,
        descripcion: '',
        estilo: '',
        tamano: ''
      }
    },
    methods: {
      handleImageUpload(event) {
        const file = event.target.files[0]
        this.imagen = file
        this.imagePreview = URL.createObjectURL(file)
      },
      async handleSubmit() {
        try {
          const formData = new FormData()
          formData.append('imagen', this.imagen)
          formData.append('descripcion', this.descripcion)
          formData.append('estilo', this.estilo)
          formData.append('tamano', this.tamano)
          
          
          
          console.log('Datos del post:', { imagen: this.imagen, descripcion: this.descripcion, estilo: this.estilo, tamano: this.tamano })
        } catch (error) {
          console.error('Error al publicar:', error)
          
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
  </style>
  