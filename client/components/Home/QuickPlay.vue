<template>
  <b-container id="quick-play">
    <div id="quick-play-widget" class="py-3">
      <b-row>
        <b-col cols="12">
          <h3 class="sub-section">Quick Match</h3>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6">
          <h5 class="sub-section">Versus AI</h5>
        </b-col>
        <b-col cols="6">
          <h5 class="sub-section">Versus Player</h5>
        </b-col>
        <b-col cols="6" class="py-2">
          <b-button-group>
            <button class="btn button">Easy AI</button>
            <button class="btn button">Medium AI</button>
            <button class="btn button">Hard AI</button>
          </b-button-group>
        </b-col>
        <b-col cols="6" class="py-2">
          <button v-b-modal.versus-modal class="btn button quick-play-button">
            Human
          </button>
        </b-col>
      </b-row>
    </div>
    <b-modal
      id="versus-modal"
      title="Challenge a Player"
      ok-only
      ok-title="Challenge"
    >
      <b-list-group>
        <b-list-group-item
          v-for="opponent in getOpponents()"
          :key="opponent.id"
          :class="{ selected: opponent.username === selOpponent.username, b }"
          @click="selectOpponent(opponent)"
        >
          {{ opponent.username }}
        </b-list-group-item>
      </b-list-group>
      <div slot="modal-footer">
        <button class="btn button" :click="challenge()">Challenge</button>
      </div>
    </b-modal>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "QuickPlay",
  data() {
    return {
      selOpponent: "",
    };
  },
  computed: {
    ...mapGetters({
      getUsers: "getUsers",
    }),
  },
  methods: {
    getOpponents() {
      const users = this.getUsers;
      const opponents = users.filter((user) => user.id !== this.$auth.user.id);

      return opponents;
    },
    selectOpponent(opp) {
      this.selOpponent = opp;
    },
    challenge() {
      console.log("challenged");
    },
  },
};
</script>

<style>
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
.modal-header,
.modal-body,
.modal-footer,
.list-group-item {
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
  color: var(--main-bg);
}
.list-group-item {
  outline: none;
}
.list-group-item:hover {
  outline: none;
  border: var(--dark) solid 0.5px;
}
.modal-body {
  height: 50vh;
  overflow: auto;
}
</style>
