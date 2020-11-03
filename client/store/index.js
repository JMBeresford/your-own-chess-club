const API_URL = process.env.API_URL || "http://localhost:5991";

export const state = () => ({
  users: {},
});

export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn;
  },
};

export const actions = {
  async register({ commit }, user) {
    await this.$axios
      .post(API_URL + "/public/register", user)
      .then((res) => {
        if (res.status === 200) {
          commit("signIn", res.data);
        } else if (res.status === 400) {
          return res.status;
        }
      })
      .catch((err) => {
        return err;
      });
  },
};

export const mutations = {};
