<template>

  <!-- TODO: Use button groups -->
  <div id="quick-play" class="container">
    <div id="quick-play-widget" class="py-3">
      <div class="row">
        <div class="col-md-12">
          <h3 class="sub-section">Quick Match</h3>
        </div>
      </div>
      <div class="row">
        <div class="col py-2 text-center">
            <button class="btn btn-lg quick-play-button disabled">Easy AI</button> 
        </div>
        <div class="col py-2 text-center">
            <button class="btn btn-lg quick-play-button disabled">Medium AI</button>
        </div>
        <div class="col py-2 text-center">
            <button class="btn btn-lg quick-play-button disabled">Hard AI</button>
        </div>
        <div class="col py-2 text-center">
            <button v-bind:class="{disabled: !loggedIn}"
            data-toggle="modal" data-target="#versus-modal" class="btn btn-lg quick-play-button">
              Human
            </button>
        </div>
      </div>
    </div>

    <hr class="rule">

    <!-- Modals -->
    <div class="modal fade" id="versus-modal" tabindex="-1" role="dialog" aria-labelledby="versus-modal-label" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title sub-section" id="versus-modal-label">Challenge An Opponent:</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="list-group">
              <button @click="selectOpponent(opponent)"
              v-for="opponent in getOpponents" :key="opponent.id" v-bind:class="{selected: opponent.username === selOpponent.username}" type="button" class="list-group-item list-group-item-action">
                {{opponent.username}}
              </button>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn close-modal-button btn-outline-dark" data-dismiss="modal">Close</button>
            <button @click="challenge()" data-dismiss="modal" type="button" class="btn challenge-button">Challenge</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex';

export default {
  name: "QuickPlay",
  data() {
    return {
      User: "",
      selOpponent: ""
    }
  },
  computed: {
    ...mapGetters(['getUser','getOpponents','loggedIn']),
  },
  methods: {
    ...mapActions(['queryPlayerBase','createNewGame','pushGameState']),
    selectOpponent(opp) {
      this.selOpponent = opp
    },
    challenge() {
      const coinFlip = Math.floor(Math.random() * 2);

      this.createNewGame(this.selOpponent, coinFlip);
      this.pushGameState();
    }
  },
  created() {
    this.queryPlayerBase();
  }
}
</script>

<style scoped>
  #quick-play {
    background-color: var(--main-bg);
    padding-top: 3px;
    padding-bottom: 3px;
  }
  .play-text {
      color: var(--accent-dark);
      font-weight: bold;
  }

  .quick-play-button {
      background-color: var(--accent-dark);
  }

  .quick-play-button:not(.disabled):hover {
    background-color: var(--accent-light);
  }

  .modal-header, .modal-body, .modal-footer, .list-group-item {
    background-color: var(--main-bg);
  }

  .challenge-button {
    background-color: var(--accent-dark);
  }

  .challenge-button:hover {
    background-color: var(--accent-light);
  }

  .selected {
    background-color: var(--accent-dark);
    color: var(--main-bg)
  }

  .list-group-item {
    outline: none;
  }

  .list-group-item:hover {
    outline: none;
    border: var(--dark) solid 1px;
  }

  .modal-body {
    height: 50vh;
    overflow: auto;
  }

</style>