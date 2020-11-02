<template>
  <b-container id="header" fluid>
    <b-navbar id="nav" toggleable="lg" type="dark">
      <b-navbar-brand>
        <n-link id="brand" class="btn button" to="/home"> VCC </n-link>
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse" />
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#"> Profile </b-nav-item>
          <b-nav-item href="#"> Leaderboards </b-nav-item>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input
              id="search"
              size="sm"
              class="mr-sm-2"
              placeholder="Find User"
            />
            <button class="btn button p-1 my-2 my-sm-0" type="submit">
              Search
            </button>
          </b-nav-form>
          <b-nav-item href="#" @click.prevent="signOut">
            Sign Out {{ user.username }}
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </b-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Header",
  data() {
    return {};
  },
  computed: {
    user() {
      return this.$auth.user;
    },
  },
  methods: {
    ...mapActions({
      signOut: "signOut",
    }),
    SignOut() {
      this.signOut();
    },
  },
};
</script>

<style>
#header {
  background-color: var(--dark);
  height: auto;
  align-items: center;
}
#brand {
  padding: 0.25em 1em;
  border-radius: 10px;
  background-color: var(--accent-dark);
  color: var(--main-bg);
}
#search {
  background-color: var(--main-bg);
}
.nav-link {
  color: var(--main-bg);
}
</style>
