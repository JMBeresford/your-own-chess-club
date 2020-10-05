<template>
  <div id="play" class="container">
    <div id="quick-play-widget" class="row py-3">
      <div class="col-md-12 text-center">
          <h3 class="sub-section">Quick Match</h3>
      </div>
      <div class="col-md-3 py-2 text-center">
          <button class="btn btn-lg quick-play-button disabled">Easy AI</button> 
      </div>
      <div class="col-md-3 py-2 text-center">
          <button class="btn btn-lg quick-play-button disabled">Medium AI</button>
      </div>
      <div class="col-md-3 py-2 text-center">
          <button class="btn btn-lg quick-play-button disabled">Hard AI</button>
      </div>
      <div class="col-md-3 py-2 text-center">
          <form action="/game"><button class="btn btn-lg quick-play-button">Human</button></form>
      </div>
    </div>

    <hr class="rule">
  </div>
</template>

<script>
export default {
  name: "Play"
}
</script>

<style scoped>
  #play {
    background-color: var(--main-bg);
    padding-top: 3px;
    padding-bottom: 3px;
  }
  .play-text {
      color: var(--accent-dark);
      font-weight: bold;
  }

  .quick-play-button {
      border-color: var(--accent-dark);
      background-color: var(--accent-dark);
  }
</style>