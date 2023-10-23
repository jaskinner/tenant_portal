import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import instance from './axios'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.provide('$axios', instance);

app.mount('#app')
