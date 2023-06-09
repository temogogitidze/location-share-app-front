import '@/assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/router'
import googleMaps from '@/plugins/location/googleMaps'

import VueGoogleMaps from '@fawmi/vue-google-maps'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueGoogleMaps, googleMaps)

app.mount('#app')
