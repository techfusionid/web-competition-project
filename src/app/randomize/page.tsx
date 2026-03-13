import { Shuffle } from "lucide-react";
import AnimatedCardStack from "@/components/ui/animate-card-animation";

export default function RandomizePage() {
	return (
		<main className="container py-8 md:py-12">
			<div className="mb-8 text-center">
				<div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
					<Shuffle className="h-8 w-8 text-primary" />
				</div>
				<h1 className="mb-2 font-bold text-3xl text-foreground md:text-4xl">
					Randomize Competition
				</h1>
				<p className="mx-auto max-w-md text-muted-foreground">
					Not sure which competition to join? Let us pick one at random for you!
				</p>
			</div>

			<AnimatedCardStack />
		</main>
	);
}
