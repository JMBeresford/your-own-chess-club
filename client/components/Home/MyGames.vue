<template>
  <div id="my-games-widget" class="container">
    <h3 class="sub-section">My Games</h3>
    <!-- <b-carousel
      id="carousel"
      v-modal="slide"
      :interval="0"
      controls
      indicators
      img-width="300"
      img-height="300"
      style="text-shadow: 1px 1px 2px #333"
      @sliding-start="slideStart"
    >
      <b-carousel-slide
        v-for="game in getMyGames"
        :key="game.id"
        img-blank
        :text="'vs ' + game.opponent"
        class="carousel-slide"
      >
        <chessboard :fen="game.fen" />
      </b-carousel-slide>
    </b-carousel> -->
    <div class="games-container">
      <n-link
        v-for="game in getMyGames"
        :key="game.id"
        class="game-button btn button"
        :to="'/game/' + game.id"
      >
        VS {{ game.opponent }}
        <!-- {{
          game.playerWhite !== getUser.username
            ? game.playerWhite
            : game.playerBlack
        }} -->
      </n-link>
    </div>

    <hr class="rule" />
  </div>
</template>

<script>
export default {
  name: "MyGames",
  data() {
    return {
      slide: 0,
      getMyGames: [
        {
          id: 0,
          opponent: "Sam",
          fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
        },
      ],
    };
  },
  methods: {
    slideStart() {
      this.slide++;
      if (this.slide > this.getMyGames.length) {
        this.slide = 0;
      }
    },
  },
};
</script>

<style>
#my-games-widget {
  background-color: var(--main-bg);
  padding-top: 13px;
  padding-bottom: 3px;
}
.games-container {
  min-height: 30vh;
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
.carousel-slide {
  justify-content: center;
}
</style>
