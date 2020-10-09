import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL || '/api';

const state = {
  user: {
    username: "",
    id: ""
  },
  playerBase: [],
};

const getters = {
  getUser(state) {
   return state.user; 
  },
  getPlayerBase: (state) => state.playerBase,
  getOpponents(state) {
    if (!state.user.id) return {}; 
    var players = state.playerBase;

    return ( players.filter((player) => {return player.id !== state.user.id}))
  },
  loggedIn: (state) => {
    if (state.user.id.length === 0) return false;

    return true;
  }
};

const actions = {
  async queryPlayerBase( {commit} ) {
    await axios.get(API_URL + '/users'
    ).then ( (res) => {
      var players = res.data;
      
      commit('setPlayerBase',players);
    }).catch( (err) => {
      console.log(err);
    })
  },
  async signIn({commit}, user) {
    await axios.post(API_URL + '/users/signin', user, {withCredentials: true}
    ).then( (res) => {
      console.log(res);
      commit('setUser',res.data);
    }).catch( (err) => {
      return console.log(err);
    })
  },
  async checkSignInStatus({commit}) {
    await axios.get(API_URL + '/users/signin', {withCredentials: true}
    ).then( (res) => {
      if (res.data.id) {
        commit('setUser', res.data);
        return true;
      } else {
        return
      }
    }).catch( (err) => {
      console.log(err);
    })
    return false;
  },
  async signOut({commit}) {
    sessionStorage.clear();
    await axios.get(API_URL + "/users/signout", {withCredentials: true}
    ).then ( (res) => {
      console.log(res);
      commit('signOut');
    }).catch( (err) => {
      return console.log(err);
    })
  },
  async register({commit}, user) {
    await axios.post(API_URL + "/users/register", user
    ).then( (res) => {
      if (res.status === 201) {
        console.log("Registered successfully.");
        commit('setUser', res.data);
      } else if (res.status === 400) {
        return console.log("Password mismatch, try again.")
      } else {
        console.log(res);
        return;
      }
    }).catch( (err) => {
      return console.log(err);
    })
  }
};

const mutations = {
  setUser: (state, user) => (state.user = user),
  setPlayerBase: (state, players) => (state.playerBase = players),
  signOut: (state) => (state.user = {username: "", id: 0}),
};

export default {
  state,
  getters,
  actions,
  mutations
}