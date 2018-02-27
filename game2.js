window.onload = function() {
  // game definition, 320x320
  var game = new Phaser.Game(768,768,Phaser.CANVAS,"",{preload:onPreload, create:onCreate});
  var audio = new Audio('splat.wav');

  var music = new Audio('music.wav');
  music.play();
  // constants with game elements
  var PATH = 0;
  var HEDGE = 1;
  var GRASS = 2;
  var EARTH = 3;
  var GARDENER = 4;
  var BIRD = 5;
  var POOP = 6;
  var SEEDS = 7;
  var WEEDS = 8;
  var CAULIFLOWER = 9;
  var CARROTS = 10;

     var level = [
     [5,1,0,3,3,3,3,0,0,0,3,3,3,3,0,0,0,3,3,3,3,0,1,1],
     [1,1,0,9,9,9,9,0,0,0,3,3,3,3,0,0,0,8,8,8,8,0,1,1],
     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,6],
     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,6],
     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
     [0,0,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,3,0,0],
     [0,0,3,3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,3,3,0,0],
     [0,0,3,3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,3,3,0,0],
     [0,0,10,10,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,3,3,0,0],
     [0,0,0,0,0,0,0,3,3,1,1,0,0,1,1,3,3,0,0,0,0,0,0,0],
     [0,0,0,0,7,0,0,3,3,1,0,0,0,0,1,3,3,0,0,0,0,7,0,0],
     [0,0,0,0,0,0,0,0,0,1,0,4,2,0,1,0,0,0,0,0,0,0,0,0],
     [0,0,0,0,0,0,0,0,0,1,0,2,2,0,1,0,0,0,0,0,0,0,0,0],
     [0,0,3,3,1,3,3,0,0,1,0,0,0,0,1,0,0,3,3,1,3,3,0,0],
     [0,0,3,3,1,3,3,0,0,0,0,0,0,0,0,0,0,3,3,1,3,3,0,0],
     [0,0,3,3,1,0,0,0,0,1,1,1,1,1,1,0,0,0,0,1,3,3,0,0],
     [0,0,3,3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,3,3,0,0],
     [0,0,7,0,1,3,3,0,0,0,0,0,0,0,0,0,0,3,3,1,0,0,0,0],
     [0,0,0,0,1,3,3,0,0,0,0,7,0,0,0,0,0,3,3,1,0,0,0,0],
     [0,0,0,0,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,0,0,0,0],
     [0,0,0,0,3,3,3,0,0,0,0,0,0,0,0,0,0,3,3,3,0,0,0,0],
     [0,0,0,0,3,3,3,0,0,0,0,0,0,0,0,0,0,3,3,3,0,0,0,0],
     [1,1,0,0,0,0,0,0,0,0,3,3,3,3,0,0,0,0,0,0,0,0,1,1],
     [1,1,0,0,0,0,0,0,0,0,3,3,3,3,0,0,0,0,0,0,0,0,1,1],
     ];

  // size of a tile, in pixels
  var tileSize = 32;

 // the player! Yeah!
 var player = {posX: 11, posY: 11};
 var bird = {posX: 0, posY: 0};

  // is the player moving?
     // var playerMoving = false;

 // variables used to detect and manage swipes
 // var startX;
 // var startY;
 // var endX;
 // var endY;

 // Variables used to create groups. The first group is called fixedGroup, it will contain
 // all non-moveable elements (everything but crates and player).
 // Then we add movingGroup which will contain moveable elements (crates and player)
 var fixedGroup;
 var movingGroup;

   // first function to be called, when the game preloads I am loading the sprite sheet with all game tiles
  function onPreload() {
    game.load.spritesheet("tiles","tiles.gif",32,32);
  }

  // function to be called when the game has been created
  function onCreate() {
    // waiting for a key pressed
    game.input.keyboard.addCallbacks(this,onDown);

    // drawing the level
    drawLevel();
  }

  function drawLevel(){
          // empty crates array. Don't use crates = [] or it could mess with pointers
    // adding the two groups to the game
    fixedGroup = game.add.group();
    movingGroup = game.add.group();
      // variable used for tile creation
      var tile
      // looping trough all level rows
      for(var i=0;i<level.length;i++){
      // creation of 2nd dimension of crates array

           // looping through all level columns
       for(var j=0;j<level[i].length;j++){
        // by default, there are no crates at current level position, so we set to null its
        // array entry

              // what do we have at row j, col i?
              switch(level[i][j]){
                case BIRD + HEDGE:
                 // creation of a simple tile
                 tile = game.add.sprite(32*j,32*i,"tiles");
                 tile.frame = level[i][j];
                 movingGroup.add(tile);

                case BIRD + EARTH:
                 // creation of a simple tile
                 tile = game.add.sprite(32*j,32*i,"tiles");
                 tile.frame = level[i][j];
                 movingGroup.add(tile);

               // case GARDENER:
               //   // creation of a simple tile
               //   tile = game.add.sprite(32*j,32*i,"tiles");
               //   tile.frame = level[i][j];
               //   movingGroup.add(tile);

                 default:
                    // creation of a simple tile
                    tile = game.add.sprite(32*j,32*i,"tiles");
                    tile.frame = level[i][j];
                    fixedGroup.add(tile);
                  }
                }
              }
            }

  // function to be executed once a key is down
  function onDown(e){

      switch(e.keyCode){
        // left
        case 37:
        move(-1,0);
        break;
        // up
        case 38:
        move(0,-1);
        break;
        // right
        case 39:
        move(1,0);
        break;
        // down
        case 40:
        move(0,1);
        break;
      }
    // }
  }


  // function to move the player
  function move(deltaX,deltaY){
      // if destination tile is walkable...
      if(isWalkable(player.posX+deltaX,player.posY+deltaY)){
       // then move the player and exit the function
        movePlayer(deltaX,deltaY);
        moveBird();
        drawLevel();
       return;
     }
   }

 // a tile is walkable when it's an empty tile or a spot tile
 function isWalkable(posX,posY){
  return level[posY][posX] == PATH || level[posY][posX] == SEEDS;
}
  // function to move the player
  function movePlayer(deltaX,deltaY){
    // now the player is moving
    playerMoving = true;

    level[player.posY][player.posX] -=GARDENER;
    // updating player custom posX and posY attributes
    player.posX+=deltaX;
    player.posY+=deltaY;

    if(level[player.posY][player.posX] === SEEDS) {
      level[player.posY][player.posX] = PATH;
    }
    // updating player new position in level array
    level[player.posY][player.posX]+=GARDENER;
    // changing player frame accordingly
    player.frame = level[player.posY][player.posX];
  }

  function moveBird(){
    // TODO Always Move bird towards player
    console.log('player position', player.posY,player.posX);
    console.log('bird position', bird.posY,bird.posX);
    var deltaX, deltaY;
    // if the bird is x pos is less than player x pos move bird to left else move right
    // if the bird y pos is less than player y move bird down else move up
    // if bird x === player x and bird y === player y DO POOP

    if(bird.posX < player.posX){
      deltaX = 1;
    } else if(bird.posX > player.posX){
      deltaX = -1;
    } else {
      deltaX = 0;
    }

    if(bird.posY < player.posY){
      deltaY = 1;
    } else if(bird.posY > player.posY){
      deltaY = -1;
    } else {
      deltaY = 0;
    }
    console.log('what is this?',level[bird.posY][bird.posX]);
    level[bird.posY][bird.posX]-=BIRD;
    bird.posX+=deltaX;
    bird.posY+=deltaY;
    level[bird.posY][bird.posX]=BIRD;
    if (bird.posX === player.posX && bird.posY === player.posY) {

      audio.play();
      level[player.posY][player.posX]=POOP;
      bird.posX = 0;
      bird.posY = 0;
      bird.frame = level[0][0];
    } else {
      bird.frame = level[bird.posY][bird.posX];
    }

  }


  // need a recursive function to copy arrays, no need to reinvent the wheel so I got it here
  // http://stackoverflow.com/questions/10941695/copy-an-arbitrary-n-dimensional-array-in-javascript
  function copyArray(a){
    var newArray = a.slice(0);
    for(var i = newArray.length; i>0; i--){
      if(newArray[i] instanceof Array){
        newArray[i] = copyArray(newArray[i]);
      }
    }
    return newArray;
  }
}