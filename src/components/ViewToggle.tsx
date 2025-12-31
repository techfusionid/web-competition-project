import { LayoutGrid, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ViewMode = "grid" | "poster";

interface ViewToggleProps {
	viewMode: ViewMode;
	onViewModeChange: (mode: ViewMode) => void;
}

export function ViewToggle({ viewMode, onViewModeChange }: ViewToggleProps) {
	return (
		<div className="flex items-center rounded-md border border-border bg-background">
			<Button
				variant="ghost"
				size="sm"
				onClick={() => onViewModeChange("grid")}
				className={cn(
					"h-8 rounded-r-none px-3",
					viewMode === "grid" && "bg-secondary",
				)}
			>
				<LayoutGrid className="h-4 w-4" />
			</Button>
			<Button
				variant="ghost"
				size="sm"
				onClick={() => onViewModeChange("poster")}
				className={cn(
					"h-8 rounded-l-none px-3",
					viewMode === "poster" && "bg-secondary",
				)}
			>
				<Image className="h-4 w-4" />
			</Button>
		</div>
	);
}
