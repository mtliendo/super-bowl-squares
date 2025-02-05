import { createStripeCustomerSession } from './functions/createStripeCustomerSession/resource'
import { wccEBWebhook } from './functions/wcc-eb-webhook/resource'
import { defineBackend } from '@aws-amplify/backend'
import { auth } from './auth/resource'
import { data } from './data/resource'
import { config } from '@dotenvx/dotenvx'
import { EventBus, Rule } from 'aws-cdk-lib/aws-events'
import {
	LambdaFunction,
	CloudWatchLogGroup,
} from 'aws-cdk-lib/aws-events-targets'
import { LogGroup, RetentionDays } from 'aws-cdk-lib/aws-logs'

config({ path: '.env.local', override: false })

const backend = defineBackend({
	auth,
	data,
	wccEBWebhook,
	createStripeCustomerSession,
})

const customResources = backend.createStack('customResourcesStack')

//import the eventbridge bus created by Stripe by its ARN
const stripeEventBus = EventBus.fromEventBusArn(
	customResources,
	'wcc-stripeEventBridgeBus',
	`arn:aws:events:${customResources.region}:${customResources.account}:event-bus/aws.partner/stripe.com/${process.env.STRIPE_EVENTBUS_ID}`
)

//create a new cloudwatch log group to log events
const logGroup = new LogGroup(
	customResources,
	'wcc-stripeEventBridgeLogGroup',
	{
		logGroupName: '/aws/events/wcc-stripeEventBridgeLogGroupMain',
		retention: RetentionDays.ONE_MONTH,
	}
)

// create an eventBridge Rule that calls our log group and our lambda function
new Rule(customResources, 'stripeEventBridgeRule', {
	ruleName: 'wcc-stripe-event-bridge-ruleMain',
	eventBus: stripeEventBus,
	targets: [
		new LambdaFunction(backend.wccEBWebhook.resources.lambda),
		new CloudWatchLogGroup(logGroup),
	],
	eventPattern: {
		source: [`aws.partner/stripe.com/${process.env.STRIPE_EVENTBUS_ID}`],
	},
})
