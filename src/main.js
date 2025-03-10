import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'


import { FcLikePlaceholder } from "oh-vue-icons/icons";
import { FcLike } from "oh-vue-icons/icons";
import { OhVueIcon, addIcons } from "oh-vue-icons";



addIcons(FcLikePlaceholder)
addIcons(FcLike)

// Si necesitas acceder a la variable de entorno en la aplicación, por ejemplo:

const pinia = createPinia()
pinia.use(piniaPluginPersist)

const app = createApp(App)

app.component("VIcon", OhVueIcon);
app.use(router).use(pinia).mount('#app')

// Opcional: puedes configurar una propiedad global si la necesitas en varios componentes
