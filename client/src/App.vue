<script setup>
import NavbarComponent from './components/NavbarComponent.vue'
import { computed, inject } from 'vue'
import { useAuthStore } from '@/store/auth'

const $axios = inject('$axios')
const auth = useAuthStore()
const isLoggedIn = computed(() => auth.isLoggedIn)

if (isLoggedIn.value) {
	$axios.defaults.headers.common['Authorization'] = `Bearer ${auth.token}`
	auth.fetchUser($axios)
	auth.fetchProperty($axios)
}
</script>

<template>
	<NavbarComponent></NavbarComponent>
	<div class="container-fluid">
		<router-view></router-view>
	</div>
</template>
