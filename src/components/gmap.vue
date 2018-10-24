<template>
	<div class="gmap">
		<gmap-map
			:center="center"
			:zoom="zoom"
			@click="showPopup"
			@drag="hidePopup"
		>
			<gmap-marker v-for="(place, index) in places" :key="index" :position="place" />
		</gmap-map>
		<div class="popup" v-if="popupVisible" :style="popupStyle">
			<form class="popup-form" @submit.prevent="submit">
				<input ref="popupinput" type="text" class="popup__input" placeholder="Name" v-model="popupInput" />
				<input type="button" class="popup__button" value="Save" @click="submit" />
			</form>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	props: ['zoomedPlace'],
	data () {
		return {
			popupStyle: {
				top: 0,
				left: 0
			},
			popupVisible: false,
			popupInput: ''
		}
	},

	computed: {
		...mapGetters('places', ['places']),

		center () {
			return {
				lat: this.zoomedPlace ? this.zoomedPlace.lat : 52.2297,
				lng: this.zoomedPlace ? this.zoomedPlace.lng : 21.0122
			}
		},
		zoom () {
			return this.zoomedPlace ? 18 : 11
		},
	},

	methods: {
		showPopup ({ latLng, pixel }) {
			this.popupInput = '';
			setTimeout(() => {
				this.$refs.popupinput.focus()
			}, 0);

			this.popupStyle = {
				top: `${pixel.y}px`,
				left: `${pixel.x}px`
			};

			this.latLng = latLng;

			this.popupVisible = true;
		},

		hidePopup () {
			this.popupVisible = false;
		},

		submit () {
			this.hidePopup();
			this.$store.dispatch('places/addPlace', {
				lat: this.latLng.lat(),
				lng: this.latLng.lng(),
				name: this.popupInput
			})
		}
	}
}
</script>
