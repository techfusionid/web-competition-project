import { Check, Copy, Facebook, MessageCircle, Share2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
	Dialog,
	DialogContent,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface SharePopupProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	url: string;
}

export function SharePopup({ isOpen, onClose, title, url }: SharePopupProps) {
	const [copied, setCopied] = useState(false);

	const shareOptions = [
		{
			name: "WhatsApp",
			icon: MessageCircle,
			bgColor: "bg-[#25D366]",
			hoverColor: "hover:bg-[#20bd5a]",
			onClick: () => {
				const text = encodeURIComponent(`${title}\n${url}`);
				window.open(`https://wa.me/?text=${text}`, "_blank");
				onClose();
			},
		},
		{
			name: "Facebook",
			icon: Facebook,
			bgColor: "bg-[#1877F2]",
			hoverColor: "hover:bg-[#1464d4]",
			onClick: () => {
				window.open(
					`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
					"_blank"
				);
				onClose();
			},
		},
		{
			name: "Twitter",
			icon: () => (
				<svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
					<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
				</svg>
			),
			bgColor: "bg-black",
			hoverColor: "hover:bg-gray-900 dark:hover:bg-gray-800",
			onClick: () => {
				const text = encodeURIComponent(title);
				window.open(
					`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`,
					"_blank"
				);
				onClose();
			},
		},
		{
			name: "Telegram",
			icon: () => (
				<svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
					<path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" fillRule="evenodd"/>
				</svg>
			),
			bgColor: "bg-[#0088cc]",
			hoverColor: "hover:bg-[#0077b3]",
			onClick: () => {
				const text = encodeURIComponent(`${title}\n${url}`);
				window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, "_blank");
				onClose();
			},
		},
		{
			name: "LinkedIn",
			icon: () => (
				<svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
					<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
				</svg>
			),
			bgColor: "bg-[#0077b5]",
			hoverColor: "hover:bg-[#006399]",
			onClick: () => {
				window.open(
					`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
					"_blank"
				);
				onClose();
			},
		},
	];

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

	return (
		<Dialog onOpenChange={(open) => !open && onClose()} open={isOpen}>
			<DialogContent
				className="sm:max-w-md gap-0 p-0 overflow-hidden"
				showCloseButton={false}
			>
				{/* Header */}
				<div className="flex items-center justify-between border-b px-5 py-4">
					<div className="flex items-center gap-2">
						<Share2 className="h-5 w-5 text-foreground" />
						<h2 className="font-semibold text-foreground">Bagikan kompetisi</h2>
					</div>
					<button
						className="rounded-full p-1 hover:bg-muted transition-colors"
						onClick={onClose}
					>
						<X className="h-5 w-5 text-muted-foreground" />
					</button>
				</div>

				<div className="p-5 space-y-5">
					{/* Copy Link Section */}
					<div className="space-y-2">
						<label className="text-sm font-medium text-foreground">
							Salin tautan
						</label>
						<div className="flex items-center gap-2 rounded-lg border border-border bg-background p-2">
							<input
								className="flex-1 bg-transparent text-sm text-muted-foreground outline-none truncate"
								readOnly
								type="text"
								value={url}
							/>
							<button
								className={cn(
									"shrink-0 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
									copied
										? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
										: "bg-secondary text-secondary-foreground hover:bg-secondary/80"
								)}
								onClick={handleCopyLink}
							>
								{copied ? (
									<span className="flex items-center gap-1.5">
										<Check className="h-3.5 w-3.5" />
										Tersalin
									</span>
								) : (
									<span className="flex items-center gap-1.5">
										<Copy className="h-3.5 w-3.5" />
										Salin
									</span>
								)}
							</button>
						</div>
					</div>

					{/* Social Media Share */}
					<div className="space-y-3">
						<label className="text-sm font-medium text-foreground">
							Bagikan ke media sosial
						</label>
						<div className="grid grid-cols-5 gap-2">
							{shareOptions.map((option) => {
								const Icon = option.icon;
								return (
									<button
										className={cn(
											"flex flex-col items-center justify-center gap-1.5 rounded-xl p-3 transition-all duration-200 hover:scale-105 active:scale-95",
											option.bgColor,
											option.hoverColor
										)}
										key={option.name}
										onClick={option.onClick}
									>
										<div className="text-white">
											<Icon className="h-5 w-5" />
										</div>
										<span className="text-[10px] font-medium text-white text-center leading-tight">
											{option.name}
										</span>
									</button>
								);
							})}
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
