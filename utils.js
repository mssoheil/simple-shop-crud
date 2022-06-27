function getContentType(extention) {
	switch (extention) {
		case ".js":
			return "text/javascript";
		case ".css":
			return "text/css";
		case ".json":
			return "application/json";

		default:
			return "text/html";
	}
}

module.exports = {
	getContentType,
};
