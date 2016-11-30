
function createCrows(game) {

game.crowGroup = game.add.group();
for (var i = 0; i < game.crowCount; i++) {
  crow = game.crowGroup.create(game.world.randomX, game.world.randomY, 'flyingCrow');
  game.physics.p2.enable(crow, false);
  crow.animations.add('left', [6, 7, 8, 9, 10, 11], 10, true);
  crow.animations.add('right', [0, 1, 2, 3, 4, 5], 10, true);
  crow.animations.play(game.crowDirections[game.rnd.integerInRange(0, 1)], 10, true);
  crow.body.fixedRotation = true;
  crow.body.mass = 0.001;

  crow.name = 'crow';
  //loops[i] = game.time.events.loop(game.rnd.integerInRange(200, 1000), function(crow) {
  // tweens[i] = game.add.tween(crow);
  //tweens[i].to({
  //	 x: this.game.world.randomX,
  //	 y: this.game.world.randomY
  // }, 2750, Phaser.Easing.Quadratic.InOut, true);
  //}, this, crow);
};

/*for (var i = 0; i < crowCount; i++) {
  if(chasingCrowIndex && chasingCrowIndex == i) {
    console.log('skip crow: ' + chasingCrowIndex);
    continue;
  }
  crows[i] = game.add.sprite(this.game.world.randomX, this.game.world.randomY, 'flyingCrow');
  crows[i].animations.add('left', [6, 7, 8, 9, 10, 11], 10, true);
  crows[i].animations.add('right', [0, 1, 2, 3, 4, 5], 10, true);
  crows[i].animations.play(crowDirections[game.rnd.integerInRange(0, 1)], 10, true);
  crows[i].name = 'crow';
     loops[i] = game.time.events.loop(game.rnd.integerInRange(200, 1000), function(crow) {
      tweens[i] = game.add.tween(crow);
      tweens[i].to({
        x: this.game.world.randomX,
        y: this.game.world.randomY
      }, 2750, Phaser.Easing.Quadratic.InOut, true);
    }, this, crows[i]);
  }; */



}
