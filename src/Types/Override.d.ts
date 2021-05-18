/* eslint-disable @typescript-eslint/no-unused-vars */
import { FastifyInstance, FastifyRequest } from "fastify";

declare module "fastify" {
	export interface FastifyInstance {
		authentication(): void;
		developer(): void;
		javastop(): void;
	}

	export interface FastifyRequest {
		user: IJavaAdmin
	}
}