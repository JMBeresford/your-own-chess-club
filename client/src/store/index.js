import Vue from 'vue';
import Vuex from 'vuex'
import users from './modules/users'
import games from './modules/games'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })],
  modules: {
    users,
    games
  }
});