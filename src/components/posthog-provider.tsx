"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
	// PostHog is initialized in src/instrumentation-client.ts; pass singleton for React context
	return <PHProvider client={posthog}>{children}</PHProvider>;
}
