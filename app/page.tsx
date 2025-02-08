import SuperbowlSquares from '@/components/superbowl-squares'
import { Providers } from '@/components/toast'

export default function Home() {
	return (
		<Providers>
			<SuperbowlSquares showScoresAndTeams />
		</Providers>
	)
}
