import { CompetitionStatus } from "@/types/competition";
import { cn } from "@/lib/utils";
import { Circle } from "lucide-react";

interface StatusBadgeProps {
	status: CompetitionStatus;
	className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
	const statusConfig = {
		open: {
			label: "Open",
			dotColor: "text-success",
		},
		"closing-soon": {
			label: "Closing Soon",
			dotColor: "text-warning",
		},
		closed: {
			label: "Closed",
			dotColor: "text-muted-foreground",
		},
	};

	const config = statusConfig[status];

	return (
		<span
			className={cn(
				"inline-flex items-center gap-1.5 text-xs text-muted-foreground",
				className,
			)}
		>
			<Circle className={cn("h-2 w-2 fill-current", config.dotColor)} />
			{config.label}
		</span>
	);
}
