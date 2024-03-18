<script lang="ts">
	import Button from '@smui/button';
	import Textfield from '@smui/textfield';
	import { enhance } from '$app/forms';

	let dirty: boolean;
	let invalid: boolean;
	let focused: boolean;
	let value: string = '';

	$: disabled = focused || !value || !dirty || invalid;

	export let form;
</script>

<div class="wrapper">
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
			<Button variant="raised">Log in</Button>
		</p>
	</form>
	{#if form?.error}
		<div class="error">{form?.error?.message}</div>
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
