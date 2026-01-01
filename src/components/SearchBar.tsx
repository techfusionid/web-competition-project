import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface SearchBarProps {
	value: string;
	onChange: (value: string) => void;
	sortBy: string;
	onSortChange: (value: string) => void;
	resultCount: number;
	onToggleFilters: () => void;
	showFilters: boolean;
}

export function SearchBar({
	value,
	onChange,
	sortBy,
	onSortChange,
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
					placeholder="Cari kompetisi..."
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
			<Select onValueChange={onSortChange} value={sortBy}>
				<SelectTrigger className="h-9 w-[120px] gap-1 border-0 bg-secondary text-xs">
					<SelectValue placeholder="Order by" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="deadline">Deadline</SelectItem>
					<SelectItem value="name">Nama</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
}
