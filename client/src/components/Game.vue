<script lang="ts">
import { chessboard } from 'vue-chessboard'

export default {
  name: "Game",
  extends: chessboard,
  props: ["thisGame"],
  methods: {
    calcWidth() {
      var parent = document.getElementById(this.thisGame.id.toString());
      var toUse = (parent.offsetWidth > parent.offsetHeight) ? parent.offsetHeight : parent.offsetWidth;

      toUse--;

      while (toUse % 8 !== 0 && toUse > 0) {
        toUse--
      }
      console.log(toUse);
      return (toUse);
    },
    resizeListener() {
      this.board.redrawAll();
    }
  },
  mounted() {
    this.board.set({
      viewOnly: (this.thisGame.toMove === this.orientation)
    })
  },
  created() {
    window.addEventListener("resize", this.resizeListener);
  }
}
</script>

<style>
  .cg-board-wrap {
    min-height: 320px;
    min-width: 320px;
    width: 25vw;
    height: 25vw;
  }
  
  .blue .cg-board-wrap {
    background-image: url('../assets/chesspieces/board1.png');
    background-size: 100%;
  }
  .merida .cg-board piece.pawn.white {
    background-image: url('../assets/chesspieces/wikipedia/wP.png')
  }
  .merida .cg-board piece.bishop.white {
    background-image: url('../assets/chesspieces/wikipedia/wB.png')
  }
  .merida .cg-board piece.knight.white {
    background-image: url('../assets/chesspieces/wikipedia/wN.png');
  }
  .merida .cg-board piece.rook.white {
    background-image: url('../assets/chesspieces/wikipedia/wR.png')
  }
  .merida .cg-board piece.queen.white {
    background-image: url('../assets/chesspieces/wikipedia/wQ.png')
  }
  .merida .cg-board piece.king.white {
    background-image: url('../assets/chesspieces/wikipedia/wK.png')
  }
  .merida .cg-board piece.pawn.black {
    background-image: url('../assets/chesspieces/wikipedia/bP.png')
  }
  .merida .cg-board piece.bishop.black {
    background-image: url('../assets/chesspieces/wikipedia/bB.png')
  }
  .merida .cg-board piece.knight.black {
    background-image: url('../assets/chesspieces/wikipedia/bN.png')
  }
  .merida .cg-board piece.rook.black {
    background-image: url('../assets/chesspieces/wikipedia/bR.png')
  }
  .merida .cg-board piece.queen.black {
    background-image: url('../assets/chesspieces/wikipedia/bQ.png')
  }
  .merida .cg-board piece.king.black {
    background-image: url('../assets/chesspieces/wikipedia/bK.png')
  }

</style>