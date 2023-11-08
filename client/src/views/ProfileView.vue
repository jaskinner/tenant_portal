<template>
	<h1>Profile</h1>
	<ul v-if="user">
		<li>Username: {{ user.username }}</li>
		<li>Role: {{ user.role }}</li>
	</ul>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from '../store/auth';

const auth = useAuthStore();
const user = computed(() => auth.user)
</script>