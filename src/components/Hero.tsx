import { AuroraText } from "@/components/ui/aurora-text";

export function Hero() {
	return (
		<section className="relative overflow-hidden border-border py-10 md:py-14">
			<div className="container relative z-10">
				<div className="mx-auto flex max-w-200 flex-col items-center space-y-4 text-center">
					<a
						className="inline-block cursor-pointer rounded bg-neutral-200 px-2 py-1 font-light text-xs transition-colors hover:bg-muted dark:bg-[#120C24] dark:text-white"
						href="https://techfusion.id"
						rel="noopener noreferrer"
						target="_blank"
					>
						Built by{" "}
						<span className="font-bold tracking-wide">#Techfusion</span>
					</a>
					<h1 className="text-balance pb-6 font-bold text-4xl text-foreground sm:text-4xl md:text-5xl lg:text-7xl">
						One-stop platform to find best <AuroraText>competition</AuroraText>{" "}
						and team for you!
					</h1>
					<p className="text-balance text-lg text-muted-foreground md:text-xl">
						Over 500+ competitions from various categories. Build your
						portfolio, sharpen your skills, and achieve excellence !
					</p>
				</div>
			</div>
		</section>
	);
}
