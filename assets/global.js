import "./prism.js";

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

	// Only apply animation when elements are in view, for performance
	let intersectionObserver = new IntersectionObserver(entries => {
		for (let entry of entries) {
			let element = entry.target;
			element.classList.toggle("in-view", entry.intersectionRatio > 0);
		}
	});

	for (let el of $$("body > header")) {
		intersectionObserver.observe(el);
	}
}