import Vue from 'vue';
import Vuex from 'vuex';
import places from './places';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		places
	},
	state: {
		filter: ''
	},
	mutations: {
		setFilter: (state, payload) => {
			state.filter = payload;
		}
	},
	actions: {
		setFilter: ({ commit }, payload) => {
			commit('setFilter', payload);
		}
	}
});
