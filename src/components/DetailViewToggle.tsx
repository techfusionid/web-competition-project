import { Maximize2, PanelRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type DetailViewMode = "popup" | "sidebar";

interface DetailViewToggleProps {
	detailViewMode: DetailViewMode;
	onDetailViewModeChange: (mode: DetailViewMode) => void;
}

export function DetailViewToggle({
	detailViewMode,
	onDetailViewModeChange,
}: DetailViewToggleProps) {
	return (
		<div className="flex items-center rounded-md border border-border bg-background">
			<Button
				className={cn(
					"h-8 rounded-r-none px-3",
					detailViewMode === "popup" && "bg-secondary"
				)}
				onClick={() => onDetailViewModeChange("popup")}
				size="sm"
				variant="ghost"
				title="Detail in popup with up/down arrows"
			>
				<Maximize2 className="h-4 w-4" />
			</Button>
			<Button
				className={cn(
					"h-8 rounded-l-none px-3",
					detailViewMode === "sidebar" && "bg-secondary"
				)}
				onClick={() => onDetailViewModeChange("sidebar")}
				size="sm"
				variant="ghost"
				title="Detail in right sidebar"
			>
				<PanelRight className="h-4 w-4" />
			</Button>
		</div>
	);
}
