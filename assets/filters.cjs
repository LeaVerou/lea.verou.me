module.exports = {
	relative(page) {
		let path = page.url.replace(/[^/]+$/, "");
		let ret = require("path").relative(path, "/");

		return ret || ".";
	},

	format_date(date, format = "long") {
		return new Date(date).toLocaleString("en-GB", {
			dateStyle: format
		});
	}
}
