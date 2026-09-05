"use client";

import { useEffect, useState } from "react";
import { fetchCompetitions } from "@/app/actions/competitions";
import type { Competition } from "@/types/competition";

const CACHE_KEY = "competitions-cache";
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes

// Competition serialized for JSON storage (Date → ISO string)
type SerializedCompetition = Omit<Competition, "deadline" | "startDate"> & {
	deadline: string;
	startDate?: string;
};

interface CacheEntry {
	data: SerializedCompetition[];
	timestamp: number;
}

function serializeCompetitions(competitions: Competition[]): SerializedCompetition[] {
	return competitions.map((c) => ({
		...c,
		deadline: c.deadline.toISOString(),
		startDate: c.startDate?.toISOString(),
	}));
}

function deserializeCompetitions(competitions: SerializedCompetition[]): Competition[] {
	return competitions.map((c) => ({
		...c,
		deadline: new Date(c.deadline),
		startDate: c.startDate ? new Date(c.startDate) : undefined,
	}));
}

function readCache(): Competition[] | null {
	try {
		const raw = localStorage.getItem(CACHE_KEY);
		if (!raw) return null;
		const entry: CacheEntry = JSON.parse(raw);
		if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
			localStorage.removeItem(CACHE_KEY);
			return null;
		}
		return deserializeCompetitions(entry.data);
	} catch {
		return null;
	}
}

function writeCache(competitions: Competition[]): void {
	try {
		const entry: CacheEntry = {
			data: serializeCompetitions(competitions),
			timestamp: Date.now(),
		};
		localStorage.setItem(CACHE_KEY, JSON.stringify(entry));
	} catch {
		// localStorage might be unavailable or full — fail silently
	}
}

export function useCompetitions() {
	const [competitions, setCompetitions] = useState<Competition[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Synchronous cache read — no loading state if cache is fresh
		const cached = readCache();
		if (cached) {
			setCompetitions(cached);
			setIsLoading(false);
			return;
		}

		// Cache miss → fetch from server action and persist
		async function loadData() {
			try {
				const data = await fetchCompetitions();
				setCompetitions(data);
				writeCache(data);
			} catch (error) {
				console.error("Failed to fetch competitions:", error);
				setCompetitions([]);
			} finally {
				setIsLoading(false);
			}
		}

		loadData();
	}, []);

	return { competitions, isLoading };
}
