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
		function loop(timestamp: number) {
			frameCount++;
			if (frameCount % asciiGame.getFrameSpeed() == 0) {
				asciiGame.onTick();
				string = asciiGame.getString();
			}
			window.requestAnimationFrame(loop);
		}
		var lastRender = 0;
		window.requestAnimationFrame(loop);

		let isLeftPressed = false;
		let isRightPressed = false;
		let isUpPressed = false;
		let isDownPressed = false;

		document.addEventListener('keydown', (event) => {
			switch (event.key) {
				case 'ArrowLeft':
					if (!isLeftPressed) {
						isLeftPressed = true;
						asciiGame.startMoveLeft();
					}
					break;
				case 'ArrowRight':
					if (!isRightPressed) {
						isRightPressed = true;
						asciiGame.startMoveRight();
					}
					break;
				case 'ArrowDown':
					if (!isDownPressed) {
						isDownPressed = true;
						asciiGame.startMoveDown();
					}
					break;
				case 'ArrowUp':
					if (!isUpPressed) {
						isUpPressed = true;
						asciiGame.startMoveUp();
					}
					break;
				case ' ':
					asciiGame.throwBall();

					break;
			}
		});

		document.addEventListener('keyup', (event) => {
			switch (event.key) {
				case 'ArrowLeft':
					isLeftPressed = false;
					asciiGame.stopMoveLeft();
					break;
				case 'ArrowRight':
					isRightPressed = false;
					asciiGame.stopMoveRight();
					break;
				case 'ArrowDown':
					isDownPressed = false;
					asciiGame.stopMoveDown();
					break;
				case 'ArrowUp':
					isUpPressed = false;
					asciiGame.stopMoveUp();
					break;
			}
		});
	});
</script>

<main>
	<pre>{string}</pre>
</main>

<style>
	:global(body) {
		background-color: #151515;
		color: #fff;
		font-family: monospace;
		font-size: 22px;
		/* white-space: pre-wrap; */
	}
	pre {
		display: flex;
		justify-content: center;
	}
</style>
