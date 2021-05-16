import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { Drink } from "../../../Repositories/JavaStop/DrinkRepository";
import { DrinkSchema } from "../../../Types/JavaStop/Abstract";

interface IBody {
	ingredients: string[]
}

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.post("/recipe", {
		preValidation: [fastify.javastop],
		schema: {
			tags: ["JavaStop"],
			summary: "get drinks by recipe tags",
			body: {
				ingredients: {
					type: "array",
					items: { type: "string" }
				}
			},
			response: {
				200: {
					type: "object",
					properties: {
						ok: { type: "boolean" },
						drinks: {
							type: "array",
							items: DrinkSchema
						}
					}
				}
			}
		}
	}, async (req: FastifyRequest, res: FastifyReply) => {
		try {
			const { ingredients } = req.body as IBody;
			res.statusCode = 200;
			return {
				ok: true,
				drinks: await Drink.GetByRecipe(ingredients)
			};
		} catch (error) {
			throw new Error(error);
		}
	});
};
