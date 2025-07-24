import markdownIt from "markdown-it";
import * as filters from "./filters.js";
import pluginRss from "@11ty/eleventy-plugin-rss";

import markdownItAnchor from "markdown-it-anchor";
import markdownItAttrs from "markdown-it-attrs";
import markdownItFootnote from "markdown-it-footnote";
import markdownItMathjax3 from "markdown-it-mathjax3";
import markdownItDeflist from "markdown-it-deflist";
import embeds from "eleventy-plugin-embed-everything";
import pluginTOC from "eleventy-plugin-toc";

// Workaround for https://github.com/11ty/eleventy-dependency-tree-esm/issues/4
// import tag_aliases  from "../data/tag_aliases.json" with { type: "json" };
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const tag_aliases = require("../data/tag_aliases.json");

let published;
function getPublished (collectionApi) {
	let posts = collectionApi.getFilteredByTag("blog");

	if (!published) {
		published = posts.filter(item => !item.data.draft && !item.data.unlisted);

		// Sort by date, descending
		published.sort((a, b) => b.date - a.date);
	}

	return published;
}

// When having comments in an MD file, the closing comment tag is rendered by markdown-it as “–-&gt;” instead of “-->”.
// It breaks the list of blogs (and possibly other things as well). See https://github.com/LeaVerou/lea.verou.me/issues/112
function fixCommentClosing (md) {
	let defaultRender = md.renderer.render;
	md.renderer.render = function (tokens, options, env) {
		let html = defaultRender.call(this, tokens, options, env);
		return html.replace(/\-\-&gt;/g, "-->");
	};
}

export default config => {
	let data = {
		layout: "page.njk",
		permalink: "{{ page | permalink }}",
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
	.use(markdownItMathjax3)
	.use(markdownItAttrs)
	.use(markdownItFootnote)
	.use(markdownItDeflist)
	.use(markdownItAnchor, {
		permalink: markdownItAnchor.permalink.headerLink(),
		level: 2,
	})
	.use(fixCommentClosing);

	config.setLibrary("md", md);

	let markdown = {
		block: (value, o = {}) => {
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
		},
		inline: (value) => {
			if (typeof value !== "string") {
				return value;
			}

			return md.renderInline(value);
		},
	}

	config.addPairedShortcode("markdown", markdown.block);
	config.addFilter("md_block", function(value, options) {
		let safe = this.env.filters.safe;
		return safe(markdown.block(value, options));
	});

	config.addFilter("md", function(value, options) {
		let safe = this.env.filters.safe;
		return safe(markdown.inline(value, options));
	});

	for (let name in filters) {
		config.addFilter(name, filters[name]);
	}

	config.addPlugin(embeds);
	config.addPlugin(pluginRss);

	config.addCollection("published", getPublished);

	config.addCollection("postsByTag", (collectionApi) => {
		const posts = getPublished(collectionApi);
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
		const posts = getPublished(collectionApi);
		const ret = {};

		for (let post of posts) {
			let key = filters.format_date(post.date, "iso").substring(0, 7); // YYYY-MM
			ret[key] ??= [];
			ret[key].push(post);
		}

		return ret;
	});

	config.addCollection("postsByYear", (collectionApi) => {
		const posts = getPublished(collectionApi);
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
