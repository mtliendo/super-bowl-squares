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
			<title>WCC Superbowl Squares</title>
			<meta
				name="description"
				content="Play Superbowl Squares for a chance to win big!"
			/>

			<meta
				property="og:url"
				content="https://superbowl.windsorcrestclub.org"
			/>
			<meta property="og:type" content="website" />
			<meta property="og:title" content="WCC Superbowl Squares" />
			<meta
				property="og:description"
				content="Play Superbowl Squares for a chance to win big!"
			/>
			<meta
				property="og:image"
				content="https://opengraph.b-cdn.net/production/images/532776f0-a16c-4ba9-b593-e33de337483f.png?token=5ASelgbObKOjnnQdeiSYJpbu_IUO--QgSUo6GzIJYF0&height=675&width=1200&expires=33274780049"
			/>

			<meta name="twitter:card" content="summary_large_image" />
			<meta
				property="twitter:domain"
				content="test.d178l466t4onmx.amplifyapp.com"
			/>
			<meta
				property="twitter:url"
				content="https://superbowl.windsorcrestclub.org"
			/>
			<meta name="twitter:title" content="WCC Superbowl Squares" />
			<meta
				name="twitter:description"
				content="Play Superbowl Squares for a chance to win big!"
			/>
			<meta
				name="twitter:image"
				content="https://opengraph.b-cdn.net/production/images/532776f0-a16c-4ba9-b593-e33de337483f.png?token=5ASelgbObKOjnnQdeiSYJpbu_IUO--QgSUo6GzIJYF0&height=675&width=1200&expires=33274780049"
			/>

			<body className="min-h-screen bg-black antialiased">{children}</body>
		</html>
	)
}
