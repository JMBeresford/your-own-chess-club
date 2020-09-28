var board = null
var game = new Chess()

config = {
    pieceTheme: "/img/chesspieces/wikipedia/{piece}.png",
    position: "start",
    draggable: true,
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: onSnapEnd
}

function onDragStart (source, piece, position, orientation) {
    // don't interact if game over
    if (game.game_over()) return false

    // only allow active player to move respective pieces
    if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
        (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
        return false
    }
}

function onDrop (source, target) {
    // check move legality
    var move = game.move({
        from: source,
        to: target,
        promotion: 'q' // always promote to queen for simplicity
    })

    if (move === null) return 'snapback'

    updateStatus()
}

// update board after special moves (castle etc)
function onSnapEnd () {
    board.position(game.fen())
}

function updateStatus () {
    var status = ''

    var moveColor = 'White'
    if (game.turn() === 'b') {
        moveColor = 'Black'
    }

    if (game.in_checkmate()) {
        status = 'Game over, ' + moveColor + ' is in checkmate.'
    }

    else if (game.in_draw()) {
        status = 'Game over, drawn position.'
    }

    else {
        status = moveColor + ' to move'

        if (game.in_check()) {
            status += ', ' + moveColor + ' is in check.'
        }
    }
}

board = Chessboard('active-game-board', config)

boardElement = document.getElementById('active-game-board')

boardElement.ontouchstart = function(e){ 
    e.preventDefault(); 
}

updateStatus()

$(window).on('resize', board.resize)