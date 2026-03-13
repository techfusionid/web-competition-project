import path from "path";
import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
	turbopack: {
		root: path.resolve(process.cwd()),
	},
	images: {
		remotePatterns: [
			{ protocol: "https", hostname: "**" }, // Allow all HTTPS images
		],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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
