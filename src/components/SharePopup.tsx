"use client";

import { useState, useEffect } from "react";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import {
	Copy,
	Check,
	Facebook,
	Twitter,
	MessageCircle,
	Send,
	Linkedin,
	Mail,
	Share2,
} from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { toast } from "sonner";

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
		<Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
			<DialogContent className={contentClass}>
				<VisuallyHidden>
					<DialogTitle>Bagikan kompetisi</DialogTitle>
					<DialogDescription>
						Bagikan kompetisi ini ke media sosial
					</DialogDescription>
				</VisuallyHidden>

				<div className={isMobile ? "p-6" : "p-6"}>
					{/* Header */}
					<div className="text-center mb-6">
						<h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
							Bagikan kompetisi
						</h2>
					</div>

					{/* Link Preview Section */}
					<div className="mb-6 mx-auto max-w-[240px] rounded-2xl bg-gray-50 dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600 hover:bg-white dark:hover:bg-gray-800">
						<h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-1 truncate">
							{title}
						</h3>
						<p className="text-xs text-gray-500 dark:text-gray-400 mb-2 truncate">
							{url}
						</p>
						<p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
							Klik tombol di bawah untuk membagikan ke berbagai platform.
						</p>
					</div>

					{/* Social Share Section */}
					<div className="text-center">
						<p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
							Bagikan ke
						</p>
						<div className="overflow-x-auto -mx-6 px-6 pb-2">
							<div className="flex gap-3 min-w-min justify-center">
								{shareOptions.map((option) => {
									const Icon = option.icon;
									return (
										<button
											key={option.name}
											onClick={option.onClick}
											className="flex flex-col items-center gap-1.5 group flex-shrink-0"
										>
											<div
												className={`${option.color} ${option.hoverColor} h-10 w-10 rounded-full flex items-center justify-center transition-all group-hover:scale-110 text-white`}
											>
												<Icon className="h-4 w-4" />
											</div>
											<span className="text-xs text-gray-700 dark:text-gray-300 text-center whitespace-nowrap">
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
