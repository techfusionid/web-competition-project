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
		<Link href={href}>
			<Card className="group cursor-pointer overflow-hidden border-border/50 bg-card/50 shadow-none backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-md">
				<CardContent>
					{/* Image at top */}
					<div className="mb-4 h-12 w-12 overflow-hidden rounded-lg">
						<img
							alt={title}
							className="h-full w-full object-cover"
							src={image}
						/>
					</div>

					{/* Title */}
					<h3 className="mb-2 font-semibold text-base text-foreground">
						{title}
					</h3>

					{/* Description */}
					<p className="line-clamp-2 text-muted-foreground/70 text-sm">
						{description}
					</p>
				</CardContent>
			</Card>
		</Link>
	);
}
