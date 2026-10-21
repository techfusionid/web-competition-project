import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * JSON.stringify with HTML-safe escaping for use in <script> tags.
 * Prevents XSS via </script> or <!-- breakouts in string values.
 */
export function jsonLdSafeStringify(value: unknown): string {
	return JSON.stringify(value).replace(
		/<!--|<script|\u2028|\u2029/g,
		(match) => {
			// Encode special HTML characters that could break script context
			switch (match) {
				case "<!--":
					return "\\u003C!--";
				case "<script":
					return "\\u003Cscript";
				case "\u2028":
					return "\\u2028";
				case "\u2029":
					return "\\u2029";
				default:
					return match;
			}
		}
	);
}
