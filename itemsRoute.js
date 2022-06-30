const utils = require("./utils");
const services = require("./services");
const url = require("url");
const { URL } = require("url");
const validator = require("validator");

module.exports = async (req, res) => {
	if (req.url !== "/items") {
		try {
			// add item
			if (req.method === "POST") {
				const data = await services.addItem(req);

				res.writeHead(200, { "Content-Type": utils.getContentType(".json") });
				return res.end(JSON.stringify(data));
			}
			// remove item
			if (req.method === "DELETE") {
				const id = url.parse(req.url, true).query.id;
				if (!validator.isUUID(id)) {
					return res.end("id is wrong");
				}
				const data = await services.removeItem(id);

				res.writeHead(200, { "Content-Type": utils.getContentType(".json") });
				return res.end(JSON.stringify(data));
			}
			// get specific item
			if (req.method === "GET") {
				const newUrl = new URL(req.url, "http://localhost:5000");
				const id = newUrl.searchParams.get("id");
				if (!validator.isUUID(id)) {
					res.writeHead(400, { "Content-Type": utils.getContentType(".txt") });
					return res.end("id is wrong");
				}
				const item = await services.getItem(id);
				res.writeHead(200, { "Content-Type": utils.getContentType(".json") });
				res.end(JSON.stringify(item));
			}
			// modify item
			if (req.method === "PUT") {
				const newUrl = new URL(req.url, "http://localhost:5000");
				const id = newUrl.searchParams.get("id");
				if (!validator.isUUID(id)) {
					res.writeHead(400, { "Content-Type": utils.getContentType(".txt") });
					return res.end("id is wrong");
				}
				const data = await services.editItem(req);
				if (typeof data === "string") {
					res.writeHead(404, { "Content-Type": utils.getContentType(".txt") });
					return res.end(data);
				}
				res.writeHead(200, { "Content-Type": utils.getContentType(".json") });
				res.end(JSON.stringify(data));
			}
		} catch (error) {
			console.log("DEBUG -> module.exports= -> error", error);
		}
		return;
	}

	if (req.method !== "GET") {
		res.writeHead(405);
		res.end("Method not allowed");
	}

	// get all items
	try {
		const items = await services.getItems();
		res.writeHead(200, { "Content-Type": utils.getContentType(".json") });
		res.end(items);
	} catch (error) {
		console.log("DEBUG -> get all items -> error", error);
	}
};
