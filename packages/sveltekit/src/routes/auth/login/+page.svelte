<script lang="ts">
	import Button from '@smui/button';
	import Textfield from '@smui/textfield';
	import CircularProgress from '@smui/circular-progress';

	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import { PUBLIC_API_URL } from '$env/static/public';
	import GoogleButton from './GoogleButton.svelte';
	import FBLogin from '$lib/login_with_fb.png';

	let dirty: boolean;
	let invalid: boolean;
	let focused: boolean;
	let value: string = '';

	$: disabled = focused || !value || !dirty || invalid;

	/** @type {import('./$types').ActionData} */
	export let form: ActionData;
</script>

<CircularProgress style="height: 32px; width: 32px;" indeterminate />
{#if !form?.success}
	<div class="wrapper">
		<a class="form" href={PUBLIC_API_URL + `/auth/facebook/authorize`}>
			<img src={FBLogin} alt="Login with Facebook" />
		</a>
		<a class="form" href={PUBLIC_API_URL + `/auth/google/authorize`}>
			<GoogleButton />
		</a>
		<form
			on:submit={() => (logging = true)}
			class="form"
			method="POST"
			action="?/magicLinks"
			use:enhance
		>
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
{:else if form?.success}
	<div class="wrapper">
		An email has been sent to {value}, click on the link in the email to sign in.
	</div>
{/if}

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
		padding: 0.8rem;
		margin: 0.8rem;
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
