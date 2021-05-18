import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { Jwt } from "../../../Helpers/Jwt";
import { Admin } from "../../../Repositories/JavaStop/AdminRepository";
import { AdminSchema } from "../../../Types/JavaStop/Abstract";

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.post("/login", {
		preValidation: [fastify.javastop],
		schema: {
			tags: ["JavaStop"],
			summary: "login as a verified admin",
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
						admin: AdminSchema,
						token: { type: "string" }
					}
				}
			}
		}
	}, async (req: FastifyRequest, res: FastifyReply) => {
		const admin = await Admin.Login(req.body as IJavaAdmin);
		try {
			res.statusCode = 200;
			return {
				ok: true,
				token: Jwt.Sign(admin),
				admin
			};
		} catch (error) {
			throw new Error(error);
		}
	});
};
