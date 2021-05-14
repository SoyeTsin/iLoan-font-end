import Vue from 'vue'
import Vuex from 'vuex'
import CM from "@/service/common";

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		enumeration: []
	},
	mutations: {
		getEnumeration(state) {
			CM.getOptionList().then(res => {
				state.enumeration = res
                // console.log("🚀 ~ file: index.js ~ line 15 ~ CM.getOptionList ~ state.enumeration", state.enumeration)
			})
		}
	},
	actions: {
	},
	getters: {
		getEnumeration: state => {
			state.enumeration
		}
	},
	modules: {
	}
})

export default store;
