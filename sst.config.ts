import { SSTConfig } from 'sst';
import { SvelteKitSSTAuth } from './stacks/SSSTAuthStack';

export default {
	config() {
		return {
			name: 'sveltekit-sst-auth',
			region: 'ap-southeast-2'
		};
	},
	stacks(app) {
		app.stack(SvelteKitSSTAuth);
	}
} satisfies SSTConfig;
