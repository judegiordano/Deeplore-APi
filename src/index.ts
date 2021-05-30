import "dotenv/config";
import os from "os";
import path from "path";
import cluster from "cluster";
import fastify, { FastifyError } from "fastify";
import AutoLoad from "fastify-autoload";

import { Config } from "./Helpers/Config";
import { Database } from "./Helpers/Database";
import { Log } from "./Helpers/Logger";

const { Options } = Config;
const app = fastify({ logger: !Options.IS_PROD });

app.register(import("./Middleware/Auth"));
app.register(import("./Middleware/JwtAuth"));
app.register(import("./Middleware/AppSubscription"));
app.register(AutoLoad, {
	dir: path.join(__dirname, "Plugins"),
});
app.register(AutoLoad, {
	dir: path.join(__dirname, "Controllers"),
	options: { prefix: `/api/${Options.APP_VERSION}/` },
	routeParams: false
});
app.setErrorHandler(async (error: FastifyError) => {
	Log.Error(error);
	return {
		ok: false,
		status: 500,
		data: error.message
	};
});

const start = async (): Promise<void> => {
	try {
		await Database.Connect();
		Log.Info("Application started", "Application Entrance");
		await app.listen(Options.PORT, Options.IS_PROD ? "0.0.0.0" : "127.0.0.1");
	} catch (e) {
		Log.Error(e, "Application Entrance");
		await app.close();
		await Database.Close();
		process.exit(1);
	}
};

if (cluster.isMaster) {
	for (let i = 0; i < os.cpus().length; i++) {
		cluster.fork();
	}
}
else start();