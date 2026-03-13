"use client";

import {
	ExternalLink,
	Instagram,
	MessageCircle,
	Users,
	Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface InstagramAccount {
	id: string;
	name: string;
	username: string;
	followers: string;
	description: string;
	imageUrl: string;
}

interface WhatsAppChannel {
	id: string;
	name: string;
	members: string;
	description: string;
	link: string;
}

interface Tool {
	id: string;
	name: string;
	category: string;
	description: string;
	iconUrl: string;
	link: string;
	isFree: boolean;
}

const instagramAccounts: InstagramAccount[] = [
	{
		id: "1",
		name: "Info Lomba Indonesia",
		username: "@infolombaid",
		followers: "125K",
		description:
			"Provides the latest competition information for students and learners across Indonesia.",
		imageUrl:
			"https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=100&h=100&fit=crop",
	},
	{
		id: "2",
		name: "Lomba Mahasiswa",
		username: "@lombamahasiswa",
		followers: "89K",
		description:
			"Updates on national and international competitions for university students.",
		imageUrl:
			"https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=100&h=100&fit=crop",
	},
	{
		id: "3",
		name: "Event Kampus",
		username: "@eventkampus",
		followers: "67K",
		description:
			"Information on events, seminars, and competitions from various campuses in Indonesia.",
		imageUrl:
			"https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=100&h=100&fit=crop",
	},
	{
		id: "4",
		name: "Kompetisi Pelajar",
		username: "@kompetisipelajar",
		followers: "45K",
		description:
			"Specifically for high school/SMK students who want to participate in various competitions.",
		imageUrl:
			"https://images.unsplash.com/photo-1611605698335-8b1569810432?w=100&h=100&fit=crop",
	},
	{
		id: "5",
		name: "Lomba Startup",
		username: "@lombastartup",
		followers: "32K",
		description:
			"Information on business, startup, and entrepreneurship competitions for young people.",
		imageUrl:
			"https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=100&h=100&fit=crop",
	},
];

const whatsAppChannels: WhatsAppChannel[] = [
	{
		id: "1",
		name: "Competitions Community",
		members: "5.2K",
		description:
			"Official Competitions channel for the latest competition updates and discussions about competitions.",
		link: "https://whatsapp.com/channel/example",
	},
];

const tools: Tool[] = [
	{
		id: "1",
		name: "Canva",
		category: "Design",
		description:
			"Create posters, banners, and competition promotion materials easily without design skills.",
		iconUrl:
			"https://upload.wikimedia.org/wikipedia/commons/0/08/Canva_icon_2021.svg",
		link: "https://canva.com",
		isFree: true,
	},
	{
		id: "2",
		name: "Google Forms",
		category: "Registration",
		description:
			"Free registration forms with Google Sheets integration for participant data management.",
		iconUrl:
			"https://upload.wikimedia.org/wikipedia/commons/5/5b/Google_Forms_2020_Logo.svg",
		link: "https://forms.google.com",
		isFree: true,
	},
	{
		id: "3",
		name: "Notion",
		category: "Management",
		description:
			"All-in-one workspace for timelines, task management, and competition documentation.",
		iconUrl:
			"https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png",
		link: "https://notion.so",
		isFree: true,
	},
	{
		id: "4",
		name: "Discord",
		category: "Community",
		description:
			"Community platform for participants, committees, and judges with voice & text chat features.",
		iconUrl:
			"https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a69f118df70ad7828d4_icon_clyde_blurple_RGB.svg",
		link: "https://discord.com",
		isFree: true,
	},
	{
		id: "5",
		name: "Zoom",
		category: "Meeting",
		description:
			"Video conferencing platform for presentations, webinars, and online judging.",
		iconUrl:
			"https://upload.wikimedia.org/wikipedia/commons/7/7b/Zoom_Communications_Logo.svg",
		link: "https://zoom.us",
		isFree: false,
	},
	{
		id: "6",
		name: "Trello",
		category: "Management",
		description:
			"Kanban board for tracking committee progress and competition stages.",
		iconUrl: "https://upload.wikimedia.org/wikipedia/en/8/8c/Trello_logo.svg",
		link: "https://trello.com",
		isFree: true,
	},
	{
		id: "7",
		name: "Typeform",
		category: "Registration",
		description:
			"Interactive forms with modern UI for registration and participant surveys.",
		iconUrl:
			"https://images.ctfassets.net/co0pvta7hzrh/4RtOAqTkTZLLJZXxJLjB58/ac0b976d4f83f92a4fb94fec11f5d5dd/typeform-logo.png",
		link: "https://typeform.com",
		isFree: false,
	},
	{
		id: "8",
		name: "Figma",
		category: "Design",
		description:
			"Collaborative design tool for creating mockups and prototypes with your team.",
		iconUrl:
			"https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
		link: "https://figma.com",
		isFree: true,
	},
	{
		id: "9",
		name: "Linktree",
		category: "Link",
		description:
			"Collect all important competition links (registration, info, social media) in one page.",
		iconUrl:
			"https://assets.production.linktr.ee/profiles/_next/static/images/logo-assets/logomark-green-3c3e59.svg",
		link: "https://linktr.ee",
		isFree: true,
	},
	{
		id: "10",
		name: "Lark",
		category: "Collaboration",
		description:
			"Complete collaboration suite with chat, docs, calendar, and video call for committees.",
		iconUrl:
			"https://sf16-scmcdn2-sg.ibytedtos.com/lark-open/file/resource/Lark_logo_blue_6bf2b4.png",
		link: "https://larksuite.com",
		isFree: true,
	},
	{
		id: "11",
		name: "Eventbrite",
		category: "Event",
		description:
			"Event management platform with ticketing and participant check-in features.",
		iconUrl:
			"https://upload.wikimedia.org/wikipedia/commons/6/6e/Eventbrite_Logo.svg",
		link: "https://eventbrite.com",
		isFree: false,
	},
	{
		id: "12",
		name: "Airtable",
		category: "Database",
		description:
			"Visual database for managing participant data, judging, and submission tracking.",
		iconUrl:
			"https://upload.wikimedia.org/wikipedia/commons/4/4b/Airtable_Logo.svg",
		link: "https://airtable.com",
		isFree: true,
	},
];

export default function ResourcesPage() {
	return (
		<main className="container py-8">
			<div className="mb-8 space-y-2">
				<h1 className="font-bold text-2xl text-foreground md:text-3xl">
					Resources
				</h1>
				<p className="text-muted-foreground">
					Collection of tools, accounts, and channels to help you organize
					competitions more effectively.
				</p>
			</div>

			{/* Tools Section */}
			<section className="mb-10">
				<div className="mb-4 flex items-center gap-2">
					<Wrench className="h-5 w-5 text-foreground" />
					<h2 className="font-semibold text-foreground text-lg">
						Tools for Competition Organizers
					</h2>
				</div>

				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{tools.map((tool) => (
						<Card
							className="group overflow-hidden transition-shadow hover:shadow-md"
							key={tool.id}
						>
							<CardContent className="p-4">
								<div className="flex items-start gap-3">
									<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary p-2">
										{/* eslint-disable-next-line @next/next/no-img-element */}
										<img
											alt={tool.name}
											className="h-6 w-6 object-contain"
											onError={(e) => {
												e.currentTarget.src =
													"https://placehold.co/24x24?text=" +
													tool.name.charAt(0);
											}}
											src={tool.iconUrl}
										/>
									</div>
									<div className="min-w-0 flex-1">
										<div className="flex items-center gap-2">
											<h3 className="truncate font-medium text-foreground">
												{tool.name}
											</h3>
											{tool.isFree && (
												<span className="rounded-full bg-green-500/10 px-1.5 py-0.5 font-medium text-[10px] text-green-600">
													Free
												</span>
											)}
										</div>
										<span className="text-muted-foreground text-xs">
											{tool.category}
										</span>
									</div>
								</div>
								<p className="mt-3 line-clamp-2 text-muted-foreground text-sm">
									{tool.description}
								</p>
								<Button
									className="mt-3 w-full"
									onClick={() => window.open(tool.link, "_blank")}
									size="sm"
									variant="outline"
								>
									Visit
									<ExternalLink className="ml-auto h-3 w-3" />
								</Button>
							</CardContent>
						</Card>
					))}
				</div>
			</section>

			{/* Instagram Accounts Section */}
			<section className="mb-10">
				<div className="mb-4 flex items-center gap-2">
					<Instagram className="h-5 w-5 text-foreground" />
					<h2 className="font-semibold text-foreground text-lg">
						Competition Instagram Accounts
					</h2>
				</div>

				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{instagramAccounts.map((account) => (
						<Card className="overflow-hidden" key={account.id}>
							<CardContent className="p-4">
								<div className="flex items-start gap-3">
									{/* eslint-disable-next-line @next/next/no-img-element */}
									<img
										alt={account.name}
										className="h-12 w-12 rounded-full object-cover"
										src={account.imageUrl}
									/>
									<div className="min-w-0 flex-1">
										<h3 className="truncate font-medium text-foreground">
											{account.name}
										</h3>
										<p className="text-muted-foreground text-sm">
											{account.username}
										</p>
										<div className="mt-1 flex items-center gap-1">
											<Users className="h-3 w-3 text-muted-foreground" />
											<span className="text-muted-foreground text-xs">
												{account.followers} followers
											</span>
										</div>
									</div>
								</div>
								<p className="mt-3 line-clamp-2 text-muted-foreground text-sm">
									{account.description}
								</p>
								<Button
									className="mt-3 w-full"
									onClick={() =>
										window.open(
											`https://instagram.com/${account.username.replace("@", "")}`,
											"_blank"
										)
									}
									size="sm"
									variant="outline"
								>
									<Instagram className="mr-2 h-4 w-4" />
									Visit
									<ExternalLink className="ml-auto h-3 w-3" />
								</Button>
							</CardContent>
						</Card>
					))}
				</div>
			</section>

			{/* WhatsApp Channels Section */}
			<section>
				<div className="mb-4 flex items-center gap-2">
					<MessageCircle className="h-5 w-5 text-foreground" />
					<h2 className="font-semibold text-foreground text-lg">
						WhatsApp Channels
					</h2>
				</div>

				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{whatsAppChannels.map((channel) => (
						<Card className="overflow-hidden" key={channel.id}>
							<CardContent className="p-4">
								<div className="flex items-start gap-3">
									<div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
										<MessageCircle className="h-6 w-6 text-green-600" />
									</div>
									<div className="min-w-0 flex-1">
										<h3 className="truncate font-medium text-foreground">
											{channel.name}
										</h3>
										<div className="mt-1 flex items-center gap-1">
											<Users className="h-3 w-3 text-muted-foreground" />
											<span className="text-muted-foreground text-xs">
												{channel.members} members
											</span>
										</div>
									</div>
								</div>
								<p className="mt-3 line-clamp-2 text-muted-foreground text-sm">
									{channel.description}
								</p>
								<Button
									className="mt-3 w-full"
									onClick={() => window.open(channel.link, "_blank")}
									size="sm"
									variant="outline"
								>
									<MessageCircle className="mr-2 h-4 w-4" />
									Join Channel
									<ExternalLink className="ml-auto h-3 w-3" />
								</Button>
							</CardContent>
						</Card>
					))}
				</div>
			</section>
		</main>
	);
}
