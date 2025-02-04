# WCC Superbowl Squares

## Deployment Steps (local)

1. Configure partner Eventbus in Stripe
2. Clone and installs deps
3. Grab Stripe secret and stripe bus id
4. Add secrets and envVars
   - store for the stripe bus id in the `.env.local` file.
   - store secret in parameter store: `WCC_STRIPE_SECRET_KEY= npx ampx sandbox secret set WCC_STRIPE_SECRET_KEY` you can find it in the AWS console under `/amplify/[projectname]/[awsProfile]/[secretName]`
5. Init backend: `npx ampx sandbox`
6. run app and test: `npm run dev`

## Deployment Steps (hosting)

1. Configure partner Eventbus in Stripe
2. Go to AWS Amplify in AWS console
3. add secrets and env vars in console when selecting the repo to deploy
