<template>
    <div class="filters-container">
      <button @click="toggleFilters" class="filters-button">Filtrar</button>
      <div v-if="showFilters" class="filters">
        <div class="filter-row">
          <div class="filter-group">
            <label for="estilo">Estilo:</label>
            <select id="estilo" v-model="filters.estilo">
              <option value="">Todos</option>
              <option value="tradicional">Tradicional</option>
          <option value="realista">Realista</option>
          <option value="neotradicional">Neotradicional</option>
          <option value="blackwork">Blackwork</option>
            </select>
          </div>
          <div class="filter-group">
            <label for="tamaño">Tamaño:</label>
            <select id="tamaño" v-model="filters.tamaño">
              <option value="">Todos</option>
              <option value="pequeño">Pequeño</option>
              <option value="mediano">Mediano</option>
              <option value="grande">Grande</option>
            </select>
          </div>
        </div>
        <button type="submit" @click.prevent="applyFilters">Aplicar filtros</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Filtro',
    data() {
      return {
        filters: {
          estilo: '',
          tamaño: ''
        },
        showFilters: false
      }
    },
    methods: {
      toggleFilters() {
        this.showFilters = !this.showFilters;
      },
      applyFilters() {
        this.$emit('apply-filters', this.filters);
        this.showFilters = false;
      }
    }
  }
  </script>
  
  <style scoped>
  .filters-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.filters-button {
  padding: 10px 20px;
  background-color: #1a1a1a;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.filters-button:hover {
  background-color: #333;
}

.filters {
  min-width: 300px;
  margin-top: 10px;
  padding: 10px;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center; /* Centra el contenido dentro de .filters */
}

.filter-row {
  display: flex;
  justify-content: center; /* Centra los campos */
  gap: 10px;
  margin-bottom: 10px; /* Espacio entre los campos y el botón */
}

.filter-group {
  display: flex;
  flex-direction: column;
  align-items: center; /* Centra los campos */
}

.filter-group select {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button[type="submit"] {
  padding: 10px 20px;
  background-color: #1a1a1a;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: #333;
}

  </style>
  