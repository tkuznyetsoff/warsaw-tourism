import Vue from 'vue';
import * as Gmaps from 'vue2-google-maps';
import config from '@/config/map';
import App from './App.vue';
import store from './store/store';

Vue.use(Gmaps, {
	load: config
});

Vue.config.productionTip = false;

new Vue({
	store,
	render: h => h(App)
}).$mount('#app');
