import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from "axios";

import App from './App.vue'

const instance = axios.create({
	baseURL: 'http://localhost:3000',
	timeout: 1000,
	headers: { 'Content-Type': 'application/json' }
});

const app = createApp(App)

app.use(createPinia())

app.provide('$axios', instance);

app.mount('#app')
