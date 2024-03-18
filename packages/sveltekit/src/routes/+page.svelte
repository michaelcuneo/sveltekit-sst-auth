<script lang="ts">
	// Uncomment and run this to console log a key to place into .env as JWT_SECRET=""
	/*
	crypto.subtle
		.generateKey(
			{
				name: 'HMAC',
				hash: { name: 'SHA-256' }
			},
			true,
			['sign', 'verify']
		)
		.then((key) => {
			crypto.subtle.exportKey('jwk', key).then((exported) => {
				console.log(exported.k);
			});
		});
	*/
</script>

<div>
	<h2>Welcome to sveltekit-sst-auth</h2>
	<p>
		This project is intended to be a simple yet fully fledged operational demonstration of SvelteKit
		Authentication with Google, Facebook, using SST, hosted on AWS, as a Lambda application.
	</p>
	<p>To get this working with your own services you will have to perform the following steps.</p>
	<p>
		1. Run <code class="blue">npx sst secrets set [environment-variable] ["value"]</code> to add all
		the following variables to the application. Replace the values with your email provider information.
	</p>
	<p>
		<span class="italic"
			>Example: <code class="blue">npx sst secrets set EMAIL_SERVICE Gmail</code></span
		>
		<br />
		<span class="italic"
			>or: <code class="blue">npx sst secrets --stage production set EMAIL_SERVICE "Gmail"</code
			></span
		> for staged environment variables.
	</p>
	<div class="code">
		<ul>
			<li class="blue">
				<code>
					JWT_SECRET=<span class="orange"
						>"To generate this, uncomment the crypto key generator inside +page.svelte to
						console.log a key"</span
					>
				</code>
			</li>
			<li class="blue"><code>EMAIL_SERVICE=<span class="orange">"Gmail"</span></code></li>
			<li class="blue"><code>EMAIL_HOST=<span class="orange">"smtp.gmail.com"</span></code></li>
			<li class="blue"><code>EMAIL_PORT=<span class="orange">"465"</span></code></li>
			<li class="blue"><code>EMAIL_USER=<span class="orange">"user@gmail.com"</span></code></li>
			<li class="blue"><code>EMAIL_APP_PASS=<span class="orange">"app password"</span></code></li>
		</ul>
	</div>
	<p>2. Modify the <code class="blue">sst.config.ts</code> file to suit your own purposes.</p>
	<p>3. Profit</p>
	<p>
		To use this example, simply use the <a href="/auth/signup"><code class="blue">SIGN UP</code></a>
		link to add yourself to the database as a user. Then use the
		<a href="/auth/login"><code class="blue">LOGIN</code></a>
		link to gain access to the
		<a href="/protected"><code class="blue">PROTECTED</code></a> routes.
	</p>
	<p>
		Get the code from <a href="https://github.com/michaelcuneo/sveltekit-magiclinks">GitHub</a>,
		Join my
		<a
			href="https://join.slack.com/t/michaelcuneo/shared_invite/zt-2ewl9vs81-QWUZBWzHqkGiaN4XpqLXjg"
			>#Slack</a
		> for questions.
	</p>
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		height: 100dvh;
		padding: 1rem;
	}
	ul {
		list-style: none;
		margin-left: 0px;
		padding-left: 00px;
	}
	.blue {
		color: #4c9bd2;
	}
	.orange {
		color: #c2947b;
	}
	.italic {
		font-style: italic;
	}
	.code {
		height: auto;
		max-width: auto;
		background: #242424;
		border-radius: 10px;
	}
</style>
