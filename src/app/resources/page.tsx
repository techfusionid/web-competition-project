"use client";

import { MessageCircle, Wrench } from "lucide-react";
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

function getDomainFromUrl(url: string): string {
	try {
		return new URL(url).hostname;
	} catch {
		return "";
	}
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
		members: "1K",
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
		iconUrl: "https://www.google.com/s2/favicons?domain=canva.com&sz=32",
		link: "https://canva.com",
		isFree: true,
	},
	{
		id: "2",
		name: "Tally",
		category: "Registration",
		description:
			"Free registration forms with Google Sheets integration for participant data management.",
		iconUrl: "https://www.google.com/s2/favicons?domain=tally.so&sz=32",
		link: "https://tally.so",
		isFree: true,
	},
	{
		id: "3",
		name: "Notion",
		category: "Management",
		description:
			"All-in-one workspace for timelines, task management, and competition documentation.",
		iconUrl: "https://www.google.com/s2/favicons?domain=notion.so&sz=32",
		link: "https://notion.so",
		isFree: true,
	},
	{
		id: "4",
		name: "Discord",
		category: "Community",
		description:
			"Community platform for participants, committees, and judges with voice & text chat features.",
		iconUrl: "https://www.google.com/s2/favicons?domain=discord.com&sz=32",
		link: "https://discord.com",
		isFree: true,
	},
	{
		id: "6",
		name: "Trello",
		category: "Management",
		description:
			"Kanban board for tracking committee progress and competition stages.",
		iconUrl: "https://www.google.com/s2/favicons?domain=trello.com&sz=32",
		link: "https://trello.com",
		isFree: true,
	},
	{
		id: "7",
		name: "Typeform",
		category: "Registration",
		description:
			"Interactive forms with modern UI for registration and participant surveys.",
		iconUrl: "https://www.google.com/s2/favicons?domain=typeform.com&sz=32",
		link: "https://typeform.com",
		isFree: false,
	},
	{
		id: "8",
		name: "Figma",
		category: "Design",
		description:
			"Collaborative design tool for creating mockups and prototypes with your team.",
		iconUrl: "https://www.google.com/s2/favicons?domain=figma.com&sz=32",
		link: "https://figma.com",
		isFree: true,
	},
	{
		id: "9",
		name: "Luma",
		category: "Event",
		description:
			"Collect all important competition links (registration, info, social media) in one page.",
		iconUrl: "https://www.google.com/s2/favicons?domain=luma.com&sz=32",
		link: "https://luma.com",
		isFree: true,
	},
	{
		id: "10",
		name: "GoAkal",
		category: "Platform",
		description:
			"Mobile platform for event registration and participant check-in features.",
		iconUrl: "https://www.google.com/s2/favicons?domain=goakal.com&sz=32",
		link: "https://goakal.com",
		isFree: true,
	},
	{
		id: "11",
		name: "Airtable",
		category: "Database",
		description:
			"Visual database for managing participant data, judging, and submission tracking.",
		iconUrl: "https://www.google.com/s2/favicons?domain=airtable.com&sz=32",
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
							<CardContent className="px-4">
								<div className="flex items-start gap-3">
									<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
										{/* eslint-disable-next-line @next/next/no-img-element */}
										<img
											alt={tool.name}
											className="h-6 w-6 object-contain"
											onError={(e) => {
												e.currentTarget.src =
													"https://www.google.com/s2/favicons?domain=example.com&sz=32";
											}}
											src={`https://www.google.com/s2/favicons?domain=${getDomainFromUrl(tool.link)}&sz=32`}
										/>
									</div>
									<div className="min-w-0 flex-1">
										<div className="flex items-center gap-2">
											<h3 className="truncate font-medium text-foreground">
												{tool.name}
											</h3>
										</div>
										<span className="text-muted-foreground text-xs">
											{tool.category}
										</span>
									</div>
								</div>
								<p className="mt-3 line-clamp-2 text-muted-foreground text-sm">
									{tool.description}
								</p>
							</CardContent>
						</Card>
					))}
				</div>
			</section>

			{/* Instagram Accounts Section
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
                                 "_blank",
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
      */}

			{/* WhatsApp Channels Section */}
			<section>
				<div className="mb-4 flex items-center gap-2">
					<MessageCircle className="h-5 w-5 text-foreground" />
					<h2 className="font-semibold text-foreground text-lg">
						WhatsApp Channels
					</h2>
				</div>

				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{whatsAppChannels.map((channel) => (
						<Card
							className="group overflow-hidden transition-shadow hover:shadow-md"
							key={channel.id}
						>
							<CardContent className="px-4">
								<h3 className="truncate font-medium text-foreground">
									{channel.name}
								</h3>
								<p className="mt-2 line-clamp-2 text-muted-foreground text-sm">
									{channel.description}
								</p>
							</CardContent>
						</Card>
					))}
				</div>
			</section>
		</main>
	);
}
