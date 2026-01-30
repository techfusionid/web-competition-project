import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Instagram, Linkedin, MapPin } from "lucide-react";

export default function ProfilePage() {
	return (
		<div className="container min-h-screen py-10">
			{/* Profile Header */}
			<div className="mb-10 flex flex-col items-center gap-6 sm:flex-row sm:items-start">
				<Avatar className="h-32 w-32 border-4 border-background shadow-lg">
					<AvatarImage
						alt="Agnes Devita Widjaja"
						src="https://github.com/shadcn.png" 
					/>
					<AvatarFallback>AD</AvatarFallback>
				</Avatar>

				<div className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
					<div>
						<h1 className="text-3xl font-bold">Agnes Devita Widjaja</h1>
						<p className="text-muted-foreground">@agnesdevita</p>
					</div>

					<div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground sm:justify-start">
						<div className="flex items-center gap-1">
							<Calendar className="h-4 w-4" />
							<span>Joined May 2025</span>
						</div>
					</div>

					<div className="flex items-center gap-4">
						<div className="flex items-center gap-1">
							<span className="font-bold text-foreground">5</span>
							<span className="text-muted-foreground">Hosted</span>
						</div>
						<div className="flex items-center gap-1">
							<span className="font-bold text-foreground">16</span>
							<span className="text-muted-foreground">Attended</span>
						</div>
					</div>

					<div className="flex items-center gap-2 mt-2">
						{/* Mock Links - only render if exists. For now hardcoding "hasLink" logic */}
						<Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-foreground">
							<Instagram className="h-5 w-5" />
						</Button>
						<Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-foreground">
							<Linkedin className="h-5 w-5" />
						</Button>
                        {/* Example of a missing link: X/Twitter is not rendered if not present */}
					</div>
				</div>
			</div>

			<div className="space-y-10">
				{/* Hosting Section */}
				<section>
					<h2 className="mb-6 text-xl font-bold">Hosting</h2>
					<div className="grid gap-4">
						<Card className="overflow-hidden border-border/50 bg-card/50 transition-colors hover:bg-card/80">
							<CardContent className="flex flex-col gap-4 p-4 sm:flex-row">
								<div className="relative h-32 w-full shrink-0 overflow-hidden rounded-lg bg-muted sm:w-32">
									{/* Placeholder for event image */}
									<div className="flex h-full w-full items-center justify-center bg-zinc-800 text-zinc-500">
										<div className="text-center text-xs">
											<div className="mb-1 text-2xl font-bold">Cafe Cursor</div>
											<div>Tangerang</div>
										</div>
									</div>
								</div>
								
								<div className="flex flex-col justify-center gap-1">
									<div className="text-sm text-muted-foreground">
										Sat 28 Mar, 10:00
									</div>
									<h3 className="text-lg font-bold">Cafe Cursor Tangerang</h3>
									
									<div className="flex items-center gap-2 mt-1 mb-2">
										<div className="flex -space-x-2">
											<Avatar className="h-6 w-6 border-2 border-background">
												<AvatarImage src="https://github.com/shadcn.png" />
												<AvatarFallback>AI</AvatarFallback>
											</Avatar>
											<Avatar className="h-6 w-6 border-2 border-background">
												<AvatarImage src="https://github.com/shadcn.png" />
												<AvatarFallback>AD</AvatarFallback>
											</Avatar>
										</div>
										<span className="text-sm text-muted-foreground">
											By Aurelius Ivan Wijaya & Agnes Devita Widjaja
										</span>
									</div>
									
									<div className="flex items-center gap-2">
										<Badge variant="secondary" className="bg-zinc-800 text-zinc-300 hover:bg-zinc-700">
											Madjapahit Styles
										</Badge>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</section>

				{/* Past Events Section */}
				<section>
					<h2 className="mb-6 text-xl font-bold">Past Events</h2>
					<div className="grid gap-4">
						<Card className="overflow-hidden border-border/50 bg-card/50 transition-colors hover:bg-card/80">
							<CardContent className="flex flex-col gap-4 p-4 sm:flex-row">
								<div className="relative h-32 w-full shrink-0 overflow-hidden rounded-lg bg-blue-900 sm:w-32">
									{/* Placeholder for event image */}
									<div className="flex h-full w-full items-center justify-center p-2 text-center text-xs text-white">
										Scale Your Product And Expertise with AI
									</div>
								</div>
								
								<div className="flex flex-col justify-center gap-1">
									<div className="text-sm text-muted-foreground">
										Thu 22 Jan, 18:00
									</div>
									<h3 className="text-lg font-bold">
										Scale Your Product & Expertise with AI
									</h3>
									
									<div className="flex items-center gap-2 mt-1 mb-2">
										<div className="flex -space-x-2">
											<Avatar className="h-6 w-6 border-2 border-background">
												<AvatarFallback>IP</AvatarFallback>
											</Avatar>
											<Avatar className="h-6 w-6 border-2 border-background">
												<AvatarFallback>QB</AvatarFallback>
											</Avatar>
										</div>
										<span className="line-clamp-1 text-sm text-muted-foreground">
											By Irvan Putra, Septianus Angga, QuantumByte, Annie Liao & 4 oth...
										</span>
									</div>
									
									<div className="flex items-center gap-1 text-sm text-muted-foreground">
										<MapPin className="h-3.5 w-3.5" />
										<span>Wisma Barito Pacific II</span>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</section>
			</div>
		</div>
	);
}
