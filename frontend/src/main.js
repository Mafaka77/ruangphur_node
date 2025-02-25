import {createApp} from 'vue'
import {createPinia} from 'pinia'
import {SnackbarService} from "vue3-snackbar";
import '@fortawesome/fontawesome-free/css/all.css';
import "vue3-snackbar/styles";
import App from './App.vue'
import router from './router'
import './assets/main.css'

const app = createApp(App)
app.use(SnackbarService)
app.use(createPinia())
app.use(router)

app.mount('#app')
