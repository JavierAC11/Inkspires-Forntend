import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Si necesitas acceder a la variable de entorno en la aplicación, por ejemplo:
const baseUrl = ""

const app = createApp(App)

// Añadimos el router a la aplicación
app.use(router)

// Opcional: puedes configurar una propiedad global si la necesitas en varios componentes
app.config.globalProperties.$baseUrl = baseUrl

app.mount('#app')
