import fs from "fs";
import {
	chdirHere,
	isEntryPoint,
	writeJSON
} from "./util.mjs";
import GithubAPI from "../node_modules/madata/backends/github/api/github-api.js";

// Very restricted, can only be used to fetch public repo metadata
chdirHere();
let GITHUB_ACCESS_TOKEN = process.env?.GITHUB_ACCESS_TOKEN ?? fs.readFileSync("./GITHUB_ACCESS_TOKEN.txt", "utf8").trim();

export default async function fetchRepos () {
	chdirHere();

	let data = await GithubAPI.load("https://api.github.com/user/repos?per_page=100&max_pages=10", { accessToken: GITHUB_ACCESS_TOKEN });
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

if (isEntryPoint(import.meta.url) && GITHUB_ACCESS_TOKEN) {
	fetchRepos();
}