'use client'

import { useState, useEffect } from 'react'
import { Trophy } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { Schema } from '@/amplify/data/resource'
import { generateClient } from 'aws-amplify/api'
import { Amplify } from 'aws-amplify'

import config from '@/amplify_outputs.json'
Amplify.configure(config)
interface SelectedSquare {
	row: number
	column: number
	quarter: string
	name?: string
}
const client = generateClient<Schema>()

export default function SuperbowlSquares({
	showScoresAndTeams = false,
}: {
	showScoresAndTeams?: boolean
}) {
	const { toast } = useToast()
	const [selectedSquares, setSelectedSquares] = useState<SelectedSquare[]>([])
	const [preSelectedSquares, setPreSelectedSquares] = useState<
		Schema['SuperbowlSquare']['type'][]
	>([])
	const [currentQuarter, setCurrentQuarter] = useState('FIRST')

	const chiefsNumbers = [4, 2, 1, 5, 0, 6, 9, 8, 7, 3]
	const eaglesNumbers = [8, 0, 1, 2, 3, 9, 4, 6, 7, 5]

	useEffect(() => {
		const fetchPreSelectedSquares = async () => {
			const res = await client.models.SuperbowlSquare.list()

			console.log(res)
			if (!res.data) throw Error('No data returned from API')

			setPreSelectedSquares(res.data)
		}

		fetchPreSelectedSquares()
	}, [])

	useEffect(() => {
		const createSub = client.models.SuperbowlSquare.onCreate().subscribe({
			next: (data) => {
				setPreSelectedSquares((prev) => [...prev, data])
			},
			error: (error) => console.warn(error),
		})
		return () => createSub.unsubscribe()
	}, [])

	const handleSquareClick = (row: number, column: number) => {
		const preSelected = preSelectedSquares.find(
			(square) =>
				square.row === row &&
				square.column === column &&
				square.quarter === currentQuarter
		)

		if (preSelected) {
			toast({
				title: 'Square already taken',
				description: `This square is already taken by ${preSelected.name}`,
				variant: 'destructive',
			})
			return
		}

		const quarterSquares = selectedSquares.filter(
			(square) => square.quarter === currentQuarter
		)
		const isSelected = selectedSquares.some(
			(square) =>
				square.row === row &&
				square.column === column &&
				square.quarter === currentQuarter
		)

		if (isSelected) {
			setSelectedSquares(
				selectedSquares.filter(
					(square) =>
						!(
							square.row === row &&
							square.column === column &&
							square.quarter === currentQuarter
						)
				)
			)
			return
		}

		if (quarterSquares.length >= 3) {
			toast({
				title: 'Maximum squares reached',
				description: 'You can only select up to 3 squares per quarter',
				variant: 'destructive',
			})
			return
		}

		setSelectedSquares([
			...selectedSquares,
			{ row, column, quarter: currentQuarter },
		])
	}

	const totalAmount = selectedSquares.length * 5

	const handleCheckout = async () => {
		try {
			const response = await client.mutations.createStripeCustomerSession({
				returnUrl: window.location.href,
				squares: JSON.stringify(selectedSquares),
			})
			console.log(response.errors)

			if (!response.data?.sessionURL) {
				throw new Error('No session URL returned')
			}

			const sessionUrl = response.data?.sessionURL
			window.location.href = sessionUrl
		} catch (error) {
			console.error('Error:', error)
			toast({
				title: 'Checkout Error',
				description:
					'There was a problem initiating the checkout. Please try again.',
				variant: 'destructive',
			})
		}
	}

	return (
		<div className="min-h-screen bg-green-800 p-4 text-gray-900 relative overflow-hidden">
			{/* Football field pattern SVG background */}
			<div className="absolute inset-0" aria-hidden="true">
				<svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
					{/* Yard line pattern */}
					<pattern
						id="yard-lines"
						x="0"
						y="0"
						width="100"
						height="50"
						patternUnits="userSpaceOnUse"
					>
						<line
							x1="0"
							y1="0"
							x2="100"
							y2="0"
							stroke="rgba(255,255,255,0.15)"
							strokeWidth="2"
						/>
						{/* Hash marks */}
						<line
							x1="25"
							y1="0"
							x2="25"
							y2="10"
							stroke="rgba(255,255,255,0.15)"
							strokeWidth="2"
						/>
						<line
							x1="75"
							y1="0"
							x2="75"
							y2="10"
							stroke="rgba(255,255,255,0.15)"
							strokeWidth="2"
						/>
					</pattern>
					<rect
						x="0"
						y="0"
						width="100%"
						height="100%"
						fill="url(#yard-lines)"
					/>

					{/* End zones */}
					<rect
						x="0"
						y="0"
						width="100%"
						height="10%"
						fill="rgba(139,0,0,0.2)"
						stroke="rgba(255,255,255,0.2)"
					/>
					<rect
						x="0"
						y="90%"
						width="100%"
						height="10%"
						fill="rgba(139,0,0,0.2)"
						stroke="rgba(255,255,255,0.2)"
					/>

					{/* 50 yard line */}
					<line
						x1="50%"
						y1="10%"
						x2="50%"
						y2="90%"
						stroke="rgba(255,255,255,0.3)"
						strokeWidth="4"
					/>

					{/* Numbers */}
					<text
						x="45%"
						y="50%"
						fill="rgba(255,255,255,0.15)"
						fontSize="48"
						fontWeight="bold"
					>
						50
					</text>
					<text
						x="25%"
						y="50%"
						fill="rgba(255,255,255,0.15)"
						fontSize="48"
						fontWeight="bold"
					>
						25
					</text>
					<text
						x="75%"
						y="50%"
						fill="rgba(255,255,255,0.15)"
						fontSize="48"
						fontWeight="bold"
					>
						25
					</text>

					{/* Football emojis and icons */}
					<pattern
						id="football-pattern"
						x="0"
						y="0"
						width="200"
						height="200"
						patternUnits="userSpaceOnUse"
					>
						<text x="20" y="40" fontSize="24" fill="rgba(255,255,255,0.1)">
							🏈
						</text>
						<text x="120" y="140" fontSize="24" fill="rgba(255,255,255,0.1)">
							🏈
						</text>
						<text x="180" y="80" fontSize="20" fill="rgba(255,255,255,0.1)">
							🏆
						</text>
						<text x="60" y="160" fontSize="20" fill="rgba(255,255,255,0.1)">
							🎯
						</text>
					</pattern>
					<rect
						x="0"
						y="0"
						width="100%"
						height="100%"
						fill="url(#football-pattern)"
					/>

					{/* SVG Football icons */}
					<g opacity="0.1" fill="white">
						{/* Stylized football shape repeated across the field */}
						<path d="M30,200 Q60,170 30,140 Q0,170 30,200" />
						<path d="M230,400 Q260,370 230,340 Q200,370 230,400" />
						<path d="M430,300 Q460,270 430,240 Q400,270 430,300" />
						<path d="M630,150 Q660,120 630,90 Q600,120 630,150" />
					</g>
				</svg>
			</div>

			<div className="max-w-4xl mx-auto space-y-8 relative z-10">
				<div className="text-center space-y-4">
					<h1 className="text-2xl md:text-4xl font-bold text-white flex items-center justify-center gap-2">
						<Trophy className="h-8 w-8" />
						Windsor Crest Superbowl Squares
						<Trophy className="h-8 w-8" />
					</h1>

					<div className="text-xl text-white">Total: ${totalAmount}</div>

					<Button
						variant="secondary"
						className="bg-yellow-500 hover:bg-yellow-600 text-black"
						onClick={handleCheckout}
					>
						Checkout ({selectedSquares.length} squares)
					</Button>
				</div>

				<Tabs
					className="mb-4"
					defaultValue="FIRST"
					onValueChange={setCurrentQuarter}
				>
					<TabsList className="grid grid-cols-4 w-full bg-white">
						<TabsTrigger value="FIRST">1st</TabsTrigger>
						<TabsTrigger value="SECOND">2nd</TabsTrigger>
						<TabsTrigger value="THRID">3rd</TabsTrigger>
						<TabsTrigger value="FOURTH">4th</TabsTrigger>
					</TabsList>
				</Tabs>

				<div className="relative top-4">
					{/* Team Names */}
					{showScoresAndTeams && (
						<>
							<div className="absolute -top-2 left-12 right-0 text-center font-bold text-white">
								Kansas City Chiefs 🏈
							</div>
							<div className="absolute -left-5 lg:-left-8 top-12 bottom-4  flex items-center">
								<span
									className="rotate-180 whitespace-nowrap font-bold text-white"
									style={{ writingMode: 'vertical-rl' }}
								>
									Philadelphia Eagles 🦅
								</span>
							</div>
						</>
					)}

					<div className="top-4 relative aspect-square w-full border border-white rounded-lg overflow-hidden bg-white bg-opacity-90 mb-12">
						{/* Numbers Grid */}
						{showScoresAndTeams && (
							<>
								<div className="absolute top-0 left-12 right-0 h-12 flex bg-gray-200">
									{chiefsNumbers.map((num, i) => (
										<div
											key={i}
											className="flex-1 border-r border-gray-300 flex items-center justify-center"
										>
											{num}
										</div>
									))}
								</div>

								<div className="absolute top-12 left-0 w-12 bottom-0 flex flex-col bg-gray-200">
									{eaglesNumbers.map((num, i) => (
										<div
											key={i}
											className="flex-1 border-b border-gray-300 flex items-center justify-center"
										>
											{num}
										</div>
									))}
								</div>
							</>
						)}

						{/* Squares Grid */}
						<div
							className={cn(
								'absolute grid grid-cols-10 grid-rows-10',
								showScoresAndTeams
									? 'top-12 left-12 right-0 bottom-0'
									: 'inset-0'
							)}
						>
							{Array.from({ length: 100 }).map((_, i) => {
								const row = Math.floor(i / 10)
								const column = i % 10
								const isSelected = selectedSquares.some(
									(square) =>
										square.row === row &&
										square.column === column &&
										square.quarter === currentQuarter
								)
								const isPreSelected = preSelectedSquares.some(
									(square) =>
										square.row === row &&
										square.column === column &&
										square.quarter === currentQuarter
								)

								return (
									<button
										key={i}
										onClick={() => handleSquareClick(row, column)}
										className={cn(
											'border-r border-b border-gray-300 transition-colors',
											'hover:bg-yellow-500',
											isSelected && 'bg-yellow-500',
											isPreSelected && 'bg-red-500 cursor-not-allowed'
										)}
									/>
								)
							})}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
