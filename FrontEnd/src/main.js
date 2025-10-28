import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import router from './router'
import vuetify from './plugins/vuetify'

createApp(App)
    .use(router)
    .use(vuetify)
    .mount('#app')
