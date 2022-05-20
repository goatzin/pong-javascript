const GAME_CLOCK = 1
const COLOR = '#e8e8e8'
const PLAYER_X = 0
const COMPUTER_X = 650
const BLOCK_SIZE = 20
const HEIGHT_PLAYER = 80
const PLAYER_SPEED = 20 
const INITIAL_POSITION_PLAYER = Math.floor((480 / 2) - 40) // y
const INITIAL_POSITION_BALL = [
    Math.floor((650 / 2) - 10), // x
    Math.floor((480 / 2) - 10)  // y
]
const PLAYER_BODY = [ // to create collision with the ball
    0, 10, 20,
    30, 40,
    50, 60,
    70, 80
]
