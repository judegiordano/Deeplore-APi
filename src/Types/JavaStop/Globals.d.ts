declare interface IDrink {
	name: string,
	sugarFreeOption: boolean,
	isActive: boolean,
	recipe: string[]
}

declare interface IFilteredFlavors {
	drinks: IDrink[],
	chocolate: IDrink[],
	whiteChocolate: IDrink[],
	vanilla: IDrink[],
	caramel: IDrink[],
	sugarFree: IDrink[],
	other: IDrink[]
}

declare interface IJavaAdmin {
	id?: number,
	uid: string,
	username: string,
	password: string,
	tokenVersion?: number,
}