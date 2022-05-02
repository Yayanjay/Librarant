import Vue from 'vue';
import Vuex from 'vuex';

import Books from './modules/books';
// import User from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        Books,
        // User
    },
})