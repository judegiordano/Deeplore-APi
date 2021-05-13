import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.get("/", {
		preValidation: [fastify.developer],
		schema: {
			tags: ["Dev"],
			summary: "test conneciton / subscription",
			response: {
				200: {
					type: "object",
					properties: {
						ok: { type: "boolean" },
						ping: { type: "string" },
						subscriptionStatus: { type: "string" }
					}
				}
			}
		}
	}, async (_: FastifyRequest, res: FastifyReply) => {
		res.statusCode = 200;
		return {
			ok: true,
			ping: "pong"
		};
	});
};