import { Admin as _Admin } from "../../Models/JavaStop/Admin";
import { Password } from "../../Helpers/Password";

export class Admin {

	public static async Login(login: IJavaAdmin): Promise<_Admin> {
		try {
			const exists = await _Admin.findOne({ username: login.username });
			if (!exists) throw "username not found";

			const match = await Password.Compare(login.password, exists.password);
			if (!match) throw "incorrect password";

			return exists;
		} catch (error) {
			throw new Error(error);
		}
	}

	public static async Register(register: IJavaAdmin): Promise<_Admin> {
		try {
			const exists = await _Admin.findOne({ username: register.username });
			if (exists) throw "username taken";

			const newAdmin = new _Admin();
			newAdmin.username = register.username;
			newAdmin.password = await Password.Hash(register.password);

			return await newAdmin.save();
		} catch (error) {
			throw new Error(error);
		}
	}

	public static async FindByUid(uid: string): Promise<_Admin> {
		try {
			const exists = await _Admin.findOne({ uid });
			if (!exists) throw "user not found";

			return exists;
		} catch (error) {
			throw new Error(error);
		}
	}
}