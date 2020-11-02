// const API_URL = process.env.API_URL || "http://localhost:5000/api/v1";

export const state = () => ({
  games: [
    {
      id: 1,
      playerWhite: "tim",
      playerBlack: "sam",
      fens: ["asdasd"],
      winner: 0,
      game_over: 0,
    },
  ],
});

export const getters = {
  getGames({ state }) {
    return state.games;
  },
};

export const actions = {};

export const mutations = {};
