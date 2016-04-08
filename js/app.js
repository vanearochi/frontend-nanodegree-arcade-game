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
        Math.floor(Math.random()*10);

    }
    else if(this.x<500){
        this.x= this.x + 2;
    }
    else if(this.x===player.x && this.y===player.y){
        console.log(player.y)
        player.x = 200;
        player.y = 380;
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

    this.sprite = 'images/char-boy.png'

};

Player.prototype.update = function(dt){

};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

Player.prototype.handleInput = function(keys){
        //console.log(this.y)

    if(keys==="up"){

        if(this.y <= 60){
            this.y = 400;
        }
        else{
            this.y = this.y - 100;
        }
    }
    else if(keys==="down"){

        if(this.y >= 400){

            this.y = this.y;
        }
        else{
            this.y = this.y + 100;
        }
    }
    else if(keys==="left"){

        if(this.x===0){
            this.x= this.x;
        }
        else{
            this.x= this.x - 100;
        }
    }
    else if(keys==="right"){

        if(this.x===400){

            this.x = this.x;
        }
        else{
            this.x = this.x + 100;
        }
    }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var bug = new Enemy(100, 0);
var bug1 = new Enemy(200,96);
console.log(bug)
var allEnemies = [bug, bug1];
var player = new Player(200, 400);

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
