import { defineFunction } from '@aws-amplify/backend'

export const wccEBWebhook = defineFunction({
	name: 'wcc-eb-webhook',
	entry: './main.ts',
	resourceGroupName: 'data',
})
