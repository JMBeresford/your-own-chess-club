<template>
  <div id="app">
    <Header v-bind:user="user" v-on:sign-out="signOut()"/>
    <MyGames v-bind:games="games"/>
    <Play />
  </div>
</template>

<script lang="ts">
import Header from './components/Header.vue'
import MyGames from './components/MyGames.vue'
import Play from './components/Play.vue'

export default {
  name: 'App',
  components: {
    Header,
    MyGames,
    Play
  },
  data() {
    return {
      user: {name: "jeff"},
      games: [
        {id: 1, white: "john", black: "jack", toMove: "white", gameOver: false, fen: ""},
        {id:2, white: "james", black: "timothy", toMove: "black", gameOver: true, fen: ""}
      ]
    }
  },
  methods: {
    signOut() {
      this.user = {};
    },
  }
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
