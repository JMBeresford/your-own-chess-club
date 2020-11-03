<template>
  <b-container id="mainContainer">
    <b-row class="vh-100" align-v="center">
      <b-col />
      <b-col cols="8" md="auto">
        <b-form v-if="!registering" id="login">
          <h3>Login</h3>
          <hr />
          <b-form-input
            id="username"
            v-model="loginData.username"
            required
            placeholder="Enter Username"
          />
          <b-form-input
            id="password"
            v-model="loginData.password"
            type="password"
            required
            placeholder="Enter Password"
          />
          <button class="btn button" @click.prevent="Login">Login</button>
          <button
            class="btn button-alt"
            @click.prevent="registering = !registering"
          >
            or Register
          </button>
        </b-form>
        <b-form v-else id="register">
          <h3>Register</h3>
          <hr class="rule" />
          <b-form-input
            id="usernameReg"
            v-model="registerData.username"
            required
            placeholder="Enter Username"
          />
          <b-form-input
            id="passwordReg"
            v-model="registerData.password"
            type="password"
            required
            placeholder="Enter Password"
          />
          <b-form-input
            id="passwordReg2"
            v-model="registerData.password2"
            type="password"
            required
            placeholder="Confirm Password"
          />
          <button class="btn button" @click.prevent="Register">Register</button>
          <button
            class="btn button-alt"
            @click.prevent="registering = !registering"
          >
            or Login
          </button>
        </b-form>
      </b-col>
      <b-col />
    </b-row>
  </b-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  auth: "guest",
  data() {
    return {
      registering: false,
      registerData: {
        username: "",
        password: "",
        password2: "",
      },
      loginData: {
        username: "",
        password: "",
      },
    };
  },
  computed: {},
  methods: {
    ...mapActions({
      register: "register",
      signIn: "signIn",
    }),
    Register() {
      this.register(this.registerData);
    },
    async Login() {
      await this.$auth
        .loginWith("local", { data: this.loginData })
        .then((res) => {
          this.$auth.setUser(res.data.user);
        });
    },
  },
};
</script>

<style>
#login,
#register {
  background-color: transparent;
  text-align: center;
  color: var(--main-bg);
  border-radius: 10px;
  padding: 1em 3em;
}
#username,
#password,
#usernameReg,
#passwordReg,
#passwordReg2,
.btn {
  margin: 0.5em 0em;
}
</style>
