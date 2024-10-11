<script lang="ts">
	import AsciiGame from './AsciiGame';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	export let rowAmount;
	export let colAmount;

	let asciiGame = AsciiGame(rowAmount, colAmount, asciiGuyUpdateCallback);

	function asciiGuyUpdateCallback() {
		string = asciiGame.getString();
	}

	$: string = asciiGame.getString();

	onMount(() => {
		let frameCount = 0;
		function loop() {
			frameCount++;
			if (frameCount % asciiGame.getFrameSpeed() == 0) {
				asciiGame.onTick();
				string = asciiGame.getString();
			}
			window.requestAnimationFrame(loop);
		}
		window.requestAnimationFrame(loop);

		let startX = 0;
		let startY = 0;
		let dragLocked = false;

		document.addEventListener('touchstart', (e) => {
			startX = e.touches[0].clientX;
			startY = e.touches[0].clientY;
			dragLocked = false;
		});

		document.addEventListener('touchmove', (e) => {
			let dragX = e.changedTouches[0].clientX;
			let dragY = e.changedTouches[0].clientY;
			const diffX = dragX - startX;
			const diffY = dragY - startY;
			// if (dragLocked) {
			// 	return;
			// }
			// console.log('diffX: ' + diffX + ' diffY: ' + diffY);

			if (Math.abs(diffX) > Math.abs(diffY)) {
				if (diffX > 30) {
					// Swipe right
					console.log('RIGHT');
					dragLocked = true;
					stopDown();
					stopUp();
					stopLeft();

					startRight();
				} else if (diffX < -30) {
					// Swipe left
					console.log('LEFt');

					dragLocked = true;
					stopDown();
					stopUp();
					stopRight();

					startLeft();
				}
			} else {
				if (diffY > 30) {
					// Swipe down
					console.log('DOWN');

					dragLocked = true;
					stopUp();
					stopLeft();
					stopRight();

					startDown();
				} else if (diffY < -30) {
					// Swipe up
					console.log('UP');

					dragLocked = true;
					stopDown();
					stopLeft();
					stopRight();

					startUp();
				}
			}
		});

		document.addEventListener('touchend', (e) => {
			dragLocked = false;
			const diffX = startX - e.changedTouches[0].clientX;
			const diffY = startY - e.changedTouches[0].clientY;
			if (Math.abs(diffX) + Math.abs(diffY) <= 12) {
				asciiGame.throwBall();
			}
			stopDown();
			stopUp();
			stopLeft();
			stopRight();
		});

		document.addEventListener('keydown', (event) => {
			switch (event.key) {
				case 'ArrowLeft':
					startLeft();
					break;
				case 'ArrowRight':
					startRight();
					break;
				case 'ArrowDown':
					startDown();
					break;
				case 'ArrowUp':
					startUp();
					break;
				case ' ':
					asciiGame.throwBall();
					break;
			}
		});

		document.addEventListener('keyup', (event) => {
			switch (event.key) {
				case 'ArrowLeft':
					stopLeft();
					break;
				case 'ArrowRight':
					stopRight();
					break;
				case 'ArrowDown':
					stopDown();
					break;
				case 'ArrowUp':
					stopUp();
					break;
			}
		});
	});

	let isLeftPressed = false;
	let isRightPressed = false;
	let isUpPressed = false;
	let isDownPressed = false;
	function startUp() {
		if (!isUpPressed) {
			isUpPressed = true;
			asciiGame.startMoveUp();
		}
	}
	function startDown() {
		if (!isDownPressed) {
			isDownPressed = true;
			asciiGame.startMoveDown();
		}
	}
	function startLeft() {
		if (!isLeftPressed) {
			isLeftPressed = true;
			asciiGame.startMoveLeft();
		}
	}
	function startRight() {
		if (!isRightPressed) {
			isRightPressed = true;
			asciiGame.startMoveRight();
		}
	}
	function stopUp() {
		isUpPressed = false;
		asciiGame.stopMoveUp();
	}
	function stopDown() {
		isDownPressed = false;
		asciiGame.stopMoveDown();
	}
	function stopLeft() {
		isLeftPressed = false;
		asciiGame.stopMoveLeft();
	}
	function stopRight() {
		isRightPressed = false;
		asciiGame.stopMoveRight();
	}
</script>

<main>
	<pre class="unselectable">{string}</pre>
</main>

<style>
	:global(body) {
		background-color: #151515;
		color: #fff;
		font-family: monospace !important;
		font-size: 20pt;
		/* white-space: pre-wrap; */
	}
	:global(htmml),
	:global(body) {
		touch-action: none;
	}
	.unselectable {
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
	pre {
		display: flex;
		justify-content: center;
	}
</style>
