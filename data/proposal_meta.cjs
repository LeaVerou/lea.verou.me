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

for (let status of statuses) {
	status.proposals = [];
}

// Convert array to object
statuses = Object.fromEntries(statuses.map(status => [status.id, status]));

for (let proposal of proposals) {
	let statusId = proposal.status;
	let status = statuses[statusId];

	status.proposals.push(proposal);
}



module.exports = {statuses};