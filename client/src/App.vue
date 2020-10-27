<template>
  <div id="app">
    <div id="nav">
      <Header />
    </div>
    <router-view/>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    Header
  },
  methods: {
    ...mapActions(['signIn','checkSignInStatus','queryGames']),
  },
  computed: {
    ...mapGetters(['getPlayerBase','getUser']),
  },
  created() {
    this.checkSignInStatus();
    this.queryGames();
  },
}
</script>

<style>
  :root {
  --dark-olive-green: #606c38ff;
  --kombu-green: #283618ff;
  --cornsilk: #fefae0ff;
  --fawn: #dda15eff;
  --liver-dogs: #bc6c25ff;

  --main-bg: var(--cornsilk);
  --dark: var(--kombu-green);
  --light: var(--dark-olive-green);
  --accent-dark: var(--liver-dogs);
  --accent-light: var(--fawn);
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }

  body {
    background-color: var(--light);
  }

  hr.rule {
    background-color: var(--dark);
    opacity: 0.8;
  }

  .sub-section {
    padding-top: 5px;
    padding-bottom: 5px;
    color: var(--dark);
    font-weight: bold;
  }

  a:hover {
    cursor: pointer;
  }

  a.disabled {
    color: var(--light) !important;
  }
</style>
