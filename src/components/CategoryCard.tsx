import type { LucideIcon } from "lucide-react";
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
		<Link className="group" href={href}>
			<Card className="h-full border-border/50 bg-card/50 shadow-none backdrop-blur-sm transition-all hover:border-neutral-500">
				<CardContent className="flex items-center gap-3">
					<Icon className={`h-6 w-6 ${color} shrink-0`} />
					<div className="flex min-w-0 flex-col">
						<h3 className="truncate font-semibold text-base text-foreground">
							{title}
						</h3>
						<p className="text-muted-foreground/70 text-xs">{count}</p>
					</div>
				</CardContent>
			</Card>
		</Link>
	);
}
