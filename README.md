Welcome to SvelteKit-SST-Auth
===============================

This project is intended to be a simple yet fully fledged operational demonstration of SvelteKit Magic Links using SST, hosted on AWS, as a Lambda application.

To get this working with your own services you have to perform the following steps.

### 1. Create an .env file and change the variables to suit your email provider.
To generate the JWT_SECRET, uncomment the crypto key generator inside +page.svelte to console.log a key.
```
JWT_SECRET="############################"
EMAIL_SERVICE="Gmail"
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="465"
EMAIL_USER="user@gmail.com"
EMAIL_APP_PASS="password"
```

### 2. Modify the sst.config.ts file to suit your own purposes.

Use the SIGN UP link to add your email to the database. Use the LOGIN link to gain access to the PROTECTED route.
