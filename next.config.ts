import path from "path";
import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
	turbopack: {
		root: path.resolve(process.cwd()),
	},
};

export default withPWA({
	dest: "public",
	register: true,
	skipWaiting: true,
	disable: process.env.NODE_ENV === "development",
})(nextConfig);

// Enable calling `getCloudflareContext()` in `next dev`.
// See https://opennext.js.org/cloudflare/bindings#local-access-to-bindings.
// Only initialize for OpenNext/Cloudflare environments.
if (process.env.OPENNEXT_DEV || process.env.CF_PAGES) {
	// Top-level import is required. Dynamic `import` is not allowed in Next.js config.
	// eslint-disable-next-line @typescript-eslint/no-floating-promises
	void import("@opennextjs/cloudflare").then(
		({ initOpenNextCloudflareForDev }) => {
			initOpenNextCloudflareForDev();
		}
	);
}
