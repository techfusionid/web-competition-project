"use client";

import {
	Menu,
	Shuffle,
	BookOpen,
	Grid,
	Building2,
	Info,
	Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "./ThemeToggle";

interface NavItem {
	path: string;
	label: string;
	icon: React.ElementType;
}

const navItems: NavItem[] = [
	{ path: "/category", label: "Kategori", icon: Grid },
	{ path: "/institution", label: "Institusi", icon: Building2 },
	{ path: "/resources", label: "Resources", icon: BookOpen },
	{ path: "/randomize", label: "Random", icon: Shuffle },
	{ path: "/about-us", label: "About", icon: Info },
];

export function Header() {
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();

	const isActive = (path: string) => pathname === path;

	return (
		<header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-14 items-center">
				<Link href="/" className="mr-8 flex items-center gap-2">
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
							<Link key={item.path} href={item.path}>
								<Button
									variant="ghost"
									size="sm"
									className={`text-sm font-normal gap-1.5 ${active ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
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

					<Link href="/submit" className="hidden md:block">
						<Button variant="outline" size="sm" className="h-8 text-sm">
							Submit
						</Button>
					</Link>

					<Sheet open={isOpen} onOpenChange={setIsOpen}>
						<SheetTrigger asChild>
							<Button variant="ghost" size="icon" className="h-8 w-8 md:hidden">
								<Menu className="h-4 w-4" />
							</Button>
						</SheetTrigger>
						<SheetContent side="right" className="w-[280px]">
							<div className="flex items-center justify-between pt-4 pb-4 border-b border-border">
								<span className="text-sm font-medium text-foreground">
									Tema
								</span>
								<ThemeToggle />
							</div>
							<nav className="flex flex-col gap-3 pt-6">
								<Link
									href="/"
									onClick={() => setIsOpen(false)}
									className={`flex items-center gap-2 text-base font-medium ${isActive("/") ? "text-foreground" : "text-muted-foreground"}`}
								>
									{isActive("/") && <Home className="h-4 w-4" />}
									Beranda
								</Link>
								{navItems.map((item) => {
									const Icon = item.icon;
									const active = isActive(item.path);
									return (
										<Link
											key={item.path}
											href={item.path}
											onClick={() => setIsOpen(false)}
											className={`flex items-center gap-2 text-base font-medium ${active ? "text-foreground" : "text-muted-foreground"}`}
										>
											{active && <Icon className="h-4 w-4" />}
											{item.label}
										</Link>
									);
								})}
								<Link
									href="/submit"
									onClick={() => setIsOpen(false)}
									className={`flex items-center gap-2 text-base font-medium ${isActive("/submit") ? "text-foreground" : "text-muted-foreground"}`}
								>
									Submit Kompetisi
								</Link>
							</nav>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	);
}
