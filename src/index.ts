import os from "os";
import path from "path";
import cluster from "cluster";
import fastify from "fastify";
import AutoLoad from "fastify-autoload";

import { Database } from "./Helpers/Database";
import { Config } from "./Helpers/Config";

const { Options } = Config;
const app = fastify({ logger: true });

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

const start = async (): Promise<void> => {
	try {
		await Database.Connect();
		await app.listen(parseInt(Options.PORT as string), Options.IS_PROD ? "0.0.0.0" : "127.0.0.1");
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

if (cluster.isMaster) {
	for (let i = 0; i < os.cpus().length; i++) {
		cluster.fork();
	}
}
else start();