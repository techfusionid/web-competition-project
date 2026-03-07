import { Check, Maximize2, Sidebar } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type DetailViewMode = "dialog" | "sheet";

interface DetailViewToggleProps {
	detailViewMode: DetailViewMode;
	onDetailViewModeChange: (mode: DetailViewMode) => void;
}

export function DetailViewToggle({
	detailViewMode,
	onDetailViewModeChange,
}: DetailViewToggleProps) {
	const [open, setOpen] = useState(false);

	const handleSelect = (mode: DetailViewMode) => {
		onDetailViewModeChange(mode);
		setOpen(false);
	};

	return (
		<DropdownMenu onOpenChange={setOpen} open={open}>
			<DropdownMenuTrigger asChild>
				<Button
					aria-label="Change view"
					className="h-8 w-8 rounded-full"
					size="icon"
					variant="ghost"
				>
					{detailViewMode === "dialog" ? (
						<Maximize2 className="h-4 w-4" />
					) : (
						<Sidebar className="h-4 w-4" />
					)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-40">
				<DropdownMenuItem
					className="flex cursor-pointer items-center justify-between"
					onClick={() => handleSelect("dialog")}
				>
					<span className="flex items-center gap-2">
						<Maximize2 className="h-4 w-4" />
						<span>Center View</span>
					</span>
					{detailViewMode === "dialog" && (
						<Check className="h-4 w-4 text-primary" />
					)}
				</DropdownMenuItem>
				<DropdownMenuItem
					className="flex cursor-pointer items-center justify-between"
					onClick={() => handleSelect("sheet")}
				>
					<span className="flex items-center gap-2">
						<Sidebar className="h-4 w-4" />
						<span>Side View</span>
					</span>
					{detailViewMode === "sheet" && (
						<Check className="h-4 w-4 text-primary" />
					)}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
