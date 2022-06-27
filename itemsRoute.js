const fs = require("fs-extra");
const path = require("path");
const utils = require("./utils");
const uuid = require("uuid");

async function getData() {
	try {
		const data = await fs.readFile(path.join(__dirname, "data", "data.json"), "utf8");
		console.log("DEBUG -> getData -> data", data);
		return data;
	} catch (error) {
		console.log("DEBUG -> getData -> error", error);
	}
}

module.exports = async (req, res) => {
	console.log("DEBUG -> req.url", req.url);
	if (req.url !== "/items") {
	}

	if (req.method !== "GET") {
		res.writeHead(405);
		res.end("Method not allowed");
	}

	// get all items
	try {
		const data = getData();
		console.log("DEBUG -> module.exports= -> data", data);
		res.writeHead(200, { "Content-Type": utils.getContentType(".json") });
		return data;
	} catch (error) {
		console.log("DEBUG -> module.exports= -> error", error);
	}
};
