import { defineStore } from "pinia";

export const useAuthStore = defineStore({
	id: 'auth',
	state: () => ({
		token: localStorage.getItem('auth_token') || '',
		user: null,
		property: null
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
		updateUser(user) {
			this.user = user;
		},
		updateProperty(property) {
			this.property = property;
		},
		async fetchUser($axios) {
			try {
				const { data } = await $axios.get('/api/users/me');

				if (data.data && data.data.user) {
					this.updateUser({
						id: data.data.user.user_id,
						username: data.data.user.username,
						role: data.data.user.role,
					});
				}
			} catch (error) {
				console.log(error.message)
			}
		},
		async fetchProperty($axios) {
			try {
				const { data } = await $axios.get('/api/properties');

				if(data) {
					this.updateProperty({
						address: data.data.property.address,
						city: data.data.property.city,
						state: data.data.property.state,
						zip: data.data.property.zip,
					})
				}
			} catch (error) {
				console.log(error.message)
			}
		},
		async login($axios, username, password) {
			try {
				const { data } = await $axios.post('/api/auth/login', {
					username: username,
					password: password
				})

				if (data && data.token) {
					this.setToken(data.token);
					this.updateUser(data.user);
				}

				$axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
			} catch (error) {
				console.log(error.message)
			}
		},
		logout() {
			this.removeToken();
			this.user = null;
		}
	}
});
