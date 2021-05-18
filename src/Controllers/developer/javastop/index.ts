import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { Admin } from "../../../Repositories/JavaStop/AdminRepository";
import { AdminSchema } from "../../../Types/JavaStop/Abstract";

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.put("/newadmin", {
		preValidation: [fastify.developer],
		schema: {
			tags: ["Dev"],
			summary: "as dev, insert a new admin",
			body: {
				type: "object",
				properties: {
					username: { type: "string" },
					password: { type: "string" }
				}
			},
			response: {
				200: {
					type: "object",
					properties: {
						ok: { type: "boolean" },
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
				admin: await Admin.Register(req.body as IJavaAdmin)
			};
		} catch (error) {
			throw new Error(error);
		}
	});
};
