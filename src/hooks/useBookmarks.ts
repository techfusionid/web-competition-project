"use client";

import { useCallback, useEffect, useState } from "react";

const BOOKMARKS_KEY = "lombahub-bookmarks";

export function useBookmarks() {
	const [bookmarks, setBookmarks] = useState<string[]>([]);
	const [isInitialized, setIsInitialized] = useState(false);

	useEffect(() => {
		const stored = localStorage.getItem(BOOKMARKS_KEY);
		if (stored) {
			try {
				setBookmarks(JSON.parse(stored));
			} catch (e) {
				console.error("Failed to parse bookmarks", e);
			}
		}
		setIsInitialized(true);
	}, []);

	useEffect(() => {
		if (isInitialized) {
			localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
		}
	}, [bookmarks, isInitialized]);

	const toggleBookmark = useCallback((id: string) => {
		setBookmarks((prev) =>
			prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
		);
	}, []);

	const isBookmarked = useCallback(
		(id: string) => bookmarks.includes(id),
		[bookmarks]
	);

	return { bookmarks, toggleBookmark, isBookmarked };
}
