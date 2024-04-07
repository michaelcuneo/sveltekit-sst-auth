<script>
	import { page } from '$app/stores';
</script>

<div class="wrapper">
	<h1>{$page.status}: {$page.error?.message}</h1>
</div>

<style>
	.wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
