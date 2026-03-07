if (!self.define) {
	let e,
		s = {};
	const c = (c, a) => (
		(c = new URL(c + ".js", a).href),
		s[c] ||
			new Promise((s) => {
				if ("document" in self) {
					const e = document.createElement("script");
					(e.src = c), (e.onload = s), document.head.appendChild(e);
				} else (e = c), importScripts(c), s();
			}).then(() => {
				let e = s[c];
				if (!e) throw new Error(`Module ${c} didn’t register its module`);
				return e;
			})
	);
	self.define = (a, n) => {
		const t =
			e ||
			("document" in self ? document.currentScript.src : "") ||
			location.href;
		if (s[t]) return;
		let i = {};
		const f = (e) => c(e, t),
			r = { module: { uri: t }, exports: i, require: f };
		s[t] = Promise.all(a.map((e) => r[e] || f(e))).then((e) => (n(...e), i));
	};
}
define(["./workbox-e9849328"], function (e) {
	"use strict";
	importScripts(),
		self.skipWaiting(),
		e.clientsClaim(),
		e.precacheAndRoute(
			[
				{ url: "/_headers", revision: "4a18cf8d4962a0cf1d8e22e07b52b4c7" },
				{
					url: "/_next/app-build-manifest.json",
					revision: "72b81dc3c9e10f40e76a814a00b3257a",
				},
				{
					url: "/_next/static/JwVP4cobixt0kLG5qbt3c/_buildManifest.js",
					revision: "aadca68dba2378a8dc2ea552a9e64483",
				},
				{
					url: "/_next/static/JwVP4cobixt0kLG5qbt3c/_ssgManifest.js",
					revision: "b6652df95db52feb4daf4eca35380933",
				},
				{
					url: "/_next/static/chunks/0937f883-64d28c685c52e3fd.js",
					revision: "64d28c685c52e3fd",
				},
				{
					url: "/_next/static/chunks/10a9c96f-61bed4ae80b65f4e.js",
					revision: "61bed4ae80b65f4e",
				},
				{
					url: "/_next/static/chunks/1860-8ba68cc8f20f8192.js",
					revision: "8ba68cc8f20f8192",
				},
				{
					url: "/_next/static/chunks/204-08c296192b0f4b05.js",
					revision: "08c296192b0f4b05",
				},
				{
					url: "/_next/static/chunks/2530-c66e72e58e37d2c8.js",
					revision: "c66e72e58e37d2c8",
				},
				{
					url: "/_next/static/chunks/2780-f71e330bbaac2d5f.js",
					revision: "f71e330bbaac2d5f",
				},
				{
					url: "/_next/static/chunks/2888-a9c4fa5d08ef7bc1.js",
					revision: "a9c4fa5d08ef7bc1",
				},
				{
					url: "/_next/static/chunks/4397-db3abb19b8bc1a8b.js",
					revision: "db3abb19b8bc1a8b",
				},
				{
					url: "/_next/static/chunks/45588546-d6114c23c5261a71.js",
					revision: "d6114c23c5261a71",
				},
				{
					url: "/_next/static/chunks/4814-9313b9ceb5d7397a.js",
					revision: "9313b9ceb5d7397a",
				},
				{
					url: "/_next/static/chunks/5293-1474718f3f9c8a99.js",
					revision: "1474718f3f9c8a99",
				},
				{
					url: "/_next/static/chunks/5350-e1c20f283c766c06.js",
					revision: "e1c20f283c766c06",
				},
				{
					url: "/_next/static/chunks/5631-cd4a69dfff23eac8.js",
					revision: "cd4a69dfff23eac8",
				},
				{
					url: "/_next/static/chunks/5633-ea463fd18a401f8c.js",
					revision: "ea463fd18a401f8c",
				},
				{
					url: "/_next/static/chunks/6863-ac3920890d94ab37.js",
					revision: "ac3920890d94ab37",
				},
				{
					url: "/_next/static/chunks/7157-c2de889430c15a14.js",
					revision: "c2de889430c15a14",
				},
				{
					url: "/_next/static/chunks/742-ebb1f1d9cb2a4e35.js",
					revision: "ebb1f1d9cb2a4e35",
				},
				{
					url: "/_next/static/chunks/8268-5e62abdd6510e89b.js",
					revision: "5e62abdd6510e89b",
				},
				{
					url: "/_next/static/chunks/8342-20ad6c4567105fec.js",
					revision: "20ad6c4567105fec",
				},
				{
					url: "/_next/static/chunks/9063-d901b65162f8faea.js",
					revision: "d901b65162f8faea",
				},
				{
					url: "/_next/static/chunks/9424-79409cf3f63c19ed.js",
					revision: "79409cf3f63c19ed",
				},
				{
					url: "/_next/static/chunks/app/(home)/page-9f650ca455d77c22.js",
					revision: "9f650ca455d77c22",
				},
				{
					url: "/_next/static/chunks/app/_not-found/page-d23cb31fe3cb2cf1.js",
					revision: "d23cb31fe3cb2cf1",
				},
				{
					url: "/_next/static/chunks/app/about-us/page-f071f90d8f885f40.js",
					revision: "f071f90d8f885f40",
				},
				{
					url: "/_next/static/chunks/app/advertise/page-f071f90d8f885f40.js",
					revision: "f071f90d8f885f40",
				},
				{
					url: "/_next/static/chunks/app/bookmarks/page-09906917be500306.js",
					revision: "09906917be500306",
				},
				{
					url: "/_next/static/chunks/app/category/%5Bslug%5D/page-1b6e8ce4f21f6308.js",
					revision: "1b6e8ce4f21f6308",
				},
				{
					url: "/_next/static/chunks/app/category/page-501c3365da037f2e.js",
					revision: "501c3365da037f2e",
				},
				{
					url: "/_next/static/chunks/app/competition/%5Bid%5D/page-258f8c15883ec4c2.js",
					revision: "258f8c15883ec4c2",
				},
				{
					url: "/_next/static/chunks/app/discover/page-1fb48459dd770e26.js",
					revision: "1fb48459dd770e26",
				},
				{
					url: "/_next/static/chunks/app/layout-76f9fd438fbaa30b.js",
					revision: "76f9fd438fbaa30b",
				},
				{
					url: "/_next/static/chunks/app/organizer/%5Bslug%5D/page-2196f0cf172f614b.js",
					revision: "2196f0cf172f614b",
				},
				{
					url: "/_next/static/chunks/app/organizer/page-3b94229f81bdee39.js",
					revision: "3b94229f81bdee39",
				},
				{
					url: "/_next/static/chunks/app/privacy/page-f071f90d8f885f40.js",
					revision: "f071f90d8f885f40",
				},
				{
					url: "/_next/static/chunks/app/profile/page-4adefd1b52c33e22.js",
					revision: "4adefd1b52c33e22",
				},
				{
					url: "/_next/static/chunks/app/randomize/page-f5ca6bce69b104cc.js",
					revision: "f5ca6bce69b104cc",
				},
				{
					url: "/_next/static/chunks/app/resources/page-c1001bf1f30347d1.js",
					revision: "c1001bf1f30347d1",
				},
				{
					url: "/_next/static/chunks/app/settings/layout-c56874407e01078d.js",
					revision: "c56874407e01078d",
				},
				{
					url: "/_next/static/chunks/app/settings/notifications/page-f192ff000232b9f4.js",
					revision: "f192ff000232b9f4",
				},
				{
					url: "/_next/static/chunks/app/settings/page-58f1ba0ecf05a3da.js",
					revision: "58f1ba0ecf05a3da",
				},
				{
					url: "/_next/static/chunks/app/settings/socials/page-e8a8c9add34653c9.js",
					revision: "e8a8c9add34653c9",
				},
				{
					url: "/_next/static/chunks/app/submit/page-5038c6f9e85bbf3b.js",
					revision: "5038c6f9e85bbf3b",
				},
				{
					url: "/_next/static/chunks/app/terms/page-f071f90d8f885f40.js",
					revision: "f071f90d8f885f40",
				},
				{
					url: "/_next/static/chunks/framework-514575fee71a0e9e.js",
					revision: "514575fee71a0e9e",
				},
				{
					url: "/_next/static/chunks/main-app-a5c0146b7be4b745.js",
					revision: "a5c0146b7be4b745",
				},
				{
					url: "/_next/static/chunks/main-ca25ec8113595e75.js",
					revision: "ca25ec8113595e75",
				},
				{
					url: "/_next/static/chunks/pages/_app-85099a40ac592e26.js",
					revision: "85099a40ac592e26",
				},
				{
					url: "/_next/static/chunks/pages/_error-33e105724b3a9f85.js",
					revision: "33e105724b3a9f85",
				},
				{
					url: "/_next/static/chunks/polyfills-42372ed130431b0a.js",
					revision: "846118c33b2c0e922d7b3a7676f81f6f",
				},
				{
					url: "/_next/static/chunks/webpack-705de06448f8753b.js",
					revision: "705de06448f8753b",
				},
				{
					url: "/_next/static/css/2fcc2e9194317efb.css",
					revision: "2fcc2e9194317efb",
				},
				{
					url: "/_next/static/css/35cd72ab78ed5ca4.css",
					revision: "35cd72ab78ed5ca4",
				},
				{
					url: "/_next/static/media/0bb336433634a2cd-s.p.otf",
					revision: "a27195752fa42cb3cc1f760a36efc8be",
				},
				{
					url: "/_next/static/media/747892c23ea88013-s.woff2",
					revision: "a0761690ccf4441ace5cec893b82d4ab",
				},
				{
					url: "/_next/static/media/93f479601ee12b01-s.p.woff2",
					revision: "da83d5f06d825c5ae65b7cca706cb312",
				},
				{
					url: "/_next/static/media/9610d9e46709d722-s.woff2",
					revision: "7b7c0ef93df188a852344fc272fc096b",
				},
				{
					url: "/apple-touch-icon.png",
					revision: "81e10c28d8c4d47d5bc48fe327925a51",
				},
				{ url: "/favicon.svg", revision: "ce404f57fe643389be118c3840d1a544" },
				{ url: "/file.svg", revision: "d09f95206c3fa0bb9bd9fefabfd0ea71" },
				{ url: "/globe.svg", revision: "2aaafa6a49b6563925fe440891e32717" },
				{ url: "/manifest.json", revision: "1e354aeb34c989358ed67cdf5676fe9d" },
				{ url: "/next.svg", revision: "8e061864f388b47f33a1c3780831193e" },
				{
					url: "/techfusion.png",
					revision: "81e10c28d8c4d47d5bc48fe327925a51",
				},
				{ url: "/window.svg", revision: "a2760511c65806022ad20adf74370ff3" },
			],
			{ ignoreURLParametersMatching: [] }
		),
		e.cleanupOutdatedCaches(),
		e.registerRoute(
			"/",
			new e.NetworkFirst({
				cacheName: "start-url",
				plugins: [
					{
						cacheWillUpdate: async ({
							request: e,
							response: s,
							event: c,
							state: a,
						}) =>
							s && "opaqueredirect" === s.type
								? new Response(s.body, {
										status: 200,
										statusText: "OK",
										headers: s.headers,
									})
								: s,
					},
				],
			}),
			"GET"
		),
		e.registerRoute(
			/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
			new e.CacheFirst({
				cacheName: "google-fonts-webfonts",
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
				],
			}),
			"GET"
		),
		e.registerRoute(
			/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
			new e.StaleWhileRevalidate({
				cacheName: "google-fonts-stylesheets",
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
				],
			}),
			"GET"
		),
		e.registerRoute(
			/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
			new e.StaleWhileRevalidate({
				cacheName: "static-font-assets",
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
				],
			}),
			"GET"
		),
		e.registerRoute(
			/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
			new e.StaleWhileRevalidate({
				cacheName: "static-image-assets",
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
				],
			}),
			"GET"
		),
		e.registerRoute(
			/\/_next\/image\?url=.+$/i,
			new e.StaleWhileRevalidate({
				cacheName: "next-image",
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
				],
			}),
			"GET"
		),
		e.registerRoute(
			/\.(?:mp3|wav|ogg)$/i,
			new e.CacheFirst({
				cacheName: "static-audio-assets",
				plugins: [
					new e.RangeRequestsPlugin(),
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
				],
			}),
			"GET"
		),
		e.registerRoute(
			/\.(?:mp4)$/i,
			new e.CacheFirst({
				cacheName: "static-video-assets",
				plugins: [
					new e.RangeRequestsPlugin(),
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
				],
			}),
			"GET"
		),
		e.registerRoute(
			/\.(?:js)$/i,
			new e.StaleWhileRevalidate({
				cacheName: "static-js-assets",
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
				],
			}),
			"GET"
		),
		e.registerRoute(
			/\.(?:css|less)$/i,
			new e.StaleWhileRevalidate({
				cacheName: "static-style-assets",
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
				],
			}),
			"GET"
		),
		e.registerRoute(
			/\/_next\/data\/.+\/.+\.json$/i,
			new e.StaleWhileRevalidate({
				cacheName: "next-data",
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
				],
			}),
			"GET"
		),
		e.registerRoute(
			/\.(?:json|xml|csv)$/i,
			new e.NetworkFirst({
				cacheName: "static-data-assets",
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
				],
			}),
			"GET"
		),
		e.registerRoute(
			({ url: e }) => {
				if (!(self.origin === e.origin)) return !1;
				const s = e.pathname;
				return !s.startsWith("/api/auth/") && !!s.startsWith("/api/");
			},
			new e.NetworkFirst({
				cacheName: "apis",
				networkTimeoutSeconds: 10,
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
				],
			}),
			"GET"
		),
		e.registerRoute(
			({ url: e }) => {
				if (!(self.origin === e.origin)) return !1;
				return !e.pathname.startsWith("/api/");
			},
			new e.NetworkFirst({
				cacheName: "others",
				networkTimeoutSeconds: 10,
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
				],
			}),
			"GET"
		),
		e.registerRoute(
			({ url: e }) => !(self.origin === e.origin),
			new e.NetworkFirst({
				cacheName: "cross-origin",
				networkTimeoutSeconds: 10,
				plugins: [
					new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
				],
			}),
			"GET"
		);
});
