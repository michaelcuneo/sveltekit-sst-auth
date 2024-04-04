<script lang="ts">
	import Footer from './Footer.svelte';
	import Header from './Header.svelte';
	import type { PageData } from './$types';

	import 'sanitize.css';
	import './style.css';

	export let data: PageData;
</script>

<div class="wrapper">
	<Header {data} />
	<slot />
	<Footer />
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		min-height: 100dvh;
	}
</style>
