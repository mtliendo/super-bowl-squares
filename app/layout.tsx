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
			<title>Serverless Superbowl Squares</title>
			<meta
				name="description"
				content="Play Superbowl Squares for the big game!"
			/>

			<meta
				property="og:url"
				content="https://test.d178l466t4onmx.amplifyapp.com"
			/>
			<meta property="og:type" content="website" />
			<meta property="og:title" content="Serverless Superbowl Squares" />
			<meta
				property="og:description"
				content="Play Superbowl Squares for the big game!"
			/>
			<meta
				property="og:image"
				content="https://opengraph.b-cdn.net/production/images/dc21dc90-15e6-4323-8f8e-5178e6c3def8.png?token=qshyj1h8rxeQf5cJPukjUkyliAx59HOIRMMA4vSDDew&height=675&width=1200&expires=33274775142"
			/>

			<meta name="twitter:card" content="summary_large_image" />
			<meta
				property="twitter:domain"
				content="test.d178l466t4onmx.amplifyapp.com"
			/>
			<meta
				property="twitter:url"
				content="https://test.d178l466t4onmx.amplifyapp.com"
			/>
			<meta name="twitter:title" content="Serverless Superbowl Squares" />
			<meta
				name="twitter:description"
				content="Play Superbowl Squares for the big game!"
			/>
			<meta
				name="twitter:image"
				content="https://opengraph.b-cdn.net/production/images/dc21dc90-15e6-4323-8f8e-5178e6c3def8.png?token=qshyj1h8rxeQf5cJPukjUkyliAx59HOIRMMA4vSDDew&height=675&width=1200&expires=33274775142"
			/>

			<body className="min-h-screen bg-black antialiased">{children}</body>
		</html>
	)
}
