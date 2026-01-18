"use client";

import {
	BookOpen,
	Info,
	Menu,
	ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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
}

export function Header({ onHomeClick }: HeaderProps = {}) {
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();

	const handleHomeClick = (e: React.MouseEvent) => {
		if (pathname === "/" && onHomeClick) {
			e.preventDefault();
			onHomeClick();
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	};

	const isActive = (path: string) => pathname === path;

	return (
		<header className="sticky top-0 z-50 w-full bg-background">
			<div className="container flex h-14 items-center">
				<Link
					className="mr-8 flex items-center gap-2"
					href="/"
					onClick={handleHomeClick}
				>
					<div className="flex h-7 w-7 items-center justify-center rounded-md bg-foreground">
						<span className="text-xs font-bold text-background">LH</span>
					</div>
					<span className="text-base font-semibold text-foreground">
						LombaHub
					</span>
				</Link>

				<nav className="hidden items-center gap-1 md:flex">
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

					<Link href="/discover" className="hidden md:block">
						<Button className="h-8 text-sm gap-1.5" size="sm" variant="ghost">
							Discover
							<ArrowUpRight className="h-3.5 w-3.5" />
						</Button>
					</Link>

					<Sheet onOpenChange={setIsOpen} open={isOpen}>
						<SheetTrigger asChild>
							<Button className="h-8 w-8 md:hidden" size="icon" variant="ghost">
								<Menu className="h-4 w-4" />
							</Button>
						</SheetTrigger>
						<SheetContent className="w-70 px-6" side="right">
							<div className="flex items-center justify-between pt-4 pb-4 pr-8 border-b border-border">
								<span className="text-sm font-medium text-foreground">
									Theme
								</span>
								<ThemeToggle />
							</div>
							<nav className="flex flex-col gap-3 pt-6 pr-2">
								<Link
									className={`flex items-center gap-2 text-base font-medium ${isActive("/discover") ? "text-foreground" : "text-muted-foreground"}`}
									href="/discover"
									onClick={() => setIsOpen(false)}
								>
									Discover
								</Link>
								<div className="flex flex-col gap-1">
									<span className="text-xs font-medium text-muted-foreground px-2">
										MENU
									</span>
								{navItems.map((item) => {
									const Icon = item.icon;
									const active = isActive(item.path);
									return (
										<Link
											className={`flex items-center gap-2 text-base font-medium ${active ? "text-foreground" : "text-muted-foreground"}`}
											href={item.path}
											key={item.path}
											onClick={() => setIsOpen(false)}
										>
											{active && <Icon className="h-4 w-4" />}
											{item.label}
										</Link>
									);
								})}
								</div>
							</nav>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	);
}
