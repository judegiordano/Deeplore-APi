import plugin from "fastify-plugin";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { Config } from "../Helpers/Config";

const { Subscriptions: Subs } = Config;

export default plugin(async (fastify: FastifyInstance): Promise<void> => {
	fastify.decorate("developer", async (request: FastifyRequest, reply: FastifyReply) => {
		try {
			const { appsubscription: sub } = request.headers;
			if (!sub) throw "missing subscription";
			if (sub !== Subs.DEV_SUBSCRIPTION) throw "invalid subscription";
		} catch (error) {
			reply.statusCode = 401;
			throw new Error(error);
		}
	});
	fastify.decorate("javastop", async (request: FastifyRequest, reply: FastifyReply) => {
		try {
			const { appsubscription: sub } = request.headers;
			if (!sub) throw "missing subscription";
			if (sub !== Subs.DEV_SUBSCRIPTION)
				if (sub !== Subs.JAVASTOP_SUBSCRIPTION) throw "invalid subscription";
		} catch (error) {
			reply.statusCode = 401;
			throw new Error(error);
		}
	});
});