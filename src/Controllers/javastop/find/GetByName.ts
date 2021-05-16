import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { Drink } from "../../../Repositories/JavaStop/DrinkRepository";
import { DrinkSchema } from "../../../Types/JavaStop/Abstract";

interface IRequest {
	name: string
}

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.get("/", {
		preValidation: [fastify.javastop],
		schema: {
			tags: ["JavaStop"],
			summary: "get drinks like name",
			querystring: {
				type: "object",
				required: ["name"],
				properties: {
					name: { type: "string" }
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
		const { name } = req.query as IRequest;
		try {
			res.statusCode = 200;
			return {
				ok: true,
				drinks: await Drink.GetByName(name)
			};
		} catch (error) {
			throw new Error(error);
		}
	});
};