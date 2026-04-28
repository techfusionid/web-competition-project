"use client";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useEffect, useState } from "react";
import { SocialIcon } from "react-social-icons/component";
import { toast } from "sonner";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from "@/components/ui/dialog";

interface SharePopupProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	url: string;
}

export function SharePopup({ isOpen, onClose, title, url }: SharePopupProps) {
	const [copied, setCopied] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};

		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	const handleCopyLink = async () => {
		try {
			await navigator.clipboard.writeText(url);
			setCopied(true);
			toast.success("Tautan berhasil disalin!");
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error("Failed to copy:", err);
			toast.error("Gagal menyalin tautan");
		}
	};

	const shareOptions = [
		{
			name: "Salin",
			icon: copied ? "copy" : "link",
			color: "bg-gray-200 dark:bg-gray-700",
			hoverColor: "hover:bg-gray-300 dark:hover:bg-gray-600",
			onClick: handleCopyLink,
			isCopy: true,
		},
		{
			name: "X",
			url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
			color: "bg-black",
			hoverColor: "hover:bg-gray-800",
			network: "x",
		},
		{
			name: "Facebook",
			url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
			color: "bg-[#1877F2]",
			hoverColor: "hover:bg-[#166FE5]",
			network: "facebook",
		},
		{
			name: "WhatsApp",
			url: `https://wa.me/?text=${encodeURIComponent(`${title}\n${url}`)}`,
			color: "bg-[#25D366]",
			hoverColor: "hover:bg-[#20BA5C]",
			network: "whatsapp",
		},
		{
			name: "LinkedIn",
			url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
			color: "bg-[#0A66C2]",
			hoverColor: "hover:bg-[#095195]",
			network: "linkedin",
		},
		{
			name: "Telegram",
			url: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
			color: "bg-[#0088cc]",
			hoverColor: "hover:bg-[#0077b3]",
			network: "telegram",
		},
	];

	const contentClass = isMobile
		? "w-full border-0 bg-white dark:bg-gray-900 p-0 rounded-t-3xl max-h-[90vh] overflow-y-auto"
		: "w-full max-w-md border-0 bg-white dark:bg-gray-900 p-0 rounded-xl shadow-xl";

	return (
		<Dialog onOpenChange={(open) => !open && onClose()} open={isOpen}>
			<DialogContent className={contentClass}>
				<VisuallyHidden>
					<DialogTitle>Bagikan kompetisi</DialogTitle>
					<DialogDescription>
						Bagikan kompetisi ini ke media sosial
					</DialogDescription>
				</VisuallyHidden>

				<div className={isMobile ? "p-6" : "p-6"}>
					{/* Header */}
					<div className="mb-6 text-center">
						<h2 className="font-semibold text-gray-900 text-lg dark:text-gray-100">
							Bagikan kompetisi
						</h2>
					</div>

					{/* Link Preview Section */}
					<div className="mx-auto mb-6 max-w-[240px] rounded-2xl border border-gray-200 bg-gray-50 p-4 transition-all duration-300 hover:border-gray-300 hover:bg-white hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600 dark:hover:bg-gray-800">
						<h3 className="mb-1 truncate font-semibold text-gray-900 text-sm dark:text-gray-100">
							{title}
						</h3>
						<p className="mb-2 truncate text-gray-500 text-xs dark:text-gray-400">
							{url}
						</p>
						<p className="text-gray-600 text-xs leading-relaxed dark:text-gray-300">
							Klik tombol di bawah untuk membagikan ke berbagai platform.
						</p>
					</div>

					{/* Social Share Section */}
					<div className="text-center">
						<p className="mb-4 font-semibold text-gray-900 text-sm dark:text-gray-100">
							Bagikan ke
						</p>
						<div className="-mx-6 overflow-x-auto px-6 pb-2">
							<div className="flex min-w-min justify-center gap-3">
								{shareOptions.map((option) => (
									<button
										className="group flex flex-shrink-0 flex-col items-center gap-1.5"
										key={option.name}
										onClick={() => {
											if (option.isCopy) {
												option.onClick?.();
											} else if (option.url) {
												window.open(
													option.url,
													"_blank",
													"width=600,height=400"
												);
												onClose();
											}
										}}
									>
										{option.isCopy ? (
											<div
												className={`${option.color} ${option.hoverColor} flex h-10 w-10 items-center justify-center rounded-full text-gray-700 transition-all group-hover:scale-110 dark:text-gray-200`}
											>
												{copied ? (
													<svg
														className="h-4 w-4"
														fill="none"
														stroke="currentColor"
														strokeWidth={2}
														viewBox="0 0 24 24"
													>
														<path d="M5 13l4 4L19 7" />
													</svg>
												) : (
													<svg
														className="h-4 w-4"
														fill="none"
														stroke="currentColor"
														strokeWidth={2}
														viewBox="0 0 24 24"
													>
														<path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
													</svg>
												)}
											</div>
										) : (
											<SocialIcon
												network={option.network}
												style={{ height: 40, width: 40 }}
											/>
										)}
										<span className="whitespace-nowrap text-center text-gray-700 text-xs dark:text-gray-300">
											{option.name}
										</span>
									</button>
								))}
							</div>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
