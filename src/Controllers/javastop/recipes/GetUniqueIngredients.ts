import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { Drink } from "../../../Repositories/JavaStop/DrinkRepository";

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.get("/", {
		preValidation: [fastify.javastop],
		schema: {
			tags: ["JavaStop"],
			summary: "get all unique ingredients",
			response: {
				200: {
					type: "object",
					properties: {
						ok: { type: "boolean" },
						ingredients: {
							type: "array",
							items: { type: "string" }
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
				ingredients: await Drink.GetAllIngredients()
			};
		} catch (error) {
			throw new Error(error);
		}
	});
};