import { AuroraText } from "@/components/ui/aurora-text";

export function Hero() {
	return (
		<section className="relative overflow-hidden border-border py-8 md:py-14">
			<div className="container relative z-10">
				<div className="mx-auto flex max-w-200 flex-col items-center space-y-3 text-center sm:space-y-4">
					<a
						className="inline-block cursor-pointer rounded bg-neutral-200 px-2 py-1 font-light text-[10px] transition-colors hover:bg-muted sm:text-xs dark:bg-[#120C24] dark:text-white"
						href="https://techfusion.id"
						rel="noopener noreferrer"
						target="_blank"
					>
						Built by{" "}
						<span className="font-bold tracking-wide">#Techfusion</span>
					</a>
					<h1 className="text-balance pb-2 font-semibold text-2xl text-foreground leading-tight sm:pb-4 sm:text-3xl md:text-5xl lg:text-7xl">
						One-stop platform to find best <AuroraText>competition</AuroraText>{" "}
						and team for you!
					</h1>
					<p className="text-balance text-base text-muted-foreground sm:text-lg md:text-md">
						Over 500+ competitions from various categories. Build your
						portfolio, sharpen your skills, and achieve excellence !
					</p>
				</div>
			</div>
		</section>
	);
}
