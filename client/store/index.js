const API_URL = process.env.API_URL || "http://localhost:5991";

export const state = () => ({
  users: [],
});

export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn;
  },
  getUsers(state) {
    return state.users;
  },
  getUserById: (state, id) => {
    return state.users.find((user) => user.id === id);
  },
};

export const actions = {
  async register({ commit }, user) {
    this.$toast.show("Attempting to register...", {
      singleton: true,
      duration: 3000,
    });
    await this.$axios
      .post(API_URL + "/public/register", user)
      .then((res) => {
        if (res.status === 200) {
          this.$toast.success(
            "Successfully registered! Please login to continue.",
            { singleton: true, duration: 5000 }
          );
          return res.status;
        } else if (res.status === 400) {
          this.$toast.error("Password mismatch. Try again.", {
            singleton: true,
            duration: 5000,
          });
          return res.status;
        }
      })
      .catch((err) => {
        this.$toast.error("Something went wrong, try again.", {
          singleton: true,
          duration: 5000,
        });
        return err;
      });
  },
  async queryUsers({ commit }) {
    await this.$axios
      .get(API_URL + "/private/users", { withCredentials: true })
      .then((res) => {
        commit("setUsers", res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

export const mutations = {
  setUsers(state, users) {
    state.users = users;
  },
};
