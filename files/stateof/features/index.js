import Backend from "https://madata.dev/src/index.js";

let github = Backend.from("https://api.github.com/graphql", {
	query: `query {
  repository(owner: "devographics", name: "surveys") {
    discussions(last: 100, categoryId: "DIC_kwDOHru_As4CYAOU") {
      nodes {
        title,
        number,
        url,
        upvoteCount
      }
    }
  }
}`
});

globalThis.github = github;

let gsheets = Backend.from("https://docs.google.com/spreadsheets/d/13SdiaC9YQ8PwrMNvtd8n8qRhh90aOq96hr4jUgt0Efg/edit?usp=sharing");
globalThis.gsheets = gsheets;
gsheets.addEventListener("mv-login", e => {
	toolbar_gs.querySelector(".username").textContent = gsheets.user?.username;
});
gsheets.addEventListener("mv-logout", e => username.textContent = "");

let discussions, csvContent;

github.addEventListener("mv-login", async e => {
	toolbar_gh.querySelector(".username").textContent = github.user?.username;
	let data = await github.load();
	discussions = data?.repository?.discussions.nodes;
	discussions = discussions.sort((a, b) => b.upvoteCount - a.upvoteCount);

	let csvData = [Object.keys(discussions[0]), ...discussions.map(d => Object.values(d))];
	// Create CSV content from csvData making sure to escape special characters appropriately
	csvContent = csvData.map(row => row.map(val => {
		if (/[,;\t\n"]/.test(val)) {
			return `"${val.toString().replaceAll('"', '""')}"`
		}

		return val;
	}).join(",")).join("\n");
	csv.textContent = csvContent;
});


sync.onclick = e => {
	gsheets.store(discussions);
};

download_csv.onmousedown = e => {
	// Create blob URL for CSV
	let blob = new Blob([csvContent], { type: "text/csv" });
	let url = URL.createObjectURL(blob);

	download_csv.href = url;
}