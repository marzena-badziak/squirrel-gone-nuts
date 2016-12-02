document.addEventListener("DOMContentLoaded", function() {

//main game javasript file

//new phaser game. Size relates to frame size in browser:
		var game = new Phaser.Game(750, 550, Phaser.AUTO, 'phaser-game', {
			preload: preload,
			create: create,
			update: update,
			quit: quit
		});

		function preload() {
			game.load.image('sky', 'assets/sky.jpg');
			game.load.image('galaxy', 'assets/galaxy.jpg');
			game.load.image('fractal', 'assets/fractal.jpg');
			game.load.image('ground', 'assets/world.png');
			game.load.image('cave-front-left', 'assets/cave-front-left.png');
			game.load.image('cave-front-right', 'assets/cave-front-right.png');
			game.load.image('branches', "assets/world2.png");
			game.load.image('hazelnut', 'assets/hazelnut-small.png');
			game.load.spritesheet('squirrel', 'assets/squirrel.png', 50, 50, 9);
			game.load.spritesheet('flyingCrow', 'assets/crow-flying.png', 44, 54, 12);
			game.load.physics('branchPhysics', 'assets/branches.json');
			game.load.physics('groundPhysics', 'assets/ground.json');
			game.load.image('roof', 'assets/world2.png');
			game.load.physics('roofPhysics', 'assets/roof.json');
			game.load.image('hole', 'assets/hole.png');
			game.load.image('box', 'assets/sign_blank.png');
			game.load.spritesheet('fox', 'assets/fox.png', 153, 139, 48);
			game.load.image('redMushroom', 'assets/mushroom_red.png')
			game.load.image('blueMushroom', 'assets/mushroom_blue.png')
			game.load.image('leaf1', 'assets/leaves/leaf-01.png');
			game.load.image('leaf2', 'assets/leaves/leaf-02.png');
			game.load.image('leaf3', 'assets/leaves/leaf-03.png');
			game.load.image('leaf4', 'assets/leaves/leaf-04.png');
			game.load.image('leaf5', 'assets/leaves/leaf-05.png');
			game.load.image('leaf6', 'assets/leaves/leaf-06.png');
			game.load.image('leaf7', 'assets/leaves/leaf-07.png');

		//end of preload function:
		};

	//Declaration of global variables:

		var player;
		var playerKilled;
		var ground;
		var caveFrontLeft;
		var caveFrontRight;
		var cursors;
		var sky;
		var sky2;
		var platform
		var branches;
		var hole;
		var hazelnuts;
		var hazelnutCount = 25;
		var hazelnutPicked = null;
		var hazelnutHidden;
		var hazelnutConstraint = null;
		var leaves;
		var facing = 'left';
		var yAxis = p2.vec2.fromValues(0, 1);
		var ctrl;
		var chasingCrowIndex = undefined;
		game.crowCount = 10;
		var crows = [game.crowCount];
		game.crowGroup;
		var crow;
		var crowPickedHazelnut;
		var text;
		var hazelnutCounter = 0;
		var tweens = [20];
		var loops = [20];
		var chaseDistance = undefined;
		var distanceConstraint;
		var chaseSpeed = 0.03;
		var crowYForce = 0.5;
		game.crowDirections = ['left', 'right'];
		var fox;
		game.foxDirections = ['left', 'right'];
		var gameOverText = '';
		var gravity = true;



		function create() {

			//create game with game world boundaries:
			game.physics.startSystem(Phaser.Physics.P2JS);
			game.world.setBounds(0, 0, 5000, 1000, true);
			game.physics.p2.gravity.y = 380;
			game.physics.p2.world.defaultContactMaterial.friction = 0.0;
			game.physics.p2.world.setGlobalStiffness(1e5);

		//Turn on impact events for the world, without this we get no collision callbacks
			//game.physics.p2.setImpactEvents(true);

console.log(gravity);
// sky3 = game.add.tileSprite(0, 0, 5000, 1000, 'fractal');
// sky3.fixedToCamera = true;
sky2 = game.add.tileSprite(0, 0, 5000, 1000, 'galaxy');
sky2.fixedToCamera = true;
sky = game.add.tileSprite(0, 0, 5000, 1000, 'sky');
sky.fixedToCamera = true;


// function setSky(gravity) {
// 	console.log('inside setSky function');
// 	if (!gravity) {
//
// 		sky = game.add.tileSprite(0, 0, 5000, 1000, 'galaxy');
// 		sky.fixedToCamera = true;
// 		console.log('sky switched to galxy');
// 	} else {
// 	sky = game.add.tileSprite(0, 0, 5000, 1000, 'sky');
// 	sky.fixedToCamera = true;
// 	}
// };
//
// setSky(gravity);



			ground = game.add.sprite(2500, 500, 'ground');
			game.physics.p2.enable(ground, false);
			ground.body.clearShapes();
			ground.body.loadPolygon('groundPhysics', 'ground');
			ground.body.static = true;
			ground.body.setMaterial(groundMaterial);

			var roof = game.add.sprite(2500,500, 'roof');
			game.physics.p2.enable(roof, false);
			roof.visible = false;
			roof.body.clearShapes();
			roof.body.loadPolygon('roofPhysics', 'roof');
			roof.body.static = true;
			roof.body.setMaterial(groundMaterial);

			createSquirrelHouse(game);

			var	redMushroom = game.add.sprite(35, 895, 'redMushroom');
				redMushroom.enableBody = true;
				redMushroom.physicsBodyType = Phaser.Physics.P2JS;
				game.physics.p2.enable(redMushroom, false);
				redMushroom.body.fixedRotation = true;
				redMushroom.body.static = true;
				redMushroom.body.setRectangle(10, 40, 0, 0);
				redMushroom.name = 'redMushroom';

			var	blueMushroom = game.add.sprite(4845, 813, 'blueMushroom');
				blueMushroom.enableBody = true;
				blueMushroom.physicsBodyType = Phaser.Physics.P2JS;
				game.physics.p2.enable(blueMushroom, false);
				blueMushroom.body.fixedRotation = true;
				blueMushroom.body.static = true;
				blueMushroom.body.setRectangle(10, 40, 0, 0);
				blueMushroom.name = 'blueMushroom';

		//create player:
			player = game.add.sprite(150, 800, 'squirrel');
			player.animations.add('left', [5, 6, 7, 8], 10, true);
			player.animations.add('right', [0, 1, 2, 3], 10, true);
			game.physics.p2.enable(player, false);
			player.name = 'player';
			player.body.setRectangle(20, 20, 0, 10);
			player.body.fixedRotation = true;
			player.body.damping = 0.001;
			player.body.collideWorldBounds = true;
			var playerMaterial = game.physics.p2.createMaterial('spriteMaterial', player.body);

			var worldMaterial = game.physics.p2.createMaterial('worldMaterial');
			var groundMaterial = game.physics.p2.createMaterial('worldMaterial');
		//	var spriteMaterial = game.physics.p2.createMaterial('spriteMaterial');
	//  Set World Material. 4 trues = the 4 faces of the world in left, right, top, bottom order
			game.physics.p2.setWorldMaterial(worldMaterial, true, true, true, true);

	//  Here is the contact material. It's a combination of 2 materials, so whenever shapes with
  //  those 2 materials collide it uses the following settings.
  //  A single material can be used by as many different sprites as you like.
   	 	var contactMaterial = game.physics.p2.createContactMaterial(playerMaterial, worldMaterial);

		 contactMaterial.friction = 0.1;     // Friction to use in the contact of these two materials.
		 contactMaterial.restitution = 2.0;  // Restitution (i.e. how bouncy it is!) to use in the contact of these two materials.
	//	 contactMaterial.stiffness = 1e7;    // Stiffness of the resulting ContactEquation that this ContactMaterial generate.
		 contactMaterial.relaxation = 3;     // Relaxation of the resulting ContactEquation that this ContactMaterial generate.
	//	 contactMaterial.frictionStiffness = 1e7;    // Stiffness of the resulting FrictionEquation that this ContactMaterial generate.
		 contactMaterial.frictionRelaxation = 2;     // Relaxation of the resulting FrictionEquation that this ContactMaterial generate.
		 contactMaterial.surfaceVelocity = 0;        // Will add surface velocity to this material. If bodyA rests on top if bodyB, and the surface velocity is positive, bodyA will slide to the right.

			fox = createFox(game);

			createCrows(game);

		//create a group of hazelnuts:
			hazelnuts = game.add.group();
			hazelnuts.enableBody = true;
			hazelnuts.physicsBodyType = Phaser.Physics.P2JS;

			for (var i = 0; i < hazelnutCount; i++) {
				var hazelnut = hazelnuts.create(game.world.randomX, 100, 'hazelnut');
				game.physics.p2.enable(hazelnut, false);

				hazelnut.body.setCircle(25);
				hazelnut.body.fixedRotation = false;
				hazelnut.body.damping = 0.1;
				hazelnut.body.mass = 0.1;
				hazelnut.name = 'hazelnut';
			};

			caveFrontLeft = game.add.sprite(970, 930, 'cave-front-left');
			game.physics.p2.enable(caveFrontLeft, false);
			caveFrontLeft.body.setRectangle(30, 30,-20, 10, 0);
			caveFrontLeft.body.static = true;
			caveFrontLeft.name = 'cave-front-left';

			caveFrontRight = game.add.sprite(3277, 955, 'cave-front-right');
			game.physics.p2.enable(caveFrontRight, false);
			caveFrontRight.body.setRectangle(30, 30,10, -30, 0);
			caveFrontRight.body.static = true;
			caveFrontRight.name = 'cave-front-right';

			createPlatforms(game);

			dropLeaves(game);

			// var groundPlayerCM = game.physics.p2.createContactMaterial(playerMaterial, worldMaterial, {
			// 	friction: 0.2
			// });
			// var groundWorldCM = game.physics.p2.createContactMaterial(playerMaterial, groundMaterial, {
			// 	friction: 0.1
			// });
			// var groundWorldCM = game.physics.p2.createContactMaterial(worldMaterial, groundMaterial, {
			// 	friction: 0.0
			// });

			//set collision detection:
				game.physics.p2.setPostBroadphaseCallback(checkCollision, this);


			game.camera.follow(player);

			cursors = game.input.keyboard.createCursorKeys();
			ctrl = game.input.keyboard.addKey(Phaser.Keyboard.CONTROL);



			createScoreboard(game);

			//  Here we'll create a basic timed event. This is a one-off event, it won't repeat or loop:
//  The first parameter is how long to wait before the event fires. In this case 4 seconds (you could pass in 4000 as the value as well.)
//  The next parameter is the function to call ('fadePicture') and finally the context under which that will happen.

//game.time.events.add(Phaser.Timer.SECOND * 4, switchGravity, this);

		};


		function releaseHazelnut() {
			if (hazelnutPicked != null) {
				// console.log('inside ctrl down')
				game.physics.p2.removeConstraint(hazelnutConstraint);
				hazelnutPicked.velocity.x = 100;
				hazelnutPicked.velocity.y = 100;
				hazelnutPicked = null;
				hazelnutConstraint = null;
				chaseDistance = undefined;
				chasingCrowIndex = undefined;
				chasingSpeed = 0.04;
				// switchGravity(true);
				// console.log('hazelnut removed ' + hazelnutPicked);
			}
		};


		function checkCollision(body1, body2) {
			if (body1 && body2) {
				if (body1.sprite && body2.sprite) {
					if ((body1.sprite.name === 'player' && body2.sprite.name === 'platform') || (body1.sprite.name === 'platform' && body2.sprite.name === 'player') || (body1.sprite.name === 'hazelnut' && body2.sprite.name === 'platform') || (body1.sprite.name ===
							'platform' && body2.sprite.name === 'hazelnut')) {
						if (player.body.velocity.y < 0) {
							return false;
						}
					} else if (((body1.sprite.name === 'player' && body2.sprite.name === 'hazelnut') || (body1.sprite.name === 'hazelnut' && body2.sprite.name === 'player')) && ctrl.isDown && !hazelnutConstraint) {
						console.log('hazelnut picked');
						hazelnutConstraint = game.physics.p2.createLockConstraint(body1, body2, [5, 5], 0);
						hazelnutPicked = (body1.sprite.name === 'hazelnut') ? body1 : body2;
						chaseSpeed = 0.1;
					} else if (hazelnutPicked && ((body1 === hazelnutPicked && body2.sprite.name === 'crow') || (body2 === hazelnutPicked && body1.sprite.name === 'crow'))) {
						crowPickedHazelnut = game.physics.p2.createLockConstraint(body1, body2, [0, 0], 0);
						// console.log('crow catched hazelnut' + crowPickedHazelnut);
						game.physics.p2.removeConstraint(hazelnutConstraint);
						// console.log('increase y force');
						hazelnutPicked.mass = 0.00000001;
						//crowYForce += 1000;
						// console.log('player lost hazelnut' + hazelnutConstraint);
					} else if (hazelnutPicked && ((body1.sprite.name === 'hole' && body2 === hazelnutPicked) || (body2.sprite.name === 'hole' && body1 === hazelnutPicked))) {
						hideHazelnut(hazelnutPicked);
						hazelnutCounter ++;
						updateText();
					} else if ((body1.sprite.name === 'player' && body2.sprite.name === 'fox') || (body1.sprite.name === 'fox' && body2.sprite.name === 'player')) {
						console.log('squirrel eaten by fox!');
						playerKilled = true;
						gameOver(player);
					} else if ((body1.sprite.name === 'player' && body2.sprite.name === 'redMushroom') || (body1.sprite.name === 'redMushroom' && body2.sprite.name === 'player')) {
						console.log('Red mushroom eaten...');
						switchGravity(false);
					//	gravity = false;
						sky.visible = false;
						// sky2.visible = false;


					};

					}
				};

			return true;

		};


		function switchGravity(toggle) {
			game.physics.p2.applyGravity = toggle;
			console.log('gravity swithed!');

		}

		// function render() {

		  // var gravityCounter = game.add.text("Time until event: " + game.time.events.duration, 32, 732);

		// };

		function gameOver(player) {

			console.log('game over!!!!');

	};


		function distance(x1, y1, x2, y2) {
			return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2))
		};



		function update() {


			//Fox starts following a player if the player is within a range:

			//if - payer is outside range, fox walks slowly - right-left:
			if(distance(player.position.x, player.position.y, fox.position.x, fox.position.y) > 300) {
				fox.body.velocity.x = -100;
				fox.animations.play('left', 30, true);
			} else {	//fox detects player:
					if((player.position.x - fox.position.x) > 5) {
						fox.body.velocity.x = 180;
						fox.animations.play('right', 30, true);
					} else if ((player.position.x - fox.position.x) < -5) {
							fox.body.velocity.x = -180;
							fox.animations.play('left', 30, true);
						} else  { //if player is directly above fox, the fox stops
								fox.body.velocity.x = 0;
								//additional condition to ensure fox animation stops only when a player stops:
								if ((!cursors.left.isDown) && (!cursors.right.isDown) ){
									fox.animations.stop();
								};
							};
					};


				if(playerKilled)	{
					fox.body.velocity.x = 0;
					fox.animations.stop();

					//game.add.tween(player).to({x: player.position.x - 10, y: player.position.y - 100}, 1000, Phaser.Easing.Linear.None, true);
					game.add.tween(player).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
					game.add.tween(player).to({alpha: 100}, 1000, Phaser.Easing.Linear.None, true);
					player.body.velocity.y = -100;

					player.animations.stop();

					gameOverText.fixedToCamera = true;

					gameOverText	= game.add.text(210, 200, "Game over...", {
									font: "60px Arial",
									fill: "white",
									align: "center",
									stroke: '#000000',
									strokeThickness: 5
							});
							// console.log(gameOverText);
					// console.log(gameOverText);
					game.time.events.add(2000, function(fox) {
							// console.log('inside time event');
//
						//after game over, a player is removed from the game
							player.destroy();
							playerKilled = false;
						//	game.paused = true;
							game.state.restart();
							// sky2.visible = true;
							sky.visible = true;

							switchGravity(true);
					}, this);

			//camera stops following player after the player is eaten by the fox
					game.camera.follow();




				};


			game.crowGroup.forEachAlive(crowFly, this);
			//if (cursors.left.isDown) {ship.body.rotateLeft(100);}   //ship movement
			//else if (cursors.right.isDown){ship.body.rotateRight(100);}
			//else {ship.body.setZeroRotation();}
			//if (cursors.up.isDown){ship.body.thrust(400);}
			//else if (cursors.down.isDown){ship.body.reverse(400);}


			if (cursors.left.isDown) {
				player.body.moveLeft(150);
				if (checkIfCanJump())
					player.animations.play('left');
				else {
					player.frame = 5;
				}
			} else if (cursors.right.isDown) {
				player.body.moveRight(150);
				if (checkIfCanJump())
					player.animations.play('right')
				else {
					player.frame = 3;
				}
			} else if (cursors.up.isDown) {
				//	console.log('up!!!');
				player.body.velocity.x = 0;
				player.animations.stop();

				if (checkIfCanJump()) {
					//  Stand still
					player.frame = 4;
				} else {
					if (cursors.left.isDown) {
						player.frame = 1;
					} else if (cursors.right.isDown) {
						player.frame = 6;
					}
				}
			}
			if (cursors.up.isDown && checkIfCanJump()) {
				player.body.moveUp(350);
				player.animations.stop();
			}
			if(cursors.down.isDown && !game.physics.applyGravity) {
				player.body.moveDown(150);
			}

			if (ctrl.isUp && hazelnutConstraint) {
				releaseHazelnut();
			}
			if (chasingCrowIndex) {
				crows[chasingCrowIndex].position.x
				if (crows[chasingCrowIndex].position.x > player.position.x) {
					crows[chasingCrowIndex].position.x -= 10;
				} else {
					crows[chasingCrowIndex].position.x += 10;
				}

				if (crows[chasingCrowIndex].position.y > player.position.y) {
					crows[chasingCrowIndex].position.y -= 10;
				} else {
					crows[chasingCrowIndex].position.y += 10;
				}


			}
		};

		function updateText() {
		  //  hazelnutCounter++;
			text = createScoreboard(game);

			text.setText("Hazelnuts collected: " + hazelnutCounter);
		}


		function hideHazelnut(hazelnut) {
				hazelnut.sprite.kill();
			//hazelnut.destroy();
			//hazelnutPicked = null;
			console.log('hazelnut hidden in a hole!!!');
		}

		function checkIfCanJump() {
			var result = false;

			if(game.physics.p2.applyGravity == false) {
				return true;
			}

			for (var i = 0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++) {
				var c = game.physics.p2.world.narrowphase.contactEquations[i];
				if (c.bodyA === player.body.data || c.bodyB === player.body.data) {
					var d = p2.vec2.dot(c.normalA, yAxis);
					if (c.bodyA === player.body.data) {
						d *= -1;
					}
					if (d > 0.5) {
						result = true;
					}
				}
			}
			return result;
		}


		function crowFly(crow) {
			accelerateToObject(crow, player, chaseSpeed);
		}

		function accelerateToObject(obj1, obj2, speed) {
			var angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
			obj1.body.rotation = angle + game.math.degToRad(90); // correct angle of angry bullets (depends on the sprite used)
			obj1.body.force.x = Math.cos(angle) * speed; // accelerateToObject
			obj1.body.force.y = Math.sin(angle) * speed;
			obj1.body.force.y -= crowYForce;
		}








function quit() {
	console.log('end game');

};

//closing event listener:

});
