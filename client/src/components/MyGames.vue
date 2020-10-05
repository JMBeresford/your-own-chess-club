<template>
  <div id="my-games-widget" class="container">
    <h3 class="sub-section">My Games</h3>
    <div class="row">
      <div v-bind:id="game.id" v-bind:key="game.id" v-for="game in games" class="d-flex justify-content-center col-md">
        <Game v-bind:thisGame="game"/>
      </div>
    </div>
    <hr class="rule" />
  </div>
</template>

<script>
import Game from './Game.vue'
export default {
  name: "MyGames",
  components: {
    Game
  },
  props:
    ["games"]
}
</script>

<style scoped>
#my-games-widget {
  background-color: var(--main-bg);
  padding-top: 13px;
  padding-bottom: 3px;
}

</style>