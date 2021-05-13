import { InsertResult } from "typeorm";
import { Drink as _Drink } from "../../Models/JavaStop/Drinks";

export class Drink {

	public static async Insert(drink: IDrink): Promise<_Drink> {
		try {
			const exists = await _Drink.findOne({ name: drink.name });
			if (exists) throw "Drink already Exists";

			const newDrink = new _Drink();
			newDrink.name = drink.name;
			newDrink.sugarFreeOption = drink.sugarFreeOption;
			newDrink.isActive = drink.isActive;
			newDrink.recipe = drink.recipe;

			return newDrink.save();
		} catch (error) {
			throw new Error(error);
		}
	}

	public static async InsertMany(newDrinks: IDrink[]): Promise<InsertResult> {
		try {
			for (const key in newDrinks) {
				const exists = await _Drink.findOne({ name: newDrinks[key]?.name });
				if (exists) throw `drink ${newDrinks[key]?.name} already exists`;
			}
			const inserts = await _Drink.createQueryBuilder().insert().values(newDrinks).execute();
			return inserts;
		} catch (error) {
			throw new Error(error);
		}
	}

	public static async GetAll(): Promise<_Drink[]> {
		try {
			return await _Drink.find();
		} catch (error) {
			throw new Error(error);
		}
	}
}