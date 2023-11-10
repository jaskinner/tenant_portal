import { defineStore } from "pinia";

export const usePropertiesStore = defineStore('properties', {
	state: () => ({
		ownedPropertiesList: [],
		selectedProperty: null
	}),
	actions: {
		// fetchProperties(axios, userId) {

		// },
	}
});