<script lang="ts">
	import { fade } from 'svelte/transition';
	import Button from '@smui/button';
	import Textfield from '@smui/textfield';
	import { enhance } from '$app/forms';

	export let form;

	let dirty: boolean;
	let invalid: boolean;
	let focused: boolean;
	let value: string = '';

	$: disabled = focused || !value || !dirty || invalid;
</script>

<div class="wrapper">
	{#if !form?.success}
		<form class="form" method="POST" use:enhance>
			<h4>SIGN UP WITH EMAIL</h4>
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
				<Button variant="raised">SIGN UP</Button>
			</p>
		</form>
		{#if form?.error}
			<div class="error">{form?.error?.message}</div>
		{/if}
	{:else if form?.success}
		<div transition:fade={{ delay: 0, duration: 300 }} class="wrapper">
			An email has been sent with a validation link to verify your email address.
		</div>
	{/if}
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
	.form {
		display: flex;
		flex-direction: column;
		width: 300px;
		background: #242424;
		padding: 1rem;
		border-radius: 10px;
	}
	.error {
		color: red;
		font-style: italic;
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
