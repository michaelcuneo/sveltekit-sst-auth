<script lang="ts">
	import { USERS } from '$lib/constants';
	import { onMount } from 'svelte';

	const currentUsers = USERS;
	let userFound: User | undefined;

	onMount(() => {
		userFound = currentUsers.find((user) => {
			return user.id === data.id;
		});
	});

	export let data;
</script>

<div class="wrapper">
	<h4>THIS IS A PROTECTED LINK</h4>
	<p>You are logged in as {userFound?.email}</p>
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		width: 100vw;
		height: 100dvh;
		align-items: center;
		justify-content: center;
	}
	h4 {
		line-height: 0.4rem;
	}
</style>
