<template>
	<li class="nav-item dropdown">
		<a
			class="nav-link dropdown-toggle"
			href="#"
			role="button"
			data-bs-toggle="dropdown"
			aria-expanded="false"
		>
			Account
		</a>
		<ul class="dropdown-menu dropdown-menu-end">
			<li v-if="!isLoggedIn">
				<form @submit.prevent="login" class="login-form px-4 py-3">
					<div class="mb-3">
						<input
							v-model="username"
							type="text"
							class="form-control"
							placeholder="username"
						/>
					</div>
					<div class="mb-3">
						<input
							v-model="password"
							type="password"
							class="form-control"
							placeholder="Password"
						/>
					</div>
					<div class="mb-3">
						<div class="form-check">
							<input type="checkbox" class="form-check-input" id="dropdownCheck" />
							<label class="form-check-label" for="dropdownCheck">
								Remember me
							</label>
						</div>
					</div>
					<button type="submit" @click="login" class="btn btn-primary">Sign in</button>
				</form>
			</li>
			<li v-else>
				<router-link class="dropdown-item" aria-current="page" to="/profile">
					Profile
				</router-link>
				<a href="#" class="dropdown-item" @click="logout">Logout</a>
			</li>
		</ul>
	</li>
</template>

<script setup>
import { computed, ref, inject } from 'vue'
import { useAuthStore } from '@/store/auth'

const $axios = inject('$axios')
const auth = useAuthStore()
const isLoggedIn = computed(() => auth.isLoggedIn)

const username = ref('')
const password = ref('')

const login = async () => {
	auth.login($axios, username.value, password.value)
}

const logout = () => {
	auth.logout()
}
</script>

<style scoped>
.login-form {
	min-width: 300px;
}
</style>
