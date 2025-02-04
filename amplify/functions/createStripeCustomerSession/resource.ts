import { defineFunction, secret } from '@aws-amplify/backend'

export const createStripeCustomerSession = defineFunction({
	name: 'create-stripe-customer-session',
	entry: './main.ts',
	environment: {
		WCC_STRIPE_SECRET_KEY: secret('WCC_STRIPE_SECRET_KEY'),
	},
})
