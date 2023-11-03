<template>
	<nav class="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="First navbar example">
		<div class="container-fluid">
			<router-link class="navbar-brand" to="/"> Portal </router-link>
			<button
				class="navbar-toggler"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#main-nav"
				aria-controls="main-nav"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse" id="main-nav">
				<ul class="navbar-nav ms-auto">
					<AuthFormComponent></AuthFormComponent>
				</ul>
			</div>
		</div>
	</nav>
</template>

<script setup>
import AuthFormComponent from './AuthFormComponent.vue'
</script>
