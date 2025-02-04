import type { Handler } from 'aws-lambda'
import { type Schema } from '../../data/resource'
import { Amplify } from 'aws-amplify'
import { generateClient } from 'aws-amplify/data'
import { getAmplifyDataClientConfig } from '@aws-amplify/backend/function/runtime'
import { env } from '$amplify/env/wcc-eb-webhook'

const { resourceConfig, libraryOptions } = await getAmplifyDataClientConfig(env)
Amplify.configure(resourceConfig, libraryOptions)
const client = generateClient<Schema>()

export const handler: Handler = async (event) => {
	switch (event.detail.type) {
		case 'checkout.session.completed':
			const session = event.detail.data.object
			//the session payload
			const customFields = session.custom_fields
			const customerNameField = customFields.find(
				(field: { key: string }) => field.key === 'customer_name'
			)
			const customerName = customerNameField
				? customerNameField.text.value
				: 'unknown'

			console.log('the session', session.metadata.payload)
			if (
				session.payment_status === 'paid' &&
				session.metadata.eventName === 'wcc_superbowl_squares_2025'
			) {
				const lineItems = JSON.parse(session.metadata.payload)
				console.log('the lineItems', lineItems)
				for (const lineItem of lineItems) {
					try {
						await client.models.SuperbowlSquare.create(
							{
								row: lineItem.row,
								column: lineItem.column,
								quarter: lineItem.quarter,
								name: customerName,
							},
							{ authMode: 'iam' }
						)
					} catch (error) {
						console.log('error', error)
					}
				}
			}
			break
		default:
			console.log(`Unhandled event type ${event.detail.type}`)
	}

	return 'Hello, World!'
}
