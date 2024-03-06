const tagNames = require("../data/tag_names.json");
const siteSettings = require("../data/site.json");
const capitalizations = require("../data/capitalizations.json");
const readingTime = require("reading-time");
const fakeTags = new Set(["blog", "all", "postsByYear", "postsByMonth"]);

const filters = {
	is_published (post) {
		return !post.data.draft && !post.data.unlisted;
	},

	prev_post (index, posts) {
		let ret;
		do {
			ret = posts[--index];
		} while(ret && !filters.is_published(ret));

		return ret;
	},

	next_post (index, posts) {
		let ret;
		do {
			ret = posts[++index];
		} while(ret && !filters.is_published(ret));

		return ret;
	},

	async pluralize(num, word) {
		let plur = (await import("plur")).default;
		return num + " " + plur(word, num);
	},

	reading_time (text) {
		return readingTime(text, {
			wordsPerMinute: 350
		});
	},

	relative (page) {
		let path = page.url.replace(/[^/]+$/, "");
		let ret = require("path").relative(path, "/");

		return ret || ".";
	},

	relativize_urls (html, base_url) {
		// Go over <img src> and <a href> and make them relative to url
		// This is a hack to work around #5
		return html.replace(/(?<=<(?:img|a)\s+(?:[^>]*?\s+)?(?:src|href)=")([^"]+)(?=")/gi, (url) => {
			if (!/^(?:\/|[a-z]+:)/.test(url)) { // We don’t need to do anything in absolute or root-relative URLs
				let absolute = filters.absolutize(url, base_url);
				url = absolute.href.substr(absolute.origin);
			}

			return url;
		});
	},

	absolutize (url, base_url) {
		let host = siteSettings.domain;
		let base = new URL(base_url, host);
		return new URL(url, base);
	},

	format_date (date, format = "long") {
		try {
			date = new Date(date);
		}
		catch (e) {
			return `Invalid date (${date})`
		}

		if (format == "iso") {
			return date.toISOString().substring(0, 10);
		}

		let options = format;

		if (typeof format === "string") {
			options = { dateStyle: format };
		}

		return date.toLocaleString("en-GB", options);
	},

	from (start, end, o = {}) {
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