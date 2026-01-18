import { type LucideIcon } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

interface DiscoverCardProps {
	title: string;
	description: string;
	href: string;
	icon: LucideIcon;
	iconColor?: string;
	iconBgColor?: string;
}

export function DiscoverCard({
	title,
	description,
	href,
	icon: Icon,
	iconColor = "text-primary",
	iconBgColor = "bg-primary/10",
}: DiscoverCardProps) {
	return (
		<Link href={href}>
			<Card className="h-full transition-all hover:shadow-lg hover:border-primary/50 group cursor-pointer">
				<CardContent className="p-6">
					<div className="flex flex-col items-center text-center gap-4">
						<div
							className={`flex h-16 w-16 items-center justify-center rounded-xl ${iconBgColor} group-hover:scale-110 transition-transform`}
						>
							<Icon className={`h-8 w-8 ${iconColor}`} />
						</div>
						<div>
							<h3 className="text-lg font-semibold text-foreground mb-1">
								{title}
							</h3>
							<p className="text-sm text-muted-foreground">{description}</p>
						</div>
					</div>
				</CardContent>
			</Card>
		</Link>
	);
}
