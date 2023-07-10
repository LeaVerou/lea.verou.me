let markdownIt = require("markdown-it");
let markdownItAnchor = require("markdown-it-anchor");
let markdownItAttrs = require('markdown-it-attrs');

module.exports = config => {
	let data = {
		layout: "page.njk",
		permalink: "{{ page.filePathStem }}.html",
		currentYear: new Date().getFullYear(),
	};

	for (let p in data) {
		config.addGlobalData(p, data[p]);
	}

	config.setDataDeepMerge(true);

	config.setFrontMatterParsingOptions({
		excerpt: true,
		// Optional, default is "---"
		excerpt_separator: "<!-- more -->"
	});

	let md = markdownIt({
		html: true,
		linkify: true,
	})
	.disable("code");

	config.setLibrary("md", markdownIt({
			html: true,
		})
		.use(markdownItAttrs)
		.use(markdownItAnchor, {
			permalink: markdownItAnchor.permalink.headerLink(),
			level: 2,
		})
		.disable("code")
	);

	config.addFilter("md", (value) => {
		if (typeof value !== "string") {
			return value;
		}

		return md.render(value);
	});

	config.addFilter("md_inline", (value) => {
		if (typeof value !== "string") {
			return value;
		}

		return md.renderInline(value);
	});

	config.addFilter(
		"relative",
		page => {
			let path = page.url.replace(/[^/]+$/, "");
			let ret = require("path").relative(path, "/");

			return ret || ".";
		}
	);

	config.addFilter("format_date", (date, format = "long") => {
		return new Date(date).toLocaleString("en-GB", {
			dateStyle: format
		});
	});

	return {
		markdownTemplateEngine: "njk",
		templateFormats: ["md", "njk"],
		dir: {
			output: "."
		},
	};
};
