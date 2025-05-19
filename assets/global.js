import showInvisibles from "./prism-show-invisibles.js";
import "./prism.js";

// We want to preserve that a snippet is njk, in case there’s a more specialized language definition in the future
Prism.languages.njk = Prism.languages.liquid;

if (document.body.classList.contains("show-invisibles")) {
	showInvisibles(Prism);
	document.body.insertAdjacentHTML("beforeend", `<link rel="stylesheet" href="/assets/prism-show-invisibles.css" />`);
}

const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
let root = document.documentElement;

document.addEventListener("scroll", evt => {
	root.style.setProperty("--scrolltop", root.scrollTop);
}, {passive: true});

if (window.CSSPropertyRule) {
	root.classList.add("supports-atproperty");
}

if (window.CSS && CSS.registerProperty) {
	root.classList.add("supports-registerproperty");

	CSS.registerProperty({
		name: "--number",
		syntax: "<number>",
		inherits: true,
		initialValue: "0"
	});
}

let intersectionObserver = new IntersectionObserver(entries => {
	for (let entry of entries) {
		let element = entry.target;
		element.classList.toggle("in-view", entry.intersectionRatio > 0);
		element.classList.toggle("out-of-view", entry.intersectionRatio === 0);
	}
});

for (let el of $$(".monitor-in-view")) {
	intersectionObserver.observe(el);
}

for (let el of $$(".to-top")) {
	el.addEventListener("click", evt => {
		evt.preventDefault();
		root.scrollTo({top: 0, behavior: "smooth"});
	});
}

$$("a.contact:is(:not([href]), [href=''])").forEach(a => {
	let subject = a.dataset.subject ?? "Consulting inquiry";
	a.href = "mailto:lea@" + "verou.me?subject=" + encodeURIComponent(subject);
});
