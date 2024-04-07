import { SSTConfig } from 'sst';
import { SSTAuthStack } from './stacks/SSTAuthStack';

export default {
	config() {
		return {
			name: 'sveltekit-sst-auth',
			region: 'ap-southeast-2'
		};
	},
	stacks(app) {
		app.stack(SSTAuthStack);
	}
} satisfies SSTConfig;
