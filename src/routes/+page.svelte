<script lang="ts">
	import AsciiDriver from '../asciiComponents/AsciiDriver.svelte';
</script>

<main>
	<AsciiDriver rowAmount={24} colAmount={22}></AsciiDriver>
</main>

<style>
	:global(body) {
		background-color: #151515;
		color: #fff;
		font-family: monospace;
		font-size: 22px;
		/* white-space: pre-wrap; */
	}
</style>
