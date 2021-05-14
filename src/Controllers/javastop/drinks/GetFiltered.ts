import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { Drink } from "../../../Repositories/JavaStop/DrinkRepository";
import { DrinkSchema } from "../../../Types/JavaStop/Abstract";

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.get("/popular", {
		preValidation: [fastify.javastop],
		schema: {
			tags: ["JavaStop"],
			summary: "get filtered drinks",
			response: {
				200: {
					type: "object",
					properties: {
						ok: { type: "boolean" },
						drinks: {
							type: "array",
							items: DrinkSchema
						},
						chocolate: {
							type: "array",
							items: DrinkSchema
						},
						whiteChocolate: {
							type: "array",
							items: DrinkSchema
						},
						vanilla: {
							type: "array",
							items: DrinkSchema
						},
						caramel: {
							type: "array",
							items: DrinkSchema
						},
						sugarFree: {
							type: "array",
							items: DrinkSchema
						},
						other: {
							type: "array",
							items: DrinkSchema
						}
					}
				}
			}
		}
	}, async (_: FastifyRequest, res: FastifyReply) => {
		try {
			const drinks = await Drink.GetPopularFlavors();
			res.statusCode = 200;
			return {
				ok: true,
				...drinks
			};
		} catch (error) {
			throw new Error(error);
		}
	});
};