import AsciiGrid from './AsciiGrid';
import AsciiGuy from './AsciiGuy';

function AsciiGame(rowAmount: number, colAmount: number, asciiGuyUpdateCallback: Function) {
	let asciiGrid = AsciiGrid(rowAmount, colAmount);
	let asciiGuy = AsciiGuy(rowAmount / 2, colAmount / 2);
	let isCatched = false;
	let frameSpeed = 2;

	function getString() {
		return asciiGrid.getString();
	}

	function getFrameSpeed() {
		return frameSpeed;
	}

	// Ascii Guy animations
	//===============================
	let shouldMoveRight = false;
	function startMoveRight() {
		shouldMoveRight = true;
		moveRightLoop();
	}
	function stopMoveRight() {
		shouldMoveRight = false;
	}
	function moveRightLoop() {
		paintGuyRight();
		setTimeout(function () {
			if (asciiGuy.origin.x >= rowAmount - 2 - 2) {
				return;
			}
			eraseGuy();
			asciiGuy.moveToCoord({ x: ++asciiGuy.origin.x, y: asciiGuy.origin.y });
			paintDeafultGuy();

			setTimeout(function () {
				if (shouldMoveRight) {
					moveRightLoop();
				}
			}, 100);
		}, 100);
	}
	//===============================
	let shouldMoveLeft = false;
	function startMoveLeft() {
		shouldMoveLeft = true;
		moveLeftLoop();
	}
	function stopMoveLeft() {
		shouldMoveLeft = false;
	}
	function moveLeftLoop() {
		paintGuyLeft();
		setTimeout(function () {
			if (asciiGuy.origin.x <= 1) {
				return;
			}
			eraseGuy();
			asciiGuy.moveToCoord({ x: --asciiGuy.origin.x, y: asciiGuy.origin.y });
			paintDeafultGuy();

			setTimeout(function () {
				paintDeafultGuy();
				if (shouldMoveLeft) {
					moveLeftLoop();
				}
			}, 100);
		}, 100);
	}
	//===============================
	let shouldMoveDown = false;
	function startMoveDown() {
		shouldMoveDown = true;
		moveDownLoop();
	}
	function stopMoveDown() {
		shouldMoveDown = false;
	}
	function moveDownLoop() {
		if (asciiGuy.origin.y >= colAmount - 1 - 1) {
			paintGuyDown();
			return;
		}
		eraseGuy();
		asciiGuy.moveToCoord({ x: asciiGuy.origin.x, y: ++asciiGuy.origin.y });
		paintGuyDown();
		setTimeout(function () {
			eraseGuy();
			paintGuyDownRecovery();
			setTimeout(function () {
				paintDeafultGuy();
				if (shouldMoveDown) {
					moveDownLoop();
				}
			}, 200);
		}, 200);
	}
	//===============================
	let shouldMoveUp = false;
	function startMoveUp() {
		shouldMoveUp = true;
		moveUpLoop();
	}
	function stopMoveUp() {
		shouldMoveUp = false;
	}
	function moveUpLoop() {
		paintGuyUp();
		if (asciiGuy.origin.y <= 0) {
			return;
		}
		setTimeout(function () {
			eraseGuy();
			if (asciiGuy.origin.y <= 0) {
				// second check prevent bug
				return;
			}
			asciiGuy.moveToCoord({ x: asciiGuy.origin.x, y: --asciiGuy.origin.y });
			paintGuyUpRecovery();
			setTimeout(function () {
				paintDeafultGuy();
				if (shouldMoveUp) {
					moveUpLoop();
				}
			}, 200);
		}, 200);
	}
	//===============================

	function eraseGuy() {
		asciiGuy.setEmpty();
		paintGuy();
	}

	function paintDeafultGuy() {
		asciiGuy.setDeafult();
		paintGuy();
	}

	function paintGuyRight() {
		asciiGuy.setRight();
		paintGuy();
	}

	function paintGuyLeft() {
		asciiGuy.setLeft();
		paintGuy();
	}

	function paintGuyDownRecovery() {
		asciiGuy.setDownRecovery();
		paintGuy();
	}

	function paintGuyDown() {
		asciiGuy.setDown();
		paintGuy();
	}

	function paintGuyUp() {
		asciiGuy.setUp(isCatched);
		paintGuy();
	}

	function paintGuyUpRecovery() {
		asciiGuy.setUpRecovery(isCatched);
		paintGuy();
	}

	function paintGuy() {
		if (isCatched) {
			paintCatchedBall();
		}
		asciiGrid.replacePartAt2d(asciiGuy.p.head);
		asciiGrid.replacePartAt2d(asciiGuy.p.leftArm);
		asciiGrid.replacePartAt2d(asciiGuy.p.body);
		asciiGrid.replacePartAt2d(asciiGuy.p.rightArm);
		asciiGrid.replacePartAt2d(asciiGuy.p.leftLeg);
		asciiGrid.replacePartAt2d(asciiGuy.p.middleLeg);
		asciiGrid.replacePartAt2d(asciiGuy.p.rightLeg);
		asciiGrid.replacePartAt2d(asciiGuy.p.leftUpperArm);
		asciiGrid.replacePartAt2d(asciiGuy.p.rightUpperArm);
		asciiGuyUpdateCallback();
	}

	function paintCatchedBall() {
		asciiGrid.replaceCharAt2d(' ', ball.x, ball.y);
		switch (asciiGuy.getCurrentDirection()) {
			case asciiGuy.Direction.Left:
				ball.x = asciiGuy.p.leftArm.x - 1;
				ball.y = asciiGuy.p.leftArm.y;
				break;
			case asciiGuy.Direction.Right:
				ball.x = asciiGuy.p.rightArm.x + 1;
				ball.y = asciiGuy.p.rightArm.y;
				break;
			case asciiGuy.Direction.Up:
				ball.x = asciiGuy.p.head.x;
				ball.y = asciiGuy.p.head.y - 1;
				break;
			case asciiGuy.Direction.Down:
				let facingDir = asciiGuy.getFacingDirection();
				if (facingDir === asciiGuy.Direction.Left) {
					ball.x = asciiGuy.p.body.x - 1;
					ball.y = asciiGuy.p.body.y + 2;
				} else if (facingDir === asciiGuy.Direction.Right) {
					ball.x = asciiGuy.p.body.x + 1;
					ball.y = asciiGuy.p.body.y + 2;
				}
				break;
		}
		asciiGrid.replaceCharAt2d('○', ball.x, ball.y);
	}

	// Ball animations======================================
	function onTick() {
		let prevX = ball.x;
		let prevY = ball.y;
		checkBallBounds();
		// paints ball at new postition
		ball.x += ball.xSpeed;
		ball.y += ball.ySpeed;
		asciiGrid.replaceCharAt2d('.', prevX, prevY);
		asciiGrid.replaceCharAt2d('○', ball.x, ball.y);
		// checkForCatchedBall();

		if (asciiGrid.checkIfBordersEmpty() && !didWin) {
			asciiGrid.replaceStringAt2d('YOU WIN', rowAmount / 2 - 3, colAmount / 2);
			didWin = true;
		}
	}
	let didWin = false;

	function checkBallBounds() {
		if (isCatched) {
			return;
		}
		if (ball.y <= 1) {
			// top boundary
			ball.inverseYSpeed();
			asciiGrid.replaceCharAt2d(' ', ball.x, ball.y - 1);
		} else if (ball.y >= colAmount - 1) {
			// bottom boundary
			ball.inverseYSpeed();
			asciiGrid.replaceCharAt2d(' ', ball.x, ball.y + 1);
		}
		// seperate for corners
		if (ball.x <= 1) {
			// left boundary
			ball.inverseXSpeed();
			asciiGrid.replaceCharAt2d(' ', ball.x - 1, ball.y);
		} else if (ball.x >= rowAmount - 2) {
			// right boundary
			ball.inverseXSpeed();
			asciiGrid.replaceCharAt2d(' ', ball.x + 1, ball.y);
		}
	}

	function throwBall() {
		if (!isCatched) {
			return;
		}
		switch (asciiGuy.getCurrentDirection()) {
			case asciiGuy.Direction.Up:
				ball.xSpeed = 0;
				ball.ySpeed = -1;
				break;
			case asciiGuy.Direction.Down:
				ball.xSpeed = 0;
				ball.ySpeed = 1;
				break;
			case asciiGuy.Direction.Left:
				ball.xSpeed = -1;
				ball.ySpeed = 0;
				break;
			case asciiGuy.Direction.Right:
				ball.xSpeed = 1;
				ball.ySpeed = 0;
				break;
		}
		onTick(); // need this to get out of bounds
		isCatched = false;
	}

	function checkForCatchedBall() {
		if (isCatched) {
			return;
		}
		const withinX = ball.x >= asciiGuy.origin.x - 1 && ball.x <= asciiGuy.p.rightUpperArm.x + 1;
		const withinY = ball.y <= asciiGuy.p.leftLeg.y + 1 && ball.y >= asciiGuy.origin.y - 1;

		if (withinX && withinY) {
			ball.resetSpeed();
			isCatched = true;
			// offset by 1 to get bigger border
			if (ball.y === asciiGuy.origin.y - 1) {
				paintGuyUp();
			} else if (ball.y === asciiGuy.p.leftLeg.y + 1) {
				paintGuyDown();
			} else if (ball.x === asciiGuy.p.leftLeg.x - 1) {
				paintGuyLeft();
			} else if (ball.x === asciiGuy.p.rightLeg.x + 1) {
				paintGuyRight();
			}
		}
	}

	function randomNum(min: number, max: number) {
		// min and max included
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	let ball = {
		x: 2,
		y: 2,
		xSpeed: 1,
		ySpeed: 1,
		resetSpeed() {
			this.xSpeed = 0;
			this.ySpeed = 0;
		},
		inverseXSpeed() {
			this.xSpeed = this.xSpeed * -1;
		},
		inverseYSpeed() {
			this.ySpeed = this.ySpeed * -1;
		}
	};

	return {
		onTick,
		startMoveRight,
		stopMoveRight,
		startMoveLeft,
		stopMoveLeft,
		startMoveDown,
		stopMoveDown,
		startMoveUp,
		stopMoveUp,
		getString,
		throwBall,
		getFrameSpeed
	};
}

export default AsciiGame;
