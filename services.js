const fs = require("fs-extra");
const path = require("path");
const utils = require("./utils");
const uuid = require("uuid");

const dataPath = path.join(__dirname, "data", "data.json");

const services = {
	async getErrors(errorCode) {
		if (errorCode === 404) {
			const error404FileData = await fs.readFile(path.join(__dirname, "public", "error404.html"));
			return error404FileData;
		}
	},
	async getItems() {
		try {
			const data = await utils.getData();
			return data;
		} catch (error) {
			console.log("DEBUG -> getItems -> error", error);
		}
	},
	async addItem(req) {
		try {
			const data = await utils.getData();
			let body = await utils.getBody(req);

			const newData = {
				id: uuid.v4(),
				name: body.name,
				price: body.price,
				description: body.description,
			};

			data.push(newData);

			await fs.writeFile(dataPath, JSON.stringify(data, null, 4));
			return data;
		} catch (error) {
			console.log("DEBUG -> addItem -> error", error);
			return "error";
		}
	},
	async removeItem(id) {
		try {
			const data = await utils.getData();

			const foundItem = data.find((item) => item.id === id);
			if (foundItem) {
				const newData = data.filter((item) => item.id !== id);
				await fs.writeFile(dataPath, JSON.stringify(newData));
				return newData;
			}
			return "item does not exist";
		} catch (error) {
			console.log("DEBUG -> addItem -> error", error);
			return "error";
		}
	},
};

module.exports = services;
