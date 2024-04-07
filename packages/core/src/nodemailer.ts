import nodemailer from 'nodemailer';

import { Config } from 'sst/node/config';

export const sendLoginLink = async (email: string, authUrl: string) => {
	const transporter = nodemailer.createTransport({
		service: Config.EMAIL_SERVICE,
		host: Config.EMAIL_HOST,
		port: Number(Config.EMAIL_PORT),
		secure: true,
		auth: {
			user: Config.EMAIL_USER,
			pass: Config.EMAIL_APP_PASS
		}
	});

	const message = {
		from: Config.EMAIL_USER,
		to: email,
		subject: `Login link for ${Config.PROJECT_NAME}`,
		html: `
			<p>Click on the link to log in.</p>
			<a href="${authUrl}">Login</a>
		`
	};

	return transporter.sendMail(message).catch((error) => error);
};
