<template>
	<div class="app">
		<header>
			<h1 class="app-title">Warsaw Tourism</h1>
			<button v-if="zoomedPlace" class="app-reset" @click="resetZoom">Reset zoom</button>
		</header>
		<section class="filter">
			<input class="filter__input" type="text" placeholder="Search" v-model="filter"/>
		</section>
		<section class="home-section">
			<places @zoomPlace="onZoomPlace"/>
			<gmap :zoomedPlace="zoomedPlace"/>
		</section>
	</div>
</template>

<script>
import places from '@/components/places';
import gmap from '@/components/gmap';

export default {
	name: 'Home',
	data () {
		return {
			zoomedPlace: null
		}
	},
	computed: {
		filter: {
			get () {
				return this.$store.state.filter;
			},
			set (input) {
				this.$store.dispatch('setFilter', input);
			}
		}
	},
	components: {
		places,
		gmap
	},

	methods: {
		onZoomPlace (place) {
			this.zoomedPlace = place;
		},

		resetZoom () {
			this.zoomedPlace = null;
		}
	}
}
</script>
