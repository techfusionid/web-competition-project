import { Check } from "lucide-react";
import { useState } from "react";
import { CenterViewIcon } from "@/components/icons/center-view-icon";
import { SideViewIcon } from "@/components/icons/side-view-icon";
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
				<button
					aria-label="Change view"
					className="rounded-lg p-1 transition-colors hover:bg-accent"
					type="button"
				>
					{detailViewMode === "dialog" ? (
						<CenterViewIcon className="h-6 w-6 text-primary" />
					) : (
						<SideViewIcon className="h-6 w-6 text-primary" />
					)}
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-40">
				<DropdownMenuItem
					className="flex cursor-pointer items-center justify-between"
					onClick={() => handleSelect("dialog")}
				>
					<span className="flex items-center gap-2">
						<CenterViewIcon className="h-12 w-12 text-primary" />
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
						<SideViewIcon className="h-12 w-12 text-primary" />
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
