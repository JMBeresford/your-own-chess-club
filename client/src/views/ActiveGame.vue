<template>
  <div id="active-game-container" class="container">
    <div id="game-info-widget" class="row text-center py-3">
      <div class="col">
        <h3 class="sub-section">
          {{this.getActiveGame.playerWhite}} vs {{this.getActiveGame.playerBlack}}
        </h3>
        <div class="wt-100"></div>
        <h5 class="sub-section">
          It's {{this.getActiveGame.toMove}}'s Move
        </h5>
      </div>
    </div>

    <hr class="rule" />

    <div id="active-game-widget" class="row justify text-center">
      <div id="active-game-board" class="d-flex justify-content-center col-md-7 my-3">
        <Game v-on:onMove="updateGameState()" v-bind:fen="fen" ref="activeGame"/>
      </div>
      
      <div id="active-game-info" class="d-flex justify-content-center col-md-5 my-3">
        <div class="table">
          <table id="active-game-info-header" class="table">
            <thead>
              <tr>
                <th><h5 style="font-weight: bold;">X: </h5></th>
                <th><button class="btn btn-sm btn-outline-dark">Concede</button></th>
                <th><button class="btn btn-sm btn-outline-dark">Offer Draw</button></th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Game from '../components/Game.vue';
import { mapGetters,mapActions } from 'vuex';
import router from '../router';

export default {
  name: 'ActiveGame',
  components: {
    Game
  },
  data() {
    return {
      fen: "",
    }
  },
  methods: {
    ...mapActions(['pushGameState','updateFen']),
    updateGameState() {
      console.log(this.$refs['activeGame'].board)
      this.updateFen(this.$refs['activeGame'].board.state.fen)
      this.pushGameState();
    },
  },
  computed: {
    ...mapGetters(['getUser','getActiveGame','loggedIn']),
  },
  created() {
    this.fen = this.getActiveGame.fen;
    this.orientation = this.getActiveGame.orientation;
  },
  mounted() {
    if (!this.loggedIn) {
      router.push('/');
    }
  }
}
</script>

<style scoped>
  #active-game-container {
    background-color: var(--main-bg);
  }

  .active-game-table {
      border: none;
  }

  .active-game-table > thead > tr {
      border: none;
  }

  .active-game-table > tbody > tr {
      border: none;
  }

  .active-game-table > * > tr > th, .active-game-table > * > tr > td {
      border: none;
  }

  .active-game-table > thead {
      background-color: var(--accent-dark);
  }

  .active-game-table > tbody {
      background-color: var(--accent-light);
  }

  #active-game-info-header * {
      background-color: var(--accent-dark);
  }

  #active-game-table-container {
      height: auto;
      overflow: hidden;
  }
</style>