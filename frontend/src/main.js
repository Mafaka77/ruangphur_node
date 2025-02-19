import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { SnackbarService } from "vue3-snackbar";
import "vue3-snackbar/styles";
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(SnackbarService)
app.use(createPinia())
app.use(router)
app.mount('#app')
