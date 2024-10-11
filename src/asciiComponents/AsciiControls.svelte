<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function upClick() {
		console.log('up');
		dispatch('upClick', 'DATETETTEET');
	}
	function rightClick() {
		console.log('right');
	}
	function leftClick() {
		console.log('left');
	}
	function downClick() {
		console.log('down');
	}
	function centerClick() {
		console.log('center');
	}
</script>

<pre class="font">
  <span on:click={upClick}>&#9651;</span>
<span on:click={leftClick}>&#9665;</span> <span on:click={centerClick}>&#9675;</span> <span
		on:click={rightClick}>&#9655;</span
	>
  <span on:click={downClick}>&#9661;</span>
</pre>

<style>
	.font {
		background-color: #151515;
		color: #fff;
		/* font-family: monospace; */
		font-size: 40px;
	}
</style>
