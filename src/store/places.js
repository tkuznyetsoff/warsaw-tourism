
export default {
	namespaced: true,
	state: {
		data: []
	},
	getters: {
		places: (state, getters, rootState) => state.data.filter(item =>
			item.name.toLowerCase().indexOf(rootState.filter.toLowerCase()) > -1)
	},
	mutations: {
		addPlace: (state, payload) => {
			state.data.push(payload);
		},

		removePlace: (state, payload) => {
			state.data.splice(state.data.indexOf(payload), 1);
		}
	},
	actions: {
		addPlace: ({ commit }, place) => {
			commit('addPlace', place);
		},

		removePlace: ({ commit }, place) => {
			commit('removePlace', place);
		}
	}
};
