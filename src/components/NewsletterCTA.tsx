import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Star, Users } from "lucide-react";
import { toast } from "sonner";

export function NewsletterCTA() {
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!email.trim()) {
			toast.error("Masukkan alamat email");
			return;
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			toast.error("Format email tidak valid");
			return;
		}

		setIsLoading(true);

		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 1000));

		toast.success(
			"Berhasil berlangganan! Kami akan kirim info lomba terbaru ke email kamu.",
		);
		setEmail("");
		setIsLoading(false);
	};

	return (
		<div className="mt-8">
			<form
				onSubmit={handleSubmit}
				className="mx-auto flex max-w-md items-center gap-0 overflow-hidden rounded-lg border border-border bg-card"
			>
				<Input
					type="email"
					placeholder="Masukkan email kamu"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="h-11 flex-1 border-0 bg-transparent text-sm shadow-none focus-visible:ring-0"
					disabled={isLoading}
				/>
				<Button
					type="submit"
					className="h-11 rounded-l-none px-5 text-sm font-medium"
					disabled={isLoading}
				>
					{isLoading ? "Loading..." : "Berlangganan"}
				</Button>
			</form>

			<div className="mt-4 flex items-center justify-center gap-6 text-sm text-muted-foreground">
				<div className="flex items-center gap-1.5">
					<div className="flex -space-x-2">
						<div className="h-6 w-6 rounded-full border-2 border-background bg-secondary" />
						<div className="h-6 w-6 rounded-full border-2 border-background bg-secondary" />
						<div className="h-6 w-6 rounded-full border-2 border-background bg-secondary" />
					</div>
					<div className="flex items-center gap-0.5 text-warning">
						{[...Array(5)].map((_, i) => (
							<Star key={i} className="h-3 w-3 fill-current" />
						))}
					</div>
					<span className="text-xs">10K+ pelajar bergabung</span>
				</div>
			</div>
		</div>
	);
}
