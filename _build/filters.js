import readingTime from "reading-time";
import path from "path";

// Workaround for https://github.com/11ty/eleventy-dependency-tree-esm/issues/4
// import tagNames from "../data/tag_names.json" with { type: "json" };
// import siteSettings from "../data/site.json" with { type: "json" };
// import capitalizations from "../data/capitalizations.json" with { type: "json" };
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const tagNames = require("../data/tag_names.json");
const siteSettings = require("../data/site.json");
const capitalizations = require("../data/capitalizations.json");

const fakeTags = new Set(["blog", "all", "postsByYear", "postsByMonth"]);


export function is_published (post) {
	return !post.data.draft && !post.data.unlisted;
}

export function prev_post (index, posts) {
	let ret;
	do {
		ret = posts[--index];
	}
	while(ret && !is_published(ret));

	return ret;
}

export function next_post (index, posts) {
	let ret;
	do {
		ret = posts[++index];
	}
	while(ret && !is_published(ret));

	return ret;
}

export async function pluralize(num, word) {
	let plur = (await import("plur")).default;
	return num + " " + plur(word, num);
}

export function reading_time (text) {
	return readingTime(text, {
		wordsPerMinute: 350
	});
}

export function relative (page) {
	let pagePath = page.url.replace(/[^/]+$/, "");
	let ret = path.relative(pagePath, "/");

	return ret || ".";
}

export function relativize_urls (html, base_url) {
	// Go over <img src> and <a href> and make them relative to url
	// This is a hack to work around #5
	return html.replace(/(?<=<(?:img|a)\s+(?:[^>]*?\s+)?(?:src|href)=")([^"]+)(?=")/gi, (url) => {
		if (!/^(?:\/|[a-z]+:)/.test(url)) { // We don’t need to do anything in absolute or root-relative URLs
			let absolute = absolutize(url, base_url);
			url = absolute.href.substr(absolute.origin);
		}

		return url;
	});
}

export function absolutize (url, base_url) {
	let host = siteSettings.domain;
	let base = new URL(base_url, host);
	return new URL(url, base);
}

export function format_date (inputDate, format = "long") {
	let date = inputDate instanceof Date ? inputDate : new Date(inputDate);

	if (isNaN(date)) {
		// Invalid date
		console.warn(`Invalid date (${inputDate})`);
		return inputDate;
	}

	if (format == "iso") {
		return date.toISOString().substring(0, 10);
	}

	let options = format;

	if (typeof format === "string") {
		options = { timeZone: "UTC", dateStyle: format };
	}

	return date.toLocaleString("en-GB", options);
}

export function from (start, end, o = {}) {
	if (!start || !end) {
		return "";
	}

	let diff = Math.abs(end - start);

	// Throw away sub-day units, we don’t need it here
	let days = Math.round(diff / (24 * 60 * 60 * 1000));
	let parts = [];
	let maxUnit = "ms";

	if (days < 7) {
		parts.push({ unit: "d", value: days });

	}
	else if (days < 28) {
		parts.push({ unit: "w", value: Math.round(days / 7) });
	}
	else {
		let months_total = Math.round(days / 30.437);
		let months = months_total % 12;
		let years = Math.floor(months_total / 12);

		if (years >= 2 && months > 6 || months > 9) {
			years++;
			months = 0;
		}

		if (years >= 1) {
			parts.push({ unit: "y", value: years});
		}

		if (months > 0 && years < 2 && (years === 0 || months_total > 2)) {
			parts.push({ unit: "m", value: months });
		}
	}

	// This should never happen
	if (parts.length === 0) {
		parts.push({ unit: "ms", value: diff });
	}
	else {
		maxUnit = parts[0].unit;
	}

	if (o.structured) {
		return {maxUnit, parts};
	}

	return parts.map(({unit, value}) => `${value}${unit}`).join(" ");
}

export function format_tag(tag) {
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
}

export function is_real_tag (tag) {
	return !fakeTags.has(tag);
}

export function real_tags_only (tags) {
	return tags.filter(is_real_tag);
}

export function log(...args) {
	console.log(...args);
	return args[0];
}

export function keys(obj) {
	if (!obj) {
		return null;
	}

	return Object.keys(obj);
}

export function values(obj) {
	if (!obj) {
		return null;
	}

	return Object.values(obj);
}

export function flatten(arr) {
	return arr.flat();
}

export function jsonify(obj, indent = "\t") {
	return JSON.stringify(obj, null, indent);
}

// Dump as JSON, without errors for circular references and with pretty-printing
export function dump2(obj) {
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

export function token_if (attribute, map) {
	let value = Object.entries(map).filter(([key, value]) => value).map(([key,]) => key).join(" ");

	if (value) {
		return ` ${attribute}="${value}"`;
	}

	return "";
}
