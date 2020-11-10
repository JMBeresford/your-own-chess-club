// const API_URL = process.env.API_URL || "http://localhost:5000/api/v1";

export const state = () => ({
  games: [],
});

export const getters = {
  getGames(state) {
    return state.games;
  },
};

export const actions = {
  async createGame({ commit, dispatch }, players) {
    await this.$axios
      .post("/private/game", players)
      .then((res) => {
        if (res.status === 201) {
          return dispatch("queryGames", this.$auth.user.username);
        } else {
          return console.log(res);
        }
      })
      .catch((err) => {
        return console.log(err);
      });
  },
  async queryGames({ commit }, username) {
    const games = await this.$axios
      .get("/private/user/games?id=" + username)
      .then((res) => {
        if (res.status === 200) {
          if (username === this.$auth.user.username) {
            commit("setGames", res.data.games);
          }
        } else {
          return console.log(res);
        }
      })
      .catch((err) => {
        return console.log(err);
      });

    return games;
  },
};

export const mutations = {
  setGames(state, games) {
    state.games = games;
  },
};
