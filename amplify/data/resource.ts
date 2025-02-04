import { type ClientSchema, a, defineData } from '@aws-amplify/backend'
import { wccEBWebhook } from '../functions/wcc-eb-webhook/resource'
import { createStripeCustomerSession } from '../functions/createStripeCustomerSession/resource'
const schema = a
	.schema({
		SuperbowlSquare: a
			.model({
				row: a.integer().required(),
				column: a.integer().required(),
				quarter: a.enum(['FIRST', 'SECOND', 'THIRD', 'FOURTH']),
				name: a.string().required(),
			})
			.authorization((allow) => [allow.guest().to(['read'])]),
		createStripeCustomerSession: a
			.mutation()
			.arguments({ squares: a.json(), returnUrl: a.url() })
			.returns(
				a.customType({
					sessionURL: a.url(),
				})
			)
			.handler(a.handler.function(createStripeCustomerSession))
			.authorization((allow) => [allow.guest()]),
	})
	.authorization((allow) => [allow.resource(wccEBWebhook).to(['mutate'])])

export type Schema = ClientSchema<typeof schema>

export const data = defineData({
	name: 'WCCSuperbowlSquares',
	schema,
	authorizationModes: {
		defaultAuthorizationMode: 'identityPool',
	},
})
