const fs = require("fs-extra");
const path = require("path");

const services = {
	async getErrors(errorCode) {
		if (errorCode === 404) {
			const error404FileData = await fs.readFile(path.join(__dirname, "public", "error404.html"));
			return error404FileData;
		}
	},
};

module.exports = services;
