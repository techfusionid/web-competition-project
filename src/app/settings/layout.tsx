"use client";

import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarNavItems = [
	{
		title: "General",
		href: "/settings/general",
	},
	{
		title: "Edit Profile",
		href: "/settings",
	},
	{
		title: "Password",
		href: "/settings/password",
	},
	{
		title: "Social Profiles",
		href: "/settings/socials",
	},
	{
		title: "Email Notifications",
		href: "/settings/notifications",
	},
];

interface SettingsLayoutProps {
	children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
	const pathname = usePathname();

	return (
		<div className="container py-10 min-h-screen">
			<div className="space-y-0.5 mb-8">
				<h2 className="text-2xl font-bold tracking-tight">Settings</h2>
				<p className="text-muted-foreground">
					Manage your account settings and set e-mail preferences.
				</p>
			</div>
			<Separator className="my-6" />
			<div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
				<aside className="-mx-4 lg:w-1/5">
					<nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 overflow-x-auto px-4 pb-4 lg:pb-0">
						{sidebarNavItems.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className={`justify-start rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground whitespace-nowrap ${
									pathname === item.href
										? "bg-accent text-accent-foreground font-semibold"
										: "text-muted-foreground"
								}`}
							>
								{item.title}
							</Link>
						))}
					</nav>
				</aside>
				<div className="flex-1 lg:max-w-2xl">{children}</div>
			</div>
		</div>
	);
}
