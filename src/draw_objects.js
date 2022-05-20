class MidField{
    constructor(ctx){
        this.ctx = ctx
        this.x = Math.floor(650 / 2) - 5
        this.y = 0
        this.width = 10
        this.height = 480
    }

    renderMidField(){
        this.ctx.fillStyle = COLOR
        this.ctx.fillRect(this.x, this.y, this.width, this.height)
        this.ctx.stroke()
    }
}
class Score{
    constructor(ctx, s, x){
        this.ctx = ctx
        this.s = s
        this.x = x
        this.y = 20
    }

    renderScore(){
        this.ctx.font = "20px Arial"
        this.ctx.fillStyle = "#e8e8e8"
        this.ctx.textAlign = "center"
        this.ctx.fillText(this.s.toString(), this.x, this.y)
    }

    removeExScore(){
        this.ctx.clearRect(this.x - 20, this.y - 20, 40, 40)
    }

    addScore(){
        this.removeExScore()
        this.s += 1
        this.renderScore()
    }
}
class Player{
    constructor(ctx){
        this.ctx = ctx
        this.y = INITIAL_POSITION_PLAYER
        this.x = PLAYER_X
        this.width = BLOCK_SIZE - 1
        this.height = HEIGHT_PLAYER
    }

    drawPlayer(){
        this.ctx.fillStyle = COLOR
        this.ctx.fillRect(this.x, this.y, this.width, this.height)
        this.ctx.stroke()
    }

    removeExPlayer(){ // remove excess player
        this.ctx.clearRect(this.x, this.y, this.width, this.height)
    }

    move(event){
        switch(event.keyCode){
            case 38:
                if(this.y != 0){
                    this.removeExPlayer()
                    this.y -= PLAYER_SPEED
                    break
                } else {
                    this.y = this.y
                    break
                }
            case 40:
                if(this.y != 400){
                    this.removeExPlayer()
                    this.y += PLAYER_SPEED
                    break
                }
            default:
                return
        }
        this.drawPlayer()
    }
}

class Enemy{
    constructor(ctx){
        this.ctx = ctx
        this.y = INITIAL_POSITION_PLAYER
        this.x = COMPUTER_X
        this.width = BLOCK_SIZE - 1
        this.height = HEIGHT_PLAYER
        this.up = true
        this.down = true
    }

    drawEnemy(){
        this.ctx.fillStyle = COLOR
        this.ctx.fillRect(this.x, this.y, this.width, this.height)
        this.ctx.stroke()
    }

    removeExEnemy(){
        this.ctx.clearRect(this.x, this.y, this.width, this.height)
    }

    move(ball){
        if(this.y <= 0){
            this.up = false
        } else {
            this.up = true
        }
        if(this.y + HEIGHT_PLAYER >= 480){
            this.down = false
        } else {
            this.down = true
        }

        if(this.y + 30 < ball.y && this.down){
            this.removeExEnemy()
            this.y += COMPUTER_SPEED
            this.drawEnemy()
        }
        if(this.y + 30 > ball.y && this.up){
            this.removeExEnemy()
            this.y -= COMPUTER_SPEED
            this.drawEnemy()
        }
    }
}        

class PongBall{
    constructor(ctx, player, enemy, directionX){
        this.ctx = ctx
        this.player = player
        this.enemy = enemy
        this.x = INITIAL_POSITION_BALL[0]
        this.y = INITIAL_POSITION_BALL[1]
        this.size = BLOCK_SIZE
        this.directionY = true
        this.directionX = directionX
        this.speedY = 0
        this.speedX = 2
    }

    drawBall(){
        this.ctx.fillStyle = COLOR
        this.ctx.fillRect(this.x, this.y, this.size, this.size)
        this.ctx.stroke()
    }

    removeExBall(){
        this.ctx.clearRect(this.x, this.y, this.size, this.size)
    }

    collision(){
        if(this.y <= 0){
            this.directionY = false
        } else if(this.y >= 480 - this.size){
            this.directionY = true
        }
        for(let c = 0; c < PLAYER_BODY.length; c++){
            if(this.x == this.player.width){
                for(let h = 0; h < BLOCK_SIZE; h++){
                    if(this.y + h == this.player.y + PLAYER_BODY[c]){
                        this.directionX = false
                        if(c == 4){
                            this.speedY = 0
                        } else if(c == 3 || c == 5){
                            this.speedY = 0.5
                            if(c < 4){
                                this.directionY = true
                            } else {
                                this.directionY = false
                            }
                        } else if(c == 2 || c == 6){
                            this.speedY = 1
                            if(c < 4){
                                this.directionY = true
                            } else {
                                this.directionY = false
                            }
                        } else if(c == 1 || c == 7){
                            this.speedY = 1.5
                            if(c < 4){
                                this.directionY = true
                            } else {
                                this.directionY = false
                            }
                        } else if(c == 0 || c == 8){
                            this.speedY = 2
                            if(c < 4){
                                this.directionY = true
                            } else {
                                this.directionY = false
                            }
                        }
                    }                        
                }
            } else if(this.x == COMPUTER_X - BLOCK_SIZE){
                for(let h = 0; h < BLOCK_SIZE; h++){
                    if(this.y + h == this.enemy.y + PLAYER_BODY[c]){
                        this.directionX = true
                        if(c == 4){
                            this.speedY = 0
                        } else if(c == 3 || c == 5){
                            this.speedY = 0.5
                            if(c < 4){
                                this.directionY = true
                            } else {
                                this.directionY = false
                            }
                        } else if(c == 2 || c == 6){
                            this.speedY = 1
                            if(c < 4){
                                this.directionY = true
                            } else {
                                this.directionY = false
                            }
                        } else if(c == 1 || c == 7){
                            this.speedY = 1.5
                            if(c < 4){
                                this.directionY = true
                            } else {
                                this.directionY = false
                            }
                        } else if(c == 0 || c == 8){
                            this.speedY = 2
                            if(c < 4){
                                this.directionY = true
                            } else {
                                this.directionY = false
                            }
                        }
                    }                        
                }
            }
        }
    }

    move(){
        this.removeExBall()
        this.collision()
        if(this.directionY){
            this.y -= this.speedY
        } else {
            this.y += this.speedY
        }
        if(this.directionX){
            this.x -= this.speedX
        } else {
            this.x += this.speedX
        }
        this.drawBall()
    }
}
