// Hello O_o
const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

// just to separate the field
const midfield = new midField(ctx)

// draw player
let player = new Player(ctx)
player.drawPlayer()

// draw ball
let ball = new PongBall(ctx, player)
ball.drawBall()

setInterval(() => {
    ball.move()
    midfield.renderMidField()
}, GAME_CLOCK)

document.addEventListener('keydown', (e) => {player.move(e)})

