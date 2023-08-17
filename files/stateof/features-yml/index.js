import Backend, { Format } from "https://madata.dev/src/index.js";
import MadataAuth from "https://madata.dev/components/auth/index.js";

let feature_meta = await (await fetch("./features.csv")).text();
let urls = await (await fetch("./urlmeta.json")).json();

feature_meta = Format.CSV.parse(feature_meta);

let github = Backend.from("https://api.github.com/graphql", {
	query: `query {
  repository(owner: "devographics", name: "surveys") {
    discussions(last: 100, categoryId: "DIC_kwDOHru_As4CYAOU") {
      nodes {
        title,
        body,
		url
      }
    }
  }
}`
});

globalThis.github = toolbar_gh.backend = github;

await new Promise(resolve => github.addEventListener("mv-login", resolve));

let data = await github.load();
data = data?.repository?.discussions.nodes;

console.info(`Loaded ${data.length} discussions`);

const lineBreaks = /(\r?\n|\r)+/g;

let features = data.flatMap(feature => {
	let meta = feature_meta.find(f => f.Discussion === feature.url);

	if (!meta) {
		console.warn(`No meta found for ${feature.url}`);
		return [];
	}

	if (meta["In Part 1"] === "No") {
		return [];
	}

	let ret = {
		id: meta.id,
		name: feature.title,
	};

	let body = feature.body.replace(lineBreaks, "\n");

	// Extract description
	let description = body.match(/^[^#]+?(?=\n+###|\n+```)/);
	if (description) {
		ret.description = description[0].trim();
		body = body.slice(description.length);
	}
	else {
		console.warn(`No description found for ${feature.url}`);
	}

	// Extract code example, if present
	if (body.includes("```")) {
		// Extract first code example from markdown
		const regex = /```(?<language>[a-zA-Z]*)\n(?<code>[^`]*)```/gm;
		const matches = body.matchAll(regex);

		let codeOffsets = {};
		for (let match of matches) {
			if (!ret.example) {
				// We only want the first code example in the question
				let code = match.groups.code;

				ret.example = {
					language: match.groups.language,
					code
				};

				codeOffsets.start = match.index;
			}

			codeOffsets.end = match.index + match[0].length;
		}

		// Remove code examples from body to not trip up other matching (e.g. URLs)
		if (codeOffsets.start !== undefined && codeOffsets.end !== undefined) {
			body = body.slice(0, codeOffsets.start) + body.slice(codeOffsets.end);
		}
	}
	else {
		console.warn(`No code example found for ${feature.url}`);
	}

	// Extract URLs
	if (/https?:\/\//.test(body)) {
		let urlMatches = body.matchAll(/https?:\/\/[^\s\)]+/g);

		for (let url of urlMatches) {
			url = url[0];
			url = new URL(url);
			let origin = url.origin;

			if (origin === "https://developer.mozilla.org") {
				ret.mdn = url.href.substring(origin.length + 1);
			}
			else if (origin === "https://caniuse.com") {
				ret.caniuse = url.href.substring(origin.length + 1);
			}
			else if (origin === "https://w3.org" || origin === "https://www.w3.org") {
				ret.w3c = url.href.substring(origin.length + 1);
			}
			else if (url.href.startsWith("https://github.com/Devographics/surveys/discussions") || origin === "https://survey.devographics.com") {
				// Ignore
			}
			else {
				ret.resources ??= [];
				url = url.href;
				let resource = {url};

				if (urls[url]) {
					resource.title = urls[url];
				}
				else if (urls[url] === undefined) {
					urls[url] = undefined;
				}

				ret.resources.push(resource);
			}
		}
	}

	return ret;
});

let ymlContent = Format.YAML.stringify(features);
yml.textContent = ymlContent;

let newURLs = 0;
for (let url in urls) {
	if (urls[url] === undefined) {
		let response;
		try {
			response = await fetch('https://corsproxy.io/?' + encodeURIComponent(url));
			if (response.ok) {
				let title = await response.text();
				title = title.match(/<title>(?<title>[^<]+)<\/title>/)?.groups?.title;

				if (title) {
					title = title.trim().replace(/[\r\n]+/g, " ");
					urls[url] = title;
				}

				console.log("New URL:", url, title);
				newURLs++;
				continue;
			}
		}
		catch (e) {}

		console.warn("Failed to fetch", url, response?.status);
	}
}

if (newURLs > 0) {
	console.warn(`Found ${newURLs} new URLs, please update urlmeta.json`);
}

urls_pre.textContent = Format.JSON.stringify(urls);

download_yml.onmousedown = e => {
	// Create blob URL for CSV
	let blob = Format.YAML.toBlob(ymlContent);
	let url = URL.createObjectURL(blob);

	download_yml.href = url;
}