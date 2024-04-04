<script lang="ts">
	import Codeblock from '$lib/components/Codeblock.svelte';
	import Paypal from '$lib/images/ppcom.svg';
</script>

<div>
	<h2>How to use this example in your own projects?</h2>
	<h3>1. Clone the code.</h3>
	<Codeblock snippet="setup.sh" />
	<h3>
		2. Run the following for each variable that you want to use based on what login type you want
		activated.
	</h3>
	<Codeblock snippet="secrets.sh" />
	<p>
		If you want to run MagicLinks auth, add email secrets for the NODE_MAILER CONFIG If you want to
		run Federated Identities, add secrets for the GOOGLE, and/or META CONFIG.
	</p>
	<h3>Example</h3>
	<p>
		<i>for the default stage you're in</i>
		<Codeblock snippet="secretExample.sh" />
		<i>or, for staged environment variables.</i>
		<Codeblock snippet="secretExampleStaged.sh" />
	</p>
	<h3>List of all secrets</h3>
	<Codeblock snippet="config.sh" />
	<h3>
		List of all parameters - these are not secret, they are hard coded in <span class="blue"
			>stacks/SSTAuthStack.ts</span
		>
	</h3>
	<Codeblock snippet="parameters.sh" />
	<p>
		2. Modify <code class="blue">sst.config.ts</code> and
		<code class="blue">stacks/SSTAuthStack.ts</code> to suit your own purposes.
	</p>
	<p>
		The things you might want to change here are the region, the project name, the stages, edge, etc
	</p>
	<p>
		3. Profit - Speaking of profit, if you really really like what I've done here and it has helped
		you in some way towards making a better authentication service for your projects, feel free to
		donate to my beer or coffee allowance, here's my <a
			class="orange"
			href="http://paypal.link/michaelcuneo75"><img height="18" src={Paypal} alt="paypal" /></a
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
	.blue {
		color: #4c9bd2;
	}
	.orange {
		color: #c2947b;
	}
</style>
