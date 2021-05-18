import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { Jwt } from "../../../Helpers/Jwt";
import { AdminSchema } from "../../../Types/JavaStop/Abstract";

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.post("/refresh", {
		preValidation: [fastify.javastop, fastify.authentication],
		schema: {
			tags: ["JavaStop"],
			summary: "login as a verified admin",
			headers: {
				type: "object",
				properties: {
					Authorization: { type: "string" }
				},
				required: ["Authorization"]
			},
			response: {
				200: {
					type: "object",
					properties: {
						ok: { type: "boolean" },
						token: { type: "string" },
						admin: AdminSchema
					}
				}
			}
		}
	}, async (req: FastifyRequest, res: FastifyReply) => {
		try {
			res.statusCode = 200;
			return {
				ok: true,
				token: Jwt.Sign(req.user),
				admin: req.user
			};
		} catch (error) {
			throw new Error(error);
		}
	});
};
