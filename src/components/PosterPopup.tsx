"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
	Dialog,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
} from "@/components/ui/dialog";
import type { Competition } from "@/types/competition";

interface PosterPopupProps {
	competition: Competition | null;
	isOpen: boolean;
	onClose: () => void;
}

export function PosterPopup({
	competition,
	isOpen,
	onClose,
}: PosterPopupProps) {
	if (!competition) {
		return null;
	}

	return (
		<Dialog onOpenChange={(open) => !open && onClose()} open={isOpen}>
			<DialogPortal>
				<DialogOverlay className="bg-black/90 md:bg-black/80" />
				<DialogPrimitive.Content
					className="fixed inset-0 z-50 overflow-hidden bg-transparent p-0"
					onPointerUp={onClose}
					onTouchEnd={onClose}
				>
					<DialogTitle className="sr-only">
						{competition.title} - Poster
					</DialogTitle>
					{/* Close button — always visible for easy tap on mobile */}
					<button
						aria-label="Close"
						className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
						onClick={(e) => {
							e.stopPropagation();
							onClose();
						}}
						type="button"
					>
						<svg
							className="h-4 w-4"
							fill="none"
							stroke="currentColor"
							strokeWidth={2}
							viewBox="0 0 24 24"
						>
							<path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
						</svg>
					</button>
					{/* Poster Image - Full size, clear display, optimized for mobile */}
					<div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-secondary">
						{competition.imageUrl ? (
							<img
								alt={competition.title}
								className="h-full w-full object-contain"
								src={competition.imageUrl}
							/>
						) : (
							<div className="flex aspect-[3/4] w-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
								<span className="font-bold text-6xl text-primary/30">
									{competition.title.charAt(0)}
								</span>
							</div>
						)}
					</div>
				</DialogPrimitive.Content>
			</DialogPortal>
		</Dialog>
	);
}
