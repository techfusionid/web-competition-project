import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	turbopack: {
		root: path.resolve(process.cwd()),
	},
};

export default nextConfig;

// Enable calling `getCloudflareContext()` in `next dev`.
// See https://opennext.js.org/cloudflare/bindings#local-access-to-bindings.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

initOpenNextCloudflareForDev();
