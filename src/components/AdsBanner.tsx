export function AdsBanner() {
	return (
		<div className="w-full border-y border-border bg-muted/30">
			<div className="container">
				{/* Ads placeholder - replace with actual ad component */}
				<div className="flex h-20 md:h-24 items-center justify-center">
					<div className="w-full h-full max-w-5xl mx-auto bg-secondary/50 rounded-lg flex items-center justify-center border border-dashed border-border">
						<span className="text-xs text-muted-foreground">
							Advertisement
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
