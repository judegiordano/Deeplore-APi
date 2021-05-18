import fs from "fs";

export class Utility {

	private static chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private static Shuffle(array: any): string[] | number[] {
		let cur = array.length;
		let temp;
		let rand;

		while (0 !== cur) {
			rand = Math.floor(Math.random() * cur);
			cur -= 1;

			temp = array[cur];
			array[cur] = array[rand];
			array[rand] = temp;
		}
		return array;
	}

	public static RandomNumber(): number {
		try {
			const _arr: number[] = Array.from(String(Date.now()), Number);
			const _rand: number[] = Utility.Shuffle(_arr) as number[];
			const uid = Number(_rand.join(""));
			return uid;
		} catch (error) {
			throw new Error(error);
		}
	}

	public static RandomUid(len: number): string {
		try {
			let uid = "";
			while (uid.length <= len) {
				const _arr: string[] = Array.from(String(Utility.chars), String);
				const _rand: string[] = Utility.Shuffle(_arr) as string[];
				uid += String(_rand.join(""));
			}
			if (uid.length > len) {
				uid = uid.substr(0, len);
			}
			return uid;
		} catch (error) {
			throw new Error(error);
		}
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