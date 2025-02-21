import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, mutations, getters } from './store'

// Si necesitas acceder a la variable de entorno en la aplicación, por ejemplo:
const baseUrl = ""

const app = createApp(App)

app.config.globalProperties.$store = store
app.config.globalProperties.$mutations = mutations
app.config.globalProperties.$getters = getters

// Añadimos el router a la aplicación
app.use(router)

// Opcional: puedes configurar una propiedad global si la necesitas en varios componentes
app.config.globalProperties.$baseUrl = baseUrl

app.mount('#app')
