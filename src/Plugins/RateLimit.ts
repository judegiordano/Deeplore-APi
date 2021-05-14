import plugin from "fastify-plugin";
import { FastifyInstance } from "fastify";
import rateLimit from "fastify-rate-limit";

import { Config } from "../Helpers/Config";

export default plugin(async (fastify: FastifyInstance): Promise<void> => {
	fastify.register(rateLimit, {
		global: true,
		max: 1000,
		timeWindow: "1 minute",
		allowList: ["127.0.0.1"],
		addHeaders: {
			"x-ratelimit-limit": !Config.Options.IS_PROD,
			"x-ratelimit-remaining": !Config.Options.IS_PROD,
			"x-ratelimit-reset": !Config.Options.IS_PROD,
			"retry-after": !Config.Options.IS_PROD
		}
	});
});