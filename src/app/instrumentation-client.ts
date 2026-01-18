import posthog from "posthog-js";

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
	api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
	// Enable automatic pageview capture on route changes
	capture_pageview: "history_change",
	// Enable autocapture for clicks, form submissions, etc.
	autocapture: true,
	// Persistence settings
	persistence: "localStorage",
	// Disable session recording (basic analytics only)
	disable_session_recording: true,
	// Use latest defaults for consistent behavior
	defaults: "2025-05-24",
});
