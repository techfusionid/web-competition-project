import { Suspense } from "react";
import { HomeContent } from "./home-content";

export default function Home() {
	return (
		<div className="flex min-h-screen flex-col bg-background">
			<Suspense fallback={<div className="container py-12">Loading...</div>}>
				<HomeContent />
			</Suspense>
		</div>
	);
}
