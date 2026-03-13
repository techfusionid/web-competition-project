import { cn } from "@/lib/utils";
import type { CompetitionStatus } from "@/types/competition";

interface StatusBadgeProps {
	status: CompetitionStatus;
	className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
	const statusConfig = {
		open: {
			label: "Open",
			color: "text-emerald-600 dark:text-emerald-400",
		},
		"closing-soon": {
			label: "Closing Soon",
			color: "text-amber-600 dark:text-amber-400",
		},
		closed: {
			label: "Closed",
			color: "text-muted-foreground",
		},
	};

	const config = statusConfig[status];

	return (
		<span className={cn("text-xs", config.color, className)}>
			{config.label}
		</span>
	);
}
