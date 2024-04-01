<script lang="ts">
	import { fade } from 'svelte/transition';
	import Button from '@smui/button';
	import Textfield from '@smui/textfield';
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let dirty: boolean;
	let invalid: boolean;
	let focused: boolean;
	let value: string = '';

	$: disabled = focused || !value || !dirty || invalid;

	/** @type {import('./$types').ActionData} */
	export let form: ActionData;
</script>

{#if !form?.success}
	<div transition:fade={{ delay: 0, duration: 300 }} class="wrapper">
		<form class="form" method="POST" use:enhance>
			<h4>LOGIN WITH EMAIL</h4>
			<p>
				<Textfield
					type="email"
					bind:dirty
					bind:invalid
					updateInvalid
					bind:value
					variant="filled"
					label="email"
					input$name="email"
					input$autocomplete="email"
					on:focus={() => (focused = true)}
					on:blur={() => (focused = false)}
					withTrailingIcon={!disabled}
				/>
			</p>
			<p>
				<Button variant="raised">Log in</Button>
			</p>
		</form>
	</div>
{:else}
	{form.error}
	<div transition:fade={{ delay: 0, duration: 300 }} class="wrapper">
		An email has been sent to {value}, click on the link in the email to sign in.
	</div>
{/if}

<style>
	.wrapper {
		display: flex;
		width: 100vw;
		height: 100dvh;
		align-items: center;
		justify-content: center;
	}
	.form {
		display: flex;
		flex-direction: column;
		width: 300px;
		background: #242424;
		padding: 1rem;
		border-radius: 10px;
	}
	p {
		display: flex;
		flex-direction: column;
		width: 100%;
	}
	h4 {
		line-height: 0.4rem;
	}
</style>
