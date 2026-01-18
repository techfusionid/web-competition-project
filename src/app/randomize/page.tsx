import { Shuffle } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import AnimatedCardStack from "@/components/ui/animate-card-animation";

export default function RandomizePage() {
	return (
		<div className="min-h-screen flex flex-col bg-background">
			<Header />

			<main className="flex-1 container py-8 md:py-12">
				<div className="text-center mb-8">
					<div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
						<Shuffle className="h-8 w-8 text-primary" />
					</div>
					<h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
						Randomize Competition
					</h1>
					<p className="text-muted-foreground max-w-md mx-auto">
						Not sure which competition to join? Let us pick one
						at random for you!
					</p>
				</div>

				<AnimatedCardStack />
			</main>

			<Footer />
		</div>
	);
}
