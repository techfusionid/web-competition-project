import { ChevronDown, ChevronsRight, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { CopyButton } from "@/components/copy-button/copy-button";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { type Competition } from "@/types/competition";
import { CompetitionDetailPanel } from "./CompetitionDetailPanel";
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

	// Handle escape key to close and keyboard navigation
	useEffect(() => {
		if (!isOpen) return;

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
	}, [isOpen, hasPrevious, hasNext, onPrevious, onNext]);

	// Prevent body scroll when sheet is open
	useEffect(() => {
		if (!isOpen) return;

		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);

	// Reset closing state when opening
	useEffect(() => {
		if (isOpen) {
			setIsClosing(false);
		}
	}, [isOpen]);

	const handleClose = () => {
		setIsClosing(true);
		setTimeout(() => {
			onClose();
		}, 300); // Match the animation duration
	};

	const handleBackdropClick = () => {
		handleClose();
	};

	// Don't render if closed and not in closing animation
	if (!isOpen && !isClosing) return null;
	// Don't render if no competition
	if (!competition && !isClosing) return null;

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
					"fixed right-0 top-0 z-50 h-screen w-full max-w-2xl bg-background shadow-xl",
					"transition-transform duration-300 ease-in-out",
					isClosing ? "translate-x-full" : "translate-x-0"
				)}
			>
				<div className="flex h-full flex-col">
					{/* Header with close button, view toggle, and navigation */}
					<div className="flex items-center justify-between border-b p-3">
						{/* Left side: close, view toggle, and copy link buttons */}
						<div className="flex items-center gap-2">
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										aria-label="Close"
										className="h-8 w-8 rounded-full"
										onClick={handleClose}
										size="icon"
										variant="ghost"
									>
										<ChevronsRight className="h-4 w-4" />
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
									className="h-8 rounded-full px-3"
									size="sm"
									text={competition.registrationUrl}
									variant="secondary"
								>
									Copy Link
								</CopyButton>
							)}
						</div>

						{/* Right side: navigation buttons */}
						{hasPrevious || hasNext ? (
							<div className="flex items-center gap-0.5">
								{hasPrevious && onPrevious && (
									<Tooltip>
										<TooltipTrigger asChild>
											<Button
												aria-label="Previous competition"
												className="h-7 w-7 rounded-full bg-background/80 backdrop-blur-sm p-0 hover:bg-background"
												onClick={onPrevious}
												size="icon"
												variant="ghost"
											>
												<ChevronUp className="h-4 w-4" />
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
												className="h-7 w-7 rounded-full bg-background/80 backdrop-blur-sm p-0 hover:bg-background"
												onClick={onNext}
												size="icon"
												variant="ghost"
											>
												<ChevronDown className="h-4 w-4" />
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
						<CompetitionDetailPanel competition={competition} />
					</div>
				</div>
			</div>
		</>
	);
}
