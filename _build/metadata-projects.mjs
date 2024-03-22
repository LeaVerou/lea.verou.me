import fs from "fs";
import {
	chdirHere,
	formatLargeInteger,
	isEntryPoint,
	readJSON,
	writeJSON,
} from "./util.mjs";

export default async function addProjectMetadata() {
	chdirHere();

	let project_data = readJSON("../data/projects.json");

	// To update: node fetch-repos.mjs
	let repos = readJSON("../data/repos.json");

	/*
	To update:
	Visit https://npm-stat.com/charts.html?author=leaverou&from=2010-11-12
	wait for the data to load, then run:
	let o = Object.fromEntries([...$$("table").pop().rows].map(tr => [tr.cells[0].textContent, +tr.cells[1].textContent.replaceAll(",", "")])); delete o.package; copy(o);
	*/
	let npm_total_downloads = readJSON("../data/npm_total_downloads.json");

	let projects = project_data.project;

	for (let project of projects) {
		if (project.repo) {
			project.repo = project.repo?.toLowerCase();

			if (project.repo in repos) {
				project.repo_stars = repos[project.repo].stars;
				project.repo_stars_formatted = formatLargeInteger(project.repo_stars);
			}
		}

		if (project.npm && project.npm in npm_total_downloads) {
			let downloads = npm_total_downloads[project.npm];
			project.npm_downloads = downloads;
			project.npm_downloads_formatted = formatLargeInteger(downloads);
		}
	}

	writeJSON("../data/projects.json", project_data);
}

if (isEntryPoint(import.meta.url)) {
	addProjectMetadata();
}