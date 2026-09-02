import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

let _db: ReturnType<typeof createDb> | null = null;

function createDb() {
	const connectionString = process.env.DATABASE_URL;

	if (!connectionString) {
		throw new Error("Missing DATABASE_URL environment variable");
	}

	const client = postgres(connectionString, { prepare: false, max: 1 });

	return drizzle(client, { schema });
}

export function getDb() {
	if (!_db) {
		_db = createDb();
	}
	return _db;
}
