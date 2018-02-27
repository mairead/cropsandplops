var gameOptions = {
  tileSize: 40,
  gameWidth: 1024,
  gameHeight: 1024,
  gameSpeed: 100,
}

var level = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,4,2,1,3,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,4,2,1,3,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,4,2,1,3,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

var PATH = 0;
var HEDGE = 1;
var WEEDS = 2;
var EARTH = 3;
var GARDENER = 4;

window.onload = function(){
  var gameConfig = {
    type: Phaser.CANVAS,
    width: gameOptions.gameWidth,
    height: gameOptions.gameHeight,
    scene: [playGame]
  };
  var game = new Phaser.Game(gameConfig);
}

var playGame = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize:
  function playGame(){
    Phaser.Scene.call(this, {key: "PlayGame"});
  },
  preload: function(){
    this.load.spritesheet("tiles", "tiles.png", {
      frameWidth: gameOptions.tileSize,
      frameHeight: gameOptions.tileSize
    });
  },
  create: function(){
    this.drawLevel();
    this.input.on("key", this.onDown, this);
  },
  drawLevel: function(){
    for(var i = 0; i < level.length; i++){
      for(var j = 0; j < level[i].length; j++){
        switch(level[i][j]){
          case GARDENER:
          var tile = this.add.sprite(gameOptions.tileSize * j, gameOptions.tileSize * i, "tiles", level[i][j]);
          tile.setOrigin(0);
          break;
          default:
          var tile = this.add.sprite(gameOptions.tileSize * j, gameOptions.tileSize * i, "tiles", level[i][j]);
          tile.setOrigin(0);
        }
      }
    }
  },
  checkMove: function(deltaX, deltaY){
    if(this.isWalkable(this.GARDENER.posX + deltaX, this.GARDENER.posY + deltaY)){
      this.moveGardener(deltaX, deltaY);
      return;
    }
  },
  isWalkable: function(posX, posY){
   return level[posY][posX] == PATH;
  },
 // isCrate: function(posX, posY){
 //  return level[posY][posX] == CRATE || level[posY][posX] == CRATE + SPOT;
 //  },
  moveGardener: function(deltaX, deltaY){
    var GardenerTween = this.tweens.add({
      targets: this.GARDENER,
      x: this.GARDENER.x + deltaX * gameOptions.tileSize,
      y: this.GARDENER.y + deltaY * gameOptions.tileSize,
      duration: gameOptions.gameSpeed,
      onComplete: function(tween, target, GARDENER){
        GARDENER.setFrame(level[GARDENER.posY][GARDENER.posX]);
      },
      onCompleteParams: [this.GARDENER]
    });
    level[this.GARDENER.posY][this.GARDENER.posX] -= GARDENER;
    this.GARDENER.posX += deltaX;
    this.GARDENER.posY += deltaY;
    level[this.GARDENER.posY][this.GARDENER.posX] += GARDENER;
  },
  onDown(e){
    console.log(e.keyCode);
    switch(e.keyCode){
      // left
      case 37:
      checkMove(-1,0);
      break;
      // up
      case 38:
      checkMove(0,-1);
      break;
      // right
      case 39:
      checkMove(1,0);
      break;
      // down
      case 40:
      checkMove(0,1);
      break;
    }
  }
});
