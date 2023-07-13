const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItAttrs = require('markdown-it-attrs');
const embedTwitter = require("eleventy-plugin-embed-twitter");
const pluginTOC = require('eleventy-plugin-toc');


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

	config.addPlugin(embedTwitter);

	// config.addPlugin(pluginTOC, {
	// 	tags: ['h2'],
	// 	wrapper: 'div',
	// 	ul: true,
	// 	wrapper: "",
	// });

	return {
		markdownTemplateEngine: "njk",
		templateFormats: ["md", "njk"],
		dir: {
			output: "."
		},
	};
};
