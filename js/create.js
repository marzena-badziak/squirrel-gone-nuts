



//create branches that our player can jump through (name: platforms):

function createPlatforms(game) {

  platform = game.add.sprite(2500, 500, 'test-branch');
  game.physics.p2.enable(platform, true);
  platform.visible = false;
  platform.body.clearShapes();
  platform.name = 'platform';
  platform.body.static = true;
  platform.body.loadPolygon('branchPhysics', 'test-branch');


};

//add scoreboard to the game:

function createScoreboard(game) {

  var box = game.add.image(3, -30, 'box');
  box.fixedToCamera = true;

  text = game.add.text(42, 35, "You haven't collected any hazelnuts yet :(", {
          font: "18px Arial",
          fill: "black",
          align: "center",
          align: 'left',
          wordWrap: true,
          wordWrapWidth: 180
      });
  text.fixedToCamera = true;
  var logo = game.add.sprite(10,45, 'hazelnut');
  logo.fixedToCamera = true;

  return text;

  // text.anchor.setTo(0.5, 0.5);

};

function createSquirrelHouse(game) {

  hole = game.add.sprite(2830, 730, 'hole');
  game.physics.p2.enable(hole, true);
  hole.body.setRectangle(20, 30, 3, 10, 0);
  hole.body.static = true;
  hole.name = 'hole';


};


function dropLeaves(game) {
var leaves;
var numberOfLeaves = 20;


  leaves = game.add.group();
  leaves.enableBody = true;
  //game.physics.p2.enable(hazelnuts, true);
  leaves.physicsBodyType = Phaser.Physics.P2JS;


  for (var i = 1; i < numberOfLeaves; i++) {
  var leaf = leaves.create(getRandomIntInclusive(3700,3900), getRandomIntInclusive(600,300), 'leaf'+getRandomIntInclusive(1, 7));
    game.physics.p2.enable(leaf, true);

    leaf.body.setCircle(11);
    leaf.body.fixedRotation = false;
    leaf.body.damping = 0.05;
    leaf.body.mass = 0.05;
    leaf.name = 'leaf';
  };


//usful function to generate random integer within a given range:
  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };



}
