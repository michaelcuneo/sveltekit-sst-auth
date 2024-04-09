<div class="wrapper">
	<h2>What is <span class="lobster">Skitsa</span> ?</h2>
	<h4>(SvelteKit SST Auth)</h4>
	<p>
		This project is intended to be a simple yet fully fledged operational demonstration and
		boilerplate for SvelteKit with Authentication through Google, Facebook, GitHub, or Magic Links,
		using SST, hosted on AWS, as a Lambda application. Simple right?
	</p>
	<h3>How to test the functionality of this project?</h3>
	<p>
		Simply use the
		<a href="/auth/login"><code class="blue">LOGIN</code></a>
		link to gain access to the
		<a href="/protected"><code class="blue">PROTECTED</code></a>
		routes.
	</p>
	<h3>How do I set this up locally on my own machine, with my own federated identities?</h3>
	<p>See the setup page here... <a href="/setup"><code class="blue">SETUP</code></a></p>
	<h3>Current Features</h3>
	<ul>
		<li>Authentication with Google, Facebook, GitHub, and Magic Links.</li>
		<li>Default Licence, Terms of Service, Privacy and Data Deletion policies.</li>
		<li>Dark Mode / Light Mode</li>
	</ul>
	<h3>Future Features</h3>
	<ul>
		<li>Automatic Data Deletion with a simple DELETE ACCOUNT button.</li>
		<li>A better protected route with demonstration of authenticated API calls.</li>
		<li>
			Command-Line scripted on-boarding & bootstrap, so that you don't have to cut out each auth
			method that you don't need.
		</li>
		<li>
			Dark/Light switch <i>Low Priority, it is getting a bit outdated?</i>
		</li>
		<li>
			i18n <i>Low Priority, better methods?</i>
		</li>
	</ul>
	<h3>TODO:</h3>
	<ul>
		<li>Fix the bad theme</li>
		<li>Better setup instructions, including all of the FB/Google/GitHub App Config</li>
		<li>Use accordion for the Setup Page Steps</li>
		<li>Hire a personal assistant</li>
		<li>Make a flipload more Coffee</li>
	</ul>
	<h3>Why did I make this really time consuming boilerplate?</h3>
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
		I may switch this UX to melt UI in the future, but I don't think the UI/UX choice is a huge decisions
		that I should be making because it is agnostic to SST and it's functionality which is the main reason
		of this boilerplate. The only thing I have against 'melt' is like other UX libraries, it's obsession
		to Tailwind.
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
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		max-width: 65rem;
		padding: 3rem 0 3rem 0;
	}
	.blue {
		color: #4c9bd2;
	}
	.orange {
		color: #c2947b;
	}
	.lobster {
		font-family: 'Lobster', sans-serif;
		font-weight: 400;
		font-style: normal;
		font-size: 2rem;
	}
	a {
		color: var(--primary-color);
	}
	@media screen and (max-width: 1200px) {
		.wrapper {
			max-width: 85rem;
			padding: 3rem 3rem 3rem 3rem;
		}
	}
	@media screen and (max-width: 768px) {
		.wrapper {
			max-width: 95rem;
			padding: 3rem 2rem 3rem 2rem;
		}
	}
	@media screen and (max-width: 480px) {
		.wrapper {
			max-width: 98rem;
			padding: 3rem 1rem 3rem 1rem;
		}
	}
</style>
