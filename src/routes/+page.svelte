<script lang="ts">
	import AsciiDriver from '../asciiComponents/AsciiDriver.svelte';
</script>

<main>
	<AsciiDriver rowAmount={40} colAmount={20}></AsciiDriver>
</main>

<style>
	:global(body) {
		background-color: #151515;
		color: #fff;
		font-family: monospace;
		font-size: 30pt;
		/* white-space: pre-wrap; */
	}
</style>
