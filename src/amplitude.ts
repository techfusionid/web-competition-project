// amplitude.ts
"use client";

import * as amplitude from "@amplitude/unified";

function initAmplitude() {
	if (typeof window !== "undefined") {
		amplitude.initAll("92a74e1435000cfeb1a85a32cd3b552e", {
			analytics: { autocapture: true },
			sessionReplay: { sampleRate: 1 },
		});
	}
}

initAmplitude();

export const Amplitude = () => null;
export default amplitude;
