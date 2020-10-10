<template>
  <div id="my-games-widget" class="container">
    <h3 class="sub-section">My Games</h3>
    
    <div class="games-container">
      <button
        v-for="game in getMyGames"
        :key="game.id"
        class="game-button btn"
        @click="goToGame(game.id)"
      
      >
      VS {{game.playerWhite !== getUser.username ? game.playerWhite : game.playerBlack}}
      </button>
    </div>
    
    <hr class="rule" />
  </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex';
import router from '../router';

export default {
  name: "MyGames",
  computed: {
    ...mapGetters(['getMyGames','getUser']),
  },
  methods: {
    ...mapActions(['setActiveGameId']),
    goToGame(id) {
      this.setActiveGameId(id);
      router.push('/game')
    }
  }
}
</script>

<style scoped>
#my-games-widget {
  background-color: var(--main-bg);
  padding-top: 13px;
  padding-bottom: 3px;

}

.games-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
}

.game-button {
  background-color: var(--accent-dark);
  padding-top: 1em;
  padding-bottom: 1em;
  border-radius: 10px;
}

.game-button:hover {
  background-color: var(--accent-light);
}

</style>