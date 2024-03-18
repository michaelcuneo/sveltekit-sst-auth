<script lang="ts">
	import IconButton from '@smui/icon-button';
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	import Github from '$lib/github-mark-white.svg';
	import Slack from '$lib/slack_icon_2019.svg';

	export let data: PageData;
</script>

<header>
	<a class="title" href="/">SvelteKit SST Auth</a>
	<div>
		<a class="urbanist-bold" href="/protected">PROTECTED</a>
		{#if !data.authenticated}
			<a class="urbanist-bold" href="/auth/signup">SIGN UP</a>
			<a class="urbanist-bold" href="/auth/login">LOGIN</a>
		{:else}
			<form action="/auth/logout" method="POST" use:enhance>
				<IconButton size="mini" class="material-icons">logout</IconButton>
			</form>
		{/if}
		<a class="urbanist-bold" href="https://github.com/michaelcuneo/sveltekit-auth"
			><img src={Github} alt={Github} /></a
		>
		<a
			class="urbanist-bold"
			href="https://join.slack.com/t/michaelcuneo/shared_invite/zt-2ewl9vs81-QWUZBWzHqkGiaN4XpqLXjg"
			><img src={Slack} alt={Slack} /></a
		>
	</div>
</header>

<style>
	header {
		display: flex;
		align-items: center;
		background: #fb5e5e;
		padding: 1rem;
		height: 60px;
	}
	a {
		padding: 0rem 0.5rem;
	}
	div {
		display: flex;
		align-items: center;
		margin-left: auto;
	}
	.title {
		font-family: 'Lobster', sans-serif;
		font-weight: 400;
		font-style: normal;
		font-size: 1.2rem;
	}
	img {
		height: 30px;
	}
</style>
