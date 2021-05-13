import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { Drink } from "../../../Repositories/JavaStop/DrinkRepository";

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.get("/", {
		preValidation: [fastify.javastop],
		schema: {
			tags: ["JavaStop"],
			summary: "get all drinks",
			response: {
				200: {
					type: "object",
					properties: {
						ok: { type: "boolean" },
						drinks: {
							type: "array",
							items: {
								type: "object",
								properties: {
									id: { type: "number" },
									name: { type: "string" },
									recipe: { type: "array", items: { type: "string" } },
									sugarFreeOption: { type: "boolean" },
									isActive: { type: "boolean" },
									createdAt: { type: "string" }
								}
							}
						}
					}
				}
			}
		}
	}, async (_: FastifyRequest, res: FastifyReply) => {
		try {
			res.statusCode = 200;
			return {
				ok: true,
				drinks: await Drink.GetAll()
			};
		} catch (error) {
			throw new Error(error);
		}
	});
};