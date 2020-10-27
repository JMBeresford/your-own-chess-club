import Axios from 'axios';
import uuid from 'uuid/v4';
import axios from 'axios';

/* TODOS: 
  Make games table in DB

*/

const API_URL = process.env.VUE_APP_API_URL || '/api';

const state = {
  games: [],
  activeGameId: "",
}

const getters = {
  getMyGames: (state) => {
    return state.games;
  },
  getActiveGame(state) {
    
    return state.games.find(game => game.id === state.activeGameId);
  },
}

const actions = {
  async signOut( {commit} ) {
    commit('signOut');
  },
  async createNewGame( {commit, rootState}, opponent, coinflip, fen="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" ) {
    var playerWhite, playerBlack, orientation;

    if (rootState.games.games.find(
      game => game.playerBlack === opponent.username || game.playerWhite === opponent.username)) {
        alert('You already have a game with that gamer.');
        return;
      }
    
    if (coinflip) {
      playerWhite = rootState.users.user.username;
      playerBlack = opponent.username;
      orientation = 'white';
    } else {
      playerBlack = rootState.users.user.username;
      playerWhite = opponent.username;
      orientation = 'black';
    }
    
    var game = {
      playerWhite,
      playerBlack,
      fen,
      toMove: 'white',
      orientation,
      id: uuid()
    }

    commit('createAndSetActiveGame', game);
  },
  async queryGames( {commit, rootState} ) {
    const user = rootState.users.user; 

    if (!user.username) return;

    await Axios.get(API_URL + `/users/games?user=${user.username}`, {withCredentials: true}
    ).then( (res) => {
      if (res.status === 200) {
        console.log('games aqcuired successfully');
        commit('setGames', JSON.parse(res.data['current_games']));
      }
    }).catch( (err) => {
      console.log(err);
    })
  },
  async updateFen({commit}, fen) {
    commit('updateFen', fen);
  },
  async pushGameState({commit, rootState}) {
    commit("pushGameState", rootState.users.user);
  },
  async setActiveGameId( {commit}, id ) {
    commit('setActiveGameId', id);
  }
}

const mutations = {
  setGames(state, games) {
    state.games = games;
  },
  addGame(state, game) {
    state.games.push(game);
  },
  setActiveGameId(state, id) {
    state.activeGameId = id;
  },
  createAndSetActiveGame(state, game) {
    state.games.push(game);
    state.activeGameId = game.id;
  },
  updateFen(state, fen) {
    console.log('fen is: ' + fen)
    for (var i in state.games) {
      if (state.games[i].id === state.activeGameId) {
        state.games[i].fen = fen;
        return;
      }
    }
  },
  pushGameState(state, user) {
    const payload = [JSON.stringify(state.games), user.username];
    
    axios.put(API_URL + "/users/games", payload
    ).then( (res) => {
      return console.log(res);
    }).catch( (err) => {
      return console.log(err);
    })
  },
  signOut(state) {
    state.games = [],
    state.activeGameId = ""
    return
  }
}


export default {
  state,
  getters,
  actions,
  mutations
}