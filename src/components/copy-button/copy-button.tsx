"use client";

import { CheckIcon, CircleXIcon, CopyIcon } from "lucide-react";
import type { HTMLMotionProps, Variants } from "motion/react";
import { AnimatePresence, motion } from "motion/react";
import type { ComponentProps } from "react";

import { Button } from "@/components/ui/button";
import type { CopyState } from "@/hooks/use-copy-to-clipboard";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

export const motionIconVariants: Variants = {
	initial: { opacity: 0, scale: 0.8, filter: "blur(2px)" },
	animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
	exit: { opacity: 0, scale: 0.8 },
};

export const motionIconProps: HTMLMotionProps<"span"> = {
	variants: motionIconVariants,
	initial: "initial",
	animate: "animate",
	exit: "exit",
	transition: { duration: 0.15, ease: "easeOut" },
};

export function CopyStateIcon({ state }: { state: CopyState }) {
	return (
		<AnimatePresence initial={false} mode="popLayout">
			{state === "idle" ? (
				<motion.span key="idle" {...motionIconProps}>
					<CopyIcon />
				</motion.span>
			) : state === "done" ? (
				<motion.span key="done" {...motionIconProps}>
					<CheckIcon strokeWidth={3} />
				</motion.span>
			) : state === "error" ? (
				<motion.span key="error" {...motionIconProps}>
					<CircleXIcon />
				</motion.span>
			) : null}
		</AnimatePresence>
	);
}

export type CopyButtonProps = ComponentProps<typeof Button> & {
	/** The text to copy, or a function that returns the text. */
	text: string | (() => string);
	/** Called with the copied text on successful copy. */
	onCopySuccess?: (text: string) => void;
	/** Called with the error if the copy operation fails. */
	onCopyError?: (error: Error) => void;
	/** The text to show after copying. Defaults to "Copied!". */
	copiedText?: string;
};

export function CopyButton({
	size = "icon",
	children,
	text,
	onCopySuccess,
	onCopyError,
	copiedText = "Copied!",
	onClick,
	...props
}: CopyButtonProps) {
	const { state, copy } = useCopyToClipboard({
		onCopySuccess,
		onCopyError,
	});

	return (
		<Button
			aria-label="Copy"
			onClick={(e) => {
				copy(text);
				onClick?.(e);
			}}
			size={size}
			{...props}
		>
			<CopyStateIcon state={state} />
			<AnimatePresence initial={false} mode="popLayout">
				{state === "done" ? (
					<motion.span
						animate={{ opacity: 1, x: 0 }}
						className="inline-block"
						exit={{ opacity: 0, x: 10 }}
						initial={{ opacity: 0, x: -10 }}
						key="copied"
						transition={{ duration: 0.15 }}
					>
						{copiedText}
					</motion.span>
				) : (
					<motion.span
						animate={{ opacity: 1, x: 0 }}
						className="inline-block"
						exit={{ opacity: 0, x: -10 }}
						initial={{ opacity: 0, x: 10 }}
						key="original"
						transition={{ duration: 0.15 }}
					>
						{children}
					</motion.span>
				)}
			</AnimatePresence>
		</Button>
	);
}
