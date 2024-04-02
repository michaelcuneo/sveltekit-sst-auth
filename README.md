Welcome to SvelteKit-SST-Auth
===============================

This project is intended to be a simple yet fully fledged operational demonstration of SvelteKit Magic Links using SST, hosted on AWS, as a Lambda application.

To get this working with your own services you have to perform the following steps.

### 1. Run npx sst secrets set [environment-variable] ["value"] to add all the following variables to the application. Replace the values with your email provider information if you want to run MagicLinks, or Replace the Google, and/or Facebook information if you want Federated Identities.

```
NODE_MAILER CONFIG FOR MAGIC LINKS
EMAIL_SERVICE=<Gmail>
EMAIL_HOST=<smtp.gmail.com>
EMAIL_PORT=<465>
EMAIL_USER=<user@gmail.com>
EMAIL_APP_PASS=<abcd efgh ijkl mnop>
GOOGLE CONFIG FOR GOOGLE FEDERATED IDENTITY
GOOGLE_CLIENT_ID=<#####-#######.apps.googleusercontent.com>
META CONFIG FOR META FEDERATED IDENTITY
FACEBOOK_APP_ID="#####-#######.apps.googleusercontent.com"

```

### 2. Modify the sst.config.ts file to suit your own purposes.

Use the SIGN UP link to add your email to the database. Use the LOGIN link to gain access to the PROTECTED route.
