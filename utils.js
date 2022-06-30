const fs = require("fs-extra");
const path = require("path");

function getContentType(extention) {
	switch (extention) {
		case ".js":
			return "text/javascript";
		case ".css":
			return "text/css";
		case ".json":
			return "application/json";
		case ".txt":
			return "text/plain";

		default:
			return "text/html";
	}
}

async function getBody(req) {
	return new Promise((resolve, reject) => {
		try {
			let body = "";
			req.on("data", (chunk) => {
				body += chunk.toString();
			});

			req.on("end", () => {
				resolve(JSON.parse(body));
			});
		} catch (error) {
			reject(error);
		}
	});
}

async function getData() {
	try {
		const data = await fs.readFile(path.join(__dirname, "data", "data.json"), "utf8");
		return JSON.parse(data);
	} catch (error) {
		console.log("DEBUG -> getData -> error", error);
	}
}

module.exports = {
	getContentType,
	getBody,
	getData,
};
