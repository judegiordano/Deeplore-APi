import plugin from "fastify-plugin";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { Jwt } from "../Helpers/Jwt";
import { Admin } from "../Repositories/JavaStop/AdminRepository";

export default plugin(async (fastify: FastifyInstance): Promise<void> => {
	fastify.decorate("authentication", async (request: FastifyRequest, reply: FastifyReply) => {
		try {
			const auth = request.headers.authorization;
			if (!auth) throw "missing auth";

			const token = auth.split(" ")[1];
			if (!token) throw "missing token";

			const deserialized = Jwt.Verify(token);
			const user = await Admin.FindByUid(deserialized.uid as string);

			if (user.tokenVersion !== deserialized.tokenVersion) throw "invalid token version";

			request.user = user;
		} catch (error) {
			reply.statusCode = 401;
			throw new Error(error);
		}
	});
});