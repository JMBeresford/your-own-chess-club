<template>
  <div id="my-games-widget" class="container">
    <h3 class="sub-section">My Games</h3>
    <div class="row">
      <div v-for="game in getMyGames" :key="game.id" class="d-flex justify-content-center col">
        <Game />
      </div>
    </div>
    <hr class="rule" />
  </div>
</template>

<script>
import Game from './Game.vue'
import { mapGetters } from 'vuex';

export default {
  name: "MyGames",
  components: {
    Game
  },
  computed: {
    ...mapGetters(['getMyGames']),
  }
}
</script>

<style scoped>
#my-games-widget {
  background-color: var(--main-bg);
  padding-top: 13px;
  padding-bottom: 3px;
}

</style>