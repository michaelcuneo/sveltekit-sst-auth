<div>
	<h2>What is sveltekit-sst-auth?</h2>
	<p>
		This project is intended to be a simple yet fully fledged operational demonstration and
		boilerplate for SvelteKit with Authentication through Google, Facebook, or Magic Links, using
		SST, hosted on AWS, as a Lambda application.
	</p>
	<h2>How to test the functionality of this project?</h2>
	<p>
		Simply use the
		<a href="/auth/login"><code class="blue">LOGIN</code></a>
		link to gain access to the
		<a href="/protected"><code class="blue">PROTECTED</code></a>
		routes.
	</p>
	<h2>Why did I make this really time consuming boilerplate?</h2>
	<p>
		I wanted to have a boilerplate for my own projects; which are many, yet also keep it future
		proofed so that I can just drop in any of my own monorepo components to serve my own needs,
		while also demonstrating how easy it is to implement this in a project using SST if anyone wants
		to utilise this code.
		<br /><br />
		This boilerplate uses <a href="https://sveltematerialui.com/">Svelte Material UI</a> for the UX
		library because I like it and it's what I use in almost all my projects, it utilises Dark Mode /
		Light Mode, and there's no bloaty messy Tailwind all over the markup. This is just my personal
		preference, feel free to strip it apart and add whatever styling library you like, but if you do
		like SMUI then you're ready to go with a simple git clone and a few minutes of setup.
		<br /><br />
		Rather than using a sign up flow, bringing you back to a log in flow, the entire AUTH functionality
		is done from the Login page. If the user upon login does not exist in the database, it will be added
		to the database. If the user has already made an account with either Google or Facebook or Email
		with the same email as another account, this account will be the account which is logged in, allowing
		the same email to share an account across Facebook, Google, Email, or any other future Federated
		Identities added to this project.
	</p>
	<p>
		<i
			>I am so far unsure whether to define if a user is logged in as a federated identity or not
			because for most of my examples and for most of the use cases where I need authentication, I
			don't really care where the email came from, as long as I have one, and it has a session... so
			I probably won't bother keeping any logs of the claims in the database when there's no need.
			If you really do need to know where the user is coming from, I would be substituting the
			userId generation in the FederatedIdentities, with the results from the Authentication's Sub.
			The database simply stores an <code class="orange">id</code>, and an
			<code class="orange">email</code>.</i
		>
		In the future I will be adding authenticated calls to the API from the protected endpoint to demonstrate
		this functionality, but for now it's just a login. ETA for auth calls is
		<code class="orange">8 days.</code>
	</p>
	<p>
		All Terms of Service, Privacy and Data Deletion policies are included so that anyone either
		testing this app 'can remove their data from the test facilities', or use this straight out of
		the box to ramp up anything that uses authentication quite fast, just change the variables of
		the relevant areas to suit your business or project and it's good to go.
	</p>
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		min-height: 100dvh;
		max-width: 65rem;
		padding: 3rem 0 3rem 0;
	}
	.blue {
		color: #4c9bd2;
	}
	.orange {
		color: #c2947b;
	}
</style>
