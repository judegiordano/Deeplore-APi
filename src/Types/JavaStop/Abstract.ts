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

export const AdminSchema = {
	type: "object",
	properties: {
		id: { type: "number" },
		uid: { type: "string" },
		username: { type: "string" },
		tokenVersion: { type: "number" },
		createdAt: { type: "string" }
	}
};