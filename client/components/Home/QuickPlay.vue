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
          <button
            data-toggle="modal"
            data-target="#versus-modal"
            class="btn button quick-play-button"
          >
            Human
          </button>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script>
export default {
  name: "QuickPlay",
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
  border: var(--dark) solid 1px;
}
.modal-body {
  height: 50vh;
  overflow: auto;
}
</style>
