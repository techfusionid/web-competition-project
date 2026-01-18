import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

interface OrganizerCardProps {
	title: string;
	image: string;
	description: string;
	href: string;
}

export function OrganizerCard({
	title,
	image,
	description,
	href,
}: OrganizerCardProps) {
	return (
		<Card className="group overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm">
			<Link href={href} className="block">
				<CardContent>
					{/* Image at top */}
					<div className="h-12 w-12 rounded-lg overflow-hidden mb-4">
						<img
							src={image}
							alt={title}
							className="h-full w-full object-cover"
						/>
					</div>

					{/* Title */}
					<h3 className="font-semibold text-foreground text-base mb-2">
						{title}
					</h3>

					{/* Description */}
					<p className="text-sm text-muted-foreground/70 mb-4 line-clamp-2">
						{description}
					</p>
				</CardContent>
			</Link>
		</Card>
	);
}
