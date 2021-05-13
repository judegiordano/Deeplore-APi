import path from "path";
import { FastifyInstance, FastifyPluginOptions } from "fastify";
import AutoLoad from "fastify-autoload";

import { Database } from "./Helpers/Database";
import { Config } from "./Helpers/Config";

const { Options } = Config;

(async () => {
	await Database.Connect();
})();

export default async (fastify: FastifyInstance, opts: FastifyPluginOptions): Promise<void> => {
	try {

		await fastify.register(import("./Middleware/Auth"));
		await fastify.register(import("./Middleware/AppSubscription"));

		await fastify.register(AutoLoad, {
			dir: path.join(__dirname, "Plugins"),
			options: Object.assign({}, opts)
		});

		await fastify.register(AutoLoad, {
			dir: path.join(__dirname, "Controllers"),
			options: { prefix: `/api/${Options.APP_VERSION}/` },
			routeParams: false
		});

	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};