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

let discussions;

github.addEventListener("mv-login", async e => {
	toolbar_gh.querySelector(".username").textContent = github.user?.username;
	let data = await github.load();
	discussions = data?.repository?.discussions.nodes;
	discussions = discussions.sort((a, b) => b.upvoteCount - a.upvoteCount);

	let csvContent = discussions.map(d => Object.values(d).join(",")).join("\n");
	csv.textContent = csvContent;
});


sync.onclick = e => {
	gsheets.store(discussions);
};