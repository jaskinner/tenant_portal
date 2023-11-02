<script setup>
import NavbarComponent from './components/NavbarComponent.vue'
import { inject } from 'vue'

const $axios = inject('$axios')
const token = localStorage.getItem('auth_token')

if (token) {
	$axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
</script>
<template>
	<NavbarComponent></NavbarComponent>
	<router-view></router-view>
</template>
