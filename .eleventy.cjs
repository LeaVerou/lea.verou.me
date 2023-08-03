const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItAttrs = require('markdown-it-attrs');
const markdownItFootnote = require('markdown-it-footnote');
const embeds = require("eleventy-plugin-embed-everything");
const pluginTOC = require('eleventy-plugin-toc');
const filters = require("./assets/filters.cjs");
const tag_aliases = require("./data/tag_aliases.json");
const pluginRss = require("@11ty/eleventy-plugin-rss");

let foo = false;
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
		typographer: true,
	})
	.disable("code")
	.use(markdownItAttrs)
	.use(markdownItFootnote)
	.use(markdownItAnchor, {
		permalink: markdownItAnchor.permalink.headerLink(),
		level: 2,
	})
	;

	config.setLibrary("md", md);

	config.addFilter("md", (value, o = {}) => {
		if (typeof value !== "string") {
			if (value instanceof String) {
				value = value + "";
			}
			else {
				return value;
			}

		}

		let ret = md.render(value, o);

		if (o.url) {
			ret = filters.relativize_urls(ret, o.url);
		}

		return ret;
	});

	config.addFilter("md_inline", (value) => {
		if (typeof value !== "string") {
			return value;
		}

		return md.renderInline(value, o);
	});

	for (let name in filters) {
		config.addFilter(name, filters[name]);
	}

	config.addPlugin(embeds);
	config.addPlugin(pluginRss);

	config.addCollection("postsByTag", (collectionApi) => {
		const posts = collectionApi.getFilteredByTag("blog");
		let ret = {};

		for (let post of posts) {
			for (let tag of post.data.tags) {
				if (filters.is_real_tag(tag)) {
					ret[tag] ??= [];
					ret[tag].push(post);
				}
			}
		}

		// Now sort, and reconstruct the object
		ret = Object.fromEntries(Object.entries(ret).sort((a, b) => b[1].length - a[1].length));

		// Now add aliases
		for (let alias in tag_aliases) {
			let aliasOf = tag_aliases[alias];
			if (ret[aliasOf]) {
				ret[aliasOf].aliases ??= [];
				ret[aliasOf].aliases.push(alias);
			}
		}

		return ret;
	});

	config.addCollection("postsByMonth", (collectionApi) => {
		const posts = collectionApi.getFilteredByTag("blog").reverse();
		const ret = {};

		for (let post of posts) {
			let key = filters.format_date(post.date, "iso").substring(0, 7); // YYYY-MM
			ret[key] ??= [];
			ret[key].push(post);
		}

		return ret;
	});

	config.addCollection("postsByYear", (collectionApi) => {
		const posts = collectionApi.getFilteredByTag("blog").reverse();
		const ret = {};

		for (let post of posts) {
			let key = post.date.getFullYear();
			ret[key] ??= [];
			ret[key].push(post);
		}

		return ret;
	});

	config.addPlugin(pluginTOC, {
		tags: ["h2", "h3"],
		ul: true,
		wrapper: "",
	});

	return {
		markdownTemplateEngine: "njk",
		templateFormats: ["md", "njk"],
		dir: {
			data: "data",
			output: "."
		},
	};
};
