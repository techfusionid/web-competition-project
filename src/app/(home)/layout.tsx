"use client";

import { Suspense, type ReactNode } from "react";

export default function HomeLayout({ children }: { children: ReactNode }) {
	return <Suspense>{children}</Suspense>;
}
