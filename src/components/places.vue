<template>
	<div class="places">
		<div class="wrapper">
			<ul class="places-list" v-if="places.length">
				<li
					v-for="(place, index) in places"
					:key="index"
					class="places-list__item"
					@click="onZoomPlace(place)"
				>
					{{place.name}}
					<button class="places-list__item-remove" @click.stop="removePlace(place)">X</button>
				</li>
			</ul>
			<p v-if="!places.length" class="places-list__info--empty">Click on the map to save a place.</p>
		</div>
	</div>

</template>

<script>
import { mapGetters } from 'vuex';

export default {
	computed: {
		...mapGetters('places', ['places'])
	},

	methods: {
		onZoomPlace (place) {
			this.$emit('zoomPlace', place);
		},

		removePlace (place) {
			this.$store.dispatch('places/removePlace', place);
		}
	}
}
</script>
