"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";

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
		<div className="container min-h-screen py-10">
			<div className="mb-8 space-y-0.5">
				<h2 className="font-bold text-2xl tracking-tight">Settings</h2>
				<p className="text-muted-foreground">
					Manage your account settings and set e-mail preferences.
				</p>
			</div>
			<Separator className="my-6" />
			<div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
				<aside className="-mx-4 lg:w-1/5">
					<nav className="flex space-x-2 overflow-x-auto px-4 pb-4 lg:flex-col lg:space-x-0 lg:space-y-1 lg:pb-0">
						{sidebarNavItems.map((item) => (
							<Link
								className={`justify-start whitespace-nowrap rounded-md px-3 py-2 font-medium text-sm hover:bg-accent hover:text-accent-foreground ${
									pathname === item.href
										? "bg-accent font-semibold text-accent-foreground"
										: "text-muted-foreground"
								}`}
								href={item.href}
								key={item.href}
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
