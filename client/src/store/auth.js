import { defineStore } from "pinia";

export const useAuthStore = defineStore({
	id: 'auth',
	state: () => ({
		token: localStorage.getItem('auth_token') || ''
	}),
	getters: {
		isLoggedIn: (state) => !!state.token
	},
	actions: {
		setToken(token) {
			this.token = token;
			localStorage.setItem('auth_token', token);
		},
		removeToken() {
			this.token = '';
			localStorage.removeItem('auth_token');
		},
		async login($axios, username, password) {

			try {
				const { data } = await $axios.post('/api/auth/login', {
					username: username,
					password: password
				})

				if (data && data.token) {
					this.setToken(data.token);
				}

				$axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
			} catch (error) {
				console.log(error)
			}
		},
		logout() {
			this.removeToken();
		}
	}
});
