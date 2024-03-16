<script>
	import { page } from '$app/stores';
</script>

<div class="wrapper">
	<h1>{$page.status}: {$page.error?.message}</h1>
</div>

<style>
	.wrapper {
		display: flex;
		width: 100vw;
		height: 100dvh;
		align-items: center;
		justify-content: center;
	}
</style>
