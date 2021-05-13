import path from "path";
import fastify from "fastify";
import AutoLoad from "fastify-autoload";

import { Database } from "./Helpers/Database";
import { Config } from "./Helpers/Config";

const { Options } = Config;
const app = fastify({ logger: true });

app.register(import("./Middleware/Auth"));
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
		app.listen(process.env.PORT || 3000, () => {
			app.log.info(`server running on ${Options.HOST}/${Options.PORT}`);
		});
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

start();