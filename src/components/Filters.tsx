import { ChevronDown, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	CATEGORIES,
	LEVELS,
	CompetitionLevel,
	CompetitionFormat,
	ParticipationType,
	CompetitionStatus,
} from "@/types/competition";

export interface FilterState {
	categories: string[];
	levels: CompetitionLevel[];
	format: CompetitionFormat | "all";
	participationType: ParticipationType | "all";
	status: CompetitionStatus | "all";
}

interface FiltersProps {
	filters: FilterState;
	onFiltersChange: (filters: FilterState) => void;
	onClearFilters: () => void;
}

export function Filters({
	filters,
	onFiltersChange,
	onClearFilters,
}: FiltersProps) {
	const hasActiveFilters =
		filters.categories.length > 0 ||
		filters.levels.length > 0 ||
		filters.format !== "all" ||
		filters.participationType !== "all" ||
		filters.status !== "all";

	const formatOptions: { value: CompetitionFormat | "all"; label: string }[] = [
		{ value: "all", label: "Semua" },
		{ value: "online", label: "Online" },
		{ value: "offline", label: "Offline" },
		{ value: "hybrid", label: "Hybrid" },
	];

	const participationOptions: {
		value: ParticipationType | "all";
		label: string;
	}[] = [
		{ value: "all", label: "Semua" },
		{ value: "individual", label: "Individual" },
		{ value: "team", label: "Tim" },
	];

	return (
		<div className="rounded-lg border border-border bg-card p-4">
			<div className="flex items-center justify-between mb-3">
				<h3 className="text-sm font-semibold text-foreground">Filter</h3>
				{hasActiveFilters && (
					<button
						onClick={onClearFilters}
						className="text-xs text-muted-foreground hover:text-foreground transition-colors"
					>
						Reset
					</button>
				)}
			</div>

			<div className="flex flex-wrap gap-2">
				{/* Kategori Filter */}
				<Popover>
					<PopoverTrigger asChild>
						<Button variant="outline" size="sm" className="h-8 gap-1.5">
							Kategori
							{filters.categories.length > 0 && (
								<span className="ml-1 rounded-full bg-primary px-1.5 py-0.5 text-[10px] text-primary-foreground">
									{filters.categories.length}
								</span>
							)}
							<ChevronDown className="h-3.5 w-3.5" />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-48 p-3" align="start">
						<div className="space-y-2 max-h-60 overflow-y-auto">
							{CATEGORIES.map((cat) => (
								<div key={cat} className="flex items-center space-x-2">
									<Checkbox
										id={`cat-${cat}`}
										checked={filters.categories.includes(cat)}
										onCheckedChange={(checked) => {
											if (checked) {
												onFiltersChange({
													...filters,
													categories: [...filters.categories, cat],
												});
											} else {
												onFiltersChange({
													...filters,
													categories: filters.categories.filter(
														(c) => c !== cat,
													),
												});
											}
										}}
									/>
									<Label
										htmlFor={`cat-${cat}`}
										className="text-sm text-muted-foreground cursor-pointer"
									>
										{cat}
									</Label>
								</div>
							))}
						</div>
					</PopoverContent>
				</Popover>

				{/* Tingkat Filter */}
				<Popover>
					<PopoverTrigger asChild>
						<Button variant="outline" size="sm" className="h-8 gap-1.5">
							Tingkat
							{filters.levels.length > 0 && (
								<span className="ml-1 rounded-full bg-primary px-1.5 py-0.5 text-[10px] text-primary-foreground">
									{filters.levels.length}
								</span>
							)}
							<ChevronDown className="h-3.5 w-3.5" />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-48 p-3" align="start">
						<div className="space-y-2">
							{LEVELS.map((lvl) => (
								<div key={lvl.value} className="flex items-center space-x-2">
									<Checkbox
										id={`lvl-${lvl.value}`}
										checked={filters.levels.includes(lvl.value)}
										onCheckedChange={(checked) => {
											if (checked) {
												onFiltersChange({
													...filters,
													levels: [...filters.levels, lvl.value],
												});
											} else {
												onFiltersChange({
													...filters,
													levels: filters.levels.filter((l) => l !== lvl.value),
												});
											}
										}}
									/>
									<Label
										htmlFor={`lvl-${lvl.value}`}
										className="text-sm text-muted-foreground cursor-pointer"
									>
										{lvl.label}
									</Label>
								</div>
							))}
						</div>
					</PopoverContent>
				</Popover>

				{/* Format Filter */}
				<Popover>
					<PopoverTrigger asChild>
						<Button variant="outline" size="sm" className="h-8 gap-1.5">
							Format
							{filters.format !== "all" && (
								<span className="ml-1 rounded-full bg-primary px-1.5 py-0.5 text-[10px] text-primary-foreground">
									1
								</span>
							)}
							<ChevronDown className="h-3.5 w-3.5" />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-40 p-3" align="start">
						<div className="space-y-2">
							{formatOptions.map((opt) => (
								<div key={opt.value} className="flex items-center space-x-2">
									<Checkbox
										id={`format-${opt.value}`}
										checked={filters.format === opt.value}
										onCheckedChange={(checked) => {
											if (checked) {
												onFiltersChange({ ...filters, format: opt.value });
											}
										}}
									/>
									<Label
										htmlFor={`format-${opt.value}`}
										className="text-sm text-muted-foreground cursor-pointer"
									>
										{opt.label}
									</Label>
								</div>
							))}
						</div>
					</PopoverContent>
				</Popover>

				{/* Partisipasi Filter */}
				<Popover>
					<PopoverTrigger asChild>
						<Button variant="outline" size="sm" className="h-8 gap-1.5">
							Partisipasi
							{filters.participationType !== "all" && (
								<span className="ml-1 rounded-full bg-primary px-1.5 py-0.5 text-[10px] text-primary-foreground">
									1
								</span>
							)}
							<ChevronDown className="h-3.5 w-3.5" />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-40 p-3" align="start">
						<div className="space-y-2">
							{participationOptions.map((opt) => (
								<div key={opt.value} className="flex items-center space-x-2">
									<Checkbox
										id={`part-${opt.value}`}
										checked={filters.participationType === opt.value}
										onCheckedChange={(checked) => {
											if (checked) {
												onFiltersChange({
													...filters,
													participationType: opt.value,
												});
											}
										}}
									/>
									<Label
										htmlFor={`part-${opt.value}`}
										className="text-sm text-muted-foreground cursor-pointer"
									>
										{opt.label}
									</Label>
								</div>
							))}
						</div>
					</PopoverContent>
				</Popover>
			</div>
		</div>
	);
}
