import {
	isEntryPoint,
} from "./util.mjs";
import fetchRepos from "./fetch-repos.mjs";
import addProjectMetadata from "./metadata-projects.mjs";

export default async function fetchData () {
	await fetchRepos();
	await addProjectMetadata();
}

if (isEntryPoint(import.meta.url)) {
	fetchData();
}