import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from "axios";

import App from './App.vue'
import router from './router'

import './scss/styles.scss'
import 'bootstrap';

const instance = axios.create({
	baseURL: 'http://localhost:3000',
	timeout: 1000,
	headers: { 'Content-Type': 'application/json' }
});

const app = createApp(App)

app.use(createPinia())

app.provide('$axios', instance);
app.use(router)
app.mount('#app')
