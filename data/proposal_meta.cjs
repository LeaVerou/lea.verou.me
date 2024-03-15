const proposals = require("./standards.cjs");

let statuses = [
	{
		id: "shipped-baseline",
		name: "Baseline",
		description: "The feature has been shipped in all major browsers.",
	},
	{
		id: "shipped",
		name: "Shipped",
		description: "The feature has shipped in one or more major browsers, but not all.",
	},
	{
		id: "shipped-flagged",
		name: "Developer Trial",
		description: "The feature has only shipped in browsers behind a flag.",
	},
	{
		id: "specced",
		name: "In spec",
		description: `The feature has been added to the official specification (by me or someone else).
		Keep in mind that often additional fleshing out may be needed to bring the spec to a state that it can be implemented in browsers.`,
	},
	{
		id: "resolution",
		name: "Accepted",
		description: "There a resolution that there is Working Group consesnsus to work on the feature, but it has not yet been added to the specification.",
	},
	{
		id: "proposal",
		name: "Proposal",
		description: "The feature does not yet have WG consensus.",
	},
]

for (let status of statuses) {
	status.proposals = [];
}

// Convert array to object
statuses = Object.fromEntries(statuses.map(status => [status.id, status]));

for (let proposal of proposals) {
	let statusId = proposal.status;
	let status = statuses[statusId];

	status.proposals ??= [];
	status.proposals.push(proposal);
}

let proposalsByYear = {};

let maxYear = (new Date).getFullYear();
let minYear = maxYear;

for (let proposal of proposals) {
	if (!proposal.minDate) {
		continue;
	}

	let year = proposal.minDate.getFullYear();

	if (year < minYear) {
		minYear = year;
	}
}

for (let i=minYear; i<=maxYear; i++) {
	proposalsByYear[i] = [];
}

for (let proposal of proposals) {
	if (!proposal.minDate) {
		continue;
	}

	let year = proposal.minDate.getFullYear();

	proposalsByYear[year].push(proposal);
}

module.exports = {statuses, proposalsByYear};