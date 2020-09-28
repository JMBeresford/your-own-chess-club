var board1 = null
var game1 = new Chess()
var board2 = null
var game2 = new Chess()
var board3 = null
var game3 = new Chess()
var board4 = null
var game4 = new Chess()

var config = {
  position: "start",
  showNotation: false
}

function makeRandomMove1 () {
  var possibleMoves = game1.moves()

  // exit if the game is over
  if (game1.game_over()) return

  var randomIdx = Math.floor(Math.random() * possibleMoves.length)
  game1.move(possibleMoves[randomIdx])
  board1.position(game1.fen())

  window.setTimeout(makeRandomMove1, 500)
}

function makeRandomMove2 () {
  var possibleMoves = game2.moves()

  // exit if the game is over
  if (game2.game_over()) return

  var randomIdx = Math.floor(Math.random() * possibleMoves.length)
  game2.move(possibleMoves[randomIdx])
  board2.position(game2.fen())

  window.setTimeout(makeRandomMove2, 500)
}

function makeRandomMove3 () {
  var possibleMoves = game3.moves()

  // exit if the game is over
  if (game3.game_over()) return

  var randomIdx = Math.floor(Math.random() * possibleMoves.length)
  game3.move(possibleMoves[randomIdx])
  board3.position(game3.fen())

  window.setTimeout(makeRandomMove3, 500)
}

function makeRandomMove4 () {
  var possibleMoves = game4.moves()

  // exit if the game is over
  if (game4.game_over()) return

  var randomIdx = Math.floor(Math.random() * possibleMoves.length)
  game4.move(possibleMoves[randomIdx])
  board4.position(game4.fen())

  window.setTimeout(makeRandomMove4, 500)
}

board1 = Chessboard('testBoard1', config)
board2 = Chessboard('testBoard2', config)
board3 = Chessboard('testBoard3', config)
board4 = Chessboard('testBoard4', config)

window.setTimeout(makeRandomMove1, 500)
window.setTimeout(makeRandomMove2, 500)
window.setTimeout(makeRandomMove3, 500)
window.setTimeout(makeRandomMove4, 500)

$(window).on('resize', board1.resize)
$(window).on('resize', board2.resize)
$(window).on('resize', board3.resize)
$(window).on('resize', board4.resize)