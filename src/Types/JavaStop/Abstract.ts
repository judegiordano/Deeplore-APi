export const DrinkSchema = {
	type: "object",
	properties: {
		id: { type: "number" },
		name: { type: "string" },
		recipe: { type: "array", items: { type: "string" } },
		sugarFreeOption: { type: "boolean" },
		isActive: { type: "boolean" },
		createdAt: { type: "string" }
	}
};