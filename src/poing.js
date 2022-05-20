// Hello O_o
'use strict'

let new_game = true
const new_game_text = "Click anywhere to start the game"

const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')
// just to separate the field
const midfield = new MidField(ctx)

// scores
let ps = new Score(ctx, 0, Math.floor(650 / 2) - 20) // player score
let cs = new Score(ctx, 0, Math.floor(650 / 2) + 20) // computer score

// draw objects
let player = new Player(ctx)
let enemy = new Enemy(ctx)
let ball = new PongBall(ctx, player, enemy, true)

setInterval(() => {
    newGame()
}, GAME_CLOCK)

let newGame = () => {
    document.addEventListener('click', () => {
        if(new_game){
            // erase new game text
            canvas.width=canvas.width

            player.drawPlayer()
            enemy.drawEnemy()
            ball.drawBall()

            new_game = false
        }
    })

    if(new_game){
        ctx.font = '30px Arial'
        ctx.fillStyle = '#e8e8e8'
        ctx.textAlign = 'center'
        ctx.fillText(new_game_text, Math.floor(650 / 2), Math.floor(480 / 2))
    } else {
        if(ball.x > -20 && ball.x < 650){
            ball.move()
        } else {
            if(ball.x < 0){
                cs.addScore()
                ball = new PongBall(ctx, player, enemy, false)
                ball.drawBall()
            } else if(ball.x > 650){
                ps.addScore()
                ball = new PongBall(ctx, player, enemy, true)
                ball.drawBall(), 5000
            }
        }
        enemy.move(ball)
        midfield.renderMidField()
        ps.renderScore()
        cs.renderScore()
    }
}

document.addEventListener('keydown', (e) => {player.move(e)})

