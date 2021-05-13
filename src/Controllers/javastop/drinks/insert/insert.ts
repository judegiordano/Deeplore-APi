import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { Drink } from "../../../../Repositories/JavaStop/DrinkRepository";

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.post("/", {
		preValidation: [fastify.javastop],
		schema: {
			tags: ["JavaStop"],
			summary: "insert new drink",
			body: {
				type: "object",
				properties: {
					name: { type: "string" },
					sugarFreeOption: { type: "boolean" },
					isActive: { type: "boolean" },
					recipe: { type: "array", items: { type: "string" } }
				}
			},
			response: {
				200: {
					type: "object",
					properties: {
						ok: { type: "boolean" },
						drink: {
							type: "object",
							properties: {
								name: { type: "string" },
								sugarFreeOption: { type: "boolean" },
								isActive: { type: "boolean" },
								recipe: { type: "array", items: { type: "string" } }
							}
						}
					}
				}
			}
		}
	}, async (req: FastifyRequest, res: FastifyReply) => {
		try {
			res.statusCode = 200;
			return {
				ok: true,
				drink: await Drink.Insert(req.body as IDrink)
			};
		} catch (error) {
			throw new Error(error);
		}
	});
};
