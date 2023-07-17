const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItAttrs = require('markdown-it-attrs');
const embeds = require("eleventy-plugin-embed-everything");
const pluginTOC = require('eleventy-plugin-toc');
const filters = require("./assets/filters.cjs");


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

	for (let name in filters) {
		config.addFilter(name, filters[name]);
	}

	config.addPlugin(embeds);

	// Based on https://github.com/11ty/eleventy/issues/1284#issuecomment-1026679407
	config.addCollection("postsByMonth", (collectionApi) => {
		const posts = collectionApi.getFilteredByTag("blog").reverse();
		const ret = {};

		for (let post of posts) {
			let key = filters.format_date(post.date, "iso").substring(0, 7);
			ret[key] ??= [];
			ret[key].push(post);
		}

		return ret;
	});

	config.addCollection("postsByYear", (collectionApi) => {
		const posts = collectionApi.getFilteredByTag("postsByMonth").reverse();
		const ret = {};

		for (let post of posts) {
			let key = filters.format_date(post.date, "iso").substring(0, 4);
			ret[key] ??= [];
			ret[key].push(post);
		}

		return ret;
	});

	config.addPlugin(pluginTOC, {
		tags: ['h2'],
		ul: true,
		wrapper: "",
	});

	return {
		markdownTemplateEngine: "njk",
		templateFormats: ["md", "njk"],
		dir: {
			output: "."
		},
	};
};
