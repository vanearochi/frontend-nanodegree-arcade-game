'use strict';

var charactersImages =[];
var catGirl;
var hornGirl;
var pinkGirl;
var princessGirl;
var boy;
var level = 1;
var backgroundColor = "#b0e0e6";
var fontColor = "black"

var changeCharacters = function(){

    var charCanvas = document.querySelector("#charCanvas");
    var ctx = charCanvas.getContext("2d");
    var characters={

        'catGirl': 'images/char-cat-girl.png',
        'hornGirl': 'images/char-horn-girl.png',
        'pinkGirl': 'images/char-pink-girl.png',
        'princessGirl': 'images/char-princess-girl.png',
        'boy': 'images/char-boy.png'

    }



   for(var key in characters){
        if(characters.hasOwnProperty(key)){
            //console.log(key);
            //console.log(characters[key])
            createNewImage(key, characters[key], charactersImages);
        }   }

     charactersImages[0].onload = function(){
        var distance = 0;
        charactersImages.forEach(function(val){

            ctx.drawImage(val, distance, 0);
            distance = distance + 100;
            console.log(val)
        })
        //ctx.drawImage

    // catGirl.src = 'images/char-cat-girl.png'
    // boy1.src = 'images/char-boy.png'
    // boy1.id = 'boy1'
     }

     $("#charCanvas").on("click", function(){
        console.log($(this).text)
        canvas_x = event.pageX;
        canvas_y = event.pageY;

        if(canvas_y > 55 && canvas_y < 155){
            if(canvas_x > 245 && canvas_x < 320){

                player.sprite = 'images/char-cat-girl.png';


            }
            else if(canvas_x > 335 && canvas_x < 420){

                player.sprite = 'images/char-horn-girl.png';

            }
            else if(canvas_x > 435 && canvas_x < 520){

                player.sprite = 'images/char-pink-girl.png';

            }
            else if(canvas_x > 540 && canvas_x < 615){

                player.sprite = 'images/char-princess-girl.png';

            }
            else if(canvas_x > 645  && canvas_x < 720){
                player.sprite = 'images/char-boy.png';
            }

        }
        console.log(canvas_x);
        console.log(canvas_y);
     })


}


changeCharacters();


function createNewImage(name, source, arrayName){
    //console.log(name);
    //console.log(source)

    var imageName = name
    name = new Image();
    name.id = imageName
    name.src = source
    //console.log(name.src)

    if(arrayName != "other"){
        arrayName.push(name)
    }
    else{
        return name
    }

    //charactersImages.push(name)
    //console.log(charactersImages)


}

$("#catGirl").hide("slow")
a = $("#hornGirl");
console.log(a)

    var boy = $("#boy");
    //console.log(boy)
    //$("section").hide("slow");

var scoreCanvas = document.querySelector("#scoreBoard");
var ctx2 = scoreCanvas.getContext("2d");
var gemmm = createNewImage("gem", 'images/Gem Blue copy.png', "other");
var heart = createNewImage("heart", "images/Heart copy.png", "other")
console.log(heart)
console.log(gemmm)
gemmm.onload = function(){
        //var distance = 0;


            ctx2.drawImage(gemmm, 10, 0);
            ctx2.drawImage(heart, 60, 0);
            //ctx2.fillText("x 0", 30, 25);
            updateBoardCanvas(0, 30, 25);
            //ctx2.fillText("x 3", 80, 25);
            updateBoardCanvas(3, 80, 25)
}

var countergem = 0;
var counterlives = 3;
function scoreBoard(accomplishment){

    console.log("scoreBoard")
    console.log(ctx2);


    if(accomplishment==="gem"){

        console.log(countergem)

        //ctx2.fillStyle= "#b0e0e6";
        //ctx2.fillText("x "+countergem, 30, 25);
        eraseValue(countergem, 30, 25);
        countergem++
        //ctx2.fillStyle= "black";
        //ctx2.fillText("x "+countergem, 30, 25);
        updateBoardCanvas(countergem, 30, 25)
        if(countergem>=3){
            //ctx2.fillStyle= "#b0e0e6";
            //ctx2.fillText("x "+counterlives, 80, 25);
            eraseValue(counterlives, 80, 25)

            counterlives++
            //ctx2.fillStyle= "black";
            //ctx2.fillText("x "+counterlives, 80, 25);
            updateBoardCanvas(counterlives, 80, 25);
        }


    }
    else if(accomplishment==="bug"){

        //solution found on stackoverflow
        //ctx2.fillStyle= "#b0e0e6";
        //ctx2.fillText("x "+counterlives, 80, 25);
        eraseValue(counterlives, 80, 25);

        counterlives--
        //ctx2.fillStyle= "black";
        //ctx2.fillText("x "+counterlives, 80, 25);
        updateBoardCanvas(counterlives, 80, 25);
        console.log(counterlives)

        if (counterlives<=0){
            alert("you lost")
            console.log("lost")
            start();


        }

    }
    else if(accomplishment==="water"){
        level++
        if (level>5){
            alert("you win")
            start()


        }

    }
}

function start(){
        //ctx2.fillStyle= "#b0e0e6";
        //ctx2.fillText("x "+countergem, 30, 25);
        eraseValue(countergem, 30, 25);
        countergem=0
        //ctx2.fillStyle= "black";
        //ctx2.fillText("x "+countergem, 30, 25);
        updateBoardCanvas(countergem, 30, 25);
        //ctx2.fillStyle= "#b0e0e6";
        //ctx2.fillText("x "+counterlives, 80, 25);
        eraseValue(counterlives, 80, 25);

        counterlives= 3
        //ctx2.fillStyle= "black";
        //ctx2.fillText("x "+counterlives, 80, 25);
        updateBoardCanvas(counterlives, 80, 25);

    player.playerPosX = board.initial.initialX + (board.tile_size.tileX * 2);
    player.playerPosY = board.initial.initialY;
    player.boundingX = 0;
    player.movementY = 0;
    player.playerTileX = 2;
    player.playerTileY = 0;
    level=1
    //return ctx.fillText()
}

function updateBoardCanvas(counter, xCoord, yCoord){
    ctx2.fillStyle= fontColor;
    ctx2.fillText("x "+counter, xCoord, yCoord);


}

function eraseValue(counter, xCoord, yCoord){
    ctx2.fillStyle= backgroundColor;
    ctx2.fillText("x "+counter, xCoord, yCoord);
}
//updateBoardCanvas();



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


var speed = 100;

function speedLevel(level){

    var levelSpeed= level * getRandomNumber(50,300);
    return levelSpeed



}
// Enemies our player must avoid

var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.enemyPosX = 0;
    this.enemyPosY = 0;
    this.enemyTileX = 0;
    this.enemyTileY = 0;
    //this.speed =

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    //this.enemyTileX++


    //var speed = getRandomNumber(10, 200);
    if(this.enemyPosX===0){

        speed = speedLevel(level);
        console.log(speed)
        console.log(level)

        this.enemyTileY = getRandomNumber(2, 4);
        this.enemyPosY = board.initial.initialY - (board.tile_size.tileY * this.enemyTileY);
        this.enemyPosX = 5;
        //      this.enemyPosX = 5;
        //console.log(this.enemyTileY)
        // todo: random speeds for enemies.
        // if(this.enemyTileY === 2){
        //     //this.enemyPosY = 214;
        //     this.enemyPosY = board.initial.initialY - (board.tile_size.tileY * this.enemyTileY);
        //      this.enemyPosX = 5;


        // }
        // else if(this.enemyTileY === 3){
        //     this.enemyPosY = board.initial.initialY - (board.tile_size.tileY * this.enemyTileY);
        //     this.enemyPosX = 5;
        // }
        // else {
        //      this.enemyPosY = board.initial.initialY - (board.tile_size.tileY * this.enemyTileY);
        //     this.enemyPosX = 5;
        // }

    }

    else if(this.enemyPosX<500){
        //console.log()
        //console.log(player.playerTileX);
        //console.log(player.playerTileY);
        //console.log(this.enemyTileX);
        //console.log(this.enemyTileY);

        //if(this.enemyTileX===player.playerTileX && this.enemyTileY===player.playerTileY){
            if((player.playerPosX+30)<(this.enemyPosX-40)){
                this.enemyPosX= this.enemyPosX + (speed*dt);
            }
            else if((player.playerPosX-30)>(this.enemyPosX+40)){
                this.enemyPosX= this.enemyPosX + (speed*dt);
            }
            else{
                if(this.enemyTileY===player.playerTileY){
                    player.playerPosX = 200;
                    player.playerPosY = 380;
                    player.playerTileX = 2
                    player.playerTileY = 0
                    console.log("aja")
                    scoreBoard("bug")

                    this.enemyPosX= this.enemyPosX + (speed*dt);

                }
                else{
                    this.enemyPosX= this.enemyPosX + (speed*dt);
                    //console.log(speed)
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

var Gem = function(){
    this.gemPosX= 100
    this.gemPosY = 100
    this.gemTileX = 0;
    this.gemTileY =0;
    this.sprite = 'images/Gem Blue.png'
    this.status = "on";
    this.points = "onBoard"
};

var RandomNumGem = getRandomNumber(1, 7);
var counter = 0;

Gem.prototype.update = function(){
        var counter = Math.floor(Math.random() * (7 - 1 + 1) + 1)
        if(this.status==="on"){
            this.gemTileX = getRandomNumber(0,4);
            this.gemTileY = getRandomNumber(2,4);

            this.gemPosX = (board.initial.initialX + (board.tile_size.tileX * this.gemTileX))+25;
            this.gemPosY = (board.initial.initialY - (board.tile_size.tileY * this.gemTileY))+50;
            this.status = "off";
            this.points = "onBoard"
            //console.log(this.gemPosY)
            //console.log(this.gemTileX)
        }

        if(player.playerTileY===gem.gemTileY && player.playerTileX===gem.gemTileX && this.points==="onBoard"){
            this.gemPosY = 600;
            //this.gemTileY = 0;
            //this.gemTileX = 0;
            console.log(this.status);
            this.points = "taken";
            scoreBoard("gem");
            //points("gem")

        }


    //     this.enemyTileY = Math.floor(Math.random()*(4-2 +1))+2;
    //     //console.log(this.enemyTileY)
    //     // todo: random speeds for enemies.
    //     if(this.enemyTileY === 2){
    //         //this.enemyPosY = 214;
    //         this.enemyPosY = board.initial.initialY - (board.tile_size.tileY * this.enemyTileY);
    //          this.enemyPosX = 5;

    //     }
    //     else if(this.enemyTileY === 3){
    //         this.enemyPosY = board.initial.initialY - (board.tile_size.tileY * this.enemyTileY);
    //         this.enemyPosX = 5;
    //     }
    //     else {
    //          this.enemyPosY = board.initial.initialY - (board.tile_size.tileY * this.enemyTileY);
    //         this.enemyPosX = 5;
    //     }

    // }


}

Gem.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.gemPosX, this.gemPosY);
}
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

    //this.sprite = 'images/char-boy.png'
    //this.sprite = 'images/cat-girl.png'
    this.sprite = 'images/char-horn-girl.png'

};

Player.prototype.update = function(dt){
    //console.log("player bla")
    //choosePlayer();

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
        //console.log(a)

    //     console.log(this.enemyPosX)
    //     console.log(this.enemyPosY)
    //     //x va de 0 -> 500
    //     //y va de 50 -> 548
    //     //1 x: 0-100 y:50-133

    if(keys==="up"){
        this.playerTileY++;

        if(this.playerTileY===5){
            //console.log(counter)
             console.log(this.playerTileY)
            this.playerPosY = board.initial.initialY;
            this.playerPosX = board.initial.initialX + (board.tile_size.tileX * 2);
            this.playerTileY = 0;
            counter++;
            scoreBoard("water");
            if(RandomNumGem<= counter){
                gem.status="on"
                counter=0
                RandomNumGem=getRandomNumber(0,7);
            }
        }

        else{


            console.log(this.playerTileY)
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
//console.log(bug)
//var allEnemies = [bug, bug1];
var allEnemies = [bug];

//cord player centro 200,400
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
})

function getRandomNumber(min, max){
     var randomNum = Math.floor(Math.random() * (max - min + 1) + min);
    return randomNum
}

var a = document.getElementById("boy")
console.log(player.playerTileY)
console.log(player.playerTileX);

function choosePlayer(){


    //console.log("si")
    $("#catGirl").click(function(){
        console.log(":)")

       player.sprite = 'images/char-cat-girl.png';

        // if(player.playerTileX===2 && player.playerTileY===0){
        // console.log("bla")
        // }
    })
    $("#boy").click(function(){
        player.sprite = 'images/char-boy.png';
        console.log("yay")

        // if(player.playerTileX===2 && player.playerTileY===0){
        // console.log("bla")
        // }
    })
    $("#horn-girl").click(function(){
        player.sprite = 'images/char-horn-girl.png';
        console.log("yay")

        // if(player.playerTileX===2 && player.playerTileY===0){
        // console.log("bla")
        // }
    })
     $("#pink-girl").click(function(){
        player.sprite = 'images/char-pink-girl.png';
        console.log("yay")

        // if(player.playerTileX===2 && player.playerTileY===0){
        // console.log("bla")
        // }
    })
      $("#princess-girl").click(function(){
        player.sprite = 'images/char-princess-girl.png';
        console.log("yay")

        // if(player.playerTileX===2 && player.playerTileY===0){
        // console.log("bla")
        // }
    })
       $("#horn-girl").click(function(){
        player.sprite = 'images/char-horn-girl.png';
        console.log("yay")

        // if(player.playerTileX===2 && player.playerTileY===0){
        // console.log("bla")
        // }
    });






        // 'images/enemy-bug.png',
        // 'images/char-boy.png',
        // 'images/Gem Blue.png',
        // 'images/char-cat-girl.png',
        // 'images/char-horn-girl.png'




}

function points(action){
    if(action==="gem" && gem.points==="taken"){
        console.log("points")
       $("#points").append("<div class='col-xs-1'><image src='images/Gem Blue.png'>")
        gem.points = "0"
    }



    };


choosePlayer();
scoreBoard()


//});
