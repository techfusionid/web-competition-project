import { Check, Copy, Facebook, MessageCircle, Share2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
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
			color: "bg-green-500 hover:bg-green-600",
			onClick: () => {
				const text = encodeURIComponent(`${title}\n${url}`);
				window.open(`https://wa.me/?text=${text}`, "_blank");
				onClose();
			},
		},
		{
			name: "Facebook",
			icon: Facebook,
			color: "bg-blue-600 hover:bg-blue-700",
			onClick: () => {
				window.open(
					`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
					"_blank"
				);
				onClose();
			},
		},
		{
			name: "Twitter/X",
			icon: () => (
				<svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
					<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
				</svg>
			),
			color: "bg-foreground hover:bg-foreground/90",
			onClick: () => {
				const text = encodeURIComponent(title);
				window.open(
					`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`,
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
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error("Failed to copy:", err);
		}
	};

	return (
		<Dialog onOpenChange={(open) => !open && onClose()} open={isOpen}>
			<DialogContent className="sm:max-w-md pt-10">
				<DialogHeader className="pr-8">
					<DialogTitle className="flex items-center gap-2">
						<Share2 className="h-5 w-5" />
						Bagikan Kompetisi
					</DialogTitle>
				</DialogHeader>

				<div className="space-y-4">
					<p className="text-sm text-muted-foreground line-clamp-2">{title}</p>

					<div className="grid grid-cols-3 gap-3">
						{shareOptions.map((option) => {
							const Icon = option.icon;
							return (
								<Button
									className={cn(
										"flex flex-col items-center justify-center gap-2 h-20 text-primary-foreground",
										option.color
									)}
									key={option.name}
									onClick={option.onClick}
									variant="ghost"
								>
									<Icon className="h-5 w-5" />
									<span className="text-xs">{option.name}</span>
								</Button>
							);
						})}
					</div>

					<div className="flex items-center gap-2 rounded-lg border border-border bg-muted p-2">
						<input
							className="flex-1 bg-transparent text-sm text-foreground outline-none"
							readOnly
							type="text"
							value={url}
						/>
						<Button
							className="shrink-0"
							onClick={handleCopyLink}
							size="sm"
							variant="ghost"
						>
							{copied ? (
								<Check className="h-4 w-4 text-success" />
							) : (
								<Copy className="h-4 w-4" />
							)}
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
