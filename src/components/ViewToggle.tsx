import { Image, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ViewMode = "card" | "poster";

interface ViewToggleProps {
	viewMode: ViewMode;
	onViewModeChange: (mode: ViewMode) => void;
}

export function ViewToggle({ viewMode, onViewModeChange }: ViewToggleProps) {
	return (
		<div className="flex items-center rounded-md border border-border bg-background">
			<Button
				className={cn(
					"h-8 rounded-r-none px-3",
					viewMode === "card" && "bg-secondary"
				)}
				onClick={() => onViewModeChange("card")}
				size="sm"
				variant="ghost"
			>
				<LayoutGrid className="h-4 w-4" />
			</Button>
			<Button
				className={cn(
					"h-8 rounded-l-none px-3",
					viewMode === "poster" && "bg-secondary"
				)}
				onClick={() => onViewModeChange("poster")}
				size="sm"
				variant="ghost"
			>
				<Image className="h-4 w-4" />
			</Button>
		</div>
	);
}
