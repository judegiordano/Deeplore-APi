import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { Drink } from "../../../Repositories/JavaStop/DrinkRepository";
import { DrinkSchema } from "../../../Types/JavaStop/Abstract";

interface IRequest {
	id: number
}

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.get("/:id", {
		preValidation: [fastify.javastop],
		schema: {
			tags: ["JavaStop"],
			summary: "get one drink by id",
			params: {
				type: "object",
				required: ["id"],
				properties: {
					id: { type: "number" }
				}
			},
			response: {
				200: {
					type: "object",
					properties: {
						ok: { type: "boolean" },
						drink: DrinkSchema
					}
				}
			}
		}
	}, async (req: FastifyRequest, res: FastifyReply) => {
		const { id } = req.params as IRequest;
		try {
			res.statusCode = 200;
			return {
				ok: true,
				drink: await Drink.GetById(id)
			};
		} catch (error) {
			throw new Error(error);
		}
	});
};