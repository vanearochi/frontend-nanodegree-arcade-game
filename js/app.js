
var board = {

    "dimention": {
        "dimX": 5,
        "dimY": 6
    },

    "position": {
        "posX": 0,
        "posY": 0
    },

    "tile_size": {
        "tileX": 100,
        "tileY": 83
    },

    "initial": {
        "initialX": 0,
        "initialY": 400
    }



}
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.enemyPosX = 0;
    this.enemyPosY = 0;
    this.enemyTileX = 0;
    this.enemyTileY = 0;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    //this.enemyTileX++

    if(this.enemyPosX===0){
        this.enemyTileY = Math.floor(Math.random()*(4-2 +1))+2;
        //console.log(this.enemyTileY)
        // todo: random speeds for enemies.
        if(this.enemyTileY === 2){
            //this.enemyPosY = 214;
            this.enemyPosY = board.initial.initialY - (board.tile_size.tileY * this.enemyTileY);
             this.enemyPosX = 5;

        }
        else if(this.enemyTileY === 3){
            this.enemyPosY = board.initial.initialY - (board.tile_size.tileY * this.enemyTileY);
            this.enemyPosX = 5;
        }
        else {
             this.enemyPosY = board.initial.initialY - (board.tile_size.tileY * this.enemyTileY);
            this.enemyPosX = 5;
        }

    }

    else if(this.enemyPosX<500){
        //console.log(player.playerTileX);
        //console.log(player.playerTileY);
        //console.log(this.enemyTileX);
        //console.log(this.enemyTileY);

        //if(this.enemyTileX===player.playerTileX && this.enemyTileY===player.playerTileY){
            if((player.playerPosX+35)<(this.enemyPosX-50)){
                this.enemyPosX= this.enemyPosX + (50*dt);
            }
            else if((player.playerPosX-35)>(this.enemyPosX+50)){
                this.enemyPosX= this.enemyPosX + (50*dt);
            }
            else{
                if(this.enemyTileY===player.playerTileY){
                    player.playerPosX = 200;
                    player.playerPosY = 380;
                    player.playerTileX = 2
                    player.playerTileY = 0
                    console.log("aja")

                    this.enemyPosX= this.enemyPosX + (50*dt);
                }
                else{
                    this.enemyPosX= this.enemyPosX + (50*dt);
                }

            }




        //}
        // else if(this.enemyPosX<=100){


        //         this.enemyPosX= this.enemyPosX + (50*dt)
        //         this.enemyTileX = 0;

        //     //console.log("cbla")

        // }
        // else if(this.enemyPosX<=200){
        //     //console.log("cbla")
        //     this.enemyPosX= this.enemyPosX + (50*dt)
        //     this.enemyTileX = 1;
        // }
        // else if(this.enemyPosX<=300){
        //     //console.log("cbla")
        //     this.enemyPosX= this.enemyPosX + (50*dt)
        //     this.enemyTileX = 2;
        // }
        // else if(this.enemyPosX<=400){
        //     //console.log("cbla")
        //     this.enemyPosX= this.enemyPosX + (50*dt)
        //     this.enemyTileX = 3;
        // }
        // else if(this.enemyPosX<=500){
        //     //console.log("cbla")
        //     this.enemyPosX= this.enemyPosX + (50*dt)
        //     this.enemyTileX = 4;
        // }
       // else{

            //this.enemyTileX++
            //console.log(this.enemyTileX)
            //this.enemyPosX = 200
            //this.enemyPosX = (board.initial.initialX + ((board.tile_size.tileX * this.enemyTileX)*dt));
            //console.log(this.enemyPosX)
           //this.enemyPosX= this.enemyPosX + (50*dt);

        //}
    }

    else{
        this.enemyPosX = 0;
        //this.enemyTileX = 0;
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.enemyPosX, this.enemyPosY);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){

    this.playerPosX = board.initial.initialX + (board.tile_size.tileX * 2);
    this.playerPosY = board.initial.initialY;
    this.boundingX = 0;
    this.movementY = 0;
    this.playerTileX = 2;
    this.playerTileY = 0;

    this.sprite = 'images/char-boy.png'

};

Player.prototype.update = function(dt){

};

Player.prototype.render = function(){
    //console.log(this.playerPosX);
    //console.log(this.playerPosY);
   // var x = this.tile_x * tile_size;
    //var y = this.tile_y * tile_size;
    //ctx.rect(this.enemyPosX, this.enemyPosY, 5, 5);
    //ctx.fill();
    ctx.drawImage(Resources.get(this.sprite), this.playerPosX, this.playerPosY);

};

Player.prototype.handleInput = function(keys){

        a = board.position.posX;
        console.log(a)

    //     console.log(this.enemyPosX)
    //     console.log(this.enemyPosY)
    //     //x va de 0 -> 500
    //     //y va de 50 -> 548
    //     //1 x: 0-100 y:50-133

    if(keys==="up"){

        if(this.playerTileY>=5){

            this.playerPosY = board.initial.initialY - (board.tile_size.tileY * this.playerTileY);
        }

        else{

            this.playerTileY++;
            this.playerPosY = board.initial.initialY - (board.tile_size.tileY * this.playerTileY);
        }
     }

    else if(keys==="down"){

        if(this.playerTileY <= 0){

            this.playerPosY = board.initial.initialY - (board.tile_size.tileY * this.playerTileY);
        }

        else{

            this.playerTileY--;
            this.playerPosY = board.initial.initialY - (board.tile_size.tileY * this.playerTileY);
        }
    }

    else if(keys==="right"){

        if(this.playerTileX>=4){

            this.playerPosX = board.initial.initialX + (board.tile_size.tileX * this.playerTileX);
        }

        else{

            this.playerTileX++;
            this.playerPosX = board.initial.initialX + (board.tile_size.tileX * this.playerTileX);
        }
    }
    else if(keys==="left"){

        if(this.playerTileX<=0){

            this.playerPosX = board.initial.initialX + (board.tile_size.tileX * this.playerTileX);
        }

        else{

            this.playerTileX--;
            this.playerPosX = board.initial.initialX + (board.tile_size.tileX * this.playerTileX);
        }

    }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var bug = new Enemy();
//new Enemy(0, 214);
var bug1 = new Enemy();
console.log(bug)
//var allEnemies = [bug, bug1];
var allEnemies = [bug];

//cord player centro 200,400
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

     player.handleInput(allowedKeys[e.keyCode]);

});
