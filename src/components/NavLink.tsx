"use client";

import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkProps extends Omit<LinkProps, "className"> {
	className?: string;
	activeClassName?: string;
	children?: React.ReactNode;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
	({ className, activeClassName, href, ...props }, ref) => {
		const pathname = usePathname();

		// Check if the current path matches the href
		// This handles both string and object hrefs
		const hrefPath = typeof href === "string" ? href : href.pathname;
		const isActive = pathname === hrefPath;

		return (
			<Link
				className={cn(className, isActive && activeClassName)}
				href={href}
				ref={ref}
				{...props}
			/>
		);
	}
);

NavLink.displayName = "NavLink";

export { NavLink };
