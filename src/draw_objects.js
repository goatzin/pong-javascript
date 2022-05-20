class midField{
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

class Enemy{}
class PongBall{
    constructor(ctx, player){
        this.ctx = ctx
        this.player = player
        this.x = INITIAL_POSITION_BALL[0]
        this.y = INITIAL_POSITION_BALL[1]
        this.size = BLOCK_SIZE
        this.directionY = true
        this.directionX = true
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
        if(this.y == 0){
            this.directionY = false
        } else if(this.y == 480 - this.size){
            this.directionY = true
        }
        for(let c = 0; c < PLAYER_BODY.length; c++){
            if(this.x == 19){
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
