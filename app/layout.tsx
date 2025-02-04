import '@/app/globals.css'
import type { Metadata } from 'next'
import type React from 'react' // Import React

export const metadata: Metadata = {
	title: 'Superbowl Squares',
	description: 'Play Superbowl Squares for the big game!',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en" className="dark">
			<body className="min-h-screen bg-black antialiased">{children}</body>
		</html>
	)
}
