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
        v-for="game in getGames"
        :key="game.id"
        class="game-button btn button m-1"
        :to="'/game/' + game.id"
      >
        VS
        {{
          game.playerWhite === $auth.user.username
            ? game.playerBlack
            : game.playerWhite
        }}
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
import { mapGetters } from "vuex";
export default {
  name: "MyGames",
  data() {
    return {
      slide: 0,
    };
  },
  computed: {
    ...mapGetters({
      getGames: "games/getGames",
    }),
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
