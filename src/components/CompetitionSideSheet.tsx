import { useCallback, useEffect, useState } from "react";
import { CopyButton } from "@/components/copy-button";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { Competition } from "@/types/competition";
import { CompetitionDetailContent } from "./CompetitionDetailContent";
import { type DetailViewMode, DetailViewToggle } from "./DetailViewToggle";

interface CompetitionSheetProps {
	competition: Competition | null;
	isOpen: boolean;
	onClose: () => void;
	detailViewMode?: DetailViewMode;
	onDetailViewModeChange?: (mode: DetailViewMode) => void;
	hasPrevious?: boolean;
	hasNext?: boolean;
	onPrevious?: () => void;
	onNext?: () => void;
}

export function CompetitionSheet({
	competition,
	isOpen,
	onClose,
	detailViewMode = "sheet",
	onDetailViewModeChange,
	hasPrevious = false,
	hasNext = false,
	onPrevious,
	onNext,
}: CompetitionSheetProps) {
	const [isClosing, setIsClosing] = useState(false);

	const handleClose = useCallback(() => {
		setIsClosing(true);
		setTimeout(() => {
			onClose();
		}, 300);
	}, [onClose]);

	useEffect(() => {
		if (!isOpen) {
			return;
		}

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				handleClose();
			} else if (e.key === "ArrowUp" && hasPrevious && onPrevious) {
				onPrevious();
			} else if (e.key === "ArrowDown" && hasNext && onNext) {
				onNext();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [isOpen, hasPrevious, hasNext, onPrevious, onNext, handleClose]);

	useEffect(() => {
		if (!isOpen) {
			return;
		}
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);

	useEffect(() => {
		if (isOpen) {
			setIsClosing(false);
		}
	}, [isOpen]);

	const handleBackdropClick = () => {
		handleClose();
	};

	if (!(isOpen || isClosing)) {
		return null;
	}
	if (!(competition || isClosing)) {
		return null;
	}

	return (
		<>
			{/* Backdrop */}
			<div
				className={cn(
					"fixed inset-0 z-40 bg-black/50 transition-opacity duration-300",
					isClosing ? "opacity-0" : "opacity-100"
				)}
				onClick={handleBackdropClick}
			/>

			{/* Sheet */}
			<div
				className={cn(
					"fixed top-0 right-0 bottom-0 z-50 h-screen w-full rounded-none bg-card shadow-xl md:top-4 md:right-4 md:bottom-4 md:h-[calc(100vh-2rem)] md:max-w-xl md:rounded-xl",
					"transition-transform duration-300 ease-in-out",
					isClosing ? "translate-x-full" : "translate-x-0"
				)}
			>
				<div className="flex h-full flex-col">
					{/* Header */}
					<div className="flex items-center justify-between border-border border-b p-3">
						<div className="flex items-center gap-2">
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										aria-label="Close"
										className="h-8 w-8 rounded-lg"
										onClick={handleClose}
										size="icon"
										variant="ghost"
									>
										<svg
											className="h-4 w-4"
											fill="none"
											stroke="currentColor"
											strokeWidth={2}
											viewBox="0 0 24 24"
										>
											<path d="M9 18l6-6-6-6" />
										</svg>
									</Button>
								</TooltipTrigger>
								<TooltipContent>Close</TooltipContent>
							</Tooltip>
							{onDetailViewModeChange && (
								<DetailViewToggle
									detailViewMode={detailViewMode}
									onDetailViewModeChange={onDetailViewModeChange}
								/>
							)}
							{competition && (
								<CopyButton
									className="h-8 rounded-lg px-3"
									size="sm"
									text={competition.registrationUrl}
									variant="ghost"
								>
									Copy Link
								</CopyButton>
							)}
						</div>

						{/* Navigation */}
						{hasPrevious || hasNext ? (
							<div className="flex items-center gap-1">
								{hasPrevious && onPrevious && (
									<Tooltip>
										<TooltipTrigger asChild>
											<Button
												aria-label="Previous competition"
												className="h-8 w-8 rounded-lg p-0"
												onClick={onPrevious}
												size="icon"
												variant="secondary"
											>
												<svg
													className="h-4 w-4"
													fill="none"
													stroke="currentColor"
													strokeWidth={2}
													viewBox="0 0 24 24"
												>
													<path d="M18 15l-6-6-6 6" />
												</svg>
											</Button>
										</TooltipTrigger>
										<TooltipContent>Previous</TooltipContent>
									</Tooltip>
								)}
								{hasNext && onNext && (
									<Tooltip>
										<TooltipTrigger asChild>
											<Button
												aria-label="Next competition"
												className="h-8 w-8 rounded-lg p-0"
												onClick={onNext}
												size="icon"
												variant="secondary"
											>
												<svg
													className="h-4 w-4"
													fill="none"
													stroke="currentColor"
													strokeWidth={2}
													viewBox="0 0 24 24"
												>
													<path d="M6 9l6 6 6-6" />
												</svg>
											</Button>
										</TooltipTrigger>
										<TooltipContent>Next</TooltipContent>
									</Tooltip>
								)}
							</div>
						) : null}
					</div>

					{/* Content */}
					<div className="flex-1 overflow-hidden">
						{competition && (
							<CompetitionDetailContent
								competition={competition}
								onClose={handleClose}
								variant="sheet"
							/>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
