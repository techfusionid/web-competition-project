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

export function PosterPopup({ competition, isOpen, onClose }: PosterPopupProps) {
	if (!competition) return null;

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
					{/* Poster Image - Full size, clear display, optimized for mobile */}
					<div className="relative h-full w-full overflow-hidden bg-secondary flex items-center justify-center">
						{competition.imageUrl ? (
							<img
								alt={competition.title}
								className="w-full h-full object-contain"
								src={competition.imageUrl}
							/>
						) : (
							<div className="flex aspect-[3/4] w-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
								<span className="text-6xl font-bold text-primary/30">
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
