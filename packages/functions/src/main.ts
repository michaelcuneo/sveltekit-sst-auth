import { ApiHandler } from 'sst/node/api';

// Root test handler to ensure response is working.
export const handler = ApiHandler(async (evt) => {
	try {
		return {
			statusCode: 200,
			body: evt.requestContext.time
		};
	} catch (err) {
		return {
			statusCode: 500,
			body: `Internal Server Error: ${err}`
		};
	}
});
