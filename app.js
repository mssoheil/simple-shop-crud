const fs = require("fs-extra");
const http = require("http");
const path = require("path");
const colors = require("colors");
const services = require("./services");
const itemsRoute = require("./itemsRoute");
const utils = require("./utils");

const server = http.createServer(async (req, res) => {
	const filePath = path.join(__dirname, "public", req.url);
	console.log("DEBUG -> req.method", req.method);

	switch (req.url) {
		case "/items":
			await itemsRoute(req, res);
			break;
		case "/item":
			await itemsRoute(req, res);
			break;

		default:
			const response = await services.getErrors(404);
			res.writeHead(404, { "Content-Type": utils.getContentType(".html") });
			res.end(response);
			break;
	}
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
	console.log(`listening on port ${PORT}...`.cyan);
});
