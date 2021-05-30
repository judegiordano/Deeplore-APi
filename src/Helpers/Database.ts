import path from "path";
import { cwd } from "process";
import { Connection, ConnectionOptions, createConnection, getConnection } from "typeorm";

import { Config } from "./Config";
import { Log } from "./Logger";
const { Options, Db } = Config;

export class Database {

	private static readonly Orm = {
		type: Db.DB_TYPE,
		host: Db.DB_HOST,
		port: Db.DB_PORT,
		username: Db.DB_USERNAME,
		password: Db.DB_PASSWORD,
		database: Db.DB_NAME,
		synchronize: Db.DB_SYNC,
		logging: Db.DB_LOGGING,
		autoReconnect: true,
		reconnectTries: Number.MAX_VALUE,
		ssl: Options.IS_PROD ? { rejectUnauthorized: false } : false,
		reconnectInterval: 2000,
		entities: [path.join(cwd(), "build/Models/**/*.js")]
	} as ConnectionOptions;

	public static async Connect(): Promise<void> {

		let connection: Connection | undefined;
		try {
			connection = getConnection();
		} catch (e) {
			Log.Info(`no existing connection found: ${e}`, "Database");
		}

		try {
			if (connection) {
				if (!connection.isConnected)
					await connection.connect();
			} else
				await createConnection(Database.Orm);
			Log.Info(" successfully connected to database", "Database");
		} catch (e) {
			Log.Error(`error connecting to database: ${e}`, "Database");
			throw Error(e);
		}
	}

	public static async Close(): Promise<void> {
		try {
			const conn = getConnection();
			await conn.close();
		} catch (e) {
			throw new Error(e);
		}
	}
}