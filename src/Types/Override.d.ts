/* eslint-disable @typescript-eslint/no-unused-vars */
import { FastifyInstance, FastifyRequest } from "fastify";

import { IJwtPayload } from "src/Helpers/Jwt";

declare module "fastify" {
	export interface FastifyInstance {
		authentication(): void;
		developer(): void;
		javastop(): void;
	}

	export interface FastifyRequest {
		jwt: IJwtPayload
	}
}