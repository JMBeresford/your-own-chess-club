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
      // console.log(e-e)
      // var parent = document.getElementById(this.thisGame.id.toString());
      // var containers = parent.getElementsByClassName("cg-board-wrap");

      // var container = containers[0];

      // //console.log(container);

      // container.setAttribute("style", "width: " + this.calcWidth() + "px");
      // this.board.redrawAll();
      // //container.style.width = this.calcWidth();
      // //container.style.height = this.calcWidth();
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
    width: 25vw;
    height: 25vw;
  }
  
  .blue .cg-board-wrap {
    background-image: url('data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCA4MDAgODAwIj4NCjxnIGlkPSJicm93bi1ib2FyZCI+DQo8ZyBpZD0iTGlnaHQiIGZpbGw9IiNkZWUzZTYiPg0KPHJlY3Qgd2lkdGg9IjgwMCIgaGVpZ2h0PSI4MDAiLz4NCjwvZz4NCjxnIGlkPSJGcmFtZSIgZmlsbD0ibm9uZSI+DQo8cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjgwMCIvPg0KPC9nPg0KPGcgaWQ9IkRhcmsiIGZpbGw9IiM4Y2EyYWQiPg0KPGcgaWQ9InJheiI+DQo8ZyBpZD0iZHZhIj4NCjxnIGlkPSJ0cmkiPg0KPHJlY3QgeD0iMTAwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIvPg0KPHJlY3QgeD0iMzAwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIvPg0KPHJlY3QgeD0iNTAwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIvPg0KPHJlY3QgeD0iNzAwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIvPg0KPC9nPg0KPHVzZSB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTAwLDEwMCkiIHhsaW5rOmhyZWY9IiN0cmkiLz4NCjwvZz4NCjx1c2UgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwyMDApIiB4bGluazpocmVmPSIjZHZhIi8+DQo8L2c+DQo8dXNlIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAsNDAwKSIgeGxpbms6aHJlZj0iI3JheiIvPg0KPC9nPg0KPC9nPg0KPC9zdmc+');
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