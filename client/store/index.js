const API_URL = process.env.API_URL || "http://localhost:5000/api/v1";

export const state = () => ({
  user: {
    username: "",
    authenticated: false,
    id: null,
    games: [],
  },
});

export const getters = {
  getUser(state) {
    return state;
  },
  isAuthenticated(state) {
    return state.auth.loggedIn;
  },
  loggedIn(state) {
    return state.id !== null;
  },
};

export const actions = {
  async signIn({ commit }, user) {
    await this.$axios
      .post(API_URL + "/users/signin", user)
      .then((res) => {
        user.authenticated = true;
        commit("signIn", res.data);
      })
      .catch((err) => {
        return err;
      });
  },
  async signOut({ commit }) {
    await this.$axios
      .get(API_URL + "/users/signout")
      .then((res) => {
        this.$auth.logout();
        return commit("signOut");
      })
      .catch((err) => {
        return console.log(err);
      });
  },
  async register({ commit }, user) {
    await this.$axios
      .post(API_URL + "/users/register", user)
      .then((res) => {
        if (res.status === 201) {
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

export const mutations = {
  signIn: (state, user) => (state.user = user),
  signOut: (state) =>
    (state.user = { username: "", authenticated: false, id: null, games: [] }),
};
