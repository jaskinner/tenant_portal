<template>
	<nav class="navbar navbar-expand-lg bg-body-tertiary">
		<div class="container-fluid">
			<router-link class="navbar-brand" to="/"> Portal </router-link>
			<button
				class="navbar-toggler"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#navbarNav"
				aria-controls="navbarNav"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarNav">
				<ul class="navbar-nav">
					<li class="nav-item">
						<router-link class="nav-link" aria-current="page" to="/profile">
							Profile
						</router-link>
					</li>
				</ul>
				<form v-if="!isLoggedIn" class="d-flex" @submit.prevent="login">
					<label for="usernameField">Username</label>
					<input
						type="text"
						v-model="username"
						placeholder="Username"
						id="usernameField"
						class="form-control"
					/>
					<label for="passwordField">Password</label>
					<input
						type="password"
						v-model="password"
						placeholder="Password"
						id="passwordField"
						class="form-control"
					/>
					<button class="btn btn-outline-success" @click="login" type="submit">
						Login
					</button>
				</form>
				<form v-if="isLoggedIn" class="d-flex" @submit.prevent="logout">
					<button class="btn btn-outline-success" @click="logout">Logout</button>
				</form>
			</div>
		</div>
	</nav>
</template>

<script setup>
import { computed, ref, inject } from 'vue'
import { useAuthStore } from '@/store/auth'

const $axios = inject('$axios')
const auth = useAuthStore()
const isLoggedIn = computed(() => auth.isLoggedIn)

if (isLoggedIn.value) {
	$axios.defaults.headers.common['Authorization'] = `Bearer ${auth.token}`
	auth.fetchUser($axios);
}

const username = ref('')
const password = ref('')

const login = async () => {
	auth.login($axios, username.value, password.value)
}

const logout = () => {
	auth.logout()
}
</script>
