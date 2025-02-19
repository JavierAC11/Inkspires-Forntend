<template>
    <div id="app">
      <Header />
      <router-view></router-view>
      <Footer />
    </div>
  </template>
  
  <script>
  import Header from '../components/Header.vue'
  import MainContent from '../views/Home.vue'
  import Footer from '../components/Footer.vue'
  
  export default {
    name: 'PrivateLayout',
    components: {
      Header,
      MainContent,
      Footer
    }
  }
  </script>
  
  <style>
  body, html {
    margin: 0;
    padding: 0;
    height: 100%;
  }
  
  #app {
    font-family: Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  </style>
  