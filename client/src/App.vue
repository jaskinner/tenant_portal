<script setup>
import { ref, inject } from 'vue'

const axiosInstance = inject('$axios')

const data = ref(null)

axiosInstance
	.get('/api/users/5')
	.then((response) => {
		data.value = response.data
	})
	.catch((error) => {
		console.error('An error occurred:', error)
	})
</script>

<template>
	{{ data ? data.data.user.username : 'Loading...' }}
</template>
