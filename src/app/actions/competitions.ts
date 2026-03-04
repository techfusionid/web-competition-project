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

export async function fetchCompetitions(filters?: FilterState): Promise<Competition[]> {
	const dbRecords = filters
		? await getCompetitionsByFilter(filters)
		: await getAllCompetitions();
	return dbToCompetitions(dbRecords);
}

export async function fetchCompetitionById(id: string): Promise<Competition | null> {
	const dbRecord = await getCompetitionById(id);
	return dbRecord ? dbToCompetition(dbRecord) : null;
}

export async function fetchCompetitionsByOrganizer(organizerName: string): Promise<Competition[]> {
	const dbRecords = await getCompetitionsByOrganizer(organizerName);
	return dbToCompetitions(dbRecords);
}

export async function fetchCompetitionsByCategory(category: string): Promise<Competition[]> {
	const dbRecords = await getCompetitionsByCategory(category);
	return dbToCompetitions(dbRecords);
}

export async function fetchCompetitionsByIds(ids: string[]): Promise<Competition[]> {
	const dbRecords = await getCompetitionsByIds(ids);
	return dbToCompetitions(dbRecords);
}

export async function fetchAllOrganizers() {
	return await getAllOrganizers();
}

export async function fetchAllCategories(): Promise<string[]> {
	return await getAllCategories();
}
