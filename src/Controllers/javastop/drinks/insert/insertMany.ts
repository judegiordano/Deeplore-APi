import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { Drink } from "../../../../Repositories/JavaStop/DrinkRepository";

interface IBody {
	drinks: IDrink[]
}

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.post("/many", {
		preValidation: [fastify.javastop],
		schema: {
			tags: ["JavaStop"],
			summary: "insert multiple new drinks",
			body: {
				drinks: {
					type: "array",
					items: {
						type: "object",
						properties: {
							name: { type: "string" },
							sugarFreeOption: { type: "boolean" },
							isActive: { type: "boolean" },
							recipe: { type: "array", items: { type: "string" } }
						}
					}
				}
			},
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
									createdAt: { type: "string" },
									updatedAt: { type: "string" },
									sugarFreeOption: { type: "boolean" },
									isActive: { type: "boolean" }
								}
							}
						}
					}
				}
			}
		}
	}, async (req: FastifyRequest, res: FastifyReply) => {
		try {
			const { drinks } = req.body as IBody;
			const inserted = await Drink.InsertMany(drinks);
			res.statusCode = 200;
			return {
				ok: true,
				drinks: inserted.raw
			};
		} catch (error) {
			throw new Error(error);
		}
	});
};
