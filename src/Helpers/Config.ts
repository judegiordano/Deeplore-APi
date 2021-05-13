import "dotenv/config";

export class Config {

	private static readonly _HOST = process.env["HOST"] || "127.0.0.1";
	private static readonly _NODE_ENV = process.env["NODE_ENV"];
	private static readonly _APP_VERSION = process.env["APP_VERSION"];
	private static readonly _APPCODE = process.env["APPCODE"];
	private static readonly _DB_TYPE = process.env["DB_TYPE"];
	private static readonly _DB_HOST = process.env["DB_HOST"];
	private static readonly _DB_PORT = process.env["DB_PORT"];
	private static readonly _DB_USERNAME = process.env["DB_USERNAME"];
	private static readonly _DB_PASSWORD = process.env["DB_PASSWORD"];
	private static readonly _DB_NAME = process.env["DB_NAME"];
	private static readonly _DB_SYNC = process.env["DB_SYNC"];
	private static readonly _DB_LOGGING = process.env["DB_LOGGING"];
	private static readonly _JWT_SECRET = process.env["JWT_SECRET"];

	public static readonly Options = {
		HOST: Config._HOST,
		PORT: process.env.PORT || 3000,
		NODE_ENV: Config._NODE_ENV,
		APP_VERSION: Config._APP_VERSION || "v1",
		IS_PROD: Config._NODE_ENV == "production" ? true : false,
		APPCODE: Config._APPCODE,
		DB_TYPE: Config._DB_TYPE,
		DB_HOST: Config._DB_HOST,
		DB_PORT: parseInt(Config._DB_PORT as string),
		DB_USERNAME: Config._DB_USERNAME,
		DB_PASSWORD: Config._DB_PASSWORD,
		DB_NAME: Config._DB_NAME,
		DB_SYNC: Config._DB_SYNC,
		DB_LOGGING: Config._DB_LOGGING,
		JWT_SECRET: Config._JWT_SECRET as string
	}

	public static readonly Subscriptions = {
		JAVASTOP_SUBSCRIPTION: process.env["JAVASTOP_SUBSCRIPTION"] as string,
		DEV_SUBSCRIPTION: process.env["DEV_SUBSCRIPTION"] as string,
	}
}