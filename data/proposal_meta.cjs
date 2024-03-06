const proposals = require("./standards.cjs");

let statuses = [
	{
		id: "shipped-baseline",
		name: "Baseline",
		description: "The feature is available in all major browsers.",
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
		name: "Specced",
		description: "The feature has been added to a specification, but has not yet shipped in any browser.",
	},
	{
		id: "resolution",
		name: "Accepted",
		description: "There is WG resolution to work on the feature, but it has not yet been specced.",
	},
	{
		id: "proposal",
		name: "Proposal",
		description: "The feature does not yet have WG consensus.",
	},
]

const stats = {};
stats.status = {};

for (let proposal of proposals) {
	let status = proposal.status;
	stats.status[status] ??= 0;
	stats.status[status]++;
}

for (let status of statuses) {
	status.count = stats.status[status.id] ?? 0;
}

// Convert array to object
statuses = Object.fromEntries(statuses.map(status => [status.id, status]));

module.exports = {stats, statuses};