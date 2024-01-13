import fs from "fs";
import {
	chdirHere,
	isEntryPoint,
	writeJSON
} from "./util.mjs";
import GithubAPI from "../node_modules/madata/backends/github/api/github-api.js";

// Very restricted access token, can only to fetch public repo metadata
const AT = "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";

export default async function fetchRepos () {
	chdirHere();

	let data = await GithubAPI.load("https://api.github.com/user/repos?per_page=100&max_pages=10", { accessToken: AT });
	console.log(`Fetched ${data.length} repos`);

	// Transform to object keyed on repo name
	data = Object.fromEntries(data.map(r => [
		r.full_name.toLowerCase(),
		{
			stars: r.stargazers_count,
		}
	]));

	writeJSON("../data/repos.json", data);
}

if (isEntryPoint(import.meta.url)) {
	fetchRepos();
}