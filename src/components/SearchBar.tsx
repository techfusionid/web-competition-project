import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
	value: string;
	onChange: (value: string) => void;
	resultCount: number;
	onToggleFilters: () => void;
	showFilters: boolean;
}

export function SearchBar({
	value,
	onChange,
	resultCount,
	onToggleFilters,
	showFilters,
}: SearchBarProps) {
	return (
		<div className="flex items-center gap-2 rounded-lg border border-border bg-card p-1.5">
			<div className="relative flex-1">
				<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
				<Input
					className="h-9 border-0 bg-transparent pl-9 text-sm shadow-none focus-visible:ring-0"
					onChange={(e) => onChange(e.target.value)}
					placeholder="Search competitions..."
					type="text"
					value={value}
				/>
			</div>
			<Button
				className="h-9 gap-1.5 text-xs"
				onClick={onToggleFilters}
				size="sm"
				variant={showFilters ? "secondary" : "outline"}
			>
				<SlidersHorizontal className="h-3.5 w-3.5" />
				Filters
			</Button>
		</div>
	);
}
