import plugin from "fastify-plugin";
import cors from "fastify-cors";
import { FastifyInstance } from "fastify";

import { Config } from "../Helpers/Config";

const { Options } = Config;

export default plugin(async (fastify: FastifyInstance): Promise<void> => {
	fastify.register(cors, {
		allowedHeaders: ["APPCODE", "APPTOKEN", "Authorization"],
		exposedHeaders: ["Authorization"],
		origin: Options.IS_PROD ? Options.HOST : false,
		credentials: true,
		preflightContinue: false,
		preflight: false
	});
});