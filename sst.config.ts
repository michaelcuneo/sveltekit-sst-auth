import { SSTConfig } from 'sst';
import { SvelteKitSSTAuth } from './stacks/SSTAuthStack';

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
