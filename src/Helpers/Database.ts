import path from "path";
import { cwd } from "process";
import { Connection, ConnectionOptions, createConnection, getConnection } from "typeorm";

import { Config } from "../Helpers/Config";
const { Options } = Config;

export class Database {

	private static readonly Orm = {
		type: Options.DB_TYPE,
		host: Options.DB_HOST,
		port: Options.DB_PORT,
		username: Options.DB_USERNAME,
		password: Options.DB_PASSWORD,
		database: Options.DB_NAME,
		synchronize: Options.DB_SYNC,
		logging: Options.DB_LOGGING,
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
			console.error("error connecting to database", e);
		}

		try {
			if (connection) {
				if (!connection.isConnected)
					await connection.connect();
			} else
				await createConnection(Database.Orm);
			console.info("successfully connected to database");
		} catch (e) {
			console.error("error connecting to database", e);
			throw Error(e);
		}
	}
}