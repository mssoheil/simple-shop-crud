const http = require("http");
const services = require("./services");
const itemsRoute = require("./itemsRoute");
const utils = require("./utils");

const server = http.createServer(async (req, res) => {
	const regEx = /\/item(s)?(\?id=)?.*/;
	if (regEx.test(req.url)) {
		await itemsRoute(req, res);
		return;
	}
	const response = await services.getErrors(404);
	res.writeHead(404, { "Content-Type": utils.getContentType(".html") });
	res.end(response);
	return;
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
	console.log(`listening on port ${PORT}...`.cyan);
});
