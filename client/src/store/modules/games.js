import Axios from 'axios';
import uuid from 'uuid/v4';
import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL || '/api';

const state = {
  games: [{id:0, white: "james", black: "timothy", toMove: "black", gameOver: true, fen: ""}],
  activeGameId: 0,
}

const getters = {
  getMyGames: (state) => {
    return state.games;
  },
  getActiveGame(state) {
    return state.games.find((game) => {game.id === state.activeGameId});
  },
}

const actions = {
  async createNewGame( {commit, rootState}, opponent, coinflip, fen="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" ) {
    var playerWhite, playerBlack, orientation;
    
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
  async queryGames({commit}, user) {
    await Axios.get(API_URL + `/users/games?user=${user.username}`, {withCredentials: true}
    ).then( (res) => {
      if (res.status === 200) {
        console.log('games aqcuired successfully');
        console.log(res.data);
        commit('setGames', res.data);
      }
    }).catch( (err) => {
      console.log(err);
    })
  },
  async updateFen({commit}, fen) {
    commit('updateFen', fen);
  },
  async pushGameState({commit, rootState}) {
    commit("pushGameState", rootState.users.state.user);
  }
}

const mutations = {
  setGames(state, games) {
    state.games = games;
  },
  addGame(state, game) {
    state.games.push(game);
  },
  setActiveGame(state, game) {
    state.activeGameId = game.id;
  },
  createAndSetActiveGame(state, game) {
    state.games.push(game);
    state.activeGameId = game.id;
  },
  updateFen(state, fen) {
    for (var i in state.games) {
      if (state.games[i].id === state.activeGameId) {
        state.games[i].fen = fen;
        return;
      }
    }
  },
  pushGameState(state, user) {
    var payload = {games: state.games, username: user.username}
    axios.put(API_URL + "/users/games", payload
    ).then( (res) => {
      console.log(res);
    }).catch( (err) => {
      console.log(err);
    })
  }
}


export default {
  state,
  getters,
  actions,
  mutations
}