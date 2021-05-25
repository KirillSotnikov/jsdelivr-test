import axios from 'axios';
import Vue from 'vue'
import Vuex from 'vuex'

import { API_URL } from '../constants';
import { generateString } from '../utils/GenerateString';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        packages: [],
    },
    actions: {
        async fetchPackages(store, { limit, page }) {
            const res = await axios.get(`${API_URL}/stats/packages?limit=${limit}&page=${page}`);
            const data = res.data.map(item => ({
                id: generateString(10),
                type: item.type,
                name: item.name,
                hits: item.hits,
            }))
            store.commit('setPackages', data);
        }
    },
    mutations: {
        setPackages(state, payload) {
            state.packages.push(...payload);
        }
    },
    getters: {
        getPackages: state => {
            return state.packages;
        },
        getPackageById: state => id => {
            return state.packages.find(pack => pack.id === id);
        }
    },
})