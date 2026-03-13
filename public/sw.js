if (!self.define) {
	let e,
		s = {};
	const a = (a, c) => (
		(a = new URL(a + ".js", c).href),
		s[a] ||
			new Promise((s) => {
				if ("document" in self) {
					const e = document.createElement("script");
					(e.src = a), (e.onload = s), document.head.appendChild(e);
				} else (e = a), importScripts(a), s();
			}).then(() => {
				let e = s[a];
				if (!e) throw new Error(`Module ${a} didn’t register its module`);
				return e;
			})
	);
	self.define = (c, n) => {
		const i =
			e ||
			("document" in self ? document.currentScript.src : "") ||
			location.href;
		if (s[i]) return;
		let t = {};
		const r = (e) => a(e, i),
			f = { module: { uri: i }, exports: t, require: r };
		s[i] = Promise.all(c.map((e) => f[e] || r(e))).then((e) => (n(...e), t));
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
					revision: "694432da7116688bdb4e4e8693db36fe",
				},
				{
					url: "/_next/static/2yMS9nHB0mprPIVvojpzd/_buildManifest.js",
					revision: "3e3f10b5798b10b1ed3a9f73ef6fdddd",
				},
				{
					url: "/_next/static/2yMS9nHB0mprPIVvojpzd/_ssgManifest.js",
					revision: "b6652df95db52feb4daf4eca35380933",
				},
				{
					url: "/_next/static/chunks/0937f883-1913f71ef46df60f.js",
					revision: "1913f71ef46df60f",
				},
				{
					url: "/_next/static/chunks/10a9c96f-e86a4fd397bd7f5c.js",
					revision: "e86a4fd397bd7f5c",
				},
				{
					url: "/_next/static/chunks/2773-379dd0090659323b.js",
					revision: "379dd0090659323b",
				},
				{
					url: "/_next/static/chunks/2780-ea0ae630577091a1.js",
					revision: "ea0ae630577091a1",
				},
				{
					url: "/_next/static/chunks/3389-1027ed46f412aa62.js",
					revision: "1027ed46f412aa62",
				},
				{
					url: "/_next/static/chunks/3585-e1de16b42cbb1424.js",
					revision: "e1de16b42cbb1424",
				},
				{
					url: "/_next/static/chunks/3738-ae11a24ab260f5c7.js",
					revision: "ae11a24ab260f5c7",
				},
				{
					url: "/_next/static/chunks/4397-1128869492212334.js",
					revision: "1128869492212334",
				},
				{
					url: "/_next/static/chunks/45588546-7da1ae6b8f0dfefd.js",
					revision: "7da1ae6b8f0dfefd",
				},
				{
					url: "/_next/static/chunks/4814-c79436a48f565282.js",
					revision: "c79436a48f565282",
				},
				{
					url: "/_next/static/chunks/4847-4439ef0a196c3a63.js",
					revision: "4439ef0a196c3a63",
				},
				{
					url: "/_next/static/chunks/4979-0d268072265d3a0f.js",
					revision: "0d268072265d3a0f",
				},
				{
					url: "/_next/static/chunks/5038-d20c5fd1378b683f.js",
					revision: "d20c5fd1378b683f",
				},
				{
					url: "/_next/static/chunks/5350-fcfd571070753dfe.js",
					revision: "fcfd571070753dfe",
				},
				{
					url: "/_next/static/chunks/5556.3a553e839d0594fd.js",
					revision: "3a553e839d0594fd",
				},
				{
					url: "/_next/static/chunks/6655-7d9789fa9c3b997a.js",
					revision: "7d9789fa9c3b997a",
				},
				{
					url: "/_next/static/chunks/6812.a83a8358fc59d15f.js",
					revision: "a83a8358fc59d15f",
				},
				{
					url: "/_next/static/chunks/6900-3ee8e0340df89409.js",
					revision: "3ee8e0340df89409",
				},
				{
					url: "/_next/static/chunks/6bcf85ad.ec10dd5e94f3d84f.js",
					revision: "ec10dd5e94f3d84f",
				},
				{
					url: "/_next/static/chunks/742-38e87ca41912c201.js",
					revision: "38e87ca41912c201",
				},
				{
					url: "/_next/static/chunks/8624.59604d25ec04d8c6.js",
					revision: "59604d25ec04d8c6",
				},
				{
					url: "/_next/static/chunks/8820-58e3b5fc103ceed9.js",
					revision: "58e3b5fc103ceed9",
				},
				{
					url: "/_next/static/chunks/8825-9d72cc5499f7c154.js",
					revision: "9d72cc5499f7c154",
				},
				{
					url: "/_next/static/chunks/9063-e36ba45ad3a5c8e4.js",
					revision: "e36ba45ad3a5c8e4",
				},
				{
					url: "/_next/static/chunks/9110-7f99078f541cb319.js",
					revision: "7f99078f541cb319",
				},
				{
					url: "/_next/static/chunks/9137-731e905de1e559b4.js",
					revision: "731e905de1e559b4",
				},
				{
					url: "/_next/static/chunks/app/(home)/page-87067ebbeefbca65.js",
					revision: "87067ebbeefbca65",
				},
				{
					url: "/_next/static/chunks/app/_not-found/page-0e6ff647dcd36d76.js",
					revision: "0e6ff647dcd36d76",
				},
				{
					url: "/_next/static/chunks/app/about-us/page-9a5c33134354f52c.js",
					revision: "9a5c33134354f52c",
				},
				{
					url: "/_next/static/chunks/app/advertise/page-9a5c33134354f52c.js",
					revision: "9a5c33134354f52c",
				},
				{
					url: "/_next/static/chunks/app/bookmarks/page-d43f16044d9b4e2e.js",
					revision: "d43f16044d9b4e2e",
				},
				{
					url: "/_next/static/chunks/app/category/%5Bslug%5D/page-10343d6d5cc2e1bc.js",
					revision: "10343d6d5cc2e1bc",
				},
				{
					url: "/_next/static/chunks/app/category/page-a1ec4cab36ca59fc.js",
					revision: "a1ec4cab36ca59fc",
				},
				{
					url: "/_next/static/chunks/app/competition/%5Bid%5D/page-90cdfb22566bf0ee.js",
					revision: "90cdfb22566bf0ee",
				},
				{
					url: "/_next/static/chunks/app/discover/page-1e9379807b64a825.js",
					revision: "1e9379807b64a825",
				},
				{
					url: "/_next/static/chunks/app/layout-a6e5338e1a458559.js",
					revision: "a6e5338e1a458559",
				},
				{
					url: "/_next/static/chunks/app/organizer/%5Bslug%5D/page-5b016e5128cda1a0.js",
					revision: "5b016e5128cda1a0",
				},
				{
					url: "/_next/static/chunks/app/organizer/page-43ed1622b3a1ed42.js",
					revision: "43ed1622b3a1ed42",
				},
				{
					url: "/_next/static/chunks/app/privacy/page-9a5c33134354f52c.js",
					revision: "9a5c33134354f52c",
				},
				{
					url: "/_next/static/chunks/app/profile/page-d098d33701f46156.js",
					revision: "d098d33701f46156",
				},
				{
					url: "/_next/static/chunks/app/randomize/page-aef927ba7a74023d.js",
					revision: "aef927ba7a74023d",
				},
				{
					url: "/_next/static/chunks/app/resources/page-c21c3ce2481f3c6a.js",
					revision: "c21c3ce2481f3c6a",
				},
				{
					url: "/_next/static/chunks/app/settings/layout-69617dd36cbf18ff.js",
					revision: "69617dd36cbf18ff",
				},
				{
					url: "/_next/static/chunks/app/settings/notifications/page-d85e385bec482580.js",
					revision: "d85e385bec482580",
				},
				{
					url: "/_next/static/chunks/app/settings/page-4241aa04cb1cfa9c.js",
					revision: "4241aa04cb1cfa9c",
				},
				{
					url: "/_next/static/chunks/app/settings/socials/page-cd18b4565539cab1.js",
					revision: "cd18b4565539cab1",
				},
				{
					url: "/_next/static/chunks/app/submit/page-7daf7d8102fafed1.js",
					revision: "7daf7d8102fafed1",
				},
				{
					url: "/_next/static/chunks/app/terms/page-9a5c33134354f52c.js",
					revision: "9a5c33134354f52c",
				},
				{
					url: "/_next/static/chunks/bf05006b.fad6b07a0564feb6.js",
					revision: "fad6b07a0564feb6",
				},
				{
					url: "/_next/static/chunks/framework-f9733a59bc252cf0.js",
					revision: "f9733a59bc252cf0",
				},
				{
					url: "/_next/static/chunks/main-33f95832ed7a9a68.js",
					revision: "33f95832ed7a9a68",
				},
				{
					url: "/_next/static/chunks/main-app-1de5ecc59d44dd2f.js",
					revision: "1de5ecc59d44dd2f",
				},
				{
					url: "/_next/static/chunks/pages/_app-6397457db76e17fd.js",
					revision: "6397457db76e17fd",
				},
				{
					url: "/_next/static/chunks/pages/_error-dbcf94d2c53bb251.js",
					revision: "dbcf94d2c53bb251",
				},
				{
					url: "/_next/static/chunks/polyfills-42372ed130431b0a.js",
					revision: "846118c33b2c0e922d7b3a7676f81f6f",
				},
				{
					url: "/_next/static/chunks/webpack-d749aa1ce71b9485.js",
					revision: "d749aa1ce71b9485",
				},
				{
					url: "/_next/static/css/311ce449c994c3b5.css",
					revision: "311ce449c994c3b5",
				},
				{
					url: "/_next/static/css/7a906da75b01ad5f.css",
					revision: "7a906da75b01ad5f",
				},
				{
					url: "/_next/static/media/0bb336433634a2cd-s.p.otf",
					revision: "a27195752fa42cb3cc1f760a36efc8be",
				},
				{
					url: "/apple-touch-icon.png",
					revision: "81e10c28d8c4d47d5bc48fe327925a51",
				},
				{
					url: "/center-view.svg",
					revision: "35eb177c0af86a2809e08e69cfda090c",
				},
				{ url: "/comp.svg", revision: "a84a433a6285065b41c0bd6178dd310d" },
				{ url: "/favicon.svg", revision: "cf27650a302e38cafba1b013f2f2752f" },
				{
					url: "/favicon/android-chrome-192x192.png",
					revision: "9300f8d88477c265db6fa78b81aa4976",
				},
				{
					url: "/favicon/android-chrome-512x512.png",
					revision: "368c1feb8bdb45ecd4b24cf0007455bf",
				},
				{
					url: "/favicon/apple-touch-icon.png",
					revision: "352b7ac4f3a52fcbccbf30a2c3028fe9",
				},
				{
					url: "/favicon/favicon-16x16.png",
					revision: "14c22dd544fae5f5f0e4616523757b86",
				},
				{
					url: "/favicon/favicon-32x32.png",
					revision: "a89ff3b0386ab86c4bb9ed72ced6c74b",
				},
				{
					url: "/favicon/favicon.ico",
					revision: "a89ff3b0386ab86c4bb9ed72ced6c74b",
				},
				{
					url: "/favicon/manifest.json",
					revision: "ee258a455d92c3b72c1bbcb59098002c",
				},
				{ url: "/file.svg", revision: "d09f95206c3fa0bb9bd9fefabfd0ea71" },
				{ url: "/globe.svg", revision: "2aaafa6a49b6563925fe440891e32717" },
				{ url: "/logo.png", revision: "677946090cf3dd0408373187c8bb5ce2" },
				{ url: "/logo.svg", revision: "ad7368ff59ca1d06c404d887524e2f3c" },
				{ url: "/manifest.json", revision: "9090e674d41e265d5f03c180fe5f6721" },
				{ url: "/next.svg", revision: "8e061864f388b47f33a1c3780831193e" },
				{
					url: "/techfusion.png",
					revision: "81e10c28d8c4d47d5bc48fe327925a51",
				},
				{
					url: "/web-app-manifest-192x192.png",
					revision: "f20534510b22b412586ba753bfc7c1e8",
				},
				{
					url: "/web-app-manifest-512x512.png",
					revision: "b12539e9750f3cca76862f764f43060d",
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
							event: a,
							state: c,
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
