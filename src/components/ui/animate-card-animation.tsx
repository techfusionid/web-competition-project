"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { fetchCompetitions } from "@/app/actions/competitions";
import { CompetitionDialog } from "@/components/CompetitionDialog";
import { Button } from "@/components/ui/button";
import type { Competition } from "@/types/competition";

interface Card {
	id: number;
	competition: Competition;
}

const positionStyles = [
	{ scale: 1, y: 12 },
	{ scale: 0.95, y: -16 },
	{ scale: 0.9, y: -44 },
];

const exitAnimation = {
	y: 100,
	scale: 1,
	zIndex: 10,
};

const enterAnimation = {
	y: -16,
	scale: 0.9,
};

function getRandomCompetition(
	competitions: Competition[],
	exclude?: string[]
): Competition {
	const available = exclude
		? competitions.filter((c) => !exclude.includes(c.id))
		: competitions;
	const pool = available.length > 0 ? available : competitions;
	return pool[Math.floor(Math.random() * pool.length)];
}

function getInitialCards(competitions: Competition[]): Card[] {
	const used: string[] = [];
	const cards: Card[] = [];
	for (let i = 0; i < 3; i++) {
		const comp = getRandomCompetition(competitions, used);
		used.push(comp.id);
		cards.push({ id: i + 1, competition: comp });
	}
	return cards;
}

function CardContent({
	competition,
	onViewClick,
}: {
	competition: Competition;
	onViewClick: () => void;
}) {
	return (
		<div
			className="relative flex h-[320px] flex-col overflow-hidden rounded-xl border border-border bg-card shadow-lg"
			onClick={onViewClick}
		>
			<div className="relative h-40 w-full overflow-hidden">
				{competition.imageUrl ? (
					<img
						alt={competition.title}
						className="h-full w-full object-cover"
						src={competition.imageUrl}
					/>
				) : (
					<div className="flex h-full w-full items-center justify-center bg-linear-to-br from-primary/20 to-primary/5">
						<span className="font-bold text-4xl text-primary/30">
							{competition.title.charAt(0)}
						</span>
					</div>
				)}
				<div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent" />
			</div>

			<div className="flex flex-1 flex-col justify-between p-4">
				<div className="space-y-1">
					<h3 className="line-clamp-2 font-bold text-foreground text-lg">
						{competition.title}
					</h3>
					<p className="line-clamp-2 text-muted-foreground text-sm">
						{competition.organizer}
					</p>
				</div>

				<div className="flex items-center justify-between">
					<span className="font-medium text-primary text-xs">
						{competition.category}
					</span>
					<Button
						className="gap-1 text-sm"
						onClick={(e) => {
							e.stopPropagation();
							onViewClick();
						}}
						size="sm"
						variant="ghost"
					>
						View
						<ArrowRight className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	);
}

function AnimatedCard({
	card,
	index,
	isAnimating,
	transitionSpeed,
	onViewClick,
}: {
	card: Card;
	index: number;
	isAnimating: boolean;
	transitionSpeed: number;
	onViewClick: () => void;
}) {
	const { scale, y } = positionStyles[index] ?? positionStyles[2];
	const zIndex = index === 0 && isAnimating ? 10 : 3 - index;

	const exitAnim = index === 0 ? exitAnimation : undefined;
	const initialAnim = index === 2 ? enterAnimation : undefined;

	return (
		<motion.div
			animate={{ scale, y, zIndex }}
			className="absolute w-full cursor-pointer"
			exit={exitAnim}
			initial={initialAnim}
			key={card.id}
			layout
			transition={{
				type: "spring",
				stiffness: 300,
				damping: 30,
				duration: transitionSpeed,
			}}
		>
			<CardContent competition={card.competition} onViewClick={onViewClick} />
		</motion.div>
	);
}

export default function AnimatedCardStack() {
	const [allCompetitions, setAllCompetitions] = useState<Competition[]>([]);
	const [cards, setCards] = useState<Card[]>([]);
	const [isSpinning, setIsSpinning] = useState(false);
	const [transitionSpeed, setTransitionSpeed] = useState(0.3);
	const [selectedCompetition, setSelectedCompetition] =
		useState<Competition | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const nextIdRef = useRef(4);

	// Load competitions from database
	useEffect(() => {
		async function loadCompetitions() {
			try {
				const data = await fetchCompetitions();
				setAllCompetitions(data);
				setCards(getInitialCards(data));
			} catch (error) {
				console.error("Failed to load competitions:", error);
			} finally {
				setIsLoading(false);
			}
		}
		loadCompetitions();
	}, []);

	const handleSpin = useCallback(() => {
		if (isSpinning || allCompetitions.length === 0) {
			return;
		}
		setIsSpinning(true);

		// Spin configuration - random number of spins between 10-18
		const totalSpins = 10 + Math.floor(Math.random() * 9);
		let currentSpin = 0;

		// Start fast, then slow down
		const spin = () => {
			if (currentSpin >= totalSpins) {
				setIsSpinning(false);
				setTransitionSpeed(0.3);
				return;
			}

			// Calculate delay - starts fast (40ms), ends slow (500ms)
			const progress = currentSpin / totalSpins;
			const easeOut = 1 - (1 - progress) ** 3;
			const delay = 40 + easeOut * 460;

			// Update transition speed based on progress
			setTransitionSpeed(0.08 + easeOut * 0.35);

			// Get truly random competition from full list
			const randomIndex = Math.floor(Math.random() * allCompetitions.length);
			const nextComp = allCompetitions[randomIndex];
			const newId = nextIdRef.current++;

			setCards((prev) => [
				...prev.slice(1),
				{ id: newId, competition: nextComp },
			]);

			currentSpin++;
			setTimeout(spin, delay);
		};

		// Start spinning
		spin();
	}, [isSpinning, allCompetitions]);

	const handleViewClick = useCallback((competition: Competition) => {
		setSelectedCompetition(competition);
	}, []);

	const handleCloseDialog = useCallback(() => {
		setSelectedCompetition(null);
	}, []);

	if (isLoading) {
		return (
			<div className="flex flex-col items-center justify-center gap-4 py-16">
				<Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
				<p className="text-muted-foreground text-sm">Loading competitions...</p>
			</div>
		);
	}

	if (allCompetitions.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center gap-4 py-16">
				<p className="text-muted-foreground text-sm">
					No competitions available
				</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col items-center justify-center gap-8 py-8">
			<div className="relative h-[380px] w-full max-w-sm">
				<div className="absolute inset-0 flex items-end justify-center pb-4">
					<AnimatePresence mode="popLayout">
						{cards.slice(0, 3).map((card, index) => (
							<AnimatedCard
								card={card}
								index={index}
								isAnimating={isSpinning}
								key={card.id}
								onViewClick={() => handleViewClick(card.competition)}
								transitionSpeed={transitionSpeed}
							/>
						))}
					</AnimatePresence>
				</div>
			</div>

			<div className="flex flex-col items-center gap-4">
				<Button
					className="gap-2 px-8"
					disabled={isSpinning}
					onClick={handleSpin}
					size="lg"
				>
					{isSpinning ? (
						<>
							<Loader2 className="h-4 w-4 animate-spin" />
							Shuffling...
						</>
					) : (
						<>🎲 Randomize Competition</>
					)}
				</Button>
				<p className="text-muted-foreground text-sm">
					{isSpinning
						? "Searching for competitions for you..."
						: "Click to find competitions randomly"}
				</p>
			</div>

			{/* Competition Detail Dialog */}
			<CompetitionDialog
				competition={selectedCompetition}
				hasNext={false}
				hasPrevious={false}
				isOpen={selectedCompetition !== null}
				onClose={handleCloseDialog}
				onNext={() => {}}
				onPrevious={() => {}}
			/>
		</div>
	);
}
