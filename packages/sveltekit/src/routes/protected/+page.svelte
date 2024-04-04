<script lang="ts">
	import { onMount } from 'svelte';

	const dummyUsers = [
		{
			id: '1',
			email: 'YjWQI@example.com'
		}
	];

	const currentUsers = dummyUsers;
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
		min-height: 100dvh;
		max-width: 65rem;
		padding: 3rem 0 3rem 0;
	}
	h4 {
		line-height: 0.4rem;
	}
</style>
