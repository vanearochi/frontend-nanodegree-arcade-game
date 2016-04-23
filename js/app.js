'use strict';

var charactersImages =[];
var level = 1;
var backgroundColor = "white";
var fontColor = "black";
var countergem = 0;
var counterlives = 3;


/**
 * @function changeCharacters
 * Draws characters and changes main character.
 * Draws characters in charCanvas iterating over characters objec. Adds click event to canvas.
 * Detects clicks on specific coordinates and changes the character accordingly.
*/

var changeCharacters = function(){

    var charCanvas = document.querySelector("#charCanvas");
    var ctx = charCanvas.getContext("2d");
    var characters={

        'catGirl': 'images/char-cat-girl.png',
        'hornGirl': 'images/char-horn-girl.png',
        'pinkGirl': 'images/char-pink-girl.png',
        'princessGirl': 'images/char-princess-girl.png',
        'boy': 'images/char-boy.png'
    };



   for(var key in characters){

        if(characters.hasOwnProperty(key)){

            createNewImage(key, characters[key], charactersImages);
        }
    }

    charactersImages[0].onload = function(){

        var distance = 0;

        charactersImages.forEach(function(val){

            ctx.drawImage(val, distance, -50);
            distance = distance + 100;
            console.log(val);
        });
    };

    //@listens canvas:click
    $("#charCanvas").on("click", function(){

        //solution found in: http://www.homeandlearn.co.uk/JS/html5_canvas_mouse_events.html
        var canvas_x = event.pageX;
        var canvas_y = event.pageY;
        console.log(canvas_x);
        console.log(canvas_y);

        if(canvas_y > 8 && canvas_y < 102){

            if(canvas_x > 50 && canvas_x < 120){

                player.sprite = characters.catGirl;
            }
            else if(canvas_x > 140 && canvas_x < 220){

                player.sprite = characters.hornGirl;
            }
            else if(canvas_x > 240 && canvas_x < 320){

                player.sprite = characters.pinkGirl;
            }
            else if(canvas_x > 345 && canvas_x < 420){

                player.sprite = characters.princessGirl;
            }
            else if(canvas_x > 450  && canvas_x < 520){

                player.sprite = characters.boy;
            }
        }
    });
};


changeCharacters();

/**
 * @function createNewImage
 * Creates a new image
 * @param {string}  name - Image name
 * @param {string}  source - Image src
 * @param {string}  arrayName - Array's name or other to return a single img
 * @returns {image} name - Image created
 **/
function createNewImage(name, source, arrayName){

    var imageName = name;
    name = new Image();
    name.id = imageName;
    name.src = source;

    if(arrayName != "other"){

        arrayName.push(name);
    }
    else{

        return name;
    }
}

//Manipulating the score canvas, adding images and text.
var scoreCanvas = document.querySelector("#scoreBoard");
var ctx2 = scoreCanvas.getContext("2d");
var gemBoardImg = createNewImage("gem", 'images/Gem Blue copy.png', "other");
var heartBoardImg = createNewImage("heart", "images/Heart.png", "other");
var livesCoordX = 83;
var livGemCoordY = 25;
var gemCoordX = 25;
var levelCoordX = 160;

gemBoardImg.onload = function(){


            ctx2.drawImage(gemBoardImg, 0, 0);
            ctx2.drawImage(heartBoardImg, 60, 3);
            updateBoardCanvas("x "+0, gemCoordX, livGemCoordY);
            updateBoardCanvas("x "+3, livesCoordX, livGemCoordY);
            updateBoardCanvas("Level:", 130, livGemCoordY);
            updateBoardCanvas(level, levelCoordX, livGemCoordY);
};

// I consultate stackoverflow to came up with the next solution:
//http://stackoverflow.com/questions/3543687/how-do-i-clear-text-from-the-canvas-element

/**
 * @function updateBoardCanvas
 * Writes score on  score board
**/
function updateBoardCanvas(counter, xCoord, yCoord){

    ctx2.fillStyle= fontColor;
    //ctx2.font = "bold 40pt Raleway";
    ctx2.fillText(counter, xCoord, yCoord);
}

/**
 * @function eraseValue
 * Erase score on score board
**/
function eraseValue(counter, xCoord, yCoord){

    ctx2.fillStyle= backgroundColor;
    ctx2.fillText(counter, xCoord, yCoord);
}


/** Game board object created to be able to manage tiles
    instead of pixels**/
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
};

/**
 * @function speedLevel
 * Increase speed depending on game level.
 *
**/
function speedLevel(level){


    var levelSpeed= level*(getRandomNumber(100,150));
    return levelSpeed;
}

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.enemyPosX = 0;
    this.enemyPosY = 0;
    this.enemyTileX = 0;
    this.enemyTileY = 0;
    this.enemySpeed= 100;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function(dt) {

    if(this.enemyPosX===0){

        // When the Enemy is about to "enter" the board we set his speed and
        // the tile in Y ramdomly
        this.enemySpeed = speedLevel(level);
        this.enemyTileY = getRandomNumber(2, 4);
        this.enemyPosY = board.initial.initialY - (board.tile_size.tileY * this.enemyTileY);
        this.enemyPosX = -4;
    }

    else if(this.enemyPosX<500){

            // We need detect the collision between the player and the enemy
            // so we set conditions to check it
            if((player.playerPosX+30)<(this.enemyPosX-40)){

                this.enemyPosX = this.enemyPosX + (this.enemySpeed*dt);
            }
            else if((player.playerPosX-30)>(this.enemyPosX+40)){

                this.enemyPosX = this.enemyPosX + (this.enemySpeed*dt);
            }
            // If the 2 condition above were false then we check if Enemy & Player
            // are in the same tile then they are colliding

            else{
                // If they collide we set the player to the initial position
                // and call scoreBoard to keep count of lives
                if(this.enemyTileY===player.playerTileY){

                    player.playerPosX = 200;
                    player.playerPosY = 380;
                    player.playerTileX = 2;
                    player.playerTileY = 0;
                    scoreBoard("bug");
                    this.enemyPosX= this.enemyPosX + (this.enemySpeed*dt);
                }
                else{

                    this.enemyPosX= this.enemyPosX + (this.enemySpeed*dt);
                }
            }
    }
    else{

        this.enemyPosX = 0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.enemyPosX, this.enemyPosY);

};

// Gem that player recollect to gain lives

var Gem = function(){

    this.gemPosX= 100;
    this.gemPosY = 100;
    this.gemTileX = 0;
    this.gemTileY =0;
    this.sprite = 'images/Gem Blue.png';
    this.status = "on";
    this.points = "onBoard";

};

var randomNumGem = getRandomNumber(1, 7);
var counter = 0;

Gem.prototype.update = function(dt){

        // "on status" triggers the apparance of the Gem in the board
        if(this.status === "on"){

            this.gemTileX = getRandomNumber(0,4);
            this.gemTileY = getRandomNumber(2,4);
            this.gemPosX = (board.initial.initialX + (board.tile_size.tileX * this.gemTileX))+25;
            this.gemPosY = (board.initial.initialY - (board.tile_size.tileY * this.gemTileY))+50;
            this.status = "off";
            this.points = "onBoard";
            console.log(this.gemTileY)
            console.log(this.gemTileX)
            console.log(player.playerTileY)
            console.log(player.playerTileX)

        }
        // Checking for player & gem collision. If they collide we put the gem outside the board.
        //points change to taken so the condition can run again so we can keep track of the gems
        //collected calling scoreBoard
        if(player.playerTileY===gem.gemTileY && player.playerTileX===gem.gemTileX && this.points==="onBoard"){

            this.gemPosY = 600;
            this.points = "taken";
            scoreBoard("gem");

        }

};

Gem.prototype.render = function(){

    ctx.drawImage(Resources.get(this.sprite), this.gemPosX, this.gemPosY);
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
    this.sprite = 'images/char-horn-girl.png';

};

Player.prototype.update = function(){

    this.playerPosY = board.initial.initialY - (board.tile_size.tileY * this.playerTileY);
    this.playerPosX = board.initial.initialX + (board.tile_size.tileX * this.playerTileX);



};

Player.prototype.render = function(){

    ctx.drawImage(Resources.get(this.sprite), this.playerPosX, this.playerPosY);

};

Player.prototype.handleInput = function(keys){
    //this.update()

    if(keys === "up"){

        this.playerTileY++;

        // When player arrives to the last tile, we set the position to initialvalues,
        // we increase the counter to one to control the gem appearance on the board
        // we keep track of the level calling scoreboard

        if(this.playerTileY >= 5){

            this.playerPosY = board.initial.initialY;
            this.playerPosX = board.initial.initialX + (board.tile_size.tileX * 2);
            this.playerTileY = 0;
            this.playerTileX =2;
            counter++;
            scoreBoard("water");

            //counter is equal of bigger than the random number then we trigger on the status for the
            // gem appeareance on the board
            if(randomNumGem <= counter){

                gem.status= "on";
                counter= 0;
                randomNumGem= getRandomNumber(0,5);
            }
        }

     }

    else if(keys==="down"){

        if(this.playerTileY <= 0){

            this.playerPosY = board.initial.initialY - (board.tile_size.tileY * this.playerTileY);
        }

         else{

            this.playerTileY--;

        }
    }

    else if(keys==="right"){

        if(this.playerTileX >= 4){

            this.playerPosX = board.initial.initialX + (board.tile_size.tileX * this.playerTileX);
        }

        else{

            this.playerTileX++;

        }
    }
    else if(keys==="left"){

        if(this.playerTileX <= 0){

            this.playerPosX = board.initial.initialX + (board.tile_size.tileX * this.playerTileX);
        }

        else{

            this.playerTileX--;

        }

    }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var bug = new Enemy();
//var bug1 = new Enemy();
var allEnemies = [bug];
var player = new Player();
var gem = new Gem();


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

/** @function getRandomNumber
  * Gives a random rumber between two numbers.
  * @param {number} min - Minimum number
  * @param {number} max - Maximum number
  * @returns {number} A random number
**/

/**
 * @function scoreBoard
 * Change the score and level depending on player's event(reach a gem, a bug or water).
 * Detects if player win or loose depending on player's event.
 * @param {string} playerEvent - Player's action on board.
**/
function scoreBoard(playerEvent){

    if(playerEvent === "gem"){

        console.log(countergem);
        eraseValue("x "+countergem, gemCoordX, livGemCoordY);
        countergem++;
        updateBoardCanvas("x "+countergem, gemCoordX, livGemCoordY);

        if(countergem >= 3){

            eraseValue("x "+counterlives, livesCoordX, livGemCoordY);
            counterlives++;
            updateBoardCanvas("x "+counterlives, livesCoordX, livGemCoordY);
        }
    }
    else if(playerEvent === "bug"){

        eraseValue("x "+counterlives, livesCoordX, livGemCoordY);
        counterlives--;
        updateBoardCanvas("x "+counterlives, livesCoordX, livGemCoordY);
        console.log(counterlives);

        if (counterlives <= 0){

            alert("Game Over");
            resetGameValues();
        }
    }
    else if(playerEvent === "water"){

        eraseValue("x "+level, levelCoordX, livGemCoordY);
        level++;
        updateBoardCanvas("x "+level, levelCoordX, livGemCoordY);

        if(level%2===0){

            newEnemycreator(level);
        }

        if (level>=5){
            alert("You Win!");
            resetGameValues();
        }
    }
}

/**
 * @function resetGameValues
 * Resets to initial the game to values.
**/
function resetGameValues(){

        eraseValue("x "+countergem, gemCoordX, livGemCoordY);
        countergem = 0;
        updateBoardCanvas("x "+countergem, gemCoordX, livGemCoordY);
        eraseValue("x "+counterlives, livesCoordX, livGemCoordY);
        counterlives = 3;
        updateBoardCanvas("x "+counterlives, livesCoordX, livGemCoordY);
        eraseValue("x "+ level, levelCoordX, livGemCoordY);
        level=1;
        updateBoardCanvas("x "+ level, levelCoordX, livGemCoordY);

    player.playerPosX = board.initial.initialX + (board.tile_size.tileX * 2);
    player.playerPosY = board.initial.initialY;
    player.boundingX = 0;
    player.movementY = 0;
    player.playerTileX = 2;
    player.playerTileY = 0;
    //level=1
    allEnemies= [allEnemies[0]];


}

function getRandomNumber(min, max){

     var randomNum = Math.floor(Math.random() * (max - min + 1) + min);
    return randomNum;

}

/** @function newEnemycreator


**/
function newEnemycreator(gameLevel){
    var gameLevel = new Enemy();
    allEnemies.push(gameLevel);
    console.log(allEnemies);
}








scoreBoard();



