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
				<input ref="popupinput" type="text" class="popup__input" placeholder="Name" v-model="popupName" />
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
			popupName: ''
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
			this.$data.popupName = '';
			setTimeout(() => {
				this.$refs.popupinput.focus()
			}, 0);

			this.$data.popupStyle = {
				top: `${pixel.y}px`,
				left: `${pixel.x}px`
			};

			this.$data.latLng = latLng;

			this.$data.popupVisible = true;
		},

		hidePopup () {
			this.$data.popupVisible = false;
		},

		submit () {
			this.hidePopup();
			this.$store.dispatch('places/addPlace', {
				lat: this.$data.latLng.lat(),
				lng: this.$data.latLng.lng(),
				name: this.$data.popupName
			})
		}
	},

	// watch () {
	// 	zoomedPlace () {
	//
	// 	}
	// }
}
</script>
