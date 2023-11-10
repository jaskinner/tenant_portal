import { defineStore } from "pinia";
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
	state: () => ({
		currentUser: null,
		isAuthenticated: false,
		token: null,
		loginError: null
	}),
	actions: {
		async login(axios, credentials) {
			try {
				this.loginError = null;

				const response = await axios.post('/api/auth/login', credentials);

				this.currentUser = response.data.user;
				this.token = response.data.token;
				this.isAuthenticated = true;

				localStorage.setItem('token', this.token);

				axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
			} catch (error) {
				this.isAuthenticated = false;
				this.loginError = error.message;
			}
		},
		logout() {
			this.currentUser = null;
			this.isAuthenticated = false;
			this.token = null;
			localStorage.removeItem('token');
			delete axios.defaults.headers.common['Authorization'];
		}
	}
});
