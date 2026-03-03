import posthog from "posthog-js";

if (typeof window !== "undefined") {
	posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
		api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
		// Latest defaults for consistent behavior (per PostHog Next.js docs)
		defaults: "2025-11-30",
		// Automatic pageview on route changes (App Router)
		capture_pageview: "history_change",
		// Autocapture clicks, form submissions, etc.
		autocapture: true,
		persistence: "localStorage",
		disable_session_recording: true,
	});
}
