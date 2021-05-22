import fs from "fs";

export class Utility {

	public static CreateUUID(): string {
		let dt = new Date().getTime();
		return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
			const r = (dt + Math.random() * 16) % 16 | 0;
			dt = Math.floor(dt / 16);
			return (c == "x" ? r : (r & 0x3 | 0x8)).toString(16);
		});
	}

	public static EncodeBase64(file: number | fs.PathLike): string {
		try {
			return fs.readFileSync(file, "base64");
		} catch (error) {
			throw new Error(error);
		}
	}

	public static BufferToBase64(buffer: Buffer): string {
		try {
			return Buffer.from(buffer).toString("base64");
		} catch (error) {
			throw new Error(error);
		}
	}
}