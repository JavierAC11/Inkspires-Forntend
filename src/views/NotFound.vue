<template>
    <div class="not-found">
      <h1>Error 404</h1>
      <p>La página que buscas no existe.</p>
      <router-link to="/" class="back-home-button">Volver al inicio</router-link>

    </div>
  </template>
  
  <script>
  export default {
    name: "NotFound",
  };
  </script>
  
  <style scoped>
  h1 {
    font-size: 50px;
    margin-bottom: 20px;
  }
  p {
    font-size: 20px;
  }
  .not-found {
    min-height: 65vh;
    text-align: center;
    margin-top: 100px;
  }
  .back-home-button {
    width: 100%;
  padding: 0.75rem;
  background-color: #1a1a1a;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-decoration: none;
}
.back-home-button:hover {
    background-color: #333;
}

  </style>
  