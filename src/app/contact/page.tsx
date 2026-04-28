"use client";

import { Mail, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function ContactPage() {
	return (
		<main className="container max-w-4xl py-8">
			<div className="mb-8">
				<h1 className="mb-2 font-bold text-3xl text-foreground">Contact</h1>
				<p className="text-muted-foreground">
					Have questions or want to collaborate? Reach out to us.
				</p>
			</div>

			<section>
				<div className="grid gap-4 sm:grid-cols-2">
					<Card
						className="group cursor-pointer transition-shadow hover:shadow-md"
						onClick={() => window.open("https://wa.me/6281234567890", "_blank")}
					>
						<CardContent className="flex flex-row items-center gap-4 p-6">
							<div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-green-500/10">
								<MessageCircle className="h-7 w-7 text-green-500" />
							</div>
							<div>
								<h3 className="font-semibold text-foreground text-lg">
									WhatsApp
								</h3>
								<p className="text-muted-foreground text-sm">
									Message directly on WhatsApp
								</p>
							</div>
						</CardContent>
					</Card>

					<Card
						className="group cursor-pointer transition-shadow hover:shadow-md"
						onClick={() => {
							window.location.href = "mailto:hello@techfusion.id";
						}}
					>
						<CardContent className="flex flex-row items-center gap-4 p-6">
							<div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-red-500/10">
								<Mail className="h-7 w-7 text-red-500" />
							</div>
							<div>
								<h3 className="font-semibold text-foreground text-lg">Email</h3>
								<p className="text-muted-foreground text-sm">
									Send us an email
								</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</section>
		</main>
	);
}
