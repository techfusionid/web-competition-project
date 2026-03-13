"use client";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
	Check,
	Copy,
	Facebook,
	Linkedin,
	MessageCircle,
	Send,
	Twitter,
} from "lucide-react";
import { useEffect, useState } from "react";
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
			icon: copied ? Check : Copy,
			color: "bg-gray-200 dark:bg-gray-700",
			hoverColor: "hover:bg-gray-300 dark:hover:bg-gray-600",
			onClick: handleCopyLink,
		},
		{
			name: "X",
			icon: Twitter,
			color: "bg-black",
			hoverColor: "hover:bg-gray-800",
			onClick: () => {
				const text = encodeURIComponent(title);
				const shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`;
				window.open(shareUrl, "_blank", "width=600,height=400");
				onClose();
			},
		},
		{
			name: "Facebook",
			icon: Facebook,
			color: "bg-[#1877F2]",
			hoverColor: "hover:bg-[#166FE5]",
			onClick: () => {
				const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
				window.open(shareUrl, "_blank", "width=600,height=400");
				onClose();
			},
		},
		{
			name: "WhatsApp",
			icon: MessageCircle,
			color: "bg-[#25D366]",
			hoverColor: "hover:bg-[#20BA5C]",
			onClick: () => {
				const text = encodeURIComponent(`${title}\n${url}`);
				const shareUrl = `https://wa.me/?text=${text}`;
				window.open(shareUrl, "_blank", "width=600,height=400");
				onClose();
			},
		},
		{
			name: "LinkedIn",
			icon: Linkedin,
			color: "bg-[#0A66C2]",
			hoverColor: "hover:bg-[#095195]",
			onClick: () => {
				const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
				window.open(shareUrl, "_blank", "width=600,height=400");
				onClose();
			},
		},
		{
			name: "Telegram",
			icon: Send,
			color: "bg-[#0088cc]",
			hoverColor: "hover:bg-[#0077b3]",
			onClick: () => {
				const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
				window.open(shareUrl, "_blank", "width=600,height=400");
				onClose();
			},
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
								{shareOptions.map((option) => {
									const Icon = option.icon;
									return (
										<button
											className="group flex flex-shrink-0 flex-col items-center gap-1.5"
											key={option.name}
											onClick={option.onClick}
										>
											<div
												className={`${option.color} ${option.hoverColor} flex h-10 w-10 items-center justify-center rounded-full text-white transition-all group-hover:scale-110`}
											>
												<Icon className="h-4 w-4" />
											</div>
											<span className="whitespace-nowrap text-center text-gray-700 text-xs dark:text-gray-300">
												{option.name}
											</span>
										</button>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
