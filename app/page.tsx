import SuperbowlSquares from '@/components/superbowl-squares'
import { Providers } from '@/components/toast'

export default function Home() {
	return (
		<Providers>
			<SuperbowlSquares
				showScoresAndTeams={true}
				topTeamName="Kansas City Chiefs 🏈"
				sideTeamName="Philadelphia Eagles 🦅"
				topTeamNumbers={[3, 7, 2, 6, 1, 8, 4, 0, 9, 5]}
				sideTeamNumbers={[5, 0, 9, 4, 8, 7, 6, 1, 2, 3]}
				disabledQuarters={['FIRST', 'SECOND']}
			/>
		</Providers>
	)
}
