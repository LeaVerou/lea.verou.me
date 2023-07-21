const tagNames = require("../data/tag_names.json");
const capitalizations = require("../data/capitalizations.json");
const fakeTags = new Set(["blog", "all", "postsByYear", "postsByMonth"]);

const filters = {
	async pluralize(num, word) {
		let plur = (await import("plur")).default;
		return num + " " + plur(word, num);
	},

	relative(page) {
		let path = page.url.replace(/[^/]+$/, "");
		let ret = require("path").relative(path, "/");

		return ret || ".";
	},

	relativize_urls(html, base_url) {
		// Go over <img src> and <a href> and make them relative to url
		// This is a hack to work around #5
		return html.replace(/(?<=<(?:img|a)\s+(?:[^>]*?\s+)?(?:src|href)=")([^"]+)(?=")/gi, (url) => {
			if (!/^(?:\/|[a-z]+:)/.test(url)) {

				// We don’t need to do anything in absolute or root-relative URLs
				let host = "https://lea.verou.me";
				let base = new URL(base_url, host);
				url = new URL(url, base) + "";
				url = url.substr(host.length);
			}

			return url;
		});
	},

	format_date(date, format = "long") {
		try {
			date = new Date(date);
		}
		catch (e) {
			return `Invalid date (${date})`
		}

		if (format == "iso") {
			return date.toISOString().substring(0, 10);
		}

		let options = typeof format === "string"? { dateStyle: format } : format;

		return date.toLocaleString("en-GB", options);
	},

	format_tag(tag) {
		if (tag in tagNames) {
			return tagNames[tag] === true ? tag : tagNames[tag];
		}

		tag = (tag + "").replace(/-/g, " ");

		for (let capitalization of capitalizations) {
			let lowercase = capitalization.toLowerCase();
			let regex = new RegExp(`\\b${lowercase}(?=\\b|\\d)`, "gi");
			tag = tag.replace(regex, capitalization);
		}

		return tag.replace(/\b\w/g, l => l.toUpperCase());
	},

	is_real_tag (tag) {
		return !fakeTags.has(tag);
	},

	real_tags_only (tags) {
		return tags.filter(filters.is_real_tag);
	},

	// Console.log() arguments, for debugging
	log(...args) {
		console.log(...args);
		return args[0];
	},

	keys(obj) {
		if (!obj) {
			return null;
		}

		return Object.keys(obj);
	},

	values(obj) {
		return Object.values(obj);
	},

	flatten(arr) {
		return arr.flat();
	},

	jsonify(obj, indent = "\t") {
		return JSON.stringify(obj, null, indent);
	},

	// Dump as JSON, without errors for circular references and with pretty-printing
	dump2(obj) {
		let cache = new WeakSet();

		let json = JSON.stringify(obj, (key, value) => {
			if (typeof value === "object" && value !== null) {
				// No circular reference found

				if (cache.has(value) || key === "templateContent") {
					return; // Circular reference found!
				}

				cache.add(value);
			}

			return value;
		}, "\t");

		return `<pre class="language-json">${json}</pre>`
	}
}

module.exports = filters;