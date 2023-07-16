const tagNames = require("../_data/tag_names.json");
const capitalizations = require("../_data/capitalizations.json");
const fakeTags = new Set(["blog", "all"]);

const filters = {
	relative(page) {
		let path = page.url.replace(/[^/]+$/, "");
		let ret = require("path").relative(path, "/");

		return ret || ".";
	},

	format_date(date, format = "long") {
		return new Date(date).toLocaleString("en-GB", {
			dateStyle: format
		});
	},

	format_tag(tag) {
		if (tag in tagNames) {
			return tagNames[tag];
		}

		tag = tag.replace(/-/g, " ");

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

	taglist (collections) {
		let tags = Object.keys(collections).filter(filters.is_real_tag);
		tags.sort((a, b) => collections[b].length - collections[a].length);

		return Object.fromEntries(tags.map(tag => [tag, collections[tag].length]));
	},

	// Console.log() arguments, for debugging
	log(...args) {
		console.log(...args);
		return args[0];
	},
}

module.exports = filters;