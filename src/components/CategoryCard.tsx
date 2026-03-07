import { type LucideIcon } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

interface CategoryCardProps {
	title: string;
	icon: LucideIcon;
	color: string;
	count: string;
	href: string;
}

export function CategoryCard({
	title,
	icon: Icon,
	color,
	count,
	href,
}: CategoryCardProps) {
	return (
		<Link href={href} className="group">
			<Card className="h-full shadow-none transition-all hover:border-neutral-500 border-border/50 bg-card/50 backdrop-blur-sm">
				<CardContent className="flex items-center gap-3">
					<Icon className={`h-6 w-6 ${color} shrink-0`} />
					<div className="flex flex-col min-w-0">
						<h3 className="font-semibold text-foreground text-base truncate">
							{title}
						</h3>
						<p className="text-xs text-muted-foreground/70">{count}</p>
					</div>
				</CardContent>
			</Card>
		</Link>
	);
}
