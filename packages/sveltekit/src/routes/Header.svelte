<script lang="ts">
	import IconButton from '@smui/icon-button';
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	import Github from '$lib/images/github-mark-white.svg';
	import Slack from '$lib/images/slack_icon_2019.svg';

	const handleNav = () => {
		navOpen = !navOpen;
	};

	function handleNavWithKey(e: KeyboardEvent) {
		if (e.code === 'KeyE') {
			navOpen = !navOpen;
		}
	}

	let navOpen: boolean = false;
	export let data: PageData;
</script>

<svelte:window on:keydown={handleNavWithKey} />

<header role="navigation">
	<a class="title" href="/">Skitsa</a>
	<div class="nav">
		<a class="urbanist-bold" href="/">HOME</a>
		<a class="urbanist-bold" href="/setup">SETUP</a>
		<a class="urbanist-bold" href="/protected">PROTECTED</a>
		{#if !data.authenticated}
			<a class="urbanist-bold" href="/auth/login">LOGIN</a>
		{:else}
			<form action="/auth/logout" method="POST" use:enhance>
				<IconButton size="mini" class="material-icons" style="color: var(--primary-color)">
					logout</IconButton
				>
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
	<div class="mobilemenu">
		<button class="container" class:change={navOpen} on:click={handleNav}>
			<div class="bar1"></div>
			<div class="bar2"></div>
			<div class="bar3"></div>
		</button>
	</div>
</header>

<div role="navigation" id="sidenav" class="sidenav" class:open={navOpen}>
	<a class="closebtn urbanist-bold" href="#a" on:click={handleNav}>&times;</a>
	<a class="urbanist-bold" href="/" on:click={handleNav}>HOME</a>
	<a class="urbanist-bold" href="/setup" on:click={handleNav}>SETUP</a>
	<a class="urbanist-bold" href="/protected" on:click={handleNav}>PROTECTED</a>
	{#if !data.authenticated}
		<a class="urbanist-bold" href="/auth/login" on:click={handleNav}>LOGIN</a>
	{:else}
		<form action="/auth/logout" method="POST" use:enhance>
			<a class="urbanist-bold" href="#"
				><button class="urbanist-bold" on:click={handleNav}>LOGOUT</button></a
			>
		</form>
	{/if}
	<footer role="doc-credits" class="urbanist-bold">
		<p>Developed by Michael Cuneo, 2024 | v1.0.0</p>
		<p class="row">
			<a href="https://github.com/michaelcuneo/sveltekit-auth" on:click={handleNav}
				><img src={Github} alt={Github} /></a
			>
			<a
				href="https://join.slack.com/t/michaelcuneo/shared_invite/zt-2ewl9vs81-QWUZBWzHqkGiaN4XpqLXjg"
				on:click={handleNav}><img src={Slack} alt={Slack} /></a
			>
		</p>
		<p class="row">
			<a class="foot" href="/licence" on:click={handleNav}>LICENCE</a>
			<a class="foot" href="/tos" on:click={handleNav}>TOS</a>
			<a class="foot" href="/privacy" on:click={handleNav}>PRIVACY</a>
			<a class="foot" href="/deletion" on:click={handleNav}>DATA DELETION</a>
		</p>
	</footer>
</div>

<style>
	header {
		display: flex;
		align-items: center;
		background: var(--surface-color);
		padding: 1rem;
		width: 100%;
		height: 60px;
	}
	a {
		color: var(--primary-color);
		padding: 0rem 0.5rem;
	}
	.nav {
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
	.sidenav {
		display: none;
	}
	.mobilemenu {
		display: none;
	}
	.bar1,
	.bar2,
	.bar3 {
		width: 35px;
		height: 5px;
		background-color: var(--primary-color);
		margin: 6px 0;
		transition: 0.4s;
	}
	.change .bar1 {
		-webkit-transform: rotate(-45deg) translate(-9px, 6px);
		transform: rotate(-45deg) translate(-9px, 6px);
	}
	.change .bar2 {
		opacity: 0;
	}
	.change .bar3 {
		-webkit-transform: rotate(45deg) translate(-8px, -8px);
		transform: rotate(45deg) translate(-8px, -8px);
	}
	footer {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: absolute;
		bottom: 0;
		width: 100%;
		font-size: 0.8rem;
		padding: 1rem;
	}
	.foot {
		font-size: 0.8rem;
	}
	.row {
		display: flex;
		flex-direction: row;
	}
	button {
		background: none;
		color: inherit;
		border: none;
		padding: 0;
		font: inherit;
		cursor: pointer;
		outline: inherit;
	}
	p {
		margin: 0.2rem;
	}
	@media screen and (max-width: 1200px) {
		.nav {
			display: none;
		}
		.sidenav {
			display: block;
		}
		.mobilemenu {
			display: block;
			position: fixed;
			top: 10px;
			right: 14px;
		}
		.sidenav {
			height: 100%;
			width: 0; /* 0 width - change this with JavaScript */
			position: fixed;
			z-index: 1;
			top: 0;
			left: 0;
			background-color: var(--surface-color);
			overflow-x: hidden; /* Disable horizontal scroll */
			padding-top: 60px;
			transition: 0.5s;
		}
		/* The navigation menu links */
		.sidenav a {
			padding: 8px 8px 8px 32px;
			text-decoration: none;
			font-size: 25px;
			color: var(--on-surface-color);
			display: block;
			transition: 0.3s;
		}

		.sidenav a.foot {
			padding: 8px 8px 8px 8px;
			font-size: 0.8rem;
		}

		/* When you mouse over the navigation links, change their color */
		.sidenav a:hover {
			color: var(--primary-color);
		}
		/* Position and style the close button (top right corner) */
		.sidenav .closebtn {
			position: absolute;
			top: 0;
			right: 25px;
			font-size: 36px;
			margin-left: 50px;
		}
		.foot {
			font-size: 0.8rem;
		}
		.open {
			width: 100%;
		}
	}
	@media screen and (max-width: 768px) {
		.nav {
			display: none;
		}
		.sidenav {
			display: block;
		}
		.foot {
			font-size: 0.8rem;
		}
		.mobilemenu {
			display: block;
		}
	}
	@media screen and (max-width: 480px) {
		.nav {
			display: none;
		}
		.sidenav {
			display: block;
		}
		.foot {
			font-size: 0.8rem;
		}
		.mobilemenu {
			display: block;
		}
	}
</style>
