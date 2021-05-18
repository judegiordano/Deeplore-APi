import jwt from "jsonwebtoken";

import { Config } from "../Helpers/Config";

export class Jwt {

	private static readonly Secret = Config.JwtSecrets.JAVASTOP_JWT_SECRET;

	public static Sign(user: IJavaAdmin): string {
		return jwt.sign({
			id: user.id,
			uid: user.uid,
			username: user.username,
			tokenVersion: user.tokenVersion
		}, Jwt.Secret, { expiresIn: "10s" });
	}

	public static Verify(token: string): IJavaAdmin {
		return jwt.verify(token, Jwt.Secret) as IJavaAdmin;
	}
}