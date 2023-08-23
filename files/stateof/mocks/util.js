// Fetch survey CSS, log @import statements to console, and insert into page as a fallback
// No, there is no actual static URL for this, it changes every time the build process runs
export async function fetchSurveyCSS() {
	const surveyURL = "https://survey.devographics.com/en-US/survey/state-of-html/2023";
	const url = "https://corsproxy.io/?" + encodeURIComponent(surveyURL);
	const html = await fetch(url).then(r => r.text());
	const doc = new DOMParser().parseFromString(html, "text/html");
	const css = [...doc.querySelectorAll("link[rel=stylesheet]")].map(l => {
		const href = l.getAttribute("href");
		const url = new URL(href, surveyURL);
		return `@import url("${ url }");`;
	}).join("\n");
	document.querySelector("link[rel=stylesheet]").insertAdjacentHTML("beforebegin", `<style>${css}</style>`);
	console.log(css);
}