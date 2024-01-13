import fs from "fs";
import path from "node:path";
import { fileURLToPath } from 'node:url';

export function isEntryPoint (importURL) {
	let importPath = fileURLToPath(importURL);
	let runPath = process.argv[1];
	return importPath === runPath;
}

export function chdirHere () {
	const __dirname = path.dirname(fileURLToPath(import.meta.url));
	process.chdir(__dirname);
	return __dirname;
}

export function readJSON (url) {
	if (url.startsWith("http")) {
		return fetch(url).then(r => r.json());
	}

	// Internal path
	return JSON.parse(fs.readFileSync(url, "utf8"));
}

export function writeJSON (path, data, o) {
	fs.writeFileSync(path, JSON.stringify(data, null, "\t"), o);
	console.log(`Wrote ${path}`);
}

export function formatLargeInteger (n) {
	if (n > 2000) {
		let suffixes = {
			Bn: 10 ** 9,
			M: 10 ** 6,
			K: 10 ** 3,
		}

		for (let [suffix, limit] of Object.entries(suffixes)) {
			if (n >= limit) {
				return `${(n / limit).toPrecision(2)} ${suffix}`;
			}
		}
	}

	return n;
}