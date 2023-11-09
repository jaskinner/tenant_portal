<template>
	<h1>Profile</h1>
	<div v-if="user">
		<h2>Info</h2>
		<ul>
			<li>Username: {{ user.username }}</li>
			<li>Role: {{ user.role }}</li>
		</ul>

		<h2>Properties</h2>
		<ul>
			<li>Address: {{ property.address }}</li>
			<li>City: {{ property.city }}</li>
			<li>State: {{ property.state }}</li>
			<li>Zip: {{ property.zip }}</li>
		</ul>
	</div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../store/auth'

const auth = useAuthStore()
const user = computed(() => auth.user)
const property = computed(() => auth.property);
</script>
