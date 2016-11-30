
function createFox(game) {

  fox = game.add.sprite(1500, 800, 'fox');

  fox.animations.add('right',[5, 4, 3, 2, 1, 0, 11, 10, 9, 8, 7, 6, 17, 16, 15, 14, 13, 12, 23, 22, 21, 20, 19, 18], true);
  fox.animations.add('left', [24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47], true);
  game.physics.p2.enable(fox, false);
  fox.name = 'fox';
  fox.body.setRectangle(90, 30, 0, 30, false);
  fox.body.fixedRotation = true;
  fox.body.mass = 0.1;
  fox.body.damping = 0.3;
  fox.body.collideWorldBounds = true;
  var playerMaterial = game.physics.p2.createMaterial('spriteMaterial', fox.body);
  fox.animations.play('right', 30, true);

  return fox;




}
