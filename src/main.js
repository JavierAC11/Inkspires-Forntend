import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'


import { FcLikePlaceholder } from "oh-vue-icons/icons";
import { FcLike } from "oh-vue-icons/icons";
import { OhVueIcon, addIcons } from "oh-vue-icons";


// Agrega los iconos que necesitas
addIcons(FcLikePlaceholder)
addIcons(FcLike)

// Crea la instancia de Pinia y úsala en la app
const pinia = createPinia()

// Agrega el plugin de persistencia
pinia.use(piniaPluginPersistedstate)

// Crea la app
const app = createApp(App)

// Registra el componente global
app.component("VIcon", OhVueIcon);

// Usa el router y Pinia
app.use(router).use(pinia).mount('#app')