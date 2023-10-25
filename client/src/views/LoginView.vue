<template>
	<form @submit.prevent="login">
		<input type="text" v-model="username" placeholder="Username" />
		<input type="password" v-model="password" placeholder="Password" />
		<button type="submit">Login</button>

		<button @click="getUsers">get users</button>

		<span>{{ users }}</span>
	</form>
</template>

<script setup>
import { ref, inject } from 'vue'
import { useAuthStore } from '@/store/auth'

const $axios = inject('$axios')

const auth = useAuthStore()
const password = ref('')
const username = ref('')
const users = ref(null)

const login = async () => {
	try {
		const { data } = await $axios.post('/login', {
			username: username.value,
			password: password.value
		})

		if (data && data.token) {
			auth.setToken(data.token)
		}

		$axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
	} catch (error) {
		console.log(error)
	}
}

const getUsers = async () => {
	try {
		const { data } = await $axios.get('/api/users')

		if (data && data.data) {
			users.value = data.data.users
		}
	} catch (error) {
		console.log(error)
	}
}
</script>
