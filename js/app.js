

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    if(this.x===0){
        row = Math.floor(Math.random()*(3-1 +1))+1;
        if(row === 1){
            this.y = 214;
            this.x = 200;
        }
        else if(row === 2){
            this.y = 131;
            this.x = 10;
        }
        else {
            this.y = 48;
            this.x = 10;
        }

    }

    else if(this.x<500){
        if(this.y===player.y && Math.floor(this.x)===player.x){
            player.x = 200;
            player.y = 380;
            this.x= this.x + (101*dt);
        }
        else{
        this.x= this.x + (101*dt);
        }
    }

    else{
        this.x = 0;
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y){

    this.x = x;
    this.y = y;
    this.jump_x = 101;
    this.jump_y = 83;
    this.tile = 0;

    this.sprite = 'images/char-boy.png'

};

Player.prototype.update = function(dt){

};

Player.prototype.render = function(){
   // var x = this.tile_x * tile_size;
    //var y = this.tile_y * tile_size;

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

Player.prototype.handleInput = function(keys){
        console.log(this.x)
        console.log(this.y)

    if(keys==="up"){
        if(this.y <= 9){
            this.y = 400;
        }
        else{
            this.y = this.y - this.jump_y;
        }
    }
    else if(keys==="down"){

        if(this.y >= 400){

            this.y = this.y;
        }
        else{
            this.y = this.y + this.jump_y;
        }
    }
    else if(keys==="left"){

        if(this.x<=-2){
            this.x= this.x;
        }
        else{
            this.x= this.x - this.jump_x;
        }
    }
    else if(keys==="right"){

        if(this.x>=380){

            this.x = this.x;
        }
        else{
            this.x = this.x + this.jump_x;
        }
    }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var bug = new Enemy(0, 214);
var bug1 = new Enemy(0,130);
console.log(bug)
var allEnemies = [bug, bug1];
var player = new Player(200,380);

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
