import SuperbowlSquares from '@/components/superbowl-squares'
import { Providers } from '@/components/toast'

export default function Home() {
	return (
		<Providers>
			<SuperbowlSquares
				showScoresAndTeams={false}
				topTeamName="Kansas City Chiefs 🏈"
				sideTeamName="Philadelphia Eagles 🦅"
				topTeamNumbers={[4, 2, 1, 5, 0, 6, 9, 8, 7, 3]}
				sideTeamNumbers={[8, 0, 1, 2, 3, 9, 4, 6, 7, 5]}
			/>
		</Providers>
	)
}
