"use client";

import {
	BookOpen,
	Info,
	ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "./ThemeToggle";

interface NavItem {
	path: string;
	label: string;
	icon: React.ElementType;
}

const navItems: NavItem[] = [
	{ path: "/resources", label: "Resources", icon: BookOpen },
	{ path: "/about-us", label: "About", icon: Info },
];

interface HeaderProps {
	onHomeClick?: () => void;
	sticky?: boolean;
}

export function Header({ onHomeClick, sticky = false }: HeaderProps = {}) {
	const pathname = usePathname();

	const handleHomeClick = (e: React.MouseEvent) => {
		// Dispatch custom event to reset all app state
		window.dispatchEvent(new CustomEvent('reset-app'));

		if (pathname === "/" && onHomeClick) {
			e.preventDefault();
			onHomeClick();
			window.scrollTo({ top: 0, behavior: "smooth" });
		} else if (pathname !== "/") {
			// If not on home page, navigate to home
			window.location.href = "/";
		} else {
			// Already on home page, just scroll to top
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	};

	const isActive = (path: string) => pathname === path;

	return (
		<header className={`${sticky ? "sticky top-0" : "relative"} z-50 w-full`}>
			<div className="container flex h-14 items-center">
				<Link
					className="flex items-center gap-2"
					href="/"
					onClick={handleHomeClick}
				>
					<img
						src="/techfusion.png"
						alt="Competitions"
						className="h-7 w-7 rounded-md object-cover"
					/>
					<span className="text-base font-semibold text-foreground">
						Competitions
					</span>
				</Link>

				<nav className="hidden items-center gap-1 md:flex md:ml-8">
					{navItems.map((item) => {
						const Icon = item.icon;
						const active = isActive(item.path);
						return (
							<Link href={item.path} key={item.path}>
								<Button
									className={`text-sm font-normal gap-1.5 ${active ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
									size="sm"
									variant="ghost"
								>
									{active && <Icon className="h-3.5 w-3.5" />}
									{item.label}
								</Button>
							</Link>
						);
					})}
				</nav>

				<div className="ml-auto flex items-center gap-2">
					<div className="hidden md:block">
						<ThemeToggle />
					</div>

					<Link href="/discover">
						<Button className="h-8 text-sm gap-1.5" size="sm" variant="ghost">
							Discover
							<ArrowUpRight className="h-3.5 w-3.5" />
						</Button>
					</Link>


					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="relative h-8 w-8 rounded-full">
								<Avatar className="h-8 w-8 hover:opacity-80 transition-opacity">
									<AvatarImage src="https://github.com/shadcn.png" alt="@agnesdevita" />
									<AvatarFallback>AD</AvatarFallback>
								</Avatar>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-56" align="end" forceMount>
							<DropdownMenuLabel className="font-normal">
								<div className="flex flex-col space-y-1">
									<p className="text-sm font-medium leading-none">Agnes Devita Widjaja</p>
									<p className="text-xs leading-none text-muted-foreground">
										@agnesdevita
									</p>
								</div>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem asChild>
								<Link href="/profile" className="cursor-pointer">
									View Profile
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem asChild>
								<Link href="/settings" className="cursor-pointer">
									Settings
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem className="text-red-500 focus:text-red-500 cursor-pointer">
								Sign Out
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</header>
	);
}
