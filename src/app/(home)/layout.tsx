import { Suspense, type ReactNode } from "react";

export const metadata = {
	title: "Competition.TechFusion.id - Discover & Join Exciting Competitions",
};

export default function HomeLayout({ children }: { children: ReactNode }) {
	return <Suspense>{children}</Suspense>;
}
