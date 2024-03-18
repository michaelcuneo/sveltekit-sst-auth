import nodemailer from 'nodemailer';

export const mailer = async (data: Mailer) => {
	const Transporter = nodemailer.createTransport({
		service: data.service,
		host: data.host,
		port: data.port,
		secure: true,
		auth: {
			user: data.username,
			pass: data.password
		}
	});

	const urlExternal = `https://fhnky418g9.execute-api.ap-southeast-2.amazonaws.com/auth/magicLink/authorize?token=${data.token}`;

	const text = `
    <p>Click on this link and we will promptly log you in to Sveltekit-Magiclinks.</p>
    <a href=${urlExternal}>LOGIN</a>`;

	const mailOptions = {
		from: 'me@michaelcuneo.com.au',
		to: data.email,
		subject: 'Hello, here is your Login Link for Sveltekit-Magiclinks',
		html: text
	};

	return Transporter.sendMail(mailOptions)
		.then((res) => res)
		.catch((err) => err);
};
