<script lang="ts">
	import { page } from '$app/stores';
	export let snippet = '';
	const code = $page.data.codes?.[snippet];
</script>

{#if code}
	<div>{@html code}</div>
{:else}
	<div><strong>Invalid code snippet: {snippet}</strong></div>
{/if}

<style>
	div :global(pre) {
		display: flex;
		font-size: 1rem;
		padding: 1.25rem;
		width: 100%;
		max-width: 95vw;
		border-radius: 0.5rem;
		margin-block: 1rem;
		overflow: auto;
	}
</style>
