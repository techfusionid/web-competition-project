"use server";

import {
	getAllCompetitionsCached,
	getCompetitionById,
	getCompetitionsByFilter,
	getCompetitionsByOrganizer,
	getCompetitionsByCategory,
	getCompetitionsByIds,
	getAllOrganizersCached,
	getAllCategoriesCached,
	type FilterState,
} from "@/server/db/queries";
import { dbToCompetition, dbToCompetitions } from "@/lib/data-transformer";
import type { Competition } from "@/types/competition";
import { revalidateTag } from "next/cache";
import { CACHE_TAGS } from "@/lib/cache";

export async function fetchCompetitions(
	filters?: FilterState
): Promise<Competition[]> {
	try {
		const dbRecords = filters
			? await getCompetitionsByFilter(filters)
			: await getAllCompetitionsCached();
		return dbToCompetitions(dbRecords);
	} catch (error) {
		console.error("fetchCompetitions error:", error);
		throw new Error(
			`Failed to fetch competitions: ${error instanceof Error ? error.message : String(error)}`
		);
	}
}

export async function fetchCompetitionById(
	id: string
): Promise<Competition | null> {
	const dbRecord = await getCompetitionById(id);
	return dbRecord ? dbToCompetition(dbRecord) : null;
}

export async function fetchCompetitionsByOrganizer(
	organizerName: string
): Promise<Competition[]> {
	try {
		const dbRecords = await getCompetitionsByOrganizer(organizerName);
		return dbToCompetitions(dbRecords);
	} catch (error) {
		console.error("fetchCompetitionsByOrganizer error:", error);
		throw new Error(
			`Failed to fetch competitions by organizer: ${error instanceof Error ? error.message : String(error)}`
		);
	}
}

export async function fetchCompetitionsByCategory(
	category: string
): Promise<Competition[]> {
	try {
		const dbRecords = await getCompetitionsByCategory(category);
		return dbToCompetitions(dbRecords);
	} catch (error) {
		console.error("fetchCompetitionsByCategory error:", error);
		throw new Error(
			`Failed to fetch competitions by category: ${error instanceof Error ? error.message : String(error)}`
		);
	}
}

export async function fetchCompetitionsByIds(
	ids: string[]
): Promise<Competition[]> {
	try {
		const dbRecords = await getCompetitionsByIds(ids);
		return dbToCompetitions(dbRecords);
	} catch (error) {
		console.error("fetchCompetitionsByIds error:", error);
		throw new Error(
			`Failed to fetch competitions by IDs: ${error instanceof Error ? error.message : String(error)}`
		);
	}
}

export async function fetchAllOrganizers() {
	try {
		return await getAllOrganizersCached();
	} catch (error) {
		console.error("fetchAllOrganizers error:", error);
		throw new Error(
			`Failed to fetch organizers: ${error instanceof Error ? error.message : String(error)}`
		);
	}
}

export async function fetchAllCategories(): Promise<string[]> {
	try {
		return await getAllCategoriesCached();
	} catch (error) {
		console.error("fetchAllCategories error:", error);
		throw new Error(
			`Failed to fetch categories: ${error instanceof Error ? error.message : String(error)}`
		);
	}
}

// ========================================
// Cache Revalidation Actions
// ========================================

/**
 * Revalidate all competitions cache
 * Call this after adding, updating, or deleting competitions
 */
export async function revalidateCompetitionsCache() {
	"use server";
	revalidateTag(CACHE_TAGS.ALL_COMPETITIONS);
	revalidateTag(CACHE_TAGS.ALL_ORGANIZERS);
	revalidateTag(CACHE_TAGS.ALL_CATEGORIES);
	return { success: true, timestamp: Date.now() };
}

/**
 * Revalidate a specific competition's cache
 * @param id - Competition ID
 */
export async function revalidateCompetitionCache(id: string) {
	"use server";
	revalidateTag(CACHE_TAGS.COMPETITION_BY_ID(id));
	revalidateTag(CACHE_TAGS.ALL_COMPETITIONS);
	return { success: true, id, timestamp: Date.now() };
}

/**
 * Revalidate competitions by category
 * @param category - Category slug/name
 */
export async function revalidateCategoryCache(category: string) {
	"use server";
	revalidateTag(CACHE_TAGS.COMPETITIONS_BY_CATEGORY(category));
	revalidateTag(CACHE_TAGS.ALL_COMPETITIONS);
	revalidateTag(CACHE_TAGS.ALL_CATEGORIES);
	return { success: true, category, timestamp: Date.now() };
}

/**
 * Revalidate competitions by organizer
 * @param organizer - Organizer name
 */
export async function revalidateOrganizerCache(organizer: string) {
	"use server";
	revalidateTag(CACHE_TAGS.COMPETITIONS_BY_ORGANIZER(organizer));
	revalidateTag(CACHE_TAGS.ALL_COMPETITIONS);
	revalidateTag(CACHE_TAGS.ALL_ORGANIZERS);
	return { success: true, organizer, timestamp: Date.now() };
}
