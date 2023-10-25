<template>
	<form @submit.prevent="login">
		<div class="mb-3">
			<label for="usernameField">Username</label>
			<input
				type="text"
				v-model="username"
				placeholder="Username"
				id="usernameField"
				class="form-control"
			/>
		</div>
		<div class="mb-3">
			<label for="passwordField">Password</label>
			<input
				type="password"
				v-model="password"
				placeholder="Password"
				id="passwordField"
				class="form-control"
			/>
		</div>
		<div class="mb-3">
			<button type="submit" class="btn btn-primary">Login</button>
		</div>

		<div>
			<button class="btn btn-secondary" @click="getUsers">Get Users</button>
		</div>

		<ul>
			<li v-for="user in users" :key="user.user_id">{{ user.username }}</li>
		</ul>
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
