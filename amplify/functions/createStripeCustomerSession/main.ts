import type { Handler } from 'aws-lambda'
import Stripe from 'stripe'
import { env } from '$amplify/env/create-stripe-customer-session'

const stripe = new Stripe(env.WCC_STRIPE_SECRET_KEY)

export const handler: Handler = async (event) => {
	console.log(event.arguments)
	try {
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			custom_fields: [
				{
					key: 'customer_name',
					optional: false,
					label: {
						type: 'custom',
						custom: 'Name',
					},
					type: 'text',
				},
			],
			line_items: [
				{
					price_data: {
						currency: 'usd',
						product_data: { name: 'Windsor Crest Superbowl Squares 2025' },
						unit_amount: event.arguments.squares.length * 5 * 100, //cost of each item is $5, then I convert to cents.
					},
					quantity: 1,
				},
			],
			mode: 'payment',
			success_url: event.arguments.returnUrl,
			cancel_url: event.arguments.returnUrl,
			metadata: {
				eventName: 'wcc_superbowl_squares_2025',
				payload: JSON.stringify(event.arguments.squares),
			},
		})
		return {
			sessionURL: session.url,
		}
	} catch (e) {
		console.log('error', e)
		return {
			sessionURL: null,
		}
	}
}
