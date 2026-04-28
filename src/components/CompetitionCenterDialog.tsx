import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useEffect } from "react";
import {
	Dialog,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
} from "@/components/ui/dialog";
import type { Competition } from "@/types/competition";
import { CompetitionDetailContent } from "./CompetitionDetailContent";
import { type DetailViewMode, DetailViewToggle } from "./DetailViewToggle";

interface CompetitionDialogProps {
	competition: Competition | null;
	isOpen: boolean;
	onClose: () => void;
	onPrevious: () => void;
	onNext: () => void;
	hasPrevious: boolean;
	hasNext: boolean;
	detailViewMode?: DetailViewMode;
	onDetailViewModeChange?: (mode: DetailViewMode) => void;
}

export function CompetitionDialog({
	competition,
	isOpen,
	onClose,
	onPrevious,
	onNext,
	hasPrevious,
	hasNext,
	detailViewMode = "dialog",
	onDetailViewModeChange,
}: CompetitionDialogProps) {
	// Keyboard navigation
	useEffect(() => {
		if (!isOpen) {
			return;
		}

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "ArrowLeft" && hasPrevious) {
				onPrevious();
			} else if (e.key === "ArrowRight" && hasNext) {
				onNext();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [isOpen, hasPrevious, hasNext, onPrevious, onNext]);

	if (!competition) {
		return null;
	}

	return (
		<Dialog onOpenChange={(open) => !open && onClose()} open={isOpen}>
			<DialogPortal>
				<DialogOverlay className="bg-transparent md:bg-black/80" />

				<DialogPrimitive.Content className="fixed top-1/2 left-1/2 z-50 flex max-h-[90vh] w-[92vw] max-w-[340px] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-xl border bg-background p-0 shadow-lg md:w-full md:max-w-2xl">
					<DialogTitle className="sr-only">{competition.title}</DialogTitle>

					{/* Top bar with close button and view toggle */}
					<div className="flex items-center justify-end border-b bg-background/95 p-2 backdrop-blur-sm">
						<div className="flex items-center gap-2">
							{onDetailViewModeChange && (
								<DetailViewToggle
									detailViewMode={detailViewMode}
									onDetailViewModeChange={onDetailViewModeChange}
								/>
							)}
							<DialogPrimitive.Close className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring">
								<svg
									className="h-4 w-4"
									fill="none"
									stroke="currentColor"
									strokeWidth={2}
									viewBox="0 0 24 24"
								>
									<path d="M18 6L6 18M6 6l12 12" />
								</svg>
								<span className="sr-only">Close</span>
							</DialogPrimitive.Close>
						</div>
					</div>

					{/* Content */}
					<div className="min-h-0 flex-1 overflow-y-auto">
						<CompetitionDetailContent
							competition={competition}
							showShareButton
							variant="dialog"
						/>
					</div>
				</DialogPrimitive.Content>
			</DialogPortal>
		</Dialog>
	);
}
