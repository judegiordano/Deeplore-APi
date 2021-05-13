
import plugin from "fastify-plugin";
import swagger from "fastify-swagger";
import { FastifyInstance } from "fastify";

import { Config } from "../Helpers/Config";

const { Options } = Config;

export default plugin(async (fastify: FastifyInstance): Promise<void> => {
	fastify.register(swagger, {
		routePrefix: `/api/${Options.APP_VERSION}/docs`,
		swagger: {
			info: {
				title: "Deeplore Rest Api",
				description: "API documentation for this service",
				version: "1.0.0",
			},
			host: Options.IS_PROD ? Options.HOST : `${Options.HOST}:${Options.PORT}`,
			schemes: [Options.IS_PROD ? "https" : "http"],
			consumes: ["application/json"],
			produces: ["application/json"],
			tags: [
				{ name: "Dev", description: "Dev related endpoints" },
				{ name: "JavaStop", description: "Agawam Java Stop related endpoints" }
			],
		},
		exposeRoute: true
	});
});