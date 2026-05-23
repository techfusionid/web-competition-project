import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

let _db: ReturnType<typeof drizzle<typeof schema>> | null = null;

export function getDb() {
	if (!_db) {
		const sql = postgres(process.env.DATABASE_URL!, {
			ssl: "require",
			connect_timeout: 10,
		});
		_db = drizzle(sql, { schema });
	}
	return _db;
}

export * from "./schema";
