"use server";

import {
	getAllCompetitions,
	getCompetitionById,
	getCompetitionsByFilter,
	getCompetitionsByOrganizer,
	getCompetitionsByCategory,
	getCompetitionsByIds,
	getAllOrganizers,
	getAllCategories,
	type FilterState,
} from "@/server/db/queries";
import { dbToCompetition, dbToCompetitions } from "@/lib/data-transformer";
import type { Competition } from "@/types/competition";

export async function fetchCompetitions(
	filters?: FilterState
): Promise<Competition[]> {
	try {
		const dbRecords = filters
			? await getCompetitionsByFilter(filters)
			: await getAllCompetitions();
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
		return await getAllOrganizers();
	} catch (error) {
		console.error("fetchAllOrganizers error:", error);
		throw new Error(
			`Failed to fetch organizers: ${error instanceof Error ? error.message : String(error)}`
		);
	}
}

export async function fetchAllCategories(): Promise<string[]> {
	try {
		return await getAllCategories();
	} catch (error) {
		console.error("fetchAllCategories error:", error);
		throw new Error(
			`Failed to fetch categories: ${error instanceof Error ? error.message : String(error)}`
		);
	}
}
