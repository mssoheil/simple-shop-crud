const utils = require("./utils");
const services = require("./services");

module.exports = async (req, res) => {
	if (req.url !== "/items") {
		try {
			// add item
			if (req.method === "POST") {
				const data = await services.addItem(req);

				res.writeHead(200, { "Content-Type": utils.getContentType(".json") });
				res.end(JSON.stringify(data));
			}
			// remove item
			// modify item
			// get specific item
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
