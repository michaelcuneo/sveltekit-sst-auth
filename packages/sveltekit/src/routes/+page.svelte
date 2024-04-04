<div>
	<h2>Welcome to sveltekit-sst-auth</h2>
	<p>
		This project is intended to be a simple yet fully fledged operational demonstration and
		boilerplate for SvelteKit with Authentication through Google, Facebook, or Magic Links, using
		SST, hosted on AWS, as a Lambda application.
	</p>
	<p></p>
	<h2>Why did I make this really time consuming boilerplate?</h2>
	<p>
		I wanted to have a boilerplate for my own projects; which are many, yet also keep it future
		proofed so that I can just drop in any of my own monorepo components to serve my own needs, but
		also demonstrate how easy it is to implement this in a project using SST if anyone wants to
		utilise this code.
		<br /><br />
		This boilerplate uses <a href="https://sveltematerialui.com/">Svelte Material UI</a> for the UX
		library because I like it and it's what I use in almost all my projects, it utilises Dark Mode /
		Light Mode, and there's no bloaty messy Tailwind all over the markup. This is just my personal
		preference, feel free to strip it apart and add whatever styling you like.
		<br /><br />
		Rather than using a sign up flow, bringing you back to a log in flow, the entire AUTH functionality
		is done from the Login page. If the user upon login does not exist in the database, it will be added
		to the database. If the user has already made an account with either Google or Facebook or Email
		with the same email as another account, this account will be the account which is logged in, allowing
		the same email to share an account across Facebook, Google, Email, or any other future Federated
		Identities added to this example.
	</p>
	<div class="code">
		<p>
			<i
				>I am so far unsure whether to define if a user is logged in as a federated identity or not
				because I mean... for most of my examples and for most of the use cases where I need
				authentication, I don't really care where the email came from, as long as I have one, and
				it's secure and it has a session... so I probably won't bother keeping any logs of the
				claims in the database when there's no need. The database simply stores an <code
					class="orange">id</code
				>, and an <code class="orange">email</code>.</i
			>
		</p>
	</div>
	<p>
		Use the
		<a href="/auth/login"><code class="blue">LOGIN</code></a>
		link to gain access to the
		<a href="/protected"><code class="blue">PROTECTED</code></a>
		routes.
	</p>
	<div class="code">
		<p>
			<i>
				All Terms of Service, Privacy and Data Deletion policies are included to use this
				boilerplate straight up in any project, just rename any settings that are relevant to
				SvelteKit SST Auth, and you're good to go.
			</i>
		</p>
	</div>
	<p>
		In a future version I will add Authenticated API calls to the protected routes to demonstrate
		authenticated API calls.
	</p>
	<h2>How to use this example in your own projects?</h2>
	<p>
		Clone the code of course... then follow the steps below to make your own configuration to suit,
		Magic Links, Facebook, Google, or whatever other federated identity you want to use.
	</p>
	<p>
		1. Run <code class="blue">npx sst secrets set [environment-variable] ["value"]</code> to add all
		the following variables to the application for each respective service you want to auth with.
	</p>
	<ul>
		<li>
			<i
				>- i.e. If you want to run MagicLinks auth, add email secrets for the NODEMAILER CONFIG If
				you want to run Federated Identities, add secrets for the GOOGLE, and/or META CONFIG.</i
			>
		</li>
	</ul>
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
			<li><i># NODE_MAILER CONFIG FOR MAGIC LINKS</i></li>
			<li class="blue"><code>EMAIL_SERVICE=<span class="orange">{`<Gmail>`}</span></code></li>
			<li class="blue"><code>EMAIL_HOST=<span class="orange">{`<smtp.gmail.com>`}</span></code></li>
			<li class="blue"><code>EMAIL_PORT=<span class="orange">{`<465>`}</span></code></li>
			<li class="blue"><code>EMAIL_USER=<span class="orange">{`<user@gmail.com>`}</span></code></li>
			<li class="blue">
				<code>EMAIL_APP_PASS=<span class="orange">{`<abcd efgh ijkl mnop>`}</span></code>
			</li>
			<li><i># GOOGLE CONFIG FOR GOOGLE FEDERATED IDENTITY</i></li>
			<li class="blue">
				<code
					>GOOGLE_CLIENT_ID=<span class="orange"
						>{`<#####-#######.apps.googleusercontent.com>`}</span
					></code
				>
			</li>
			<li><i># META CONFIG FOR META FEDERATED IDENTITY</i></li>
			<li class="blue">
				<code>FACEBOOK_APP_ID=<span class="orange">{`<123456789101212131>`}</span></code>
			</li>
			<li class="blue">
				<code>FACEBOOK_SECRET=<span class="orange">{`<abcd efgh ijkl mnop>`}</span> </code>
			</li>
		</ul>
	</div>
	<p>2. Modify the <code class="blue">sst.config.ts</code> file to suit your own purposes.</p>
	<p>
		The things you might want to change here are the region, the project name, the stages, etc. I
		will eventually make this documentation a lot better and longer, but for now, this is it.
	</p>
	<p>
		3. Profit - Speaking of profit, if you really really like what I've done here and it has helped
		you in some way towards making a better authentication service for your projects,feel free to
		donate to my beer or coffee allowance, here's my <a href="http://paypal.link/michaelcuneo75"
			>Paypal.</a
		>
	</p>
	<p>
		Get the code from <a class="blue" href="https://github.com/michaelcuneo/sveltekit-magiclinks"
			>GitHub</a
		>, Join my
		<a
			class="blue"
			href="https://join.slack.com/t/michaelcuneo/shared_invite/zt-2ewl9vs81-QWUZBWzHqkGiaN4XpqLXjg"
			>#Slack</a
		> for questions.
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
	ul {
		list-style: none;
		margin-left: 0px;
		padding-left: 0px;
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
		min-height: auto;
		height: auto;
		max-width: auto;
		background: #242424;
		padding: 0rem 2rem 0rem 2rem;
		border-radius: 10px;
	}
</style>
